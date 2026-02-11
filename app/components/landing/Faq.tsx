import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Accordion } from "@radix-ui/react-accordion";
import SectionBadge from "./SectionBadge";
import { cn } from "@/lib/utils";

const faqs = [
	{
		question: "What is Haiven?",
		answer:
			"Haiven is an all-in-one estate management platform that helps residents and property managers streamline everyday living—handling bill payments, facility bookings, access control, utility vending, and more in one secure app.",
	},
	{
		question: "Who can use Haiven?",
		answer:
			"Haiven is a versatile platform built for a wide range of sectors that rely on coordinated infrastructure, access control, and service delivery.\n\nWe serve:\n• Private and public estates (residential or mixed-use).\n• Real estate developers & landlords needing post-sales digital infrastructure.\n• Facility and estate management firms.\n• Resident welfare associations seeking structure and digital engagement.\n• State and federal government agencies managing housing schemes or staff estates.\n• Utility companies that want smarter consumption tracking and automated billing.\n• Oil & gas or energy firms managing residential compounds or staff locations.\n\nWe’re not just a PropTech tool, we are a digital operations backbone for communities and infrastructure-focused organizations.",
	},
	{
		question: "What can I do with the Haiven app?",
		answer:
			"With Haiven, residents can:\n• Authenticate visitors via QR codes or e-tags.\n• Automate service charge, utility, and security fee billing.\n• Track and resolve maintenance issues through a support ticketing system.\n• Monitor entry logs, vendor activity, and incident reports.\n• Push announcements, reminders, or urgent alerts instantly.\n• View real-time data and reports on finances, requests, and estate activity.\n\nIt’s an all-in-one tool for transparency, accountability, and smarter decision-making in estate operations.",
	},
	{
		question: "Is my personal and payment information safe?",
		answer:
			"Yes, it is. We take security seriously at Haiven. From your personal data to visitor access logs, everything is protected with strict security protocols. We use encryption, secure cloud hosting, and verified access control so you can trust that your estate’s information and your privacy is in safe hands.",
	},
	{
		question: "How do I fund my Haiven wallet?",
		answer:
			"Simply log into your dashboard, click on “Top up”, enter the amount you would like to top up, select a preferred payment option, and easily fund your Haiven wallet. It’s that simple.",
	},
	{
		question: "How does Haiven integrate with existing gate security systems?",
		answer:
			"Our platform seamlessly integrates via API or hardware connectors with existing turnstiles, barrier gates, or biometric systems. Residents and guests use time-based QR codes or e-tags. Every access is logged in real-time, giving EXCOs instant visibility and security accountability.",
	},
	{
		question: "What does Haiven cost and how do I get started?",
		answer:
			"There’s no big software upfront cost. Haiven charges a small monthly per-unit fee (often included in service charges). There may be optional hardware costs (for QR scanners or e-tags), but we manage the onboarding and training for you.",
	},
	{
		question: "Can I vend power on the Haiven app?",
		answer:
			"Absolutely. Haiven integrates with utility metering systems, enabling seamless power vending within the app. Residents can purchase electricity, water, or gas digitally, while estate managers get full visibility into consumption, balances, and revenue collection.",
	},
	{
		question: "Can Haiven help manage maintenance issues?",
		answer:
			"Yes! Residents can submit issues like plumbing or light outages straight from their phones. The estate team gets notified, maintains the timeline in-app, and tracks every step till resolution. No more phone tags or lost requests.",
	},
	{
		question: "How does Haiven help with billing & utility recovery?",
		answer:
			"Haiven automates billing, sends reminders, and lets residents pay service charges, utilities, and security levies right from their phones. It’s all digital, trackable, and hassle-free.",
	},
	{
		question:
			"Can Haiven be customized or white-labeled for our estate's brand?",
		answer:
			"Haiven supports modular configurations and full white-label capabilities.",
	},
	{
		question: "Does Haiven have a visitor management system?",
		answer:
			"Yes. Our visitor management system allows residents to register guests by generating the guest code on the app and sending it via WhatsApp or any other channel. The guest receives the message with pass codes that are verified at the gate before entry is allowed.",
	},
	{
		question:
			"Does Haiven provide information on the onboarding process for communities?",
		answer:
			"Yes, we do. Once a community shows interest, we walk you through how Haiven works, what’s needed to get started, and how we’ll support your team during setup. From training estate managers and security personnel to helping residents onboard, we make the process smooth and stress-free.",
	},
	{
		question: "Can I manage multiple properties or units in one account?",
		answer:
			"Yes, you can! Haiven is built to let you manage multiple units or estates from a single account.\n\nWhether you own a few apartments or manage several estates, you can switch between properties, track payments, monitor activity, and oversee requests without logging in and out. Everything’s organized and easy to access in one dashboard.",
	},
	{
		question: "Is Haiven available on all devices?",
		answer:
			"Yes! Haiven comes as a mobile app (Android & iOS) and a web dashboard. Whether you're a resident logging in from your phone or a manager using a desktop.",
	},
];

const Faq = ({ variant }: { variant: "light" | "normal" | "dark" }) => {
	return (
		<section
			className={cn(
				"bg-haiven-blue py-[137px] px-4 md:px-8  xl:px-[100px] font-sans",
				variant === "light"
					? "bg-white"
					: variant === "dark"
						? "bg-[#373938]"
						: "bg-haiven-blue",
			)}
		>
			<div className="max-w-[1080px] mx-auto">
				<SectionBadge text="Support" />
				<div className="max-w-[843px]">
					<h6
						className={cn(
							"text-[#FFCC00] font-bold text-3xl lg:text-5xl leading-[100%] uppercase mt-[33px] mb-[19px]",
							variant === "dark" && "text-white",
						)}
					>
						Frequently Asked Questions
					</h6>
					<p
						className={cn(
							"font-regular text-base lg:text-lg leading-[150%] lg:leading-[28px] text-white",
							variant === "light" && "text-[#3B3C3D]",
						)}
					>
						Explore commonly asked questions about Haiven and discover
						everything you need to know about our smart living solution.
					</p>
				</div>

				<div className="">
					<Accordion
						type="single"
						collapsible
						// defaultValue="item-1"
						// className="max-w-lg"
					>
						{faqs.map((item) => (
							<AccordionItem key={item.question} value={item.question}>
								<AccordionTrigger
									className={cn(
										"text-white py-8 text-sm lg:text-lg font-medium leading-7",
										variant === "light" && "text-[#3B3C3D]",
									)}
								>
									{item.question}
								</AccordionTrigger>
								<AccordionContent
									className={cn(
										"text-white text-xs lg:text-base leading-[150%] lg:leading-6",
										variant === "light" && "text-[#3B3C3D]",
									)}
								>
									{item.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</section>
	);
};

export default Faq;
