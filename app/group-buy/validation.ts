/**
 * HLBC registration form values and validation. The Haiven Admin API applies
 * the same rules (StoreHlbcRegistrationRequest); keep them in step.
 */

import { toNigerianMobile } from "@/app/lib/phone";
import { BUYER_TYPES, MAX_GROUP_ORDER, STATES } from "./data";

export type RegistrationValues = {
	name: string;
	whatsapp: string;
	email: string;
	buyer: string;
	qtySingle: number;
	qtyThree: number;
	boxes: boolean;
	breakers: boolean;
	state: string;
	city: string;
	property: string;
	referral: string;
	terms: boolean;
	consent: boolean;
};

/** Largest quantity the form accepts per phase meter (special orders included). */
export const MAX_QTY = 100_000;

/** Orders above the per-order group limit are handled as special orders. */
export const isSpecialOrder = (v: Pick<RegistrationValues, "qtySingle" | "qtyThree">) =>
	Math.max(v.qtySingle, v.qtyThree) > MAX_GROUP_ORDER;

const str = (fd: FormData, key: string) => {
	const v = fd.get(key);
	return typeof v === "string" ? v.trim() : "";
};

export const parseQty = (raw: string) => {
	const n = parseInt(raw, 10);
	return Number.isFinite(n) ? Math.max(0, Math.min(MAX_QTY, n)) : 0;
};

export function readRegistration(fd: FormData): RegistrationValues {
	return {
		name: str(fd, "name"),
		whatsapp: str(fd, "whatsapp"),
		email: str(fd, "email"),
		buyer: str(fd, "buyer"),
		qtySingle: parseQty(str(fd, "qtySingle")),
		qtyThree: parseQty(str(fd, "qtyThree")),
		state: str(fd, "state"),
		city: str(fd, "city"),
		property: str(fd, "property"),
		referral: str(fd, "referral"),
		// Checkboxes post "on" when ticked and are absent otherwise.
		boxes: fd.has("boxes"),
		breakers: fd.has("breakers"),
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
		missing.push("a valid email (or leave it blank)");
	if (!BUYER_TYPES.some((b) => b.value === v.buyer)) missing.push("who you are");
	if (v.qtySingle + v.qtyThree < 1) missing.push("at least one meter");
	if (!STATES.includes(v.state)) missing.push("delivery state");
	if (v.city.length < 2) missing.push("city or area");
	if (!v.terms) missing.push("agreement to the terms");
	if (!v.consent) missing.push("consent to use your details");
	return missing.length ? `Please add ${missing.join(", ")}.` : null;
}
