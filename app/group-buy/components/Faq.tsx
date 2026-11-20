"use client";

import { useState } from "react";
import { FAQS } from "../data";
import { container, eyebrowClass, green, h2Class, sectionPadding } from "./styles";

const Faq = () => {
	// One answer open at a time; the first starts open.
	const [open, setOpen] = useState(0);

	return (
		<section id="faq" className="scroll-mt-16 bg-[#F5F7FA]">
			<div
				className={`${container} ${sectionPadding} grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-start gap-11`}
			>
				<div className="flex flex-col gap-3.5">
					<p className={`${eyebrowClass} ${green}`}>Questions</p>
					<h2 className={h2Class}>
						Good to <span className={green}>know.</span>
					</h2>
					<p className="m-0 text-lg text-[#4A5480]">
						Still unsure?{" "}
						<a href="mailto:info@haiven.net" className="font-bold text-[#00873A]">
							Email us
						</a>
						.
					</p>
				</div>
				<div className="flex flex-col gap-2.5">
					{FAQS.map(([q, a], i) => {
						const isOpen = open === i;
						return (
							<div
								key={q}
								className="rounded-2xl border border-[rgba(19,36,126,0.12)] bg-white px-[22px]"
							>
								<h3 className="m-0">
									<button
										type="button"
										id={`faq-q-${i}`}
										aria-expanded={isOpen}
										aria-controls={`faq-a-${i}`}
										onClick={() => setOpen(isOpen ? -1 : i)}
										className="flex w-full cursor-pointer items-center justify-between gap-4 border-none bg-transparent py-5 text-left text-[17px] leading-[1.35] font-bold text-haiven-blue"
									>
										<span>{q}</span>
										<span
											aria-hidden="true"
											className="flex-none text-[26px] font-semibold text-[#00873A]"
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
									className="m-0 mb-5 text-base leading-[1.6] text-[#4A5480]"
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
