"use client";

import { useRef, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { getRecaptchaToken } from "@/app/components/careers/fields";
import { registerForPool } from "../actions";
import { ACCESSORIES, BUYER_TYPES, STATES } from "../data";
import { MAX_QTY, readRegistration, validateRegistration } from "../validation";
import { ctaClass, mono } from "./styles";

const labelClass = "flex flex-col gap-1.5 text-sm font-bold";
const fieldClass =
	"h-[50px] rounded-xl border-[1.5px] border-[#D5DAE8] bg-white px-3.5 text-base font-medium text-haiven-blue outline-none focus:border-haiven-blue";
const checkLabel =
	"col-span-full flex cursor-pointer items-start gap-3 text-[15px] leading-[1.45] font-medium";
const checkbox = "m-0 h-[22px] w-[22px] flex-none accent-[#00873A]";

const Optional = ({ children = "Optional" }: { children?: string }) => (
	<span className="font-medium text-[#4A5584]">{children}</span>
);

const RegisterForm = () => {
	const { executeRecaptcha } = useGoogleReCaptcha();
	const errorRef = useRef<HTMLParagraphElement>(null);
	const [error, setError] = useState("");
	const [submitting, setSubmitting] = useState(false);
	// Set once registered; holds the first name for the thank-you message.
	const [registered, setRegistered] = useState<string | null>(null);

	const showError = (message: string) => {
		setError(message);
		requestAnimationFrame(() => errorRef.current?.focus());
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (submitting) return;
		const fd = new FormData(e.currentTarget);
		const values = readRegistration(fd);

		const problem = validateRegistration(values);
		if (problem) return showError(problem);

		setError("");
		setSubmitting(true);
		try {
			fd.set(
				"recaptchaToken",
				await getRecaptchaToken(executeRecaptcha, "hlbc_register"),
			);
			const result = await registerForPool(fd);
			if (result.success) setRegistered(values.name.split(/\s+/)[0] || "there");
			else showError(result.message);
		} catch (err) {
			console.error("HLBC registration submit failed:", err);
			showError(
				"We couldn't send your registration. Check your connection and try again.",
			);
		} finally {
			setSubmitting(false);
		}
	};

	if (registered !== null) {
		return (
			<div className="flex flex-col gap-3.5 py-3" role="status">
				<span
					aria-hidden="true"
					className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-green text-[28px] font-extrabold"
				>
					✓
				</span>
				<h3 className="m-0 text-[30px] font-extrabold tracking-[-0.03em]">
					You’re on the list, {registered}.
				</h3>
				<p className="m-0 text-[17px] leading-[1.55] text-[#3A4573]">
					We’ll message you on WhatsApp when your pool opens for payment.
					Nothing to pay until then.
				</p>
				<button
					type="button"
					onClick={() => setRegistered(null)}
					className="cursor-pointer self-start bg-transparent p-0 text-[15px] font-bold text-[#00873A] underline"
				>
					Register another
				</button>
			</div>
		);
	}

	return (
		<form
			onSubmit={onSubmit}
			noValidate
			className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-x-4 gap-y-[18px]"
		>
			<label className={labelClass}>
				Full name
				<input name="name" autoComplete="name" required className={fieldClass} />
			</label>
			<label className={labelClass}>
				WhatsApp number
				<input
					name="whatsapp"
					type="tel"
					autoComplete="tel"
					placeholder="0801 234 5678"
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
			<label className={labelClass}>
				I am a
				<select name="buyer" defaultValue="" required className={fieldClass}>
					<option value="" disabled>
						Select…
					</option>
					{BUYER_TYPES.map((o) => (
						<option key={o.value} value={o.value}>
							{o.label}
						</option>
					))}
				</select>
			</label>
			<label className={labelClass}>
				Single-phase meters
				<input
					name="qtySingle"
					type="number"
					inputMode="numeric"
					min={0}
					max={MAX_QTY}
					className={`${fieldClass} ${mono} font-bold`}
				/>
			</label>
			<label className={labelClass}>
				Three-phase meters
				<input
					name="qtyThree"
					type="number"
					inputMode="numeric"
					min={0}
					max={MAX_QTY}
					className={`${fieldClass} ${mono} font-bold`}
				/>
			</label>
			<label className={`${labelClass} col-span-full`}>
				<span>
					Boxes or breakers <Optional>Optional, quoted separately on request</Optional>
				</span>
				<select name="accessories" defaultValue="none" className={fieldClass}>
					{ACCESSORIES.map((o) => (
						<option key={o.value} value={o.value}>
							{o.label}
						</option>
					))}
				</select>
			</label>
			<label className={labelClass}>
				Delivery state
				<select name="state" defaultValue="" required className={fieldClass}>
					<option value="" disabled>
						Select…
					</option>
					{STATES.map((s) => (
						<option key={s} value={s}>
							{s}
						</option>
					))}
				</select>
			</label>
			<label className={labelClass}>
				City or town
				<input
					name="city"
					autoComplete="address-level2"
					required
					className={fieldClass}
				/>
			</label>
			<label className={labelClass}>
				<span>
					Property or estate <Optional />
				</span>
				<input name="property" className={fieldClass} />
			</label>
			<label className={labelClass}>
				<span>
					Referred by <Optional />
				</span>
				<input name="referral" className={fieldClass} />
			</label>
			<label className={checkLabel}>
				<input name="terms" type="checkbox" required className={checkbox} />
				<span>I have read and agree to the HLBC Customer Terms and Conditions.</span>
			</label>
			<label className={checkLabel}>
				<input name="consent" type="checkbox" required className={checkbox} />
				<span>
					I agree that Haiven may use these details to manage my registration
					and contact me about HLBC pools.
				</span>
			</label>

			{error && (
				<p
					ref={errorRef}
					tabIndex={-1}
					role="alert"
					className="col-span-full m-0 rounded-[10px] bg-[#FDECEA] px-3.5 py-3 text-[15px] font-semibold text-[#B3261E] outline-none"
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
			<p className="col-span-full m-0 text-center text-[13px] text-[#4A5584]">
				Registration is free and non-binding.
			</p>
		</form>
	);
};

export default RegisterForm;
