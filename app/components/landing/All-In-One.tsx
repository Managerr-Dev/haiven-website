"use client";

import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import SectionBadge from "./SectionBadge";

const featuresData = [
	{
		title: "Bills & Financial Management",
		description:
			"Automate estate dues, utility bills, and service charges with easy payment tracking and reminders.",
		image: "/images/illustration.svg",
		mainbgcolor: "bg-[#31B3D74D]",
		accentColor: "bg-[#31B3D7]",
	},
	{
		title: "Access Control and Security",
		description:
			"Secure and streamline community entry with a real-time digital access system. Manage residents, guests, and vendors using personalized entry codes, movement tracking, and automated permissions, all from one dashboard. Empower security teams with smart tools for visitor validation, incident logging, and real-time alerts to enhance safety and response.",
		image: "/images/illustration.svg",
		mainbgcolor: "bg-[#D1E7F4]",
		accentColor: "bg-[#7DC6EF]",
	},
	{
		title: "Community & Engagement",
		description:
			"Haiven builds stronger connections through community engagement tools like in-app messaging, announcements, and broadcast notifications. We keep residents informed, heard, and involved in their living environment anytime, anywhere.",
		image: "/images/illustration.svg",
		mainbgcolor: "bg-[#CBE6E9]",
		accentColor: "bg-[#68C2CA]",
	},
	{
		title: "Payments & Utility Billing",
		description:
			"Simplify financial operations with automated utility billing, estate dues, and service charge management. Track payments, recover debts, and generate detailed financial reports.",
		image: "/images/illustration.svg",
		mainbgcolor: "bg-[#DDD2CB]",
		accentColor: "bg-[#A48066]",
	},
	{
		title: "Facility Booking",
		description:
			"Easily book shared spaces like the gym or clubhouse with real-time availability, transparent pricing, and community reviews, all clearly listed for stress-free planning.",
		image: "/images/illustration.svg",
		mainbgcolor: "bg-[#4879C54D]",
		accentColor: "bg-[#4879C5]",
	},
	{
		title: "Market Place",
		description:
			"Haiven Marketplace connects residents to a trusted network of local vendors and artisans, offering everything from household essentials to gadgets and kids’ items, all at community-powered discounts. With group buying and shared logistics, members enjoy up to 25% savings, faster deliveries, and lower costs.",
		image: "/images/illustration.svg",
		mainbgcolor: "bg-[#2EDAB24D]",
		accentColor: "bg-[#2EDAB2]",
	},
];

const AllInOne = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setIsTransitioning(true);
			setTimeout(() => {
				setCurrentIndex((prev) => (prev + 1) % featuresData.length);
				setIsTransitioning(false);
			}, 600); // Transition duration
		}, 6000); // Cycle duration

		return () => clearInterval(interval);
	}, []);

	const currentFeature = featuresData[currentIndex];

	return (
		<div className="py-[120px] relative bg-white overflow-hidden">
			<Image
				src="/images/haiven-leaf.svg"
				alt="decorative leaf"
				width={126.8}
				height={108.85}
				className="absolute top-10 left-10 opacity-20"
				preload={false}
			/>
			<div className="relative max-w-[1240px] mx-auto px-4 flex flex-col items-center justify-center">
				<div className="mb-[33px]">
					<SectionBadge text="Your All-in-One Estate Management Toolkit" />
				</div>

				<h3 className="max-w-[874px] font-bold text-4xl md:text-5xl leading-[110%] text-center mb-[24px] text-haiven-blue uppercase tracking-tight">
					Smarter Living, Powered by AI
				</h3>

				<p className="max-w-[798px] mx-auto text-center font-normal text-lg md:text-xl leading-[160%] mb-[60px] text-haiven-blue/80">
					Haiven’s built-in AI assistant helps users navigate tools with ease,
					responds intelligently to common questions, and provides smart
					insights, reminders, and cost forecasts, making community management
					more proactive and efficient.
				</p>

				<Card
					{...currentFeature}
					index={currentIndex}
					isTransitioning={isTransitioning}
				/>
			</div>
		</div>
	);
};

interface CardProps {
	title: string;
	description: string;
	image: string;
	mainbgcolor: string;
	accentColor: string;
	index: number;
	isTransitioning: boolean;
}

function Card({
	title,
	description,
	image,
	mainbgcolor,
	accentColor,
	index,
	isTransitioning,
}: CardProps) {
	const isEven = index % 2 === 0;

	return (
		<div
			className={cn(
				"relative rounded-[84.83px] flex flex-col md:flex-row items-center justify-between pb-8 md:pb-0 transition-all duration-1000 min-h-[500px] xl:w-full max-w-[1116.37px]",
				isEven ? "md:flex-row" : "md:flex-row-reverse",
				mainbgcolor,
				isTransitioning ? "opacity-0" : "opacity-100",
			)}
		>
			<Image
				src="/images/card-curve.png"
				alt=""
				width={339.32}
				height={82.09}
				className="absolute rotate-180 bottom-0 left-1/2 -translate-x-1/2 opacity-100 pointer-events-none"
			/>
			<Image
				src="/images/card-curve.png"
				alt=""
				width={339.32}
				height={82.09}
				className="absolute top-0 left-1/2 -translate-x-1/2 opacity-100 pointer-events-none"
			/>

			<div
				className={cn(
					"py-[80px] md:py-[166.27px] px-8 md:px-[77px] text-center md:text-left basis-full md:basis-auto z-10 transition-all duration-700 ease-in-out",
					isTransitioning
						? isEven
							? "translate-x-[50px] opacity-0"
							: "-translate-x-[50px] opacity-0"
						: "translate-x-0 opacity-100",
				)}
			>
				<div className="max-w-[423px] mx-auto md:mx-0">
					<p className="font-bold text-2xl md:text-[27.15px] mb-[15.27px] leading-[150%] text-haiven-blue">
						{title}
					</p>
					<p className="text-base md:text-[16.97px] font-normal leading-[150%] text-haiven-blue/90 font-regular">
						{description}
					</p>
				</div>
			</div>

			<div
				className={cn(
					"pb-8 md:pb-0 w-full md:w-auto h-full z-10 transition-all duration-700 ease-in-out",
					isTransitioning
						? isEven
							? "-translate-x-[50px] opacity-0"
							: "translate-x-[50px] opacity-0"
						: "translate-x-0 opacity-100",
				)}
			>
				<div
					className={cn(
						"flex items-center justify-center py-12 md:py-[105.47px] px-8 md:px-[72.95px] rounded-[40px] md:rounded-[84.83px] transition-all duration-500",
						accentColor,
					)}
				>
					{image ? (
						<Image
							src={image}
							alt={title}
							width={284.08}
							height={294.65}
							className="object-contain"
						/>
					) : (
						<div className="w-[284.08px] h-[294.65px] flex items-center justify-center">
							<div className="text-white/20 text-4xl font-bold uppercase tracking-widest">
								Haiven
							</div>
						</div>
					)}
				</div>
			</div>

			<ArrowUp
				className="absolute top-3 left-1/2 -translate-x-1/2 hidden md:block"
				color="#31B3D7"
				size={11.88}
			/>
			<ArrowDown
				className="absolute bottom-3 left-1/2 -translate-x-1/2 hidden md:block"
				color="#31B3D7"
				size={11.88}
			/>
		</div>
	);
}

export default AllInOne;
