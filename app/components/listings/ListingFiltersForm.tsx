"use client";

import type { AmenityOption } from "@/app/(site)/listings/api";
import {
	EMPTY_FILTERS,
	type ListingFilters,
	MAX_AMENITIES,
	MAX_PLACE_LENGTH,
} from "@/app/(site)/listings/filters";
import {
	cleanNaira,
	type FieldErrors,
	validateFilterPrices,
} from "@/app/(site)/listings/validation";
import {
	borderFor,
	FieldError,
	inputClass,
	labelClass,
} from "@/app/components/careers/fields";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { primaryButton } from "./ui";

const BEDROOM_CHOICES = ["0", "1", "2", "3", "4", "5", "6"];

const fieldLabel = cn(labelClass, "text-sm");
const compactInput = cn(inputClass, "min-h-12 py-2.5");

function groupAmenities(options: AmenityOption[]) {
	const groups = new Map<string, AmenityOption[]>();
	for (const option of options) {
		const group = option.group || "Other";
		groups.set(group, [...(groups.get(group) ?? []), option]);
	}
	return [...groups.entries()];
}

function PriceInput({
	id,
	label,
	value,
	invalid,
	onChange,
}: {
	id: string;
	label: string;
	value: string;
	invalid: boolean;
	onChange: (value: string) => void;
}) {
	return (
		<div className="flex min-w-0 flex-1 flex-col gap-1.5">
			<label htmlFor={id} className={fieldLabel}>
				{label}
			</label>
			<div className="relative">
				<span
					aria-hidden="true"
					className="absolute left-3 top-1/2 -translate-y-1/2 font-semibold text-[#4A5168]"
				>
					₦
				</span>
				<input
					id={id}
					inputMode="numeric"
					aria-invalid={invalid || undefined}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className={cn(compactInput, borderFor(invalid), "pl-8")}
				/>
			</div>
		</div>
	);
}

export default function ListingFiltersForm({
	applied,
	amenityOptions,
	amenitiesUnavailable,
	serverErrors,
	onApply,
	onClear,
}: {
	applied: ListingFilters;
	amenityOptions: AmenityOption[];
	amenitiesUnavailable: boolean;
	serverErrors: FieldErrors;
	onApply: (draft: ListingFilters) => void;
	onClear: () => void;
}) {
	const [draft, setDraft] = useState(applied);
	const [errors, setErrors] = useState<FieldErrors>({});
	const err = { ...serverErrors, ...errors };

	const groups = useMemo(() => groupAmenities(amenityOptions), [amenityOptions]);
	const bedroomChoices = BEDROOM_CHOICES.includes(applied.bedrooms) || !applied.bedrooms
		? BEDROOM_CHOICES
		: [...BEDROOM_CHOICES, applied.bedrooms];

	const set = <K extends keyof ListingFilters>(
		key: K,
		value: ListingFilters[K],
	) => setDraft((d) => ({ ...d, [key]: value }));

	const toggleAmenity = (id: string) =>
		set(
			"amenities",
			draft.amenities.includes(id)
				? draft.amenities.filter((a) => a !== id)
				: [...draft.amenities, id],
		);

	const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		const problems = validateFilterPrices(draft);
		setErrors(problems);
		if (Object.keys(problems).length > 0) return;
		onApply({
			...EMPTY_FILTERS,
			state: draft.state.trim(),
			city: draft.city.trim(),
			minPrice: cleanNaira(draft.minPrice),
			maxPrice: cleanNaira(draft.maxPrice),
			bedrooms: draft.bedrooms,
			amenities: draft.amenities,
		});
	};

	return (
		<form noValidate onSubmit={onSubmit} className="flex flex-col gap-5">
			<div className="flex flex-col gap-1.5">
				<label htmlFor="flt-state" className={fieldLabel}>
					State
				</label>
				<input
					id="flt-state"
					maxLength={MAX_PLACE_LENGTH}
					placeholder="For example, Lagos"
					aria-invalid={!!err.state || undefined}
					value={draft.state}
					onChange={(e) => set("state", e.target.value)}
					className={cn(compactInput, borderFor(!!err.state))}
				/>
				<FieldError message={err.state} />
			</div>

			<div className="flex flex-col gap-1.5">
				<label htmlFor="flt-city" className={fieldLabel}>
					City or area
				</label>
				<input
					id="flt-city"
					maxLength={MAX_PLACE_LENGTH}
					placeholder="For example, Ikoyi"
					aria-describedby="flt-city-hint"
					aria-invalid={!!err.city || undefined}
					value={draft.city}
					onChange={(e) => set("city", e.target.value)}
					className={cn(compactInput, borderFor(!!err.city))}
				/>
				<p id="flt-city-hint" className="text-[13px] text-[#4A5168]">
					Use the full name. Partial names won&apos;t match.
				</p>
				<FieldError message={err.city} />
			</div>

			<div className="flex flex-col gap-1.5">
				<div className="flex gap-3">
					<PriceInput
						id="flt-min"
						label="Min price"
						value={draft.minPrice}
						invalid={!!err.min_price}
						onChange={(v) => set("minPrice", v)}
					/>
					<PriceInput
						id="flt-max"
						label="Max price"
						value={draft.maxPrice}
						invalid={!!err.max_price}
						onChange={(v) => set("maxPrice", v)}
					/>
				</div>
				<FieldError message={err.min_price} />
				<FieldError message={err.max_price} />
			</div>

			<div className="flex flex-col gap-1.5">
				<label htmlFor="flt-bedrooms" className={fieldLabel}>
					Bedrooms
				</label>
				<div className="relative">
					<select
						id="flt-bedrooms"
						aria-invalid={!!err.bedrooms || undefined}
						value={draft.bedrooms}
						onChange={(e) => set("bedrooms", e.target.value)}
						className={cn(compactInput, borderFor(!!err.bedrooms), "appearance-none pr-11")}
					>
						<option value="">Any</option>
						{bedroomChoices.map((n) => (
							<option key={n} value={n}>
								{n === "0" ? "Studio" : n}
							</option>
						))}
					</select>
					<ChevronDown
						size={18}
						strokeWidth={2}
						className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#1B2E6B]"
					/>
				</div>
				<FieldError message={err.bedrooms} />
			</div>

			{groups.length > 0 && (
				<details open={applied.amenities.length > 0} className="group">
					<summary className="flex cursor-pointer list-none items-center justify-between py-1 text-sm font-semibold text-[#14182B] [&::-webkit-details-marker]:hidden">
						<span>
							Amenities
							{draft.amenities.length > 0 && (
								<span className="ml-2 rounded-full bg-[#E8EBF5] px-2 py-0.5 text-[13px] font-bold text-[#1B2E6B]">
									{draft.amenities.length}
								</span>
							)}
						</span>
						<ChevronDown
							size={18}
							strokeWidth={2}
							className="text-[#1B2E6B] transition-transform group-open:rotate-180"
						/>
					</summary>
					<div className="mt-3 flex flex-col gap-4">
						{groups.map(([group, options]) => (
							<fieldset key={group} className="flex flex-col gap-1">
								<legend className="mb-1 text-[13px] font-bold uppercase tracking-[.06em] text-[#4A5168]">
									{group}
								</legend>
								{options.map((option) => {
									const on = draft.amenities.includes(option.value);
									return (
										<label
											key={option.value}
											className="flex min-h-9 cursor-pointer items-center gap-2.5 text-[15px] text-[#14182B]"
										>
											<input
												type="checkbox"
												checked={on}
												disabled={!on && draft.amenities.length >= MAX_AMENITIES}
												onChange={() => toggleAmenity(option.value)}
												className="size-[18px] shrink-0 accent-[#1A4B8C]"
											/>
											{option.label}
										</label>
									);
								})}
							</fieldset>
						))}
					</div>
					<FieldError message={err.amenities} className="mt-2" />
				</details>
			)}
			{amenitiesUnavailable && (
				<p className="text-[13px] text-[#4A5168]">
					Amenity filters couldn&apos;t be loaded. Refresh to try again.
				</p>
			)}

			<div className="flex flex-col gap-2">
				<button type="submit" className={cn(primaryButton, "w-full py-3.5")}>
					Apply filters
				</button>
				<button
					type="button"
					onClick={onClear}
					className="cursor-pointer py-2 text-[15px] font-bold text-[#1A4B8C] underline underline-offset-4"
				>
					Clear all
				</button>
			</div>
		</form>
	);
}
