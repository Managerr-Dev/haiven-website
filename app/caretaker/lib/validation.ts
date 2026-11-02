import { toNigerianMobile } from "@/app/lib/phone";

export type FieldKind = "text" | "email" | "phone" | "units";

export type FieldRule = [name: string, kind: FieldKind, message: string];

export function isValid(value: string, kind: FieldKind): boolean {
	const v = (value || "").trim();
	if (kind === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
	if (kind === "phone") return toNigerianMobile(v) !== null;
	if (kind === "units") return Number(v) >= 1;
	return v.length > 1;
}

export function checkForm(
	formData: FormData,
	rules: FieldRule[],
): Record<string, string> {
	const errors: Record<string, string> = {};
	for (const [name, kind, message] of rules) {
		const value = formData.get(name);
		if (!isValid(typeof value === "string" ? value : "", kind)) {
			errors[name] = message;
		}
	}
	return errors;
}

export const nameRule: FieldRule = [
	"full_name",
	"text",
	"Enter your full name so we know who to call.",
];
export const phoneRule: FieldRule = [
	"phone_number",
	"phone",
	"Enter a Nigerian mobile number, for example 0801 234 5678.",
];
export const emailRule: FieldRule = [
	"email",
	"email",
	"Enter an email address in the form name@example.com.",
];
export const unitsRule: FieldRule = [
	"number_of_units",
	"units",
	"Enter the number of units, 1 or more.",
];
