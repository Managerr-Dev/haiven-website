import React from "react";
import SectionBadge from "./SectionBadge";
import Image from "next/image";

const IOT = () => {
	return (
		<div className="px-[60px] py-[60px] font-sans relative">
			<Image
				src="/images/top-leaf.webp"
				alt="decorative leaf"
				width={595.88}
				height={508.94}
				className="absolute top-0 right-0"
			/>
			<Image
				src="/images/left-leaf.webp"
				alt="decorative leaf"
				width={595.88}
				height={508.94}
				className="absolute top-1/2 -translate-y-1/2 left-0"
			/>
			<Image
				src="/images/bottom-leaf.webp"
				alt="decorative leaf"
				width={595.88}
				height={508.94}
				className="absolute bottom-0 right-0"
			/>
			<div className="max-w-[1194px] relative mx-auto flex px-[26px] items-center gap-8 py-[154px] bg-white">
				<div className="basis-1/2">
					<div className="space-y-[27.99px] max-w-[535px]">
						<SectionBadge text="IOT Solutions" />
						<h5 className="font-semibold text-[40.72px] text-haiven-blue leading-[100%]">
							Transforming Industries with{" "}
							<span className="text-accent-green">IOT Innovations</span>
						</h5>
						<p className="text-[#1D2C4D] font-regular text-xl leading-[150%]">
							Our IoT-driven solutions deliver real-time monitoring across
							energy, fuel, fleet, and critical infrastructure. With smart
							sensors, cloud dashboards, and AI insights, we empower businesses
							and communities to cut costs, improve safety, and optimize
							performance.
						</p>
					</div>
				</div>
				<div className="basis-1/2">
					<Image
						src="/images/IOT.webp"
						alt="picture grid containing an oil factory, an array of trucks, an auto engineer and a person looking at a laptop"
						width={576}
						height={496}
					/>
				</div>
			</div>
		</div>
	);
};

export default IOT;
