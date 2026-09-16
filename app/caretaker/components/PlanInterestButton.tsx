"use client";

import type { PlanName } from "../data";
import { useSignup } from "./signup-context";

const PlanInterestButton = ({
	plan,
	variant,
}: {
	plan: PlanName;
	variant: "solid" | "outline";
}) => {
	const { goToSignup } = useSignup();
	return (
		<button
			type="button"
			onClick={() => goToSignup("property", plan)}
			className={`mt-auto cursor-pointer rounded-[12px] px-5 py-[13px] text-[15px] font-semibold transition-colors ${
				variant === "solid"
					? "bg-[#00C853] text-[#0B2E1B] hover:bg-[#00B84A]"
					: "border border-[#D7DDEE] bg-white text-[#1B2E6B] hover:bg-[#E8EBF5]"
			}`}
		>
			I&rsquo;m interested in {plan}
		</button>
	);
};

export default PlanInterestButton;
