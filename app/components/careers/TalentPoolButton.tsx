"use client";

import { joinTalentPool } from "@/app/(site)/careers/actions";
import { TALENT_POOL_AREAS } from "@/app/(site)/careers/data";
import {
	EMPTY_TALENT_POOL,
	formatBytes,
	type TalentPoolValues,
	validateTalentPool,
} from "@/app/(site)/careers/validation";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import {
	borderFor,
	getRecaptchaToken,
	inputClass,
	PhoneInput,
	Required,
	Select,
} from "./fields";

const errorText = "text-sm font-medium text-[#B42318]";

export default function TalentPoolButton({
	className,
	children = "Join the talent pool",
}: {
	className?: string;
	children?: React.ReactNode;
}) {
	const [open, setOpen] = useState(false);
	return (
		<>
			<button
				type="button"
				onClick={() => setOpen(true)}
				className={
					className ??
					"cursor-pointer rounded-full bg-[#1B2E6B] px-[26px] py-4 text-base font-bold text-white hover:bg-[#1A4B8C] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#1A4B8C]"
				}
			>
				{children}
			</button>
			{open && <TalentPoolDialog onClose={() => setOpen(false)} />}
		</>
	);
}

function TalentPoolDialog({ onClose }: { onClose: () => void }) {
	const { executeRecaptcha } = useGoogleReCaptcha();
	const [values, setValues] = useState<TalentPoolValues>(EMPTY_TALENT_POOL);
	const [cv, setCv] = useState<File | null>(null);
	const [submitted, setSubmitted] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [done, setDone] = useState(false);
	const [serverMessage, setServerMessage] = useState("");
	const cvRef = useRef<HTMLInputElement>(null);
	const nameRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
		window.addEventListener("keydown", onKey);
		const overflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		nameRef.current?.focus();
		return () => {
			window.removeEventListener("keydown", onKey);
			document.body.style.overflow = overflow;
		};
	}, [onClose]);

	const set = <K extends keyof TalentPoolValues>(
		key: K,
		value: TalentPoolValues[K],
	) => setValues((v) => ({ ...v, [key]: value }));

	const err = submitted ? validateTalentPool(values, cv) : {};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (submitting) return;
		setSubmitted(true);
		setServerMessage("");
		if (Object.keys(validateTalentPool(values, cv)).length) return;

		setSubmitting(true);
		const fd = new FormData();
		for (const [key, value] of Object.entries(values))
			fd.append(key, String(value));
		if (cv) fd.append("cv", cv);
		try {
			fd.append(
				"recaptchaToken",
				await getRecaptchaToken(executeRecaptcha, "careers_talent_pool"),
			);
			const result = await joinTalentPool(fd);
			if (result.success) setDone(true);
			else setServerMessage(result.message);
		} catch (error) {
			console.error("Talent pool submit failed:", error);
			setServerMessage(
				"We couldn't send your details. Check your connection and try again.",
			);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div
			onClick={onClose}
			className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-[rgba(14,27,69,.55)] px-3 py-[clamp(12px,4vh,48px)]"
		>
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby="tp-title"
				onClick={(e) => e.stopPropagation()}
				className="relative w-full max-w-[560px] rounded-[22px] bg-white p-[clamp(22px,4vw,36px)] font-jakarta text-[#14182B]"
			>
				<button
					type="button"
					onClick={onClose}
					aria-label="Close"
					className="absolute right-4 top-4 flex size-10 cursor-pointer items-center justify-center rounded-full border border-[#D5DAE6] bg-white text-[#1B2E6B]"
				>
					<X size={14} strokeWidth={2.6} />
				</button>

				{done ? (
					<div role="status" className="flex flex-col gap-3 py-3">
						<span className="flex size-14 items-center justify-center rounded-full bg-[#E2F8EA]">
							<Check size={28} strokeWidth={2.6} className="text-[#00A347]" />
						</span>
						<h2 id="tp-title" className="mt-1 text-[26px] font-extrabold text-[#1B2E6B]">
							You&apos;re in our talent pool.
						</h2>
						<p className="text-base leading-[1.6] text-[#262B3E]">
							Thank you, {values.name.trim().split(/\s+/)[0] || "there"}.
							We&apos;ll contact you when a role fits.
						</p>
					</div>
				) : (
					<form noValidate onSubmit={onSubmit} className="flex flex-col gap-[18px]">
						<div className="pr-12">
							<h2 id="tp-title" className="mb-1.5 text-[26px] font-extrabold text-[#1B2E6B]">
								Don&apos;t see your role?
							</h2>
							<p className="text-[15px] leading-[1.55] text-[#363C52]">
								Leave your details and CV, and we&apos;ll contact you when
								something fits.
							</p>
						</div>

						<div className="flex flex-col gap-2">
							<label htmlFor="tp-name" className="text-[15px] font-semibold">
								Full name <Required />
							</label>
							<input
								ref={nameRef}
								id="tp-name"
								type="text"
								autoComplete="name"
								value={values.name}
								onChange={(e) => set("name", e.target.value)}
								aria-invalid={!!err.name || undefined}
								className={cn(inputClass, "min-h-[50px]", borderFor(!!err.name))}
							/>
							{err.name && <p role="alert" className={errorText}>{err.name}</p>}
						</div>

						<div className="flex flex-col gap-2">
							<label htmlFor="tp-email" className="text-[15px] font-semibold">
								Email address <Required />
							</label>
							<input
								id="tp-email"
								type="email"
								autoComplete="email"
								value={values.email}
								onChange={(e) => set("email", e.target.value)}
								aria-invalid={!!err.email || undefined}
								className={cn(inputClass, "min-h-[50px]", borderFor(!!err.email))}
							/>
							{err.email && <p role="alert" className={errorText}>{err.email}</p>}
						</div>

						<div className="flex flex-col gap-2">
							<label htmlFor="tp-phone" className="text-[15px] font-semibold">
								Phone number <Required />
							</label>
							<PhoneInput
								id="tp-phone"
								value={values.phone}
								onChange={(v) => set("phone", v)}
								invalid={!!err.phone}
							/>
							{err.phone && <p role="alert" className={errorText}>{err.phone}</p>}
						</div>

						<div className="flex flex-col gap-2">
							<label htmlFor="tp-area" className="text-[15px] font-semibold">
								Area of interest <Required />
							</label>
							<Select
								id="tp-area"
								value={values.area}
								onChange={(v) => set("area", v)}
								options={TALENT_POOL_AREAS}
								placeholder="Choose one"
								invalid={!!err.area}
								required
							/>
							{err.area && <p role="alert" className={errorText}>{err.area}</p>}
						</div>

						<div className="flex flex-col gap-2">
							<span className="text-[15px] font-semibold">
								CV <Required />
							</span>
							<div
								className={cn(
									"flex flex-wrap items-center justify-between gap-3 rounded-xl border-[1.5px] border-dashed px-4 py-3.5",
									err.cv ? "border-[#B42318]" : "border-[#B7BFD3]",
								)}
							>
								<span className="break-all text-sm text-[#363C52]">
									{cv
										? `${cv.name} · ${formatBytes(cv.size)}`
										: "PDF, DOC or DOCX, up to 5 MB"}
								</span>
								<button
									type="button"
									onClick={() => cvRef.current?.click()}
									className="cursor-pointer rounded-full border-[1.5px] border-[#1A4B8C] bg-white px-4 py-[9px] text-sm font-bold text-[#1A4B8C]"
								>
									Choose a file
								</button>
								<input
									ref={cvRef}
									type="file"
									accept=".pdf,.doc,.docx"
									onChange={(e) => {
										setCv(e.target.files?.[0] ?? null);
										e.target.value = "";
									}}
									tabIndex={-1}
									aria-hidden="true"
									className="hidden"
								/>
							</div>
							{err.cv && <p role="alert" className={errorText}>{err.cv}</p>}
						</div>

						<label className="flex cursor-pointer items-start gap-3 text-sm leading-[1.55]">
							<input
								type="checkbox"
								checked={values.consent1}
								onChange={(e) => set("consent1", e.target.checked)}
								className="mt-px size-5 shrink-0 accent-[#1A4B8C]"
							/>
							<span>
								I agree that Haiven (Managerr Solutions Limited) may use the
								information I&apos;ve provided to assess my application, in line
								with the Nigeria Data Protection Act 2023. <Required />
							</span>
						</label>
						<label className="flex cursor-pointer items-start gap-3 text-sm leading-[1.55]">
							<input
								type="checkbox"
								checked={values.consent2}
								onChange={(e) => set("consent2", e.target.checked)}
								className="mt-px size-5 shrink-0 accent-[#1A4B8C]"
							/>
							<span>
								Keep my details for 12 months and consider me for other Haiven
								roles and programmes, including the Certified Caretaker
								programme. <Required />
							</span>
						</label>
						{err.consent && <p role="alert" className={errorText}>{err.consent}</p>}
						<a
							href="/privacy-policy"
							target="_blank"
							rel="noopener"
							className="text-sm font-semibold text-[#1A4B8C] hover:text-[#1B2E6B]"
						>
							How we handle your data
						</a>

						{serverMessage && (
							<p role="alert" className="rounded-xl bg-[#FDECEA] px-4 py-3 text-sm font-semibold text-[#8A1C12]">
								{serverMessage}
							</p>
						)}

						<button
							type="submit"
							disabled={submitting}
							aria-busy={submitting}
							className="flex cursor-pointer items-center justify-center gap-3 rounded-full bg-[#00C853] p-4 text-base font-bold text-[#0E1B45] hover:bg-[#00B84C] disabled:opacity-75"
						>
							{submitting && (
								<span
									aria-hidden="true"
									className="inline-block size-[18px] animate-spin rounded-full border-[2.5px] border-[rgba(14,27,69,.25)] border-t-[#0E1B45]"
								/>
							)}
							{submitting ? "Sending…" : "Join the talent pool"}
						</button>
					</form>
				)}
			</div>
		</div>
	);
}
