/**
 * Client-side submit for the Caretaker intake forms.
 *
 * The forms POST straight from the browser to the Haiven Admin API so the
 * per-IP rate limit (6/min) counts each visitor, not our server. See the API
 * reference for the full contract.
 *
 *   Base URL   NEXT_PUBLIC_BASE_URL  (includes the trailing `/api`)
 *   Endpoint   POST {base}/caretaker/{waitlist | demo-request | training-application}
 *   Headers    Content-Type + Accept: application/json
 *   Auth       none (public)
 *   Response   { status, status_code, code, message, data }
 *
 * The backend must allow this site's origin via CORS for the fetch to succeed.
 */

export type LeadEndpoint = "waitlist" | "demo-request" | "training-application";

export type LeadResult =
	| { success: true }
	| { success: false; message: string };

const RETRY_MESSAGE =
	"We couldn't submit that right now. Please try again in a moment.";

const RATE_LIMIT_MESSAGE =
	"You're sending submissions too quickly. Please wait a moment and try again.";

/** Give the external API this long before we give up on it. */
const TIMEOUT_MS = 15_000;

/** Build the JSON body: trim, drop empty values, send `number_of_units` as an int. */
function buildPayload(formData: FormData): Record<string, unknown> {
	const payload: Record<string, unknown> = {};
	for (const [key, raw] of formData.entries()) {
		if (typeof raw !== "string") continue;
		const value = raw.trim();
		if (value === "") continue; // omit empty optionals (e.g. interested_plan -> API default)
		if (key === "number_of_units") {
			const n = Number(value);
			if (Number.isInteger(n) && n > 0) payload[key] = n;
			continue;
		}
		payload[key] = value;
	}
	return payload;
}

export async function submitLead(
	endpoint: LeadEndpoint,
	formData: FormData,
): Promise<LeadResult> {
	const base = process.env.NEXT_PUBLIC_BASE_URL;
	if (!base) {
		console.error("NEXT_PUBLIC_BASE_URL is not set");
		return { success: false, message: RETRY_MESSAGE };
	}

	const url = `${base.replace(/\/+$/, "")}/caretaker/${endpoint}`;

	let res: Response;
	try {
		res = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(buildPayload(formData)),
			signal: AbortSignal.timeout(TIMEOUT_MS),
		});
	} catch (error) {
		// Network failure, timeout, or a CORS rejection all land here.
		console.error(`Caretaker ${endpoint} request failed:`, error);
		return { success: false, message: RETRY_MESSAGE };
	}

	// The API answers JSON; an upstream proxy or cold start can return HTML.
	const body = (await res.json().catch(() => null)) as {
		message?: unknown;
	} | null;
	const apiMessage =
		body && typeof body.message === "string" && body.message.trim()
			? body.message.trim()
			: null;

	if (res.ok) return { success: true };

	if (res.status === 429) {
		return { success: false, message: apiMessage ?? RATE_LIMIT_MESSAGE };
	}
	if (res.status === 422) {
		return {
			success: false,
			message: apiMessage ?? "Please check the form and try again.",
		};
	}

	console.error(
		`Caretaker ${endpoint} submission failed: HTTP ${res.status}`,
		apiMessage,
	);
	return { success: false, message: RETRY_MESSAGE };
}
