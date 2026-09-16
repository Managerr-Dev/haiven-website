"use client";

import { useState } from "react";
import {
	audienceCards,
	type AudienceKey,
	DEFAULT_TYPE_LINE,
} from "../data";

const AudienceSelector = () => {
	const [selected, setSelected] = useState<AudienceKey | null>(null);

	const typeLine =
		audienceCards.find((c) => c.key === selected)?.line ?? DEFAULT_TYPE_LINE;

	return (
		<section className="mx-auto max-w-[1180px] px-6 py-20">
			<h2 className="mb-4 font-alan text-[clamp(28px,3.2vw,40px)] leading-[1.12] font-semibold tracking-[-0.015em] text-[#16234A]">
				Built for the way properties actually run
			</h2>
			<p className="mb-10 max-w-[52em] text-[17px] leading-[1.6] text-[#6B7A9E]">
				Whether you own one building or manage many, Caretaker keeps operations
				visible, organised and under control.
			</p>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{audienceCards.map(({ key, icon: Icon, title, description }) => {
					const on = selected === key;
					return (
						<button
							key={key}
							type="button"
							aria-pressed={on}
							onClick={() => setSelected(on ? null : key)}
							className="relative cursor-pointer rounded-[16px] border border-[#E8EBF5] bg-white p-6 text-left transition-shadow hover:shadow-[0_10px_26px_rgba(27,46,107,0.09)]"
						>
							<span className="mb-4 block text-[#1B2E6B]">
								<Icon size={26} strokeWidth={2} />
							</span>
							<span className="mb-2 block font-alan text-[17px] font-semibold text-[#16234A]">
								{title}
							</span>
							<span className="block text-[14.5px] leading-[1.55] text-[#6B7A9E]">
								{description}
							</span>
							<span
								className={`pointer-events-none absolute -inset-px rounded-[16px] border-2 border-[#1B2E6B] transition-opacity duration-200 ${
									on ? "opacity-100" : "opacity-0"
								}`}
							/>
						</button>
					);
				})}
			</div>

			<p className="mt-7 min-h-[1.45em] font-alan text-[20px] leading-[1.45] text-[#1B2E6B]">
				{typeLine}
			</p>
		</section>
	);
};

export default AudienceSelector;
