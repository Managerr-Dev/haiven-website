"use client";

import type { SelectOption } from "../../data";

const labelClass =
	"mb-[7px] block text-[13.5px] font-semibold text-[#16234A]";
const controlClass =
	"w-full rounded-[10px] border border-[#D7DDEE] bg-white px-3.5 py-3 text-[15px] text-[#16234A] outline-none focus-visible:border-[#1B2E6B]";
const errorClass = "mt-1.5 block text-[13px] text-[#C0392B]";

export function FieldError({ message }: { message?: string }) {
	if (!message) return null;
	return <span className={errorClass}>{message}</span>;
}

export function TextField({
	name,
	label,
	type = "text",
	placeholder,
	autoComplete,
	error,
	inputMode,
	min,
}: {
	name: string;
	label: string;
	type?: string;
	placeholder?: string;
	autoComplete?: string;
	error?: string;
	inputMode?: "numeric";
	min?: number;
}) {
	return (
		<label className="block">
			<span className={labelClass}>{label}</span>
			<input
				name={name}
				type={type}
				placeholder={placeholder}
				autoComplete={autoComplete}
				inputMode={inputMode}
				min={min}
				className={controlClass}
			/>
			<FieldError message={error} />
		</label>
	);
}

export function SelectField({
	name,
	label,
	options,
	placeholder = "Select one",
	defaultValue,
	error,
}: {
	name: string;
	label: string;
	options: readonly SelectOption[];
	placeholder?: string;
	defaultValue?: string;
	error?: string;
}) {
	return (
		<label className="block">
			<span className={labelClass}>{label}</span>
			<select
				name={name}
				defaultValue={defaultValue ?? ""}
				className={controlClass}
			>
				<option value="">{placeholder}</option>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			<FieldError message={error} />
		</label>
	);
}

export function TextAreaField({
	name,
	label,
	rows = 3,
	error,
}: {
	name: string;
	label: string;
	rows?: number;
	error?: string;
}) {
	return (
		<label className="mt-[18px] block">
			<span className={labelClass}>{label}</span>
			<textarea
				name={name}
				rows={rows}
				className={`${controlClass} resize-y`}
			/>
			<FieldError message={error} />
		</label>
	);
}

export function SubmitButton({
	pending,
	children,
}: {
	pending: boolean;
	children: React.ReactNode;
}) {
	return (
		<button
			type="submit"
			disabled={pending}
			className="mt-[26px] w-full cursor-pointer rounded-[12px] bg-[#00C853] px-6 py-[15px] text-[15.5px] font-semibold text-[#0B2E1B] transition-colors hover:bg-[#00B84A] disabled:opacity-60"
		>
			{pending ? "Submitting…" : children}
		</button>
	);
}

export function SuccessPanel({ title, body }: { title: string; body: string }) {
	return (
		<div>
			<p className="mb-2.5 font-alan text-[20px] font-semibold text-[#16234A]">
				{title}
			</p>
			<p className="text-[15.5px] leading-[1.6] text-[#6B7A9E]">{body}</p>
		</div>
	);
}

export function FormMessage({ message }: { message?: string }) {
	if (!message) return null;
	return (
		<p className="mb-[22px] rounded-[10px] bg-[#FBE4E2] px-3.5 py-2.5 text-[14px] text-[#C0392B]">
			{message}
		</p>
	);
}
