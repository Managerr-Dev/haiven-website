"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import BookADemoForm from "./BookADemoForm";
import HeroHeading from "./HeroText";
import SectionBadge from "./SectionBadge";

const Hero = () => {
	return (
		<div className="flex flex-col lg:flex-row bg-haiven-blue min-h-screen pt-[127px] lg:pt-0 h-[978px] px-4 gap-4 lg:px-0 lg:gap-0">
			<div className="lg:pl-[100px] basis-1/2 flex justify-center items-center font-sans ">
				<div className="flex flex-col justify-center gap-3 max-w-[644px]">
					{/* Badge */}
					<SectionBadge text="Welcome to Haiven" />

					<HeroHeading />

					<p className="text-white text-base lg:text-xl font-light font-sora-sans">
						From digital access control to visitor management systems, utility
						payments, and community engagement tools, our all-in-one platform
						makes managing estates and gated communities and commercial centers
						easy.
					</p>

					<div className="flex items-center gap-[13.57px] mt-[20.36px]">
						<Link href="https://admin.haiven.net/signup">
							<Button className="w-[167px] rounded-[10.18px] py-4 h-auto px-[25.2px] flex items-center gap-1 text-[13.57px] font-medium bg-accent-green leading-[20.36px] text-haiven-blue hover:bg-white hover:text-haiven-blue">
								Get Started
							</Button>
						</Link>
						<BookADemoForm>
							<Button className="w-[167px] rounded-[10.18px] py-4 h-auto px-[25.2px] flex items-center gap-1 text-[13.57px] font-medium bg-transparent leading-[20.36px] text-white border-[0.8px] border-white hover:bg-white hover:text-haiven-blue">
								Request a Demo
							</Button>
						</BookADemoForm>
					</div>
				</div>
			</div>
			<div className="w-full basis-1/2 relative">
				<Image
					src="/images/haiven_hero.webp"
					fill
					alt="high rise building"
					loading="eager"
				/>
			</div>
		</div>
	);
};

export default Hero;
