"use client";

import type { MeterType } from "../data";
import { useOrder } from "./OrderContext";

/** Jumps to the form with this phase meter included in the order. */
const JoinGroupButton = ({ type, children }: { type: MeterType; children: React.ReactNode }) => {
	const { include } = useOrder();

	return (
		<a
			href="#register"
			onClick={() => include(type)}
			className="flex justify-center rounded-full bg-haiven-blue px-6 py-[15px] text-base font-extrabold text-white no-underline transition-colors hover:bg-[#0D1A5E]"
		>
			{children}
		</a>
	);
};

export default JoinGroupButton;
