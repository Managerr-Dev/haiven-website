"use server";

import {
	getTransporter,
	passesRecaptcha,
	renderRows,
	wrapEmail,
	yesNo,
} from "@/app/lib/mail";
import { formatNigerianMobile, toNigerianMobile } from "@/app/lib/phone";
import { ACCESSORIES, BUYER_TYPES, labelFor } from "./data";
import { readRegistration, validateRegistration } from "./validation";

/** Every HLBC registration is sent to these inboxes. */
const RECIPIENTS = [
	"haivenmanager@gmail.com",
	"info@haiven.net",
	"joshua.biyere@gmail.com",
];

export type RegistrationResult =
	| { success: true }
	| { success: false; message: string };

const RETRY_MESSAGE =
	"We couldn't register you just now. Please try again in a few minutes, or email info@haiven.net.";

export async function registerForPool(
	formData: FormData,
): Promise<RegistrationResult> {
	if (!(await passesRecaptcha(formData, "HLBC")))
		return {
			success: false,
			message: "Security verification failed. Please refresh and try again.",
		};

	const values = readRegistration(formData);
	const error = validateRegistration(values);
	if (error) return { success: false, message: error };

	const mail = getTransporter();
	if (!mail) {
		console.error(
			"CAREERS_SMTP_HOST / CAREERS_SMTP_USER / CAREERS_SMTP_PASSWORD not set",
		);
		return { success: false, message: RETRY_MESSAGE };
	}

	// Validated above, so the number always parses.
	const whatsapp = formatNigerianMobile(toNigerianMobile(values.whatsapp)!);
	const meters = [
		values.qtySingle ? `${values.qtySingle} single-phase` : "",
		values.qtyThree ? `${values.qtyThree} three-phase` : "",
	]
		.filter(Boolean)
		.join(" + ");

	const { html, text } = renderRows([
		["Name", values.name],
		["WhatsApp", whatsapp],
		["Email", values.email],
		["Buyer type", labelFor(BUYER_TYPES, values.buyer)],
		["Single-phase meters", String(values.qtySingle)],
		["Three-phase meters", String(values.qtyThree)],
		["Boxes or breakers", labelFor(ACCESSORIES, values.accessories)],
		["Delivery state", values.state],
		["City or town", values.city],
		["Property or estate", values.property],
		["Referred by", values.referral],
		["Agreed to HLBC Terms", yesNo(values.terms)],
		["Data-use consent", yesNo(values.consent)],
		["Submitted", new Date().toISOString()],
	]);

	try {
		await mail.transporter.sendMail({
			from: `"Haiven HLBC" <${mail.user}>`,
			to: RECIPIENTS,
			...(values.email ? { replyTo: values.email } : {}),
			subject: `HLBC registration: ${meters} — ${values.name} (${values.state})`,
			text,
			html: wrapEmail("New HLBC pool registration", html),
		});
	} catch (error) {
		console.error("HLBC registration email failed:", error);
		return { success: false, message: RETRY_MESSAGE };
	}

	return { success: true };
}
