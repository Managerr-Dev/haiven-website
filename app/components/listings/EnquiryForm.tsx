"use client";

import {
	ApiError,
	type ListingOffer,
	sendEnquiry,
	toApiError,
} from "@/app/(site)/listings/api";
import {
	type EnquiryValues,
	type FieldErrors,
	MAX_EMAIL,
	MAX_MESSAGE,
	MAX_NAME,
	splitApiError,
	validateEnquiry,
	withoutFields,
} from "@/app/(site)/listings/validation";
import {
	FieldError,
	labelClass,
	Optional,
	PhoneInput,
} from "@/app/components/careers/fields";
import { toE164, toNigerianMobile } from "@/app/lib/phone";
import { useState } from "react";
import {
	focusFirstError,
	MessageField,
	PrivacyNote,
	SentPanel,
	TextField,
} from "./form-fields";
import { Banner, primaryButton, Spinner } from "./ui";

const FIELDS = ["name", "email", "phone", "message"] as const;
const FOCUS_ORDER = FIELDS.map((key) => [key, `enq-${key}`] as [string, string]);

export default function EnquiryForm({
	offer,
	onGone,
	onSent,
}: {
	offer: ListingOffer;
	onGone: () => void;
	onSent: () => void;
}) {
	const [values, setValues] = useState<EnquiryValues>({
		name: "",
		email: "",
		phone: "",
		message: "",
	});
	const [submitted, setSubmitted] = useState(false);
	const [serverErrors, setServerErrors] = useState<FieldErrors>({});
	const [failure, setFailure] = useState<ApiError | null>(null);
	const [sending, setSending] = useState(false);
	const [sent, setSent] = useState(false);

	const err = { ...(submitted ? validateEnquiry(values) : {}), ...serverErrors };

	const set = (key: keyof EnquiryValues, value: string) => {
		setValues((v) => ({ ...v, [key]: value }));
		setServerErrors((errors) => withoutFields(errors, key));
	};

	const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		if (sending) return;
		setSubmitted(true);
		setFailure(null);
		setServerErrors({});

		const problems = validateEnquiry(values);
		if (Object.keys(problems).length > 0) {
			focusFirstError(problems, FOCUS_ORDER);
			return;
		}

		setSending(true);
		const phone = toNigerianMobile(values.phone);
		try {
			await sendEnquiry(offer.id, {
				name: values.name.trim(),
				email: values.email.trim(),
				...(phone ? { phone: toE164(phone) } : {}),
				...(values.message.trim() ? { message: values.message.trim() } : {}),
			});
			setSent(true);
			onSent();
		} catch (error) {
			const apiError = toApiError(error);
			if (apiError.status === 404) return onGone();
			setFailure(apiError);
			if (apiError.code === "validation_failed") {
				const { fields } = splitApiError(apiError, FIELDS);
				setServerErrors(fields);
				focusFirstError(fields, FOCUS_ORDER);
			}
		} finally {
			setSending(false);
		}
	};

	if (sent) {
		const host = offer.organization?.name || "The host";
		return (
			<SentPanel title="Enquiry sent">
				<p>
					{host} has your enquiry and will use the details you gave to get back
					to you at <strong>{values.email.trim()}</strong>.
				</p>
			</SentPanel>
		);
	}

	const banner =
		failure && splitApiError(failure, FIELDS).banner;

	return (
		<form noValidate onSubmit={onSubmit} className="flex flex-col gap-4">
			<TextField
				id="enq-name"
				label="Your name"
				required
				autoComplete="name"
				maxLength={MAX_NAME}
				error={err.name}
				value={values.name}
				onChange={(v) => set("name", v)}
			/>
			<TextField
				id="enq-email"
				type="email"
				label="Email address"
				required
				autoComplete="email"
				maxLength={MAX_EMAIL}
				error={err.email}
				value={values.email}
				onChange={(v) => set("email", v)}
			/>
			<div className="flex flex-col gap-2">
				<label htmlFor="enq-phone" className={labelClass}>
					Phone number <Optional />
				</label>
				<PhoneInput
					id="enq-phone"
					required={false}
					value={values.phone}
					onChange={(v) => set("phone", v)}
					invalid={!!err.phone}
				/>
				<FieldError message={err.phone} />
			</div>
			<MessageField
				id="enq-message"
				placeholder="For example, when you'd like to view it or move in."
				maxLength={MAX_MESSAGE}
				error={err.message}
				value={values.message}
				onChange={(v) => set("message", v)}
			/>
			{banner && (
				<Banner tone={failure.status === 429 ? "wait" : "error"}>{banner}</Banner>
			)}
			<button
				type="submit"
				disabled={sending}
				aria-busy={sending}
				className={primaryButton}
			>
				{sending && <Spinner />}
				{sending ? "Sending…" : "Send enquiry"}
			</button>
			<PrivacyNote />
		</form>
	);
}
