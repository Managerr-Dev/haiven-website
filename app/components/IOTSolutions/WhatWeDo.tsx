import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";
import React from "react";

const list = [
	{
		title: "Energy & Fuel Monitoring",
		description:
			"Our solution helps you track and manage electricity, fuel, and fleet consumption in real time. Whether it’s monitoring utility power, generator fuel, or vehicle usage, we provide accurate data to reduce waste, cut costs, and improve efficiency. With clear insights into energy and fleet performance, communities, businesses, and property managers can optimize operations, extend asset life, and achieve measurable savings.",
		image: "/images/energy-fuel-monitoring.webp",
	},
	{
		title: "Sensor-Based Tank Monitoring",
		description:
			"Smart sensors provide real-time data to cloud-based dashboards, enabling continuous visibility into inventory levels and equipment performance. These sensors can monitor above-ground pumps, alerting maintenance teams to both existing and potential issues. Real-time oil tank monitoring ensures uninterrupted pumping, optimizes inventory movement, and minimizes downtime costs.",
		image: "/images/sensor-based-monitoring.webp",
		list: [
			"Cloud-Integrated Digital Dashboard",
			"Real-Time Reports with AI-Driven Insights",
			"Instant Alerts & Notifications",
		],
	},
	{
		title: "Asset Tracking And Monitoring",
		description:
			"In the oil and gas sector, safety and efficiency are top priorities. Asset tracking and monitoring—powered by IoT wireless sensor networks—are now among the fastest-growing applications. With constant market volatility, companies rely on these tools to analyze operations, identify inefficiencies, and optimize investment decisions.",
		image: "/images/asset-tracking.webp",
		list: [
			"Identify and Resolve Operational Gaps",
			"Enable Faster Decision-Making",
			"Analyze and Optimize Performance",
		],
	},
	{
		title: "Acoustic Operations Monitoring",
		description:
			"Cost-effective IoT acoustic sensors continuously evaluate pipeline content, including oil, water, and gas, while ensuring optimal oil flow. By monitoring composition and flow rates in real time, companies can reduce reliance on expensive equipment while maintaining accurate performance insights.",
		image: "/images/acoustic-operations.webp",
		list: [
			"Continuous Oil Composition Analysis",
			"Ensure Optimal Flow Performance",
			"Low-Cost, Efficient Monitoring",
		],
	},
	{
		title: "Fleet Management",
		description:
			"For fleet managers, real-time monitoring of ships and vehicles is critical. IoT solutions simplify data collection, even from hard-to-reach areas, providing both operational efficiency and enhanced safety. This ensures timely insights and data-driven decision-making.",
		image: "/images/fleet-management.webp",
		list: [
			"Real-Time Fleet Tracking",
			"Remote Data Collection",
			"Data-Based Safety Management",
		],
	},
	{
		title: "Pipeline Monitoring",
		description:
			"Pipeline leakage remains one of the industry’s greatest risks. IoT-enabled monitoring provides full visibility of pipelines, pumps, and filters in real time. This minimizes the need for manual inspections, accelerates leak detection, and significantly reduces safety hazards.",
		image: "/images/pipeline-monitoring.webp",
		list: [
			"Instant Leak Detection",
			"Minimize Manual Inspections",
			"Prevent Critical Safety Risks",
		],
	},
];

const WhatWeDo = () => {
	return (
		<section className="bg-haiven-blue py-[72px] xl:px-[104px]">
			<div className="max-w-[1077px] mx-auto font-sans space-y-[165px]">
				{list.map((item, i) => (
					<Card {...item} key={i} index={i} />
				))}
			</div>
		</section>
	);
};

interface Props {
	title: string;
	description: string;
	list?: string[];
	image: string;
	index: number;
}

function Card({ description, image, title, list, index }: Props) {
	const isEven = (index + 1) % 2 === 0;
	return (
		<div className="text-white font-sans">
			<div
				className={cn(
					"flex gap-[25px] items-center",
					!isEven ? "flex-row-reverse" : "flex-row",
				)}
			>
				<div className="basis-2/5">
					<Image src={image} alt={title} width={405} height={542} />
				</div>
				<div className={cn("basis-3/5 py-6")}>
					<div className="max-w-[555px] w-full space-y-[27.99px]">
						<p
							className={cn(
								"font-semibold text-[40.72px] leading-[100%] align-middle",
								isEven ? "text-[#FFCC00]" : "text-[#00C3D0]",
							)}
						>
							{title}
						</p>
                        
                        
                        <p className="font-regular text-xl leading-[150%] text-[#FFFFFFB2]">{description}</p>
                        

						{list && (
							<ul className="list-disc list-inside space-y-[27.99px]">
								{list.map((item, i) => (
									<li className="flex gap-3 items-center" key={i}>
										<div className="size-[17px] rounded-full bg-white flex items-center justify-center">
											<Check size={7.29} color="#13247E" />
										</div>
										<span className="font-medium text-lg text-white leading-[27px]">{item}</span>
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default WhatWeDo;
