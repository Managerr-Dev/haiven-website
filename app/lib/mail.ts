/**
 * Shared server-side mail helpers for the site's form submissions
 * (careers applications, HLBC registrations).
 *
 * Sends through the SMTP account configured by the CAREERS_SMTP_* env vars.
 */

import nodemailer from "nodemailer";
import { verifyRecaptcha } from "@/app/lib/recaptcha";

export function getTransporter() {
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

/** `label` names the form in the error log, e.g. "Careers". */
export async function passesRecaptcha(formData: FormData, label: string) {
	// Skipped only where reCAPTCHA isn't configured (e.g. local development).
	if (!process.env.RECAPTCHA_SECRET_KEY) return true;
	const token = formData.get("recaptchaToken");
	if (typeof token !== "string" || !token) return false;
	const result = await verifyRecaptcha(token);
	if (!result.success) console.error(`${label} reCAPTCHA failed:`, result.error);
	return result.success;
}

export const escapeHtml = (s: string) =>
	s
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");

/** Label/value rows rendered as a simple email table; empty values are skipped. */
export function renderRows(rows: [string, string][]) {
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

export function wrapEmail(heading: string, rowsHtml: string) {
	return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#14182B">
      <h2 style="color:#1B2E6B;margin:0 0 16px">${escapeHtml(heading)}</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">${rowsHtml}</table>
    </div>`;
}

export const yesNo = (b: boolean) => (b ? "Yes" : "No");
