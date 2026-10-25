"use client";

import { cn } from "@/lib/utils";
import { AlertCircle, ChevronDown } from "lucide-react";

export const RED = "#B42318";

/**
 * A reCAPTCHA token, or "" when there's no provider on the page (no site key,
 * e.g. local dev). The server action decides whether a token is required.
 */
export async function getRecaptchaToken(
	execute: ((action?: string) => Promise<string>) | undefined,
	action: string,
) {
	try {
		return execute ? await execute(action) : "";
	} catch {
		return "";
	}
}

export const labelClass = "text-[15px] font-semibold text-[#14182B]";

export const inputClass =
	"w-full min-h-[52px] rounded-[10px] border-[1.5px] bg-white px-4 py-3 text-base text-[#14182B] outline-none focus:shadow-[0_0_0_3px_rgba(26,75,140,.25)]";

export const borderFor = (invalid: boolean) =>
	invalid ? "border-[#B42318]" : "border-[#C9CFDD]";

export function Required() {
	return (
		<span aria-hidden="true" className="text-[#B42318]">
			*
		</span>
	);
}

export function Optional() {
	return <span className="font-normal text-[#4A5168]">(optional)</span>;
}

export function FieldError({
	message,
	className,
}: {
	message?: string;
	className?: string;
}) {
	if (!message) return null;
	return (
		<p
			role="alert"
			className={cn(
				"m-0 flex items-start gap-2 text-sm font-medium leading-[1.45] text-[#B42318]",
				className,
			)}
		>
			<AlertCircle size={16} strokeWidth={2.2} className="mt-0.5 shrink-0" />
			{message}
		</p>
	);
}

export function Select({
	id,
	value,
	onChange,
	options,
	placeholder,
	invalid = false,
	required = false,
}: {
	id: string;
	value: string;
	onChange: (value: string) => void;
	options: readonly string[];
	placeholder: string;
	invalid?: boolean;
	required?: boolean;
}) {
	return (
		<div className="relative">
			<select
				id={id}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				aria-required={required || undefined}
				aria-invalid={invalid || undefined}
				className={cn(inputClass, borderFor(invalid), "appearance-none pr-11")}
			>
				<option value="">{placeholder}</option>
				{options.map((o) => (
					<option key={o} value={o}>
						{o}
					</option>
				))}
			</select>
			<ChevronDown
				size={18}
				strokeWidth={2}
				className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#1B2E6B]"
			/>
		</div>
	);
}

export function PhoneInput({
	id,
	value,
	onChange,
	invalid = false,
	describedBy,
}: {
	id: string;
	value: string;
	onChange: (value: string) => void;
	invalid?: boolean;
	describedBy?: string;
}) {
	return (
		<div className="flex gap-2">
			<span className="flex min-h-[52px] shrink-0 items-center rounded-[10px] border-[1.5px] border-[#C9CFDD] bg-[#F5F7FA] px-3.5 font-semibold text-[#14182B]">
				+234
			</span>
			<input
				id={id}
				type="tel"
				inputMode="tel"
				autoComplete="tel-national"
				placeholder="803 123 4567"
				aria-required="true"
				aria-invalid={invalid || undefined}
				aria-describedby={describedBy}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className={cn(inputClass, borderFor(invalid), "min-w-0 flex-1")}
			/>
		</div>
	);
}
