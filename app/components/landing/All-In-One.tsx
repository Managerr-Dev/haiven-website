import React from "react";
import SectionBadge from "./SectionBadge";
import Image from "next/image";
import { ArrowDown, ArrowUp } from "lucide-react";

const AllInOne = () => {
	return (
		<div className="py-[59px] relative bg-white">
			<Image
				src="/images/haiven-leaf.svg"
				alt="decorative leaf"
				width={126.8}
				height={108.85}
				className="absolute top-10 left-10"
				preload={false}
			/>
			<div className="relative max-w-[1041px] mx-auto flex flex-col items-center justify-center">
				<div className="mb-[33px]">
					<SectionBadge text="Your All-in-One Estate Management Toolkit" />
				</div>

				<h3 className="max-w-[874px] font-bold text-5xl leading-[100%] text-center align-middle mb-[19px] text-haiven-blue uppercase">
					Smarter Living, Powered by AI
				</h3>

				<p className="max-w-[798px] mx-auto text-center font-normal text-xl leading-[150%] mb-[38px]">
					Haiven’s built-in AI assistant helps users navigate tools with ease,
					responds intelligently to common questions, and provides smart
					insights, reminders, and cost forecasts, making community management
					more proactive and efficient.
				</p>

				{/* TODO:Button */}

				<Card />
			</div>
		</div>
	);
};

function Card() {
	return (
		<div className="relative rounded-[84.83px] flex items-center justify-between bg-[#31B3D74D] xl:w-full max-w-[1116.37px]">
			<Image
				src="/images/card-curve.png"
				alt=""
				width={339.32}
				height={82.09}
				className="absolute rotate-180 bottom-0 left-1/2 -translate-x-1/2"
			/>
			<Image
				src="/images/card-curve.png"
				alt=""
				width={339.32}
				height={82.09}
				className="absolute top-0 left-1/2 -translate-x-1/2"
			/>
			<ArrowUp
				className="absolute top-3 left-1/2 -translate-x-1/2"
				color="#31B3D7"
				size={11.88}
			/>
			<ArrowDown
				className="absolute bottom-3 left-1/2 -translate-x-1/2"
				color="#31B3D7"
				size={11.88}
			/>
			<div className="py-[166.27px] px-[77px]">
				<div className="max-w-[423px]">
					<p className="font-bold text-[27.15px] mb-[15.27px] leading-[150%]">
						Bills & Financial Management
					</p>
					<p className="font-regular text-[16.97px] leading-[150%]">
						Automate estate dues, utility bills, and service charges with easy
						payment tracking and reminders.
					</p>
				</div>
			</div>
			<div className="flex items-center justify-center bg-[#31B3D7] py-[105.47px] px-[72.95px] rounded-[84.83px]">
				<Image
					src="/images/illustration.svg"
					alt="illustration"
					width={284.08}
					height={294.65}
				/>
			</div>
		</div>
	);
}

export default AllInOne;
