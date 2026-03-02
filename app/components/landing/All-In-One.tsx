"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ActiveCard from "./ActiveCard";
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
		image: "/images/access-control-security.svg",
		mainbgcolor: "bg-[#D1E7F4]",
		accentColor: "bg-[#7DC6EF]",
	},
	{
		title: "Community & Engagement",
		description:
			"Haiven builds stronger connections through community engagement tools like in-app messaging, announcements, and broadcast notifications. We keep residents informed, heard, and involved in their living environment anytime, anywhere.",
		image: "/images/community-engagement.svg",
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
		image: "/images/facility-booking.svg",
		mainbgcolor: "bg-[#4879C54D]",
		accentColor: "bg-[#4879C5]",
	},
	{
		title: "Market Place",
		description:
			"Haiven Marketplace connects residents to a trusted network of local vendors and artisans, offering everything from household essentials to gadgets and kids’ items, all at community-powered discounts. With group buying and shared logistics, members enjoy up to 25% savings, faster deliveries, and lower costs.",
		image: "/images/marketplace.svg",
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

				<p className="max-w-[798px] mx-auto text-center font-normal text-base md:text-xl leading-[160%] mb-[60px] text-haiven-blue/80">
					Haiven&apos;s built-in AI assistant helps users navigate tools with
					ease, responds intelligently to common questions, and provides smart
					insights, reminders, and cost forecasts, making community management
					more proactive and efficient.
				</p>

				<ActiveCard
					{...currentFeature}
					index={currentIndex}
					isTransitioning={isTransitioning}
				/>
			</div>
		</div>
	);
};

export default AllInOne;
