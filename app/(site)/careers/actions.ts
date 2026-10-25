"use server";

import nodemailer from "nodemailer";
import type { Attachment } from "nodemailer/lib/mailer";
import { verifyRecaptcha } from "@/app/lib/recaptcha";
import { getRole, isClosed } from "./data";
import {
	type ApplicationValues,
	checkCv,
	EMPTY_APPLICATION,
	EMPTY_TALENT_POOL,
	MAX_FILE_BYTES,
	MAX_PHOTOS,
	MAX_TOTAL_ATTACHMENT_BYTES,
	type TalentPoolValues,
	validateApplication,
	validateTalentPool,
} from "./validation";

/** Every application and talent-pool sign-up is sent to these inboxes. */
const RECIPIENTS = ["haivenmanagerr@gmail.com", "joshua.biyere@gmail.com"];

export type CareersResult =
	| { success: true }
	| { success: false; message: string; errors?: Record<string, string> };

const RETRY_MESSAGE =
	"We couldn't send your application just now. Please try again in a few minutes.";
const CHECK_FIELDS_MESSAGE = "Please check the highlighted fields and try again.";

function getTransporter() {
	const host = process.env.CAREERS_SMTP_HOST;
	const port = Number(process.env.CAREERS_SMTP_PORT || 465);
	const user = process.env.CAREERS_SMTP_USER;
	const pass = process.env.CAREERS_SMTP_PASSWORD;
	if (!host || !user || !pass) return null;
	return {
		user,
		transporter: nodemailer.createTransport({
			host,
			port,
			// 465 is implicit SSL; other ports (587) upgrade with STARTTLS.
			secure: port === 465,
			auth: { user, pass },
		}),
	};
}

async function passesRecaptcha(formData: FormData) {
	// Skipped only where reCAPTCHA isn't configured (e.g. local development).
	if (!process.env.RECAPTCHA_SECRET_KEY) return true;
	const token = formData.get("recaptchaToken");
	if (typeof token !== "string" || !token) return false;
	const result = await verifyRecaptcha(token);
	if (!result.success)
		console.error("Careers reCAPTCHA failed:", result.error);
	return result.success;
}

const str = (formData: FormData, key: string) => {
	const v = formData.get(key);
	return typeof v === "string" ? v.trim() : "";
};

const fileOrNull = (formData: FormData, key: string) => {
	const v = formData.get(key);
	return v instanceof File && v.size > 0 ? v : null;
};

const escapeHtml = (s: string) =>
	s
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");

const safeFilename = (name: string) =>
	name.replace(/[^\w.\- ]+/g, "_").slice(-120) || "attachment";

async function toAttachment(file: File, prefix = ""): Promise<Attachment> {
	return {
		filename: prefix + safeFilename(file.name),
		content: Buffer.from(await file.arrayBuffer()),
		contentType: file.type || undefined,
	};
}

/** Label/value rows rendered as a simple email table; empty values are skipped. */
function renderRows(rows: [string, string][]) {
	const filled = rows.filter(([, value]) => value);
	const html = filled
		.map(
			([label, value]) => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #E3E7F0;color:#4A5168;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #E3E7F0;color:#14182B;white-space:pre-wrap">${escapeHtml(value)}</td>
        </tr>`,
		)
		.join("");
	const text = filled.map(([label, value]) => `${label}: ${value}`).join("\n");
	return { html, text };
}

function wrapEmail(heading: string, rowsHtml: string) {
	return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#14182B">
      <h2 style="color:#1B2E6B;margin:0 0 16px">${escapeHtml(heading)}</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">${rowsHtml}</table>
    </div>`;
}

const yesNo = (b: boolean) => (b ? "Yes" : "No");

export async function submitApplication(
	formData: FormData,
): Promise<CareersResult> {
	const role = getRole(str(formData, "role"));
	if (!role) return { success: false, message: RETRY_MESSAGE };
	if (isClosed())
		return {
			success: false,
			message:
				"This role has closed. Applications are no longer being accepted.",
		};

	if (!(await passesRecaptcha(formData)))
		return {
			success: false,
			message: "Security verification failed. Please refresh and try again.",
		};

	const values = Object.fromEntries(
		Object.entries(EMPTY_APPLICATION).map(([key, empty]) => [
			key,
			typeof empty === "boolean"
				? formData.get(key) === "true"
				: str(formData, key),
		]),
	) as unknown as ApplicationValues;

	const cv = fileOrNull(formData, "cv");
	const photos = formData
		.getAll("photos")
		.filter((p): p is File => p instanceof File && p.size > 0);
	const equipment = formData
		.getAll("equipment")
		.filter((e): e is string => typeof e === "string");

	const errors = validateApplication(values, role.slug);
	const cvError = checkCv(cv);
	if (cvError) errors.cv = cvError;
	if (Object.keys(errors).length)
		return { success: false, message: CHECK_FIELDS_MESSAGE, errors };

	if (
		photos.length > MAX_PHOTOS ||
		photos.some((p) => !p.type.startsWith("image/") || p.size > MAX_FILE_BYTES)
	)
		return {
			success: false,
			message: "You can add up to 4 photos, each under 5 MB.",
		};
	const totalBytes = (cv?.size ?? 0) + photos.reduce((n, p) => n + p.size, 0);
	if (totalBytes > MAX_TOTAL_ATTACHMENT_BYTES)
		return {
			success: false,
			message:
				"Your CV and photos are too large to send together. Remove a photo or use a smaller CV and try again.",
		};

	const mail = getTransporter();
	if (!mail) {
		console.error("CAREERS_SMTP_HOST / CAREERS_SMTP_USER / CAREERS_SMTP_PASSWORD not set");
		return { success: false, message: RETRY_MESSAGE };
	}

	const variant = values.techRole || values.growthRole;
	const roleLabel = role.title + (variant ? ` (${variant})` : "");
	const phone = `+234 ${values.phone}`;

	const { html, text } = renderRows([
		["Role", roleLabel],
		["Name", values.name],
		["Email", values.email],
		["Phone", phone],
		["Lives in", values.area],
		["Years of experience", values.exp],
		["LinkedIn", values.linkedin],
		["Can start", values.start],
		["Heard about role via", values.heard],
		["Building they ran / hardest problem", values.fmAnswer],
		["Knows property owners", values.fmKnows],
		["About those owners", values.fmKnows === "Yes" ? values.fmKnowsText : ""],
		["Equipment worked on", equipment.join(", ")],
		["Best deal closed", values.deal],
		["Year of graduation", values.gradYear],
		["NYSC status", values.nysc],
		[
			"NYSC service ends",
			values.nysc === "Currently serving" ? values.nyscMonth : "",
		],
		["Fixed a problem for someone upset", values.upset],
		["Consents to assessment", yesNo(values.consent1)],
		["Keep details for 12 months", yesNo(values.consent2)],
		["Submitted", new Date().toISOString()],
	]);

	try {
		const attachments = [
			...(cv ? [await toAttachment(cv, "CV - ")] : []),
			...(await Promise.all(
				photos.map((p, i) => toAttachment(p, `Installation ${i + 1} - `)),
			)),
		];

		await mail.transporter.sendMail({
			from: `"Haiven Careers" <${mail.user}>`,
			to: RECIPIENTS,
			replyTo: values.email,
			subject: `Application: ${roleLabel} — ${values.name}`,
			text,
			html: wrapEmail(`New application: ${roleLabel}`, html),
			attachments,
		});
	} catch (error) {
		console.error("Careers application email failed:", error);
		return { success: false, message: RETRY_MESSAGE };
	}

	// The applicant's copy is a courtesy; their application is already in.
	const firstName = values.name.split(/\s+/)[0];
	try {
		await mail.transporter.sendMail({
			from: `"Haiven Careers" <${mail.user}>`,
			to: values.email,
			subject: `We've received your application: ${role.short}`,
			text: `Hi ${firstName},\n\nThank you for applying for ${roleLabel} at Haiven. We've received your application and CV.\n\nWe reply to every applicant, usually within 10 working days.\n\nThe Haiven team`,
			html: `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#14182B;font-size:15px;line-height:1.6">
          <p>Hi ${escapeHtml(firstName)},</p>
          <p>Thank you for applying for <strong>${escapeHtml(roleLabel)}</strong> at Haiven. We've received your application and CV.</p>
          <p>We reply to every applicant, usually within 10 working days.</p>
          <p>The Haiven team</p>
        </div>`,
		});
	} catch (error) {
		console.error("Careers confirmation email failed:", error);
	}

	return { success: true };
}

export async function joinTalentPool(
	formData: FormData,
): Promise<CareersResult> {
	if (!(await passesRecaptcha(formData)))
		return {
			success: false,
			message: "Security verification failed. Please refresh and try again.",
		};

	const values = Object.fromEntries(
		Object.entries(EMPTY_TALENT_POOL).map(([key, empty]) => [
			key,
			typeof empty === "boolean"
				? formData.get(key) === "true"
				: str(formData, key),
		]),
	) as unknown as TalentPoolValues;
	const cv = fileOrNull(formData, "cv");

	const errors = validateTalentPool(values, cv);
	if (Object.keys(errors).length)
		return { success: false, message: CHECK_FIELDS_MESSAGE, errors };

	const mail = getTransporter();
	if (!mail) {
		console.error("CAREERS_SMTP_HOST / CAREERS_SMTP_USER / CAREERS_SMTP_PASSWORD not set");
		return { success: false, message: RETRY_MESSAGE };
	}

	const { html, text } = renderRows([
		["Name", values.name],
		["Email", values.email],
		["Phone", `+234 ${values.phone}`],
		["Area of interest", values.area],
		["Consents to assessment", yesNo(values.consent1)],
		["Keep details for 12 months", yesNo(values.consent2)],
		["Submitted", new Date().toISOString()],
	]);

	try {
		await mail.transporter.sendMail({
			from: `"Haiven Careers" <${mail.user}>`,
			to: RECIPIENTS,
			replyTo: values.email,
			subject: `Talent pool: ${values.area} — ${values.name}`,
			text,
			html: wrapEmail("New talent pool sign-up", html),
			attachments: cv ? [await toAttachment(cv, "CV - ")] : [],
		});
	} catch (error) {
		console.error("Careers talent pool email failed:", error);
		return {
			success: false,
			message:
				"We couldn't send your details just now. Please try again in a few minutes.",
		};
	}

	return { success: true };
}
