/**
 * Client-side submit for the HLBC registration form.
 *
 * Posts straight from the browser to the Haiven Admin API, like the Caretaker
 * forms, so the API's per-IP rate limit (6/min) counts each visitor rather
 * than our server.
 *
 *   POST {NEXT_PUBLIC_BASE_URL}/hlbc/registrations   (public, no auth)
 *   Response { status, status_code, code, message, data }
 *
 * The API saves the registration, puts each meter type into its open group
 * (orders over 1,000 become special orders, outside any group) and emails the
 * team.
 */

import { toE164, toNigerianMobile } from "@/app/lib/phone";
import type { MeterType } from "../data";
import type { RegistrationValues } from "../validation";

export type RegisteredLine = {
	phase: MeterType;
	quantity: number;
	/** "001", or null when no group was open (or for special orders). */
	group: string | null;
};

export type RegistrationResult =
	| {
			success: true;
			reference: string;
			isSpecialOrder: boolean;
			lines: RegisteredLine[];
	  }
	| { success: false; message: string };

const RETRY_MESSAGE =
	"We couldn't register you just now. Please try again in a few minutes, or email info@haiven.net.";
const RATE_LIMIT_MESSAGE =
	"You're sending registrations too quickly. Please wait a minute and try again.";
const TIMEOUT_MS = 15_000;

function buildPayload(v: RegistrationValues) {
	const digits = toNigerianMobile(v.whatsapp);
	return {
		full_name: v.name,
		phone_number: digits ? toE164(digits) : v.whatsapp,
		email: v.email || null,
		buyer_type: v.buyer,
		single_phase_quantity: v.qtySingle,
		three_phase_quantity: v.qtyThree,
		wants_meter_boxes: v.boxes,
		wants_circuit_breakers: v.breakers,
		delivery_state: v.state,
		city: v.city,
		property_name: v.property || null,
		referred_by: v.referral || null,
		terms_accepted: v.terms,
		consent_accepted: v.consent,
	};
}

type ApiBody = {
	message?: unknown;
	errors?: Record<string, unknown>;
	data?: {
		reference?: unknown;
		is_special_order?: unknown;
		lines?: { phase?: unknown; quantity?: unknown; group?: { label?: unknown } | null }[];
	};
};

/** Laravel's 422 body: the first field error is the most useful message. */
function firstError(body: ApiBody | null): string | null {
	const errors = body?.errors && Object.values(body.errors);
	const first = errors?.[0];
	if (Array.isArray(first) && typeof first[0] === "string") return first[0];
	return typeof body?.message === "string" && body.message.trim() ? body.message.trim() : null;
}

export async function submitRegistration(
	values: RegistrationValues,
): Promise<RegistrationResult> {
	const base = process.env.NEXT_PUBLIC_BASE_URL;
	if (!base) {
		console.error("NEXT_PUBLIC_BASE_URL is not set");
		return { success: false, message: RETRY_MESSAGE };
	}

	let res: Response;
	try {
		res = await fetch(`${base.replace(/\/+$/, "")}/hlbc/registrations`, {
			method: "POST",
			headers: { "Content-Type": "application/json", Accept: "application/json" },
			body: JSON.stringify(buildPayload(values)),
			signal: AbortSignal.timeout(TIMEOUT_MS),
		});
	} catch (error) {
		// Network failure, timeout, or a CORS rejection all land here.
		console.error("HLBC registration request failed:", error);
		return { success: false, message: RETRY_MESSAGE };
	}

	// The API answers JSON; an upstream proxy or cold start can return HTML.
	const body = (await res.json().catch(() => null)) as ApiBody | null;

	if (res.ok && typeof body?.data?.reference === "string") {
		return {
			success: true,
			reference: body.data.reference,
			isSpecialOrder: body.data.is_special_order === true,
			lines: (body.data.lines ?? []).flatMap((l) =>
				(l.phase === "single" || l.phase === "three") && typeof l.quantity === "number"
					? [
							{
								phase: l.phase,
								quantity: l.quantity,
								group: typeof l.group?.label === "string" ? l.group.label : null,
							},
						]
					: [],
			),
		};
	}

	if (res.status === 429) return { success: false, message: RATE_LIMIT_MESSAGE };
	if (res.status === 422)
		return { success: false, message: firstError(body) ?? "Please check the form and try again." };

	console.error(`HLBC registration failed: HTTP ${res.status}`, firstError(body));
	return { success: false, message: RETRY_MESSAGE };
}
