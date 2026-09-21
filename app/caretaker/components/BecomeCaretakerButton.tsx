"use client";

import { useSignup } from "./signup-context";

const BecomeCaretakerButton = () => {
	const { goToSignup } = useSignup();
	return (
		<button
			type="button"
			onClick={() => goToSignup("training")}
			className="cursor-pointer rounded-[12px] bg-[#00C853] px-[22px] py-[13px] text-[15px] font-semibold text-[#0B2E1B] transition-colors hover:bg-[#00B84A]"
		>
			Apply to become a Certified Caretaker
		</button>
	);
};

export default BecomeCaretakerButton;
