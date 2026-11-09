/**
 * Client for Haiven's public v2 listing endpoints. No auth.
 *
 * Calls go straight from the browser, like the Caretaker forms, so the API's
 * per-IP rate limits count each visitor rather than this site's server.
 *
 *   Base URL   NEXT_PUBLIC_V2_API_URL (already ends in /api/v2)
 *   Response   { status, message, data, error_code, error_details, meta? }
 *
 * Saved API examples are generated from code, so everything beyond the ids and
 * price is typed as optional. Money is integer kobo throughout.
 */

import { type ListingFilters, toApiParams } from "./filters";

export type OfferType = "rent" | "shortlet";

export interface ListingPhoto {
	id: string;
	url: string;
	caption?: string | null;
	position?: number | null;
	is_cover?: boolean | null;
}

export interface ListingAmenity {
	id: string;
	name: string;
	note?: string | null;
}

/** One rent or shortlet offer. A unit can have one of each, sharing `id`. */
export interface ListingOffer {
	/** The unit. Used for the detail page and enquiries. */
	id: string;
	/** The offer. Used for availability and booking requests. */
	offering_id: string;
	type: OfferType;
	price: number;
	name?: string | null;
	property?: { name?: string | null } | null;
	city?: string | null;
	state?: string | null;
	description?: string | null;
	frequency?: string | null;
	currency?: string | null;
	caution_deposit?: number | null;
	rooms?: {
		bedrooms?: number | null;
		bathrooms?: number | null;
		toilets?: number | null;
	} | null;
	space_type?: string | null;
	min_nights?: number | null;
	check_in_time?: string | null;
	check_out_time?: string | null;
	cleaning_fee?: number | null;
	organization?: { name?: string | null; logo_url?: string | null } | null;
	photos?: ListingPhoto[] | null;
	amenities?: {
		in_the_unit?: ListingAmenity[] | null;
		in_the_building?: ListingAmenity[] | null;
	} | null;
}

export interface PageMeta {
	current_page?: number;
	last_page?: number;
	total?: number;
}

export interface AmenityOption {
	value: string;
	label: string;
	group?: string | null;
}

export interface BlockedRange {
	from: string;
	to: string;
	reason?: string | null;
}

interface Envelope<T> {
	status: boolean;
	message: string;
	data: T;
	error_code: string | null;
	error_details: Record<string, unknown> | null;
	meta?: PageMeta;
}

const BASE_URL = (process.env.NEXT_PUBLIC_V2_API_URL ?? "").replace(/\/+$/, "");
const TIMEOUT_MS = 15_000;

const UNREACHABLE =
	"We couldn't reach Haiven. Check your connection and try again.";
const GENERIC = "Something went wrong on our side. Please try again.";
const TOO_MANY = "Too many attempts. Please try again shortly.";

// Free ngrok tunnels answer browsers with an HTML warning page unless this
// header is sent. A custom header forces a CORS preflight, so production skips it.
const HEADERS: Record<string, string> = {
	Accept: "application/json",
	...(BASE_URL.includes("ngrok")
		? { "ngrok-skip-browser-warning": "true" }
		: {}),
};

export class ApiError extends Error {
	constructor(
		message: string,
		/** HTTP status, or null when the request never got a response. */
		readonly status: number | null = null,
		readonly code: string | null = null,
		readonly fields: Record<string, unknown> | null = null,
	) {
		super(message);
		this.name = "ApiError";
	}
}

export const toApiError = (error: unknown) =>
	error instanceof ApiError ? error : new ApiError(GENERIC);

function failureMessage(status: number, message: unknown) {
	if (status === 429) return TOO_MANY;
	if (status >= 500) return GENERIC;
	return typeof message === "string" && message.trim() ? message.trim() : GENERIC;
}

async function request<T>(
	path: string,
	options: {
		method?: "GET" | "POST";
		query?: URLSearchParams;
		body?: unknown;
		signal?: AbortSignal;
	} = {},
): Promise<Envelope<T>> {
	if (!BASE_URL) {
		console.error("NEXT_PUBLIC_V2_API_URL is not set");
		throw new ApiError(UNREACHABLE);
	}
	const { method = "GET", query, body, signal } = options;
	const search = query?.toString();
	const url = `${BASE_URL}/${path}${search ? `?${search}` : ""}`;

	const controller = new AbortController();
	const abort = () => controller.abort();
	const timer = setTimeout(abort, TIMEOUT_MS);
	signal?.addEventListener("abort", abort, { once: true });

	let res: Response;
	try {
		res = await fetch(url, {
			method,
			headers:
				body === undefined
					? HEADERS
					: { ...HEADERS, "Content-Type": "application/json" },
			body: body === undefined ? undefined : JSON.stringify(body),
			signal: controller.signal,
		});
	} catch (error) {
		if (signal?.aborted) throw error;
		// Network failure, timeout, or a CORS rejection all land here.
		console.error(`Haiven API ${method} ${path} failed:`, error);
		throw new ApiError(UNREACHABLE);
	} finally {
		clearTimeout(timer);
		signal?.removeEventListener("abort", abort);
	}

	// The API answers JSON; a proxy or the tunnel can return HTML.
	const envelope = (await res.json().catch(() => null)) as Partial<
		Envelope<T>
	> | null;
	if (res.ok && envelope && envelope.status !== false) {
		return envelope as Envelope<T>;
	}
	throw new ApiError(
		failureMessage(res.status, envelope?.message),
		res.status,
		envelope?.error_code ?? null,
		envelope?.error_details ?? null,
	);
}

export async function fetchListings(
	filters: ListingFilters,
	signal: AbortSignal,
) {
	const res = await request<ListingOffer[]>("public/listings", {
		query: toApiParams(filters),
		signal,
	});
	return { offers: res.data ?? [], meta: res.meta };
}

/** Every visible offer for a unit. An empty array means "not available". */
export async function fetchListingOffers(
	unitId: string,
	signal: AbortSignal,
) {
	const res = await request<ListingOffer[]>(
		`public/listings/${encodeURIComponent(unitId)}`,
		{ signal },
	);
	return res.data ?? [];
}

export async function fetchAmenityOptions(signal: AbortSignal) {
	const res = await request<{ amenities?: AmenityOption[] }>("public/options", {
		signal,
	});
	return res.data?.amenities ?? [];
}

/** `from` and `to` are Y-m-d; `to` is exclusive and at most a year ahead. */
export async function fetchAvailability(
	offeringId: string,
	from: string,
	to: string,
	signal: AbortSignal,
) {
	const res = await request<BlockedRange[]>(
		`public/shortlet-offerings/${encodeURIComponent(offeringId)}/availability`,
		{ query: new URLSearchParams({ from, to }), signal },
	);
	return res.data ?? [];
}

export interface EnquiryPayload {
	name: string;
	email: string;
	phone?: string;
	message?: string;
}

/** Takes the unit `id`, not the `offering_id`. */
export async function sendEnquiry(unitId: string, payload: EnquiryPayload) {
	await request(`public/listings/${encodeURIComponent(unitId)}/enquiries`, {
		method: "POST",
		body: payload,
	});
}

export interface BookingRequestPayload {
	check_in_on: string;
	nights: number;
	guest_name: string;
	guest_email: string;
	guest_phone: string;
	message?: string;
}

/** Takes the `offering_id`, not the unit `id`. */
export async function sendBookingRequest(
	offeringId: string,
	payload: BookingRequestPayload,
) {
	await request(
		`public/shortlet-offerings/${encodeURIComponent(offeringId)}/requests`,
		{ method: "POST", body: payload },
	);
}
