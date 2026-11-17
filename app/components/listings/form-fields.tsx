"use client";

import {
	borderFor,
	FieldError,
	inputClass,
	labelClass,
	Optional,
	Required,
} from "@/app/components/careers/fields";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export function TextField({
	id,
	label,
	required = false,
	error,
	value,
	onChange,
	type = "text",
	autoComplete,
	maxLength,
}: {
	id: string;
	label: string;
	required?: boolean;
	error?: string;
	value: string;
	onChange: (value: string) => void;
	type?: "text" | "email";
	autoComplete?: string;
	maxLength?: number;
}) {
	return (
		<div className="flex flex-col gap-2">
			<label htmlFor={id} className={labelClass}>
				{label} {required ? <Required /> : <Optional />}
			</label>
			<input
				id={id}
				type={type}
				autoComplete={autoComplete}
				maxLength={maxLength}
				aria-required={required || undefined}
				aria-invalid={!!error || undefined}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className={cn(inputClass, borderFor(!!error))}
			/>
			<FieldError message={error} />
		</div>
	);
}

export function MessageField({
	id,
	placeholder,
	error,
	value,
	onChange,
	maxLength,
}: {
	id: string;
	placeholder: string;
	error?: string;
	value: string;
	onChange: (value: string) => void;
	maxLength: number;
}) {
	return (
		<div className="flex flex-col gap-2">
			<label htmlFor={id} className={labelClass}>
				Message <Optional />
			</label>
			<textarea
				id={id}
				rows={3}
				maxLength={maxLength}
				placeholder={placeholder}
				aria-invalid={!!error || undefined}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className={cn(inputClass, borderFor(!!error), "resize-y leading-[1.55]")}
			/>
			<FieldError message={error} />
		</div>
	);
}

/** Moves to the first field with an error, following the form's visual order. */
export function focusFirstError(
	errors: Record<string, string>,
	order: readonly [key: string, elementId: string][],
) {
	const first = order.find(([key]) => errors[key]);
	if (!first) return;
	const element = document.getElementById(first[1]);
	element?.scrollIntoView({ behavior: "smooth", block: "center" });
	setTimeout(() => element?.focus({ preventScroll: true }), 300);
}

export function SentPanel({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div role="status" className="flex flex-col items-start gap-3 py-2">
			<span className="flex size-14 items-center justify-center rounded-full bg-[#E2F8EA]">
				<Check size={28} strokeWidth={2.6} className="text-[#00A347]" />
			</span>
			<h3 className="text-2xl font-extrabold tracking-[-0.02em] text-[#1B2E6B]">
				{title}
			</h3>
			<div className="flex flex-col gap-3 text-base leading-[1.6] text-[#262B3E]">
				{children}
			</div>
		</div>
	);
}

export function PrivacyNote() {
	return (
		<p className="text-[13px] leading-normal text-[#4A5168]">
			Your details go to the host of this listing so they can reply.{" "}
			<a
				href="/privacy-policy"
				target="_blank"
				rel="noopener"
				className="font-semibold text-[#1A4B8C] underline underline-offset-2"
			>
				How we handle your data
			</a>
		</p>
	);
}
