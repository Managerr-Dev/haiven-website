import React from "react";
import SectionBadge from "../landing/SectionBadge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const list = [
	"/images/who-we-are.webp",
	"/images/who-we-2.webp",
	"/images/who-we-3.webp",
];

interface Props {
	title: string;
	text: string;
	CTA: string;
	CTALink: string;
}

const Hero = ({ title, text, CTA, CTALink }: Props) => {
	return (
		<div className="bg-white relative  font-sans">
			<div className="relative max-w-[1071px] mx-auto gap-[27.99px] xl:pt-[167px] bg-white flex flex-col items-center text-center">
				<Image
					src="/images/haiven-leaf.svg"
					alt="decorative leaf"
					width={126.8}
					height={108.85}
					className="absolute top-20 left-20"
					preload={false}
				/>

				<Image
					src="/images/haiven-leaf.svg"
					alt="decorative leaf"
					width={126.8}
					height={108.85}
					className="absolute top-30 right-0"
					preload={false}
				/>
				<Image
					src="/images/haiven-leaf.svg"
					alt="decorative leaf"
					width={126.8}
					height={108.85}
					className="absolute left-[40%] top-1/2 -translate-y-1/2"
					preload={false}
				/>
				<Image
					src="/images/haiven-leaf.svg"
					alt="decorative leaf"
					width={126.8}
					height={108.85}
					className="absolute top-1/2  left-0"
					preload={false}
				/>
				<Image
					src="/images/haiven-leaf.svg"
					alt="decorative leaf"
					width={126.8}
					height={108.85}
					className="absolute top-1/2  right-0"
					preload={false}
				/>
				<SectionBadge text="Features" />

				<h1 className="font-bold text-[40.72px] max-w-[80%] leading-[100%] align-middle uppercase text-haiven-blue">
					{title}
				</h1>

				<p className="font-regular text-xl text-center leading-[150%] mb-[32.78px]">
					{text}
				</p>

				<div className="flex justify-center items-center">
					<Link href={CTALink}>
						<Button className="h-auto py-[13.06px] px-[30.43px] bg-white border border-accent-green text-accent-green font-medium text-[13.46px] leading-[20.2px]">
							{CTA}
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Hero;
