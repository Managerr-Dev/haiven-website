/**
 * Nigerian mobile numbers, shared by the careers and Caretaker forms.
 *
 * Accepts the ways people usually type them (0803 123 4567, 803-123-4567,
 * +234 803 123 4567, 2348031234567) and reduces them to the 10 digits after
 * +234. Mobile numbers start 70, 71, 80, 81, 90 or 91.
 */
export function toNigerianMobile(input: string): string | null {
	// Digits plus common separators only; anything else (letters) is a typo.
	if (/[^\d\s()+.-]/.test(input)) return null;
	let digits = input.replace(/\D/g, "");
	if (digits.startsWith("234")) digits = digits.slice(3);
	if (digits.startsWith("0")) digits = digits.slice(1);
	return /^[789][01]\d{8}$/.test(digits) ? digits : null;
}

/** "+234 803 123 4567", for emails people read. */
export const formatNigerianMobile = (digits: string) =>
	`+234 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;

/** "+2348031234567", for APIs and storage. */
export const toE164 = (digits: string) => `+234${digits}`;
