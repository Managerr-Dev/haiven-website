"use client";

import { useState } from "react";
import { FAQS } from "../data";
import { h2Class, sectionPadding } from "./styles";

const Faq = () => {
	// One answer open at a time; the first starts open.
	const [open, setOpen] = useState(0);

	return (
		<section id="faq" className="scroll-mt-[60px] bg-[#F5F7FA]">
			<div
				className={`mx-auto flex max-w-[860px] flex-col gap-8 px-5 ${sectionPadding}`}
			>
				<h2 className={h2Class}>Questions.</h2>
				<div className="flex flex-col border-t border-[#D5DAE8]">
					{FAQS.map(([q, a], i) => {
						const isOpen = open === i;
						return (
							<div key={q} className="border-b border-[#D5DAE8]">
								<h3 className="m-0">
									<button
										type="button"
										id={`faq-q-${i}`}
										aria-expanded={isOpen}
										aria-controls={`faq-a-${i}`}
										onClick={() => setOpen(isOpen ? -1 : i)}
										className="flex w-full cursor-pointer items-center justify-between gap-4 bg-transparent py-[22px] text-left text-lg leading-[1.35] font-bold text-haiven-blue"
									>
										<span>{q}</span>
										<span
											aria-hidden="true"
											className="flex-none text-2xl font-medium text-[#00873A]"
										>
											{isOpen ? "−" : "+"}
										</span>
									</button>
								</h3>
								<p
									id={`faq-a-${i}`}
									role="region"
									aria-labelledby={`faq-q-${i}`}
									hidden={!isOpen}
									className="m-0 mb-[22px] max-w-[68ch] text-base leading-[1.6] text-[#3A4573]"
								>
									{a}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default Faq;
