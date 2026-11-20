"use client";

import { useRef, useState } from "react";
import { BUYER_TYPES, MAX_GROUP_ORDER, type MeterType, STATES } from "../data";
import { type RegisteredLine, submitRegistration } from "../lib/register";
import {
	isSpecialOrder,
	MAX_QTY,
	parseQty,
	readRegistration,
	validateRegistration,
} from "../validation";
import CopyButton from "./CopyButton";
import { useOrder } from "./OrderContext";
import { ctaClass } from "./styles";

const labelClass = "flex flex-col gap-2 text-sm font-bold";
const fieldClass =
	"h-[52px] rounded-[14px] border-2 border-[rgba(19,36,126,0.12)] bg-white px-4 text-base font-semibold text-haiven-blue outline-none focus:border-haiven-blue";
const checkCard =
	"flex cursor-pointer items-center gap-2.5 rounded-[14px] border-2 border-[rgba(19,36,126,0.12)] px-4 py-3 text-[15px] font-semibold";
const consentLabel =
	"col-span-full flex cursor-pointer items-start gap-3 text-[15px] leading-[1.45] font-medium";
const checkbox = "m-0 h-5 w-5 flex-none accent-haiven-blue";

const Optional = ({ children = "(optional)" }: { children?: string }) => (
	<span className="font-medium text-[#4A5480]">{children}</span>
);

type Registered = {
	firstName: string;
	reference: string;
	isSpecialOrder: boolean;
	lines: RegisteredLine[];
};

const phaseName = (phase: MeterType) => (phase === "single" ? "single-phase" : "three-phase");
const metersText = (l: RegisteredLine) =>
	`${l.quantity.toLocaleString("en-NG")} ${phaseName(l.phase)} meter${l.quantity === 1 ? "" : "s"}`;

const Success = ({ r, onReset }: { r: Registered; onReset: () => void }) => {
	const grouped = r.lines.filter((l) => l.group);
	const waiting = r.lines.filter((l) => !l.group);

	return (
		<div className="flex flex-col gap-4" role="status">
			<p className="m-0 text-[13px] font-bold tracking-[0.16em] text-[#00873A]">
				{r.isSpecialOrder ? "SPECIAL ORDER RECEIVED" : "YOU’RE REGISTERED"}
			</p>
			<h3 className="m-0 text-[30px] leading-tight font-extrabold tracking-[-0.03em]">
				{r.isSpecialOrder
					? `Thanks, ${r.firstName}.`
					: `Welcome to the group, ${r.firstName}.`}
			</h3>

			{r.isSpecialOrder ? (
				<p className="m-0 text-base leading-[1.6] text-[#4A5480]">
					Your order is over {MAX_GROUP_ORDER.toLocaleString("en-NG")} meters, so
					we’ll handle it as a special order, outside the group. Our team will
					contact you on WhatsApp about pricing.
				</p>
			) : (
				<>
					{grouped.length > 0 && (
						<p className="m-0 text-base leading-[1.6] font-semibold">
							{grouped
								.map((l) => `${metersText(l)} in group purchase ${l.group}`)
								.join(" and ")}
							.
						</p>
					)}
					{waiting.length > 0 && (
						<p className="m-0 text-base leading-[1.6] font-semibold">
							No {waiting.map((l) => phaseName(l.phase)).join(" or ")} group is
							open right now. We’ll add your{" "}
							{waiting.map(metersText).join(" and ")} to the next one and message
							you when it opens.
						</p>
					)}
					<ol className="m-0 flex flex-col gap-1.5 pl-5 text-base leading-[1.6] text-[#4A5480]">
						<li>When the group closes, Haiven sends your provisional price and payment date.</li>
						<li>You pay 50% within 7 days of that notice. Nothing is due before then.</li>
						<li>The balance and courier are paid before dispatch.</li>
					</ol>
					<p className="m-0 text-[15px] text-[#4A5480]">
						Share this with other landlords and developers. Every meter that joins
						brings the price down for everyone.
					</p>
				</>
			)}

			<div className="flex items-center justify-between gap-3 rounded-[10px] bg-[#F5F7FA] py-2 pr-2 pl-3.5 text-sm text-[#4A5480]">
				<p className="m-0">
					Your reference:{" "}
					<strong className="font-jetbrains text-haiven-blue">{r.reference}</strong>
				</p>
				<CopyButton value={r.reference} label="reference" />
			</div>
			<button
				type="button"
				onClick={onReset}
				className="cursor-pointer self-start border-none bg-transparent p-0 text-[15px] font-bold text-[#00873A] underline"
			>
				Register another
			</button>
		</div>
	);
};

const RegisterForm = () => {
	const { qty, setQty, reset } = useOrder();
	const errorRef = useRef<HTMLParagraphElement>(null);
	const [error, setError] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [registered, setRegistered] = useState<Registered | null>(null);

	const special = isSpecialOrder({
		qtySingle: parseQty(qty.single),
		qtyThree: parseQty(qty.three),
	});

	const showError = (message: string) => {
		setError(message);
		requestAnimationFrame(() => errorRef.current?.focus());
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (submitting) return;
		const values = readRegistration(new FormData(e.currentTarget));

		const problem = validateRegistration(values);
		if (problem) return showError(problem);

		setError("");
		setSubmitting(true);
		try {
			const result = await submitRegistration(values);
			if (result.success)
				setRegistered({
					firstName: values.name.split(/\s+/)[0] || "friend",
					reference: result.reference,
					isSpecialOrder: result.isSpecialOrder,
					lines: result.lines,
				});
			else showError(result.message);
		} catch (err) {
			console.error("HLBC registration submit failed:", err);
			showError("We couldn't send your registration. Check your connection and try again.");
		} finally {
			setSubmitting(false);
		}
	};

	if (registered)
		return (
			<Success
				r={registered}
				onReset={() => {
					setRegistered(null);
					reset();
				}}
			/>
		);

	const qtyInput = (type: MeterType, name: string, title: string) => (
		<label className={labelClass}>
			{title}
			<input
				name={name}
				type="number"
				inputMode="numeric"
				min={0}
				max={MAX_QTY}
				placeholder="0"
				value={qty[type]}
				onChange={(e) => setQty(type, e.target.value)}
				className={`${fieldClass} font-jetbrains font-bold`}
			/>
		</label>
	);

	return (
		<form
			onSubmit={onSubmit}
			noValidate
			className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-x-4 gap-y-[18px]"
		>
			<label className={`${labelClass} col-span-full`}>
				Full name
				<input name="name" autoComplete="name" required className={fieldClass} />
			</label>
			<label className={labelClass}>
				WhatsApp number
				<input
					name="whatsapp"
					type="tel"
					autoComplete="tel"
					placeholder="080 0000 0000"
					required
					className={fieldClass}
				/>
			</label>
			<label className={labelClass}>
				<span>
					Email <Optional />
				</span>
				<input name="email" type="email" autoComplete="email" className={fieldClass} />
			</label>
			<label className={`${labelClass} col-span-full`}>
				I am a
				<select name="buyer" defaultValue="" required className={`${fieldClass} px-3.5`}>
					<option value="" disabled>
						Choose one
					</option>
					{BUYER_TYPES.map((o) => (
						<option key={o.value} value={o.value}>
							{o.label}
						</option>
					))}
				</select>
			</label>
			{qtyInput("single", "qtySingle", "Single-phase meters")}
			{qtyInput("three", "qtyThree", "Three-phase meters")}
			{special && (
				<p
					role="status"
					className="col-span-full m-0 rounded-[10px] bg-[#E8EBF5] px-3.5 py-3 text-[15px] leading-[1.45] font-semibold"
				>
					Over {MAX_GROUP_ORDER.toLocaleString("en-NG")} meters? We’ll treat this as
					a special order, outside the group, and contact you directly about
					pricing.
				</p>
			)}
			<div className="col-span-full flex flex-col gap-2">
				<span className="text-sm font-bold">
					Optional accessories <Optional>(quoted separately)</Optional>
				</span>
				<div className="flex flex-wrap gap-3">
					<label className={checkCard}>
						<input name="boxes" type="checkbox" className={checkbox} />
						Meter boxes
					</label>
					<label className={checkCard}>
						<input name="breakers" type="checkbox" className={checkbox} />
						Circuit breakers
					</label>
				</div>
			</div>
			<label className={labelClass}>
				Delivery state
				<select name="state" defaultValue="" required className={`${fieldClass} px-3.5`}>
					<option value="" disabled>
						Choose state
					</option>
					{STATES.map((s) => (
						<option key={s} value={s}>
							{s}
						</option>
					))}
				</select>
			</label>
			<label className={labelClass}>
				City or area
				<input name="city" autoComplete="address-level2" required className={fieldClass} />
			</label>
			<label className={`${labelClass} col-span-full`}>
				<span>
					Property or estate name <Optional />
				</span>
				<input name="property" className={fieldClass} />
			</label>
			<label className={`${labelClass} col-span-full`}>
				<span>
					Referred by <Optional />
				</span>
				<input
					name="referral"
					placeholder="Name or code of who told you about HLBC"
					className={fieldClass}
				/>
			</label>
			<label className={consentLabel}>
				<input name="terms" type="checkbox" required className={`${checkbox} mt-px h-[22px] w-[22px]`} />
				<span>
					I agree to the HLBC Customer Terms and Conditions. I understand
					registration is free and does not confirm an order or a final price.
				</span>
			</label>
			<label className={consentLabel}>
				<input name="consent" type="checkbox" required className={`${checkbox} mt-px h-[22px] w-[22px]`} />
				<span>
					I consent to Haiven Smart Systems Limited using my details to manage my
					HLBC registration, group notices, invoicing and delivery, and to contact
					me about it by WhatsApp, phone or email.
				</span>
			</label>

			{error && (
				<p
					ref={errorRef}
					tabIndex={-1}
					role="alert"
					className="col-span-full m-0 rounded-[10px] bg-[#FDECEA] px-3.5 py-3 text-[15px] font-semibold text-[#B42318] outline-none"
				>
					{error}
				</p>
			)}

			<button
				type="submit"
				disabled={submitting}
				className={`${ctaClass} col-span-full h-[58px] cursor-pointer justify-center border-none text-lg disabled:cursor-wait disabled:opacity-70`}
			>
				{submitting ? "Registering…" : "Register free →"}
			</button>
		</form>
	);
};

export default RegisterForm;
