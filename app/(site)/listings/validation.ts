import { isEmail } from "@/app/(site)/careers/validation";
import { toNigerianMobile } from "@/app/lib/phone";
import { ApiError } from "./api";
import { isValidNaira } from "./filters";

/** Field rules for the listing forms. Error keys match the API's field names. */

export type FieldErrors = Record<string, string>;

export const MAX_NAME = 160;
export const MAX_EMAIL = 191;
export const MAX_MESSAGE = 2000;

const PHONE_FORMAT =
	"That doesn't look like a Nigerian mobile number. Use the 10 digits after +234, for example 803 123 4567.";

function checkName(name: string) {
	return name.trim() ? undefined : "Add your name so the host knows who's asking.";
}

function checkEmail(email: string) {
	if (!email.trim()) return "Add your email address so the host can reply.";
	return isEmail(email)
		? undefined
		: "That email address looks incomplete. Check it and try again.";
}

/** A copy of `errors` without the given fields, once they've been edited. */
export function withoutFields(errors: FieldErrors, ...keys: string[]) {
	return Object.fromEntries(
		Object.entries(errors).filter(([key]) => !keys.includes(key)),
	);
}

function collect(entries: Record<string, string | undefined>) {
	return Object.fromEntries(
		Object.entries(entries).filter(([, message]) => message),
	) as FieldErrors;
}

export interface EnquiryValues {
	name: string;
	email: string;
	phone: string;
	message: string;
}

export function validateEnquiry(v: EnquiryValues) {
	return collect({
		name: checkName(v.name),
		email: checkEmail(v.email),
		phone:
			v.phone.trim() && !toNigerianMobile(v.phone) ? PHONE_FORMAT : undefined,
	});
}

export interface BookingValues {
	guest_name: string;
	guest_email: string;
	guest_phone: string;
	message: string;
}

export function validateBooking(
	v: BookingValues,
	dates: { checkIn: string | null; checkOut: string | null },
) {
	return collect({
		check_in_on:
			dates.checkIn && dates.checkOut
				? undefined
				: "Choose your check-in and check-out dates.",
		guest_name: checkName(v.guest_name),
		guest_email: checkEmail(v.guest_email),
		guest_phone: !v.guest_phone.trim()
			? "Add your phone number so the host can reach you."
			: toNigerianMobile(v.guest_phone)
				? undefined
				: PHONE_FORMAT,
	});
}

export interface FilterDraft {
	minPrice: string;
	maxPrice: string;
}

/** People type "500,000"; the URL and API only want digits. */
export const cleanNaira = (value: string) => value.replace(/[,\s]/g, "");

export function validateFilterPrices(draft: FilterDraft) {
	const min = cleanNaira(draft.minPrice);
	const max = cleanNaira(draft.maxPrice);
	const format = "Enter a whole naira amount, using numbers only.";
	return collect({
		min_price: min && !isValidNaira(min) ? format : undefined,
		max_price:
			max && !isValidNaira(max)
				? format
				: min && max && isValidNaira(min) && Number(max) < Number(min)
					? "The maximum can't be lower than the minimum."
					: undefined,
	});
}

/**
 * Splits an API failure into per-field messages for the fields this form
 * shows, and one banner message covering everything else.
 */
export function splitApiError(error: ApiError, knownFields: readonly string[]) {
	const fields: FieldErrors = {};
	const stray: string[] = [];
	for (const [key, value] of Object.entries(error.fields ?? {})) {
		const message = Array.isArray(value) ? String(value[0]) : String(value);
		const field = key.split(".")[0];
		if (knownFields.includes(field)) fields[field] = message;
		else stray.push(message);
	}
	return { fields, banner: stray.join(" ") || error.message };
}
