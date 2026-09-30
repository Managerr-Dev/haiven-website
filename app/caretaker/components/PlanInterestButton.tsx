"use client";

import type { PlanName } from "../data";
import { useSignup } from "./signup-context";

const PlanInterestButton = ({
	plan,
	label,
	variant,
}: {
	plan: PlanName;
	label: string;
	variant: "solid" | "outline";
}) => {
	const { goToSignup } = useSignup();
	return (
		<button
			type="button"
			onClick={() => goToSignup("property", plan)}
			className={`flex min-h-11 w-full cursor-pointer items-center justify-center rounded-[8px] border px-3 py-2.5 text-center text-[14px] leading-[1.25] font-semibold transition-colors ${
				variant === "solid"
					? "border-[#00C853] bg-[#00C853] text-[#0B2B32] hover:bg-[#31D374]"
					: "border-(--ct-line) bg-(--ct-paper) text-(--ct-ink) hover:bg-(--ct-soft)"
			}`}
		>
			{label}
		</button>
	);
};

export default PlanInterestButton;
