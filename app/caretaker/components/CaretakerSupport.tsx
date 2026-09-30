"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type StaffNeed = "existing" | "new";

const staffOptions: { key: StaffNeed; label: string; detail: string }[] = [
	{
		key: "existing",
		label: "I have a caretaker",
		detail:
			"Give your caretaker a staff account on Essential, or add Haiven supervision through Managed.",
	},
	{
		key: "new",
		label: "Help me find one",
		detail:
			"Ask Haiven about recruitment, training and placement alongside Managed or Secure+. Coverage and costs are agreed before you commit.",
	},
];

const CaretakerSupport = () => {
	const [open, setOpen] = useState(false);
	const [need, setNeed] = useState<StaffNeed>("existing");
	const detail = staffOptions.find((o) => o.key === need)?.detail;

	return (
		<div className="grid grid-cols-1 overflow-hidden rounded-[14px] border border-(--ct-line) bg-(--ct-paper) sm:grid-cols-[35%_minmax(0,1fr)]">
			<Image
				src="/images/caretaker/on-site.webp"
				alt="A caretaker recording an update on her phone outside an apartment building"
				width={1122}
				height={748}
				className="block h-[200px] w-full object-cover object-[center_54%] sm:h-full sm:min-h-[240px] sm:object-[62%_65%]"
			/>
			<div className="px-6 py-6 sm:px-8 sm:py-7">
				<p className="mb-2.5 text-[12px] font-semibold tracking-[0.09em] text-(--ct-muted) uppercase">
					Optional · On-site support
				</p>
				<h3 className="mb-2.5 max-w-[340px] font-alan text-[26px] leading-[1.2] font-semibold tracking-[-0.02em] text-(--ct-ink)">
					Need someone on the ground?
				</h3>
				<p className="mb-3 max-w-[380px] text-[15px] leading-[1.6] text-(--ct-muted)">
					Keep your caretaker, or let Haiven help you find one.
				</p>
				<button
					type="button"
					aria-expanded={open}
					aria-controls="caretaker-support-more"
					onClick={() => setOpen((v) => !v)}
					className="inline-flex min-h-8 cursor-pointer items-center gap-2 py-1 text-left text-[15px] font-semibold text-(--ct-ink)"
				>
					Explore caretaker support
					<ArrowUpRight aria-hidden="true" className="h-4 w-4" />
				</button>
				<p className="mt-2 text-[13.5px] leading-[1.5] text-(--ct-muted)">
					Personnel costs are quoted separately.
				</p>
			</div>
			<div
				id="caretaker-support-more"
				hidden={!open}
				className="border-t border-(--ct-line) px-6 pt-5 pb-6 sm:col-span-2 sm:px-8"
			>
				<div
					role="group"
					aria-label="Your caretaker needs"
					className="mb-3 flex flex-wrap gap-2"
				>
					{staffOptions.map((option) => (
						<button
							key={option.key}
							type="button"
							aria-pressed={need === option.key}
							onClick={() => setNeed(option.key)}
							className={`min-h-11 cursor-pointer rounded-[8px] border px-3.5 py-2.5 text-[14px] leading-[1.4] font-medium transition-colors ${
								need === option.key
									? "border-(--ct-ink) bg-(--ct-ink) text-(--ct-bg)"
									: "border-(--ct-line) bg-(--ct-paper) text-(--ct-ink) hover:bg-(--ct-soft)"
							}`}
						>
							{option.label}
						</button>
					))}
				</div>
				<p
					aria-live="polite"
					className="mb-2 text-[15px] leading-[1.6] text-(--ct-muted)"
				>
					{detail}
				</p>
				<p className="text-[13.5px] leading-[1.5] text-(--ct-muted)">
					Placement, duties and working hours are agreed in advance. The landlord
					pays the caretaker&rsquo;s salary directly.
				</p>
			</div>
		</div>
	);
};

export default CaretakerSupport;
