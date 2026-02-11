import React from "react";
import SectionBadge from "./SectionBadge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

const AboutUs = () => {
	return (
		<section className="py-[114px] p-4 bg-[#FAFBFC] relative">
			<Image
				src="/images/haiven-leaf.svg"
				alt="decorative leaf"
				width={126.8}
				height={108.85}
				className="absolute top-10"
				preload={false}
			/>
			<Image
				src="/images/haiven-leaf.svg"
				alt="decorative leaf"
				width={126.8}
				height={108.85}
				className="absolute bottom-10"
				preload={false}
			/>
			<div className="relative max-w-[1041px] mx-auto flex flex-col items-center justify-center">
				<div className="mb-[33px]">
					<SectionBadge text="About Us" />
				</div>
				<h2 className="max-w-[672px] font-bold text-3xl lg:text-5xl leading-[100%] text-center align-middle mb-[19px] text-haiven-blue">
					BUILDING SMART CONNECTED COMMUNITIES
				</h2>

				<Image
					src="/images/haiven-leaf.svg"
					alt="decorative leaf"
					width={126.8}
					height={108.85}
					className="absolute -bottom-10 left-40"
					preload={false}
				/>
				 <Image
					src="/images/haiven-leaf.svg"
					alt="decorative leaf"
					width={126.8}
					height={108.85}
					className="absolute xl:block hidden -bottom-10 -right-10"
					preload={false}
				/>
				<Image
					src="/images/haiven-leaf.svg"
					alt="decorative leaf"
					width={126.8}
					height={108.85}
					className="absolute top-0 right-0 xl:-right-20"
					preload={false}
				/>

				<p className="text-center font-normalctext-base lg:text-xl leading-[150%]">
					Haiven is designed to revolutionize the way asset owners, facility
					managers, residents, and security personnel interact with their living
					or commercial environment. With advanced access control, energy
					monitory, streamlined bill payments, and enhanced communication tools,
					we empower communities to live smarter, safer, and more comfortably
				</p>

				{/* TODO:Button */}
				<div className="flex items-center justify-center mt-[23.75px]">
					<Button className="h-auto px-[25.2px] py-[12.5px] flex items-center gap-1 text-[13.57px] font-medium text-accent-green leading-[20.36px] bg-white border-[0.8px] border-accent-green">
						Learn More <ArrowUpRight />
					</Button>
				</div>
			</div>
		</section>
	);
};

export default AboutUs;
