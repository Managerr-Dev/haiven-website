import type { RoleSlug } from "./data";

/**
 * Field rules for the careers forms. The browser runs these for instant
 * feedback; the server action runs them again before anything is emailed.
 */

export const MAX_FILE_BYTES = 5 * 1024 * 1024;
export const MAX_PHOTOS = 4;
/** Mail servers commonly cap messages near 25 MB once attachments are base64-encoded. */
export const MAX_TOTAL_ATTACHMENT_BYTES = 15 * 1024 * 1024;

const CV_EXTENSIONS = ["pdf", "doc", "docx"];

export interface ApplicationValues {
	name: string;
	email: string;
	phone: string;
	area: string;
	exp: string;
	linkedin: string;
	start: string;
	heard: string;
	fmAnswer: string;
	fmKnows: string;
	fmKnowsText: string;
	techRole: string;
	growthRole: string;
	deal: string;
	gradYear: string;
	nysc: string;
	nyscMonth: string;
	upset: string;
	consent1: boolean;
	consent2: boolean;
}

export const EMPTY_APPLICATION: ApplicationValues = {
	name: "",
	email: "",
	phone: "",
	area: "",
	exp: "",
	linkedin: "",
	start: "",
	heard: "",
	fmAnswer: "",
	fmKnows: "",
	fmKnowsText: "",
	techRole: "",
	growthRole: "",
	deal: "",
	gradYear: "",
	nysc: "",
	nyscMonth: "",
	upset: "",
	consent1: false,
	consent2: false,
};

export interface TalentPoolValues {
	name: string;
	email: string;
	phone: string;
	area: string;
	consent1: boolean;
	consent2: boolean;
}

export const EMPTY_TALENT_POOL: TalentPoolValues = {
	name: "",
	email: "",
	phone: "",
	area: "",
	consent1: false,
	consent2: false,
};

export const countWords = (s: string) =>
	s.trim().split(/\s+/).filter(Boolean).length;

export const isEmail = (e: string) => /^\S+@\S+\.\S+$/.test(e.trim());

export const formatBytes = (b: number) =>
	b > 1048576
		? `${(b / 1048576).toFixed(1)} MB`
		: `${Math.max(1, Math.round(b / 1024))} KB`;

/** Returns an error message for a CV file, or undefined when it's fine. */
export function checkCv(file: { name: string; size: number } | null) {
	if (!file || file.size === 0)
		return "Attach your CV so we can review your experience.";
	const ext = (file.name.split(".").pop() || "").toLowerCase();
	if (!CV_EXTENSIONS.includes(ext))
		return "That file type won’t work. Upload your CV as a PDF, DOC or DOCX file.";
	if (file.size > MAX_FILE_BYTES)
		return `That file is ${formatBytes(file.size)}. Upload a CV under 5 MB.`;
	return undefined;
}

export function validateApplication(
	v: ApplicationValues,
	slug: RoleSlug,
): Record<string, string> {
	const e: Record<string, string> = {};
	if (!v.name.trim()) e.name = "Add your full name so we know who is applying.";
	if (!v.email.trim())
		e.email = "Add your email address so we can reply to you.";
	else if (!isEmail(v.email))
		e.email = "That email address looks incomplete. Check it and try again.";
	const digits = v.phone.replace(/\D/g, "");
	if (!digits) e.phone = "Add your phone number so we can call you.";
	else if (digits.length < 10)
		e.phone =
			"That phone number looks too short. Use 10 digits after +234, for example 803 123 4567.";
	if (!v.area) e.area = "Choose the area you live in.";
	if (!v.exp) e.exp = "Choose your years of relevant experience.";
	if (!v.start) e.start = "Tell us when you could start.";

	if (slug === "facility-manager") {
		const n = countWords(v.fmAnswer);
		if (!n)
			e.fmAnswer =
				"Tell us about one building you ran and the hardest problem you solved there.";
		else if (n > 200)
			e.fmAnswer = `Keep this to 200 words. You're at ${n}.`;
	}
	if (slug === "field-technician" && !v.techRole)
		e.techRole = "Choose Lead or Trainee so we assess you for the right role.";
	if (slug === "growth-executive") {
		if (!v.growthRole)
			e.growthRole =
				"Choose Senior or Executive so we assess you for the right role.";
		if (!v.deal.trim()) e.deal = "Tell us about the best deal you closed.";
	}
	if (slug === "customer-success-associate") {
		if (!v.gradYear) e.gradYear = "Choose the year you graduated.";
		if (!v.nysc) e.nysc = "Tell us your NYSC status.";
		else if (v.nysc === "Currently serving" && !v.nyscMonth)
			e.nyscMonth = "Choose the month your service ends.";
		const n = countWords(v.upset);
		if (!n)
			e.upset =
				"Tell us about a time you fixed a problem for someone who was upset.";
		else if (n > 150) e.upset = `Keep this to 150 words. You're at ${n}.`;
	}

	if (!v.consent1)
		e.consent1 = "Tick this box so we can assess your application.";
	return e;
}

export function validateTalentPool(
	v: TalentPoolValues,
	cv: { name: string; size: number } | null,
): Record<string, string> {
	const e: Record<string, string> = {};
	if (!v.name.trim()) e.name = "Add your full name.";
	if (!v.email.trim()) e.email = "Add your email address so we can contact you.";
	else if (!isEmail(v.email)) e.email = "That email address looks incomplete.";
	if (!v.phone.replace(/\D/g, ""))
		e.phone = "Add your phone number so we can call you.";
	if (!v.area) e.area = "Choose the area that interests you most.";
	const cvError = cv ? checkCv(cv) : "Attach your CV.";
	if (cvError) e.cv = cvError;
	if (!v.consent1 || !v.consent2)
		e.consent = "Tick both boxes so we can keep your details on file.";
	return e;
}
