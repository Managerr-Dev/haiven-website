"use client";

import { submitApplication } from "@/app/(site)/careers/actions";
import {
	AREAS,
	EQUIPMENT,
	EXPERIENCE,
	GRAD_YEARS,
	GROWTH_ROLES,
	HEARD_OPTIONS,
	NYSC_MONTHS,
	NYSC_OPTIONS,
	type RoleSlug,
	START_OPTIONS,
	TECH_ROLES,
} from "@/app/(site)/careers/data";
import {
	type ApplicationValues,
	checkCv,
	countWords,
	EMPTY_APPLICATION,
	formatBytes,
	MAX_FILE_BYTES,
	MAX_PHOTOS,
	validateApplication,
} from "@/app/(site)/careers/validation";
import { cn } from "@/lib/utils";
import { AlertCircle, Check, Clock, Lock, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import {
	borderFor,
	FieldError,
	getRecaptchaToken,
	inputClass,
	labelClass,
	Optional,
	PhoneInput,
	RED,
	Required,
	Select,
} from "./fields";

/** Error keys in the order their fields appear, so we can jump to the first. */
const FIELD_ORDER = [
	"name",
	"email",
	"phone",
	"area",
	"exp",
	"cv",
	"start",
	"fmAnswer",
	"techRole",
	"growthRole",
	"deal",
	"gradYear",
	"nysc",
	"nyscMonth",
	"upset",
	"consent1",
];
const RADIO_KEYS = new Set(["techRole", "growthRole", "nysc"]);

/** Phone photos are often several MB; shrink them so the email stays small. */
async function shrinkPhoto(file: File): Promise<File> {
	if (file.size < 1.5 * 1024 * 1024) return file;
	try {
		const bitmap = await createImageBitmap(file);
		const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
		const canvas = document.createElement("canvas");
		canvas.width = Math.round(bitmap.width * scale);
		canvas.height = Math.round(bitmap.height * scale);
		canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
		const blob = await new Promise<Blob | null>((resolve) =>
			canvas.toBlob(resolve, "image/jpeg", 0.82),
		);
		if (!blob || blob.size >= file.size) return file;
		return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", {
			type: "image/jpeg",
		});
	} catch {
		return file;
	}
}

function ChoiceCard({
	id,
	name,
	label,
	sub,
	checked,
	invalid,
	onSelect,
}: {
	id: string;
	name: string;
	label: string;
	sub: string;
	checked: boolean;
	invalid: boolean;
	onSelect: () => void;
}) {
	return (
		<label
			className={cn(
				"flex cursor-pointer items-start gap-3 rounded-xl border-[1.5px] px-[18px] py-4",
				checked
					? "border-[#1A4B8C] bg-[#F0F3FA]"
					: cn(borderFor(invalid), "bg-white"),
			)}
		>
			<input
				id={id}
				type="radio"
				name={name}
				checked={checked}
				onChange={onSelect}
				className="mt-0.5 size-[18px] shrink-0 accent-[#1A4B8C]"
			/>
			<span>
				<span className="block text-base font-bold text-[#14182B]">{label}</span>
				<span className="mt-0.5 block text-sm text-[#4A5168]">{sub}</span>
			</span>
		</label>
	);
}

function ChoicePill({
	id,
	name,
	label,
	checked,
	invalid,
	onSelect,
}: {
	id?: string;
	name: string;
	label: string;
	checked: boolean;
	invalid: boolean;
	onSelect: () => void;
}) {
	return (
		<label
			className={cn(
				"flex min-h-12 cursor-pointer items-center gap-2.5 rounded-[10px] border-[1.5px] px-[18px] text-base font-semibold text-[#14182B]",
				checked
					? "border-[#1A4B8C] bg-[#F0F3FA]"
					: cn(borderFor(invalid), "bg-white"),
			)}
		>
			<input
				id={id}
				type="radio"
				name={name}
				checked={checked}
				onChange={onSelect}
				className="m-0 size-[18px] accent-[#1A4B8C]"
			/>
			{label}
		</label>
	);
}

export default function ApplicationForm({
	slug,
	roleTitle,
	roleShort,
	closesLabel,
}: {
	slug: RoleSlug;
	roleTitle: string;
	roleShort: string;
	closesLabel: string;
}) {
	const { executeRecaptcha } = useGoogleReCaptcha();
	const [values, setValues] = useState<ApplicationValues>(EMPTY_APPLICATION);
	const [equipment, setEquipment] = useState<string[]>([]);
	const [cv, setCv] = useState<File | null>(null);
	const [cvPickError, setCvPickError] = useState("");
	const [drag, setDrag] = useState(false);
	const [photos, setPhotos] = useState<File[]>([]);
	const [photoErr, setPhotoErr] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [success, setSuccess] = useState(false);
	const [serverMessage, setServerMessage] = useState("");
	const cvRef = useRef<HTMLInputElement>(null);
	const photoRef = useRef<HTMLInputElement>(null);

	const set = <K extends keyof ApplicationValues>(
		key: K,
		value: ApplicationValues[K],
	) => setValues((v) => ({ ...v, [key]: value }));

	const allErrors = (): Record<string, string> => {
		const e = validateApplication(values, slug);
		const cvError = checkCv(cv);
		if (cvError) e.cv = cvError;
		return e;
	};
	const err = submitted ? allErrors() : {};
	const cvErr = cvPickError || err.cv;
	const errorCount = Object.keys(err).length;

	const pickCv = (file?: File) => {
		if (!file) return;
		const problem = checkCv(file);
		if (problem) {
			setCv(null);
			setCvPickError(problem);
		} else {
			setCv(file);
			setCvPickError("");
		}
	};

	const addPhotos = async (files: File[]) => {
		let msg = "";
		const ok = files.filter((f) => {
			if (!f.type.startsWith("image/")) {
				msg = "Only image files can be added here.";
				return false;
			}
			if (f.size > MAX_FILE_BYTES) {
				msg = `${f.name} is over 5 MB. Choose a smaller photo.`;
				return false;
			}
			return true;
		});
		let all = [...photos, ...(await Promise.all(ok.map(shrinkPhoto)))];
		if (all.length > MAX_PHOTOS) {
			msg = "You can add up to 4 photos. We kept the first 4.";
			all = all.slice(0, MAX_PHOTOS);
		}
		setPhotos(all);
		setPhotoErr(msg);
	};

	const scrollToApply = () =>
		document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });

	const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		if (submitting) return;
		setSubmitted(true);
		setServerMessage("");

		const errors = allErrors();
		const first = FIELD_ORDER.find((k) => errors[k]);
		if (first) {
			const id =
				first === "cv"
					? "fld-cv-btn"
					: `fld-${first}${RADIO_KEYS.has(first) ? "-0" : ""}`;
			const el = document.getElementById(id);
			el?.scrollIntoView({ behavior: "smooth", block: "center" });
			setTimeout(() => el?.focus({ preventScroll: true }), 400);
			return;
		}

		setSubmitting(true);
		const fd = new FormData();
		fd.append("role", slug);
		for (const [key, value] of Object.entries(values))
			fd.append(key, String(value));
		for (const item of equipment) fd.append("equipment", item);
		if (cv) fd.append("cv", cv);
		for (const photo of photos) fd.append("photos", photo);
		try {
			fd.append(
				"recaptchaToken",
				await getRecaptchaToken(executeRecaptcha, "careers_application"),
			);
			const result = await submitApplication(fd);
			if (result.success) {
				setSuccess(true);
				setTimeout(scrollToApply, 50);
			} else {
				setServerMessage(result.message);
			}
		} catch (error) {
			// Typically the request body was rejected for size, or the network dropped.
			console.error("Application submit failed:", error);
			setServerMessage(
				"We couldn't send your application. Check your connection and try again. If it keeps failing, try a smaller CV.",
			);
		} finally {
			setSubmitting(false);
		}
	};

	const firstName = values.name.trim().split(/\s+/)[0];
	const fmWords = countWords(values.fmAnswer);
	const upsetWords = countWords(values.upset);

	return (
		<>
			<section
				id="apply"
				className="mt-6 scroll-mt-[90px] bg-[#F5F7FA] py-[clamp(48px,6vw,80px)]"
			>
				<div className="mx-auto max-w-[1200px] px-[clamp(16px,2vw,24px)]">
					<div className="rounded-3xl border border-[#E3E7F0] bg-white p-[clamp(24px,4vw,56px)]">
						{success ? (
							<div
								role="status"
								className="flex max-w-[680px] flex-col items-start gap-4 py-4"
							>
								<span className="flex size-16 items-center justify-center rounded-full bg-[#E2F8EA]">
									<Check size={32} strokeWidth={2.6} className="text-[#00A347]" />
								</span>
								<h2 className="mt-1.5 text-[clamp(28px,3vw,36px)] font-extrabold tracking-[-0.02em] text-[#1B2E6B]">
									Application received.
								</h2>
								<p className="text-lg leading-[1.65] text-[#262B3E]">
									Thank you, {firstName}. We&apos;ve sent a confirmation to{" "}
									<strong>{values.email.trim()}</strong>. We reply to every
									applicant, usually within 10 working days.
								</p>
								<button
									type="button"
									onClick={() =>
										document
											.getElementById("other-roles")
											?.scrollIntoView({ behavior: "smooth" })
									}
									className="mt-1.5 cursor-pointer text-[17px] font-bold text-[#1A4B8C] underline underline-offset-4"
								>
									See other open roles
								</button>
							</div>
						) : (
							<form
								noValidate
								onSubmit={onSubmit}
								className="flex flex-wrap gap-x-[72px] gap-y-10"
							>
								<div className="max-w-[340px] flex-[1_1_260px]">
									<h2 className="mb-3 text-[clamp(28px,3vw,36px)] font-extrabold tracking-[-0.02em] text-[#1B2E6B]">
										Apply for this role
									</h2>
									<p className="mb-[18px] flex items-center gap-2 text-[15px] font-semibold text-[#1A4B8C]">
										<Clock size={18} strokeWidth={2} />
										About 10 minutes
									</p>
									<p className="text-[15px] leading-[1.6] text-[#4A5168]">
										Fields marked{" "}
										<span className="font-bold text-[#B42318]">*</span> are
										required. Have your CV ready as a PDF, DOC or DOCX file.
									</p>
								</div>

								<div className="flex max-w-[680px] flex-[2_1_440px] flex-col gap-6">
									<SectionLabel>Your details</SectionLabel>

									<div className="flex flex-col gap-2">
										<label htmlFor="fld-name" className={labelClass}>
											Full name <Required />
										</label>
										<input
											id="fld-name"
											type="text"
											autoComplete="name"
											aria-required="true"
											aria-invalid={!!err.name || undefined}
											value={values.name}
											onChange={(e) => set("name", e.target.value)}
											className={cn(inputClass, borderFor(!!err.name))}
										/>
										<FieldError message={err.name} />
									</div>

									<div className="flex flex-col gap-2">
										<label htmlFor="fld-email" className={labelClass}>
											Email address <Required />
										</label>
										<input
											id="fld-email"
											type="email"
											autoComplete="email"
											aria-required="true"
											aria-invalid={!!err.email || undefined}
											value={values.email}
											onChange={(e) => set("email", e.target.value)}
											className={cn(inputClass, borderFor(!!err.email))}
										/>
										<FieldError message={err.email} />
									</div>

									<div className="flex flex-col gap-2">
										<label htmlFor="fld-phone" className={labelClass}>
											Phone number <Required />
										</label>
										<PhoneInput
											id="fld-phone"
											value={values.phone}
											onChange={(v) => set("phone", v)}
											invalid={!!err.phone}
											describedBy="hint-phone"
										/>
										<p id="hint-phone" className="text-sm text-[#4A5168]">
											WhatsApp is fine.
										</p>
										<FieldError message={err.phone} />
									</div>

									<div className="flex flex-col gap-2">
										<label htmlFor="fld-area" className={labelClass}>
											Where do you live? <Required />
										</label>
										<Select
											id="fld-area"
											value={values.area}
											onChange={(v) => set("area", v)}
											options={AREAS}
											placeholder="Choose an area"
											invalid={!!err.area}
											required
										/>
										<FieldError message={err.area} />
									</div>

									<SectionLabel className="mt-4">Your experience</SectionLabel>

									<div className="flex flex-col gap-2">
										<label htmlFor="fld-role" className={labelClass}>
											Role
										</label>
										<div className="relative">
											<input
												id="fld-role"
												type="text"
												readOnly
												value={roleTitle}
												className="min-h-[52px] w-full rounded-[10px] border-[1.5px] border-[#E3E7F0] bg-[#F5F7FA] py-3 pl-4 pr-11 text-base text-[#363C52] outline-none"
											/>
											<Lock
												size={18}
												className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4A5168]"
											/>
										</div>
									</div>

									<div className="flex flex-col gap-2">
										<label htmlFor="fld-exp" className={labelClass}>
											Years of relevant experience <Required />
										</label>
										<Select
											id="fld-exp"
											value={values.exp}
											onChange={(v) => set("exp", v)}
											options={EXPERIENCE}
											placeholder="Choose one"
											invalid={!!err.exp}
											required
										/>
										<FieldError message={err.exp} />
									</div>

									<div className="flex flex-col gap-2">
										<span id="lbl-cv" className={labelClass}>
											CV <Required />
										</span>
										<div
											aria-labelledby="lbl-cv"
											onDragOver={(e) => {
												e.preventDefault();
												setDrag(true);
											}}
											onDragLeave={() => setDrag(false)}
											onDrop={(e) => {
												e.preventDefault();
												setDrag(false);
												pickCv(e.dataTransfer.files[0]);
											}}
											className="rounded-[14px] border-2 border-dashed p-[22px] transition-colors"
											style={{
												borderColor: drag
													? "#1A4B8C"
													: cvErr
														? RED
														: cv
															? "#7FD9A3"
															: "#B7BFD3",
												background: drag ? "#E8EBF5" : cv ? "#F3FCF6" : "#FAFBFD",
											}}
										>
											{cv ? (
												<div className="flex flex-wrap items-center gap-3.5">
													<span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#E2F8EA]">
														<Check size={18} strokeWidth={2.6} className="text-[#00A347]" />
													</span>
													<div className="min-w-40 flex-1">
														<div className="break-all text-[15px] font-semibold text-[#14182B]">
															{cv.name}
														</div>
														<div className="text-sm text-[#4A5168]">
															{formatBytes(cv.size)} · Attached
														</div>
													</div>
													<div className="flex gap-4">
														<button
															type="button"
															onClick={() => cvRef.current?.click()}
															className="cursor-pointer py-1 text-[15px] font-bold text-[#1A4B8C] underline"
														>
															Replace
														</button>
														<button
															type="button"
															onClick={() => setCv(null)}
															className="cursor-pointer py-1 text-[15px] font-bold text-[#1A4B8C] underline"
														>
															Remove
														</button>
													</div>
												</div>
											) : (
												<div className="flex flex-col items-center gap-2.5 py-2 text-center">
													<Upload size={32} strokeWidth={1.8} className="text-[#1A4B8C]" />
													<p className="text-base text-[#14182B]">
														Drag your CV here, or
													</p>
													<button
														id="fld-cv-btn"
														type="button"
														onClick={() => cvRef.current?.click()}
														className="cursor-pointer rounded-full border-[1.5px] border-[#1A4B8C] bg-white px-5 py-[11px] text-[15px] font-bold text-[#1A4B8C] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#1A4B8C]"
													>
														Choose a file
													</button>
													<p className="text-sm text-[#4A5168]">
														PDF, DOC or DOCX, up to 5 MB
													</p>
												</div>
											)}
											<input
												ref={cvRef}
												type="file"
												accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
												onChange={(e) => {
													pickCv(e.target.files?.[0]);
													e.target.value = "";
												}}
												tabIndex={-1}
												aria-hidden="true"
												className="hidden"
											/>
										</div>
										<FieldError message={cvErr} />
									</div>

									<div className="flex flex-col gap-2">
										<label htmlFor="fld-linkedin" className={labelClass}>
											LinkedIn profile <Optional />
										</label>
										<input
											id="fld-linkedin"
											type="url"
											placeholder="linkedin.com/in/your-name"
											value={values.linkedin}
											onChange={(e) => set("linkedin", e.target.value)}
											className={cn(inputClass, borderFor(false))}
										/>
									</div>

									<div className="flex flex-col gap-2">
										<label htmlFor="fld-start" className={labelClass}>
											When could you start? <Required />
										</label>
										<Select
											id="fld-start"
											value={values.start}
											onChange={(v) => set("start", v)}
											options={START_OPTIONS}
											placeholder="Choose one"
											invalid={!!err.start}
											required
										/>
										<FieldError message={err.start} />
									</div>

									<div className="flex flex-col gap-2">
										<label htmlFor="fld-heard" className={labelClass}>
											How did you hear about this role?
										</label>
										<Select
											id="fld-heard"
											value={values.heard}
											onChange={(v) => set("heard", v)}
											options={HEARD_OPTIONS}
											placeholder="Choose one"
										/>
									</div>

									<SectionLabel className="mt-4">About this role</SectionLabel>

									{slug === "facility-manager" && (
										<>
											<div className="flex flex-col gap-2">
												<label
													htmlFor="fld-fmAnswer"
													className={cn(labelClass, "leading-[1.45]")}
												>
													Tell us about one building you ran, and the hardest
													problem you solved there. <Required />
												</label>
												<textarea
													id="fld-fmAnswer"
													rows={7}
													aria-required="true"
													aria-invalid={!!err.fmAnswer || undefined}
													aria-describedby="wc-fm"
													value={values.fmAnswer}
													onChange={(e) => set("fmAnswer", e.target.value)}
													className={cn(
														inputClass,
														borderFor(!!err.fmAnswer),
														"resize-y leading-[1.55]",
													)}
												/>
												<WordCount id="wc-fm" count={fmWords} max={200} />
												<FieldError message={err.fmAnswer} />
											</div>
											<fieldset className="flex flex-col gap-2.5">
												<legend
													className={cn(labelClass, "mb-2.5 leading-[1.45]")}
												>
													Do you manage, or know owners of, properties that
													might want Haiven? <Optional />
												</legend>
												<div className="flex flex-wrap gap-2.5">
													{["Yes", "No"].map((o) => (
														<ChoicePill
															key={o}
															name="fmKnows"
															label={o}
															checked={values.fmKnows === o}
															invalid={false}
															onSelect={() => set("fmKnows", o)}
														/>
													))}
												</div>
												{values.fmKnows === "Yes" && (
													<>
														<label
															htmlFor="fld-fmKnowsText"
															className="mt-1.5 text-sm font-semibold text-[#14182B]"
														>
															Tell us briefly about them
														</label>
														<input
															id="fld-fmKnowsText"
															type="text"
															placeholder="For example: 3 apartment blocks in Ajah, owner is a friend"
															value={values.fmKnowsText}
															onChange={(e) => set("fmKnowsText", e.target.value)}
															className={cn(inputClass, borderFor(false))}
														/>
													</>
												)}
												<p className="text-[13px] text-[#4A5168]">
													Optional. It doesn&apos;t affect your application.
												</p>
											</fieldset>
										</>
									)}

									{slug === "field-technician" && (
										<>
											<fieldset>
												<legend className={cn(labelClass, "mb-2.5")}>
													Which role? <Required />
												</legend>
												<div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2.5">
													{TECH_ROLES.map((o, i) => (
														<ChoiceCard
															key={o.value}
															id={`fld-techRole-${i}`}
															name="techRole"
															label={o.label}
															sub={o.sub}
															checked={values.techRole === o.value}
															invalid={!!err.techRole}
															onSelect={() => set("techRole", o.value)}
														/>
													))}
												</div>
												<FieldError message={err.techRole} className="mt-2" />
											</fieldset>

											<div className="flex flex-col gap-2">
												<span className={labelClass}>
													Photos of past installations <Optional />
												</span>
												<div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border-[1.5px] border-dashed border-[#B7BFD3] px-[18px] py-4">
													<span className="text-sm text-[#4A5168]">
														Up to 4 images, 5 MB each
													</span>
													<button
														type="button"
														onClick={() => photoRef.current?.click()}
														className="cursor-pointer rounded-full border-[1.5px] border-[#1A4B8C] bg-white px-[18px] py-2.5 text-[15px] font-bold text-[#1A4B8C]"
													>
														Add photos
													</button>
													<input
														ref={photoRef}
														type="file"
														accept="image/*"
														multiple
														onChange={(e) => {
															const files = [...(e.target.files ?? [])];
															e.target.value = "";
															addPhotos(files);
														}}
														tabIndex={-1}
														aria-hidden="true"
														className="hidden"
													/>
												</div>
												{photos.length > 0 && (
													<ul className="flex flex-wrap gap-2">
														{photos.map((p, i) => (
															<li
																key={`${p.name}-${i}`}
																className="flex items-center gap-2 rounded-full bg-[#E8EBF5] py-1.5 pl-3.5 pr-1.5 text-sm font-semibold text-[#1B2E6B]"
															>
																{p.name}
																<button
																	type="button"
																	aria-label={`Remove ${p.name}`}
																	onClick={() => {
																		setPhotos((ps) => ps.filter((_, j) => j !== i));
																		setPhotoErr("");
																	}}
																	className="flex size-[26px] cursor-pointer items-center justify-center rounded-full bg-white"
																>
																	<X size={12} strokeWidth={2.6} />
																</button>
															</li>
														))}
													</ul>
												)}
												{photoErr && (
													<p role="alert" className="text-sm font-medium text-[#B42318]">
														{photoErr}
													</p>
												)}
											</div>

											<fieldset>
												<legend className={cn(labelClass, "mb-2.5")}>
													Equipment you&apos;ve worked on
												</legend>
												<div className="flex flex-wrap gap-2.5">
													{EQUIPMENT.map((item) => {
														const on = equipment.includes(item);
														return (
															<label
																key={item}
																className={cn(
																	"flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full border-[1.5px] px-4 text-[15px] font-semibold text-[#14182B]",
																	on
																		? "border-[#1A4B8C] bg-[#F0F3FA]"
																		: "border-[#C9CFDD] bg-white",
																)}
															>
																<input
																	type="checkbox"
																	checked={on}
																	onChange={() =>
																		setEquipment((list) =>
																			on
																				? list.filter((x) => x !== item)
																				: [...list, item],
																		)
																	}
																	className="m-0 size-[18px] accent-[#1A4B8C]"
																/>
																{item}
															</label>
														);
													})}
												</div>
											</fieldset>
										</>
									)}

									{slug === "growth-executive" && (
										<>
											<fieldset>
												<legend className={cn(labelClass, "mb-2.5")}>
													Which role? <Required />
												</legend>
												<div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2.5">
													{GROWTH_ROLES.map((o, i) => (
														<ChoiceCard
															key={o.value}
															id={`fld-growthRole-${i}`}
															name="growthRole"
															label={o.label}
															sub={o.sub}
															checked={values.growthRole === o.value}
															invalid={!!err.growthRole}
															onSelect={() => set("growthRole", o.value)}
														/>
													))}
												</div>
												<FieldError message={err.growthRole} className="mt-2" />
											</fieldset>
											<div className="flex flex-col gap-2">
												<label htmlFor="fld-deal" className={labelClass}>
													The best deal you ever closed, in three sentences.{" "}
													<Required />
												</label>
												<textarea
													id="fld-deal"
													rows={5}
													aria-required="true"
													aria-invalid={!!err.deal || undefined}
													value={values.deal}
													onChange={(e) => set("deal", e.target.value)}
													className={cn(
														inputClass,
														borderFor(!!err.deal),
														"resize-y leading-[1.55]",
													)}
												/>
												<FieldError message={err.deal} />
											</div>
										</>
									)}

									{slug === "customer-success-associate" && (
										<>
											<div className="flex flex-col gap-2">
												<label htmlFor="fld-gradYear" className={labelClass}>
													Year of graduation <Required />
												</label>
												<Select
													id="fld-gradYear"
													value={values.gradYear}
													onChange={(v) => set("gradYear", v)}
													options={GRAD_YEARS}
													placeholder="Choose a year"
													invalid={!!err.gradYear}
													required
												/>
												<FieldError message={err.gradYear} />
											</div>
											<fieldset className="flex flex-col gap-2.5">
												<legend className={cn(labelClass, "mb-2.5")}>
													NYSC status <Required />
												</legend>
												<div className="flex flex-wrap gap-2.5">
													{NYSC_OPTIONS.map((o, i) => (
														<ChoicePill
															key={o}
															id={`fld-nysc-${i}`}
															name="nysc"
															label={o}
															checked={values.nysc === o}
															invalid={!!err.nysc}
															onSelect={() => set("nysc", o)}
														/>
													))}
												</div>
												<FieldError message={err.nysc} />
												{values.nysc === "Currently serving" && (
													<>
														<label
															htmlFor="fld-nyscMonth"
															className="mt-1 text-sm font-semibold text-[#14182B]"
														>
															Your service ends in <Required />
														</label>
														<div className="max-w-[320px]">
															<Select
																id="fld-nyscMonth"
																value={values.nyscMonth}
																onChange={(v) => set("nyscMonth", v)}
																options={NYSC_MONTHS}
																placeholder="Choose a month"
																invalid={!!err.nyscMonth}
																required
															/>
														</div>
														<FieldError message={err.nyscMonth} />
													</>
												)}
											</fieldset>
											<div className="flex flex-col gap-2">
												<label htmlFor="fld-upset" className={labelClass}>
													A time you fixed a problem for someone who was upset.{" "}
													<Required />
												</label>
												<textarea
													id="fld-upset"
													rows={6}
													aria-required="true"
													aria-invalid={!!err.upset || undefined}
													aria-describedby="wc-upset"
													value={values.upset}
													onChange={(e) => set("upset", e.target.value)}
													className={cn(
														inputClass,
														borderFor(!!err.upset),
														"resize-y leading-[1.55]",
													)}
												/>
												<WordCount id="wc-upset" count={upsetWords} max={150} />
												<FieldError message={err.upset} />
											</div>
										</>
									)}

									<div className="mt-3 flex flex-col gap-3.5 border-t border-[#EEF0F5] pt-6">
										<label className="flex cursor-pointer items-start gap-3.5 text-[15px] leading-[1.55] text-[#14182B]">
											<input
												id="fld-consent1"
												type="checkbox"
												aria-required="true"
												aria-invalid={!!err.consent1 || undefined}
												checked={values.consent1}
												onChange={(e) => set("consent1", e.target.checked)}
												className="mt-px size-[22px] shrink-0 accent-[#1A4B8C]"
											/>
											<span>
												I agree that Haiven (Managerr Solutions Limited) may use
												the information I&apos;ve provided to assess my
												application, in line with the Nigeria Data Protection Act
												2023. <Required />
											</span>
										</label>
										<FieldError message={err.consent1} className="ml-9" />
										<label className="flex cursor-pointer items-start gap-3.5 text-[15px] leading-[1.55] text-[#14182B]">
											<input
												type="checkbox"
												checked={values.consent2}
												onChange={(e) => set("consent2", e.target.checked)}
												className="mt-px size-[22px] shrink-0 accent-[#1A4B8C]"
											/>
											<span>
												Keep my details for 12 months and consider me for other
												Haiven roles and programmes, including the Certified
												Caretaker programme.
											</span>
										</label>
										<a
											href="/privacy-policy"
											target="_blank"
											rel="noopener"
											className="ml-9 text-sm font-semibold text-[#1A4B8C] hover:text-[#1B2E6B]"
										>
											How we handle your data
										</a>
									</div>

									{(errorCount > 0 || serverMessage) && (
										<div
											role="alert"
											className="flex items-start gap-2.5 rounded-xl bg-[#FDECEA] px-[18px] py-3.5 text-[15px] font-semibold text-[#8A1C12]"
										>
											<AlertCircle size={18} strokeWidth={2.2} className="mt-0.5 shrink-0" />
											{errorCount > 0
												? errorCount === 1
													? "Check 1 field above. It says what’s missing."
													: `Check ${errorCount} fields above. Each one says what’s missing.`
												: serverMessage}
										</div>
									)}

									<button
										type="submit"
										disabled={submitting}
										aria-busy={submitting}
										className="flex w-full cursor-pointer items-center justify-center gap-3 self-start rounded-full bg-[#00C853] px-9 py-[18px] text-[17px] font-bold text-[#0E1B45] hover:bg-[#00B84C] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#1A4B8C] disabled:opacity-75 min-[1080px]:w-auto"
									>
										{submitting && (
											<span
												aria-hidden="true"
												className="inline-block size-[18px] animate-spin rounded-full border-[2.5px] border-[rgba(14,27,69,.25)] border-t-[#0E1B45]"
											/>
										)}
										{submitting ? "Submitting…" : "Submit application"}
									</button>
								</div>
							</form>
						)}
					</div>
				</div>
			</section>

			{!success && (
				<>
					<div className="fixed inset-x-0 bottom-0 z-45 flex items-center gap-3.5 border-t border-[#E3E7F0] bg-white px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(27,46,107,.1)] min-[1080px]:hidden">
						<div className="min-w-0 flex-1">
							<div className="truncate text-sm font-bold text-[#1B2E6B]">
								{roleShort}
							</div>
							<div className="text-[13px] text-[#4A5168]">
								Closes {closesLabel}
							</div>
						</div>
						<button
							type="button"
							onClick={scrollToApply}
							className="shrink-0 cursor-pointer rounded-full bg-[#00C853] px-[26px] py-3.5 text-base font-bold text-[#0E1B45]"
						>
							Apply now
						</button>
					</div>
					{/* Keeps the fixed bar from covering the bottom of the footer. */}
					<style>{"@media (max-width:1079px){body{padding-bottom:76px}}"}</style>
				</>
			)}
		</>
	);
}

function SectionLabel({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<h3
			className={cn(
				"text-[13px] font-bold uppercase tracking-[.08em] text-[#4A5168]",
				className,
			)}
		>
			{children}
		</h3>
	);
}

function WordCount({ id, count, max }: { id: string; count: number; max: number }) {
	return (
		<p
			id={id}
			aria-live="polite"
			className="text-right text-sm font-semibold"
			style={{ color: count > max ? RED : "#4A5168" }}
		>
			{count} / {max} words
		</p>
	);
}
