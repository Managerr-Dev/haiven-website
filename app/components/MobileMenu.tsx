"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const features = [
	{
		title: "Metering",
		href: "/features/metering",
	},
	{
		title: "Facility Booking",
		href: "/features/facility-booking",
	},
	{
		title: "Utilities Vending",
		href: "/features/utilities-vending",
	},
	{
		title: "Access Control",
		href: "/features/access-control",
	},
	{
		title: "Bills & Finances",
		href: "/features/bills-management",
	},
];

interface MobileMenuProps {
	isOpen: boolean;
	onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
	const pathname = usePathname();

	const handleDownload = () => {
		const userAgent = navigator.userAgent || navigator.vendor;
		const isApple = /iPad|iPhone|iPod|Macintosh/.test(userAgent);
		const url = isApple
			? "https://apps.apple.com/app/id6478140231"
			: "https://play.google.com/store/apps/details?id=com.anonymous.haiven";
		window.open(url, "_blank");
	};

	const navLinks = [
		{ title: "About Us", href: "/about-us" },
		{ title: "IOT Solutions", href: "/iot-solutions" },
		{ title: "Blog", href: "/blog" },
		{ title: "Contact Us", href: "/contact-us" },
	];

	return (
		<div
			className={cn(
				"fixed inset-0 top-0 bg-haiven-blue z-[90] transition-all duration-300 lg:hidden overflow-y-auto pt-[100px]",
				isOpen
					? "translate-x-0 opacity-100"
					: "translate-x-full opacity-0 pointer-events-none",
			)}
		>
			<div className="flex flex-col p-6 space-y-4">
				<Link
					href="/about-us"
					className={cn(
						"text-xl font-medium py-2 border-b border-white/10",
						pathname === "/about-us" ? "text-accent-green" : "text-white",
					)}
					onClick={onClose}
				>
					About Us
				</Link>

				<Accordion type="single" collapsible className="w-full">
					<AccordionItem value="features" className="border-b border-white/10">
						<AccordionTrigger className="text-xl font-medium text-white hover:no-underline py-2">
							Features
						</AccordionTrigger>
						<AccordionContent>
							<div className="flex flex-col space-y-3 pl-4 pt-2">
								{features.map((feature) => (
									<Link
										key={feature.href}
										href={feature.href}
										className={cn(
											"text-lg text-white/70 hover:text-white transition-colors",
											pathname === feature.href && "text-accent-green",
										)}
										onClick={onClose}
									>
										{feature.title}
									</Link>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>

				<Link
					href="/iot-solutions"
					className={cn(
						"text-xl font-medium py-2 border-b border-white/10",
						pathname === "/iot-solutions" ? "text-accent-green" : "text-white",
					)}
					onClick={onClose}
				>
					IOT Solutions
				</Link>

				<Link
					href="/blog"
					className={cn(
						"text-xl font-medium py-2 border-b border-white/10",
						pathname === "/blog" ? "text-accent-green" : "text-white",
					)}
					onClick={onClose}
				>
					Blog
				</Link>

				<Link
					href="/contact-us"
					className={cn(
						"text-xl font-medium py-2 border-b border-white/10",
						pathname === "/contact-us" ? "text-accent-green" : "text-white",
					)}
					onClick={onClose}
				>
					Contact Us
				</Link>

				<div className="pt-8">
					<Button
						onClick={handleDownload}
						className="w-full py-6 text-lg bg-accent-green hover:bg-white hover:text-haiven-blue text-haiven-blue font-bold rounded-[10.18px] transition-all duration-300"
					>
						Download App
					</Button>
				</div>
			</div>
		</div>
	);
};

export default MobileMenu;
