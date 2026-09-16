"use client";

import Image from "next/image";
import DemoForm from "./forms/DemoForm";
import TrainingForm from "./forms/TrainingForm";
import WaitlistForm from "./forms/WaitlistForm";
import { type SignupTab, useSignup } from "./signup-context";

const tabs: { id: SignupTab; label: string }[] = [
	{ id: "property", label: "Caretaker for my property" },
	{ id: "demo", label: "Apply for the Demo" },
	{ id: "training", label: "Become a Certified Caretaker" },
];

const driftImages = [
	{
		src: "/images/caretaker/drift-1.webp",
		w: 502,
		h: 400,
		className:
			"left-[4%] top-[16%] w-[150px] opacity-50 blur-[2px] [animation:drift_17s_ease-in-out_infinite]",
	},
	{
		src: "/images/caretaker/drift-2.webp",
		w: 502,
		h: 456,
		className:
			"right-[5%] top-[26%] w-[132px] opacity-45 [animation:driftB_21s_ease-in-out_infinite]",
	},
	{
		src: "/images/caretaker/drift-3.webp",
		w: 672,
		h: 890,
		className:
			"left-[11%] bottom-[8%] w-[124px] opacity-[0.42] blur-[3px] [animation:driftB_25s_ease-in-out_infinite]",
	},
	{
		src: "/images/caretaker/drift-4.webp",
		w: 1122,
		h: 1402,
		className:
			"right-[9%] bottom-[12%] w-[140px] opacity-40 [animation:drift_19s_ease-in-out_infinite]",
	},
];

const SignupSection = () => {
	const { tab, setTab, plan } = useSignup();

	return (
		<section
			id="signup"
			className="relative scroll-mt-24 overflow-hidden bg-[#FAFBFD] px-6 pt-24 pb-26"
		>
			{driftImages.map((img) => (
				<Image
					key={img.src}
					data-drift
					src={img.src}
					alt=""
					aria-hidden
					width={img.w}
					height={img.h}
					className={`pointer-events-none absolute hidden h-auto rounded-[18px] shadow-[0_18px_40px_rgba(27,46,107,0.12)] md:block ${img.className}`}
				/>
			))}

			<div className="relative mx-auto max-w-[640px] text-center">
				<h2 className="mb-[18px] font-alan text-[clamp(30px,3.4vw,44px)] leading-[1.1] font-semibold tracking-[-0.018em] text-[#16234A]">
					Be first in line for Caretaker
				</h2>
				<p className="mb-9 text-[17px] leading-[1.6] text-pretty text-[#6B7A9E]">
					Demo properties are selected from 1 October, and Caretaker opens
					publicly on 1 November. Tell us which one you are.
				</p>

				<div
					role="tablist"
					className="mb-9 inline-flex flex-wrap justify-center gap-1.5 rounded-full border border-[#E8EBF5] bg-white p-1.5"
				>
					{tabs.map((t) => {
						const active = tab === t.id;
						return (
							<button
								key={t.id}
								type="button"
								role="tab"
								aria-selected={active}
								onClick={() => setTab(t.id)}
								className="relative cursor-pointer rounded-full border-none bg-transparent px-5 py-[11px] text-[14.5px] font-semibold"
							>
								<span
									className={`absolute inset-0 rounded-full bg-[#1B2E6B] transition-opacity duration-200 ${
										active ? "opacity-100" : "opacity-0"
									}`}
								/>
								<span
									className={`relative transition-colors duration-200 ${
										active ? "text-white" : "text-[#6B7A9E]"
									}`}
								>
									{t.label}
								</span>
							</button>
						);
					})}
				</div>

				<div className="rounded-[20px] border border-[#E8EBF5] bg-white p-[34px] text-left shadow-[0_20px_50px_rgba(27,46,107,0.07)]">
					{tab === "property" && <WaitlistForm key={plan ?? "none"} />}
					{tab === "demo" && <DemoForm />}
					{tab === "training" && <TrainingForm />}
				</div>
			</div>
		</section>
	);
};

export default SignupSection;
