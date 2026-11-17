/**
 * HLBC registration form values and validation, shared by the browser form
 * and the server action so both apply the same rules.
 */

import { toNigerianMobile } from "@/app/lib/phone";
import { ACCESSORIES, BUYER_TYPES, STATES } from "./data";

export type RegistrationValues = {
	name: string;
	whatsapp: string;
	email: string;
	buyer: string;
	qtySingle: number;
	qtyThree: number;
	accessories: string;
	state: string;
	city: string;
	property: string;
	referral: string;
	terms: boolean;
	consent: boolean;
};

export const MAX_QTY = 999;

const str = (fd: FormData, key: string) => {
	const v = fd.get(key);
	return typeof v === "string" ? v.trim() : "";
};

const qty = (fd: FormData, key: string) => {
	const n = parseInt(str(fd, key), 10);
	return Number.isFinite(n) ? Math.max(0, Math.min(MAX_QTY, n)) : 0;
};

export function readRegistration(fd: FormData): RegistrationValues {
	return {
		name: str(fd, "name"),
		whatsapp: str(fd, "whatsapp"),
		email: str(fd, "email"),
		buyer: str(fd, "buyer"),
		qtySingle: qty(fd, "qtySingle"),
		qtyThree: qty(fd, "qtyThree"),
		accessories: str(fd, "accessories") || "none",
		state: str(fd, "state"),
		city: str(fd, "city"),
		property: str(fd, "property"),
		referral: str(fd, "referral"),
		// Checkboxes post "on" when ticked and are absent otherwise.
		terms: fd.has("terms"),
		consent: fd.has("consent"),
	};
}

/** Returns a single sentence naming what is missing, or null when the form is complete. */
export function validateRegistration(v: RegistrationValues): string | null {
	const missing: string[] = [];
	if (v.name.length < 2) missing.push("your name");
	if (!toNigerianMobile(v.whatsapp)) missing.push("a valid WhatsApp number");
	if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email))
		missing.push("a valid email address (or leave it blank)");
	if (!BUYER_TYPES.some((b) => b.value === v.buyer)) missing.push("buyer type");
	if (v.qtySingle + v.qtyThree < 1) missing.push("at least one meter");
	if (!ACCESSORIES.some((a) => a.value === v.accessories))
		missing.push("boxes or breakers choice");
	if (!STATES.includes(v.state)) missing.push("delivery state");
	if (v.city.length < 2) missing.push("city");
	if (!v.terms) missing.push("agreement to the Terms");
	if (!v.consent) missing.push("data-use consent");
	return missing.length ? `Please add ${missing.join(", ")}.` : null;
}
