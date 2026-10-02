"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useSignup } from "./signup-context";

const CaretakerSupport = () => {
	const { goToSignup } = useSignup();

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
					onClick={() => goToSignup("property")}
					className="inline-flex min-h-8 cursor-pointer items-center gap-2 py-1 text-left text-[15px] font-semibold text-(--ct-ink)"
				>
					Explore caretaker support
					<ArrowUpRight aria-hidden="true" className="h-4 w-4" />
				</button>
				<p className="mt-2 text-[13.5px] leading-[1.5] text-(--ct-muted)">
					Personnel costs are quoted separately.
				</p>
			</div>
		</div>
	);
};

export default CaretakerSupport;
