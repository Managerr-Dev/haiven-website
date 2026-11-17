"use client";

import {
	ApiError,
	fetchAvailability,
	type ListingOffer,
	sendBookingRequest,
	toApiError,
} from "@/app/(site)/listings/api";
import {
	addDays,
	AVAILABILITY_WINDOW_DAYS,
	blockedNights,
	diffDays,
	firstBookableDay,
	formatDay,
	todayInZone,
	type StayRules,
} from "@/app/(site)/listings/dates";
import { money, plural } from "@/app/(site)/listings/format";
import {
	type BookingValues,
	type FieldErrors,
	MAX_EMAIL,
	MAX_MESSAGE,
	MAX_NAME,
	splitApiError,
	validateBooking,
	withoutFields,
} from "@/app/(site)/listings/validation";
import {
	FieldError,
	labelClass,
	PhoneInput,
	Required,
} from "@/app/components/careers/fields";
import { toE164, toNigerianMobile } from "@/app/lib/phone";
import { useCallback, useMemo, useState } from "react";
import {
	focusFirstError,
	MessageField,
	PrivacyNote,
	SentPanel,
	TextField,
} from "./form-fields";
import StayCalendar, { type StayDates, StayCalendarSkeleton } from "./StayCalendar";
import { Banner, primaryButton, secondaryButton, Spinner } from "./ui";
import { useRemote } from "./useRemote";

const FIELDS = [
	"check_in_on",
	"nights",
	"guest_name",
	"guest_email",
	"guest_phone",
	"message",
] as const;

const FOCUS_ORDER: [string, string][] = [
	["check_in_on", "book-dates"],
	["nights", "book-dates"],
	["guest_name", "book-name"],
	["guest_email", "book-email"],
	["guest_phone", "book-phone"],
	["message", "book-message"],
];

/** The guest can't fix these by changing the form. */
const CLOSED_CODES = ["shortlet_offering_unavailable", "module_unavailable"];

function DateSummary({ label, day }: { label: string; day: string | null }) {
	return (
		<div className="min-w-0 flex-1 rounded-[10px] bg-[#F5F7FA] px-3 py-2.5">
			<div className="text-[13px] font-semibold text-[#4A5168]">{label}</div>
			<div className="text-[15px] font-bold text-[#14182B]">
				{day ? formatDay(day) : "Add date"}
			</div>
		</div>
	);
}

function CostLine({ label, amount }: { label: string; amount: string }) {
	return (
		<div className="flex justify-between gap-3">
			<span>{label}</span>
			<span className="font-semibold text-[#14182B]">{amount}</span>
		</div>
	);
}

function StayEstimate({
	offer,
	nights,
}: {
	offer: ListingOffer;
	nights: number;
}) {
	const cleaning = offer.cleaning_fee ?? 0;
	const deposit = offer.caution_deposit ?? 0;
	const stay = offer.price * nights;
	return (
		<div className="flex flex-col gap-2.5 rounded-2xl bg-[#F5F7FA] px-4 py-3.5 text-sm text-[#363C52]">
			<h3 className="text-[13px] font-bold uppercase tracking-[.06em] text-[#4A5168]">
				Estimated costs
			</h3>
			<CostLine
				label={`${money(offer.price, offer.currency)} × ${plural(nights, "night")}`}
				amount={money(stay, offer.currency)}
			/>
			{cleaning > 0 && (
				<CostLine label="Cleaning fee" amount={money(cleaning, offer.currency)} />
			)}
			{deposit > 0 && (
				<CostLine
					label="Caution deposit"
					amount={money(deposit, offer.currency)}
				/>
			)}
			<div className="flex justify-between gap-3">
				<span>Service charge</span>
				<span>Added if approved</span>
			</div>
			<div className="flex justify-between gap-3 border-t border-dashed border-[#C9CFDD] pt-2.5">
				<span className="font-semibold">Estimate before service charge</span>
				<span className="font-bold text-[#14182B]">
					{money(stay + cleaning + deposit, offer.currency)}
				</span>
			</div>
			<p className="text-[13px] leading-normal text-[#4A5168]">
				This is not the final amount. Your payment link will show the full total.
			</p>
		</div>
	);
}

export default function BookingRequestForm({
	offer,
	onGone,
	onSent,
}: {
	offer: ListingOffer;
	onGone: () => void;
	onSent: () => void;
}) {
	const [{ today, firstDay }] = useState(() => {
		const now = new Date();
		return {
			today: todayInZone(now),
			firstDay: firstBookableDay(now, offer.check_in_time),
		};
	});
	const windowEnd = addDays(today, AVAILABILITY_WINDOW_DAYS);

	const loadAvailability = useCallback(
		(signal: AbortSignal) =>
			fetchAvailability(offer.offering_id, today, windowEnd, signal),
		[offer.offering_id, today, windowEnd],
	);
	const availability = useRemote(loadAvailability);

	const rules = useMemo<StayRules>(
		() => ({
			blocked: blockedNights(availability.data ?? [], today, windowEnd),
			minNights: Math.max(offer.min_nights ?? 1, 1),
			firstDay,
			lastDay: windowEnd,
		}),
		[availability.data, offer.min_nights, today, windowEnd, firstDay],
	);

	const [dates, setDates] = useState<StayDates>({ checkIn: null, checkOut: null });
	const [values, setValues] = useState<BookingValues>({
		guest_name: "",
		guest_email: "",
		guest_phone: "",
		message: "",
	});
	const [submitted, setSubmitted] = useState(false);
	const [serverErrors, setServerErrors] = useState<FieldErrors>({});
	const [failure, setFailure] = useState<ApiError | null>(null);
	const [closed, setClosed] = useState(false);
	const [sending, setSending] = useState(false);
	const [sent, setSent] = useState(false);

	const err = {
		...(submitted ? validateBooking(values, dates) : {}),
		...serverErrors,
	};
	const dateError = err.check_in_on ?? err.nights;
	const nights =
		dates.checkIn && dates.checkOut
			? diffDays(dates.checkIn, dates.checkOut)
			: null;

	const set = (key: keyof BookingValues, value: string) => {
		setValues((v) => ({ ...v, [key]: value }));
		setServerErrors((errors) => withoutFields(errors, key));
	};

	const changeDates = (next: StayDates) => {
		setDates(next);
		setFailure(null);
		setServerErrors((errors) => withoutFields(errors, "check_in_on", "nights"));
	};

	const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		if (sending || closed) return;
		setSubmitted(true);
		setFailure(null);
		setServerErrors({});

		const problems = validateBooking(values, dates);
		if (Object.keys(problems).length > 0 || !dates.checkIn || !nights) {
			focusFirstError(problems, FOCUS_ORDER);
			return;
		}

		setSending(true);
		const phone = toNigerianMobile(values.guest_phone);
		try {
			await sendBookingRequest(offer.offering_id, {
				check_in_on: dates.checkIn,
				nights,
				guest_name: values.guest_name.trim(),
				guest_email: values.guest_email.trim(),
				guest_phone: phone ? toE164(phone) : values.guest_phone.trim(),
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
			} else if (apiError.code === "dates_unavailable") {
				// Someone else got there first: show the current calendar.
				setDates({ checkIn: null, checkOut: null });
				availability.retry();
			} else if (apiError.code && CLOSED_CODES.includes(apiError.code)) {
				setClosed(true);
			}
		} finally {
			setSending(false);
		}
	};

	if (sent && dates.checkIn && dates.checkOut) {
		const host = offer.organization?.name || "The host";
		return (
			<SentPanel title="Request sent">
				<p>
					{host} will review your request for{" "}
					<strong>
						{formatDay(dates.checkIn)} to {formatDay(dates.checkOut)}
					</strong>
					. If they approve it, we&apos;ll email a link to{" "}
					<strong>{values.guest_email.trim()}</strong> so you can pay.
				</p>
				<p>
					This request doesn&apos;t hold the dates, and you haven&apos;t been
					charged anything.
				</p>
			</SentPanel>
		);
	}

	const banner = failure && splitApiError(failure, FIELDS).banner;

	return (
		<form noValidate onSubmit={onSubmit} className="flex flex-col gap-4">
			<div
				id="book-dates"
				tabIndex={-1}
				className="flex scroll-mt-28 flex-col gap-3 outline-none"
			>
				<span className={labelClass}>
					Your dates <Required />
				</span>
				<div className="flex gap-2">
					<DateSummary label="Check-in" day={dates.checkIn} />
					<DateSummary label="Check-out" day={dates.checkOut} />
				</div>
				{availability.loading ? (
					<StayCalendarSkeleton />
				) : availability.error ? (
					<div className="flex flex-col items-start gap-3">
						<Banner tone={availability.error.status === 429 ? "wait" : "error"}>
							{availability.error.status === 404
								? "These dates can't be checked because this stay is no longer offered."
								: availability.error.message}
						</Banner>
						{availability.error.status !== 404 && (
							<button
								type="button"
								onClick={availability.retry}
								className={secondaryButton}
							>
								Check availability again
							</button>
						)}
					</div>
				) : (
					<StayCalendar dates={dates} rules={rules} onChange={changeDates} />
				)}
				{(dates.checkIn || dates.checkOut) && (
					<button
						type="button"
						onClick={() => changeDates({ checkIn: null, checkOut: null })}
						className="cursor-pointer self-start text-sm font-bold text-[#1A4B8C] underline underline-offset-4"
					>
						Clear dates
					</button>
				)}
				<FieldError message={dateError} />
			</div>

			{nights !== null && <StayEstimate offer={offer} nights={nights} />}

			<TextField
				id="book-name"
				label="Your name"
				required
				autoComplete="name"
				maxLength={MAX_NAME}
				error={err.guest_name}
				value={values.guest_name}
				onChange={(v) => set("guest_name", v)}
			/>
			<TextField
				id="book-email"
				type="email"
				label="Email address"
				required
				autoComplete="email"
				maxLength={MAX_EMAIL}
				error={err.guest_email}
				value={values.guest_email}
				onChange={(v) => set("guest_email", v)}
			/>
			<div className="flex flex-col gap-2">
				<label htmlFor="book-phone" className={labelClass}>
					Phone number <Required />
				</label>
				<PhoneInput
					id="book-phone"
					value={values.guest_phone}
					onChange={(v) => set("guest_phone", v)}
					invalid={!!err.guest_phone}
				/>
				<FieldError message={err.guest_phone} />
			</div>
			<MessageField
				id="book-message"
				placeholder="For example, what time you expect to arrive."
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
				disabled={sending || closed}
				aria-busy={sending}
				className={primaryButton}
			>
				{sending && <Spinner />}
				{sending ? "Sending…" : "Send booking request"}
			</button>
			<p className="text-[13px] leading-normal text-[#4A5168]">
				You won&apos;t pay anything now, and sending this request doesn&apos;t
				hold the dates. The host reviews it first and, if they approve it,
				we&apos;ll email you a link to pay.
			</p>
			<PrivacyNote />
		</form>
	);
}
