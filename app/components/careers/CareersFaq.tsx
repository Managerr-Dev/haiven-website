"use client";

import { FAQS } from "@/app/(site)/careers/data";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function CareersFaq() {
	const [open, setOpen] = useState(-1);

	return (
		<div className="flex-[2_1_520px] border-t border-[#E3E7F0]">
			{FAQS.map((item, i) => {
				const isOpen = open === i;
				return (
					<div key={item.q} className="border-b border-[#E3E7F0]">
						<h3>
							<button
								type="button"
								aria-expanded={isOpen}
								aria-controls={`faq-${i}`}
								onClick={() => setOpen(isOpen ? -1 : i)}
								className="flex w-full cursor-pointer items-center justify-between gap-5 py-[22px] text-left text-lg font-bold text-[#1B2E6B] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#1A4B8C]"
							>
								{item.q}
								<Plus
									size={22}
									strokeWidth={2}
									className="shrink-0 text-[#1A4B8C] transition-transform duration-200"
									style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
								/>
							</button>
						</h3>
						{isOpen && (
							<p
								id={`faq-${i}`}
								className="pr-10 pb-6 text-[17px] leading-[1.65] text-[#363C52]"
							>
								{item.a}
							</p>
						)}
					</div>
				);
			})}
		</div>
	);
}
