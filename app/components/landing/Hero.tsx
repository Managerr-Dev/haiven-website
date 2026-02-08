import Image from "next/image";
import Navbar from "../Navbar";
import SectionBadge from "./SectionBadge";
import { Button } from "@/components/ui/button";

const Hero = () => {
	return (
		<div className="flex  bg-haiven-blue min-h-screen xl:h-[978px]">
			<div className="pl-[100px] basis-1/2 flex justify-center items-center font-sans ">
				<div className="flex flex-col justify-center gap-3 max-w-[644px]">
					{/* Badge */}
					<SectionBadge text="Welcome to Haiven" />

					<h1 className="font-bold text-5xl text-white uppercase leading-[60px]">
						Manage Every Aspect of Your{" "}
						<span className="text-accent-green">Estate</span> from{" "}
						<span className="text-accent-green">One Place</span>
					</h1>

					<p className="text-white text-2xl font-light font-sora-sans">
						From digital access control to visitor management systems, utility
						payments, and community engagement tools, our all-in-one platform
						makes managing estates and gated communities and commercial centers
						easy.
					</p>

					<div className="flex items-center gap-[13.57px] mt-[20.36px]">
						<Button className="rounded-[10.18px] py-4 h-auto px-[25.2px] flex items-center gap-1 text-[13.57px] font-medium bg-accent-green leading-[20.36px] text-haiven-blue hover:bg-white hover:text-haiven-blue">
							Get Started
						</Button>
						<Button className="rounded-[10.18px] py-4 h-auto px-[25.2px] flex items-center gap-1 text-[13.57px] font-medium bg-transparent leading-[20.36px] text-white border-[0.8px] border-white hover:bg-white hover:text-haiven-blue">
							Request a Demo
						</Button>
					</div>
				</div>
			</div>
			<div className="basis-1/2 relative">
				<Image src="/images/haiven_hero.webp" fill alt="high rise building" />
			</div>
		</div>
	);
};

export default Hero;
