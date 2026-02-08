import React from "react";
import SectionBadge from "../landing/SectionBadge";
import Image from "next/image";

const list = [
	{
		title: "Email Address",
		icon: "/images/email.svg",
		value: "mailto:info@haiven.net",
	},
	{
		title: "Phone Number",
		icon: "/images/phone.svg",
		value: "tel:+234 912 228 4189",
	},
	{
		title: "Office Address",
		icon: "/images/office.svg",
		value: "+234 912 228  4189",
	},
];

const Hero = () => {
	return (
		<div className="bg-white relative font-sans pb-[146px] xl:pt-[167px]">
			<div className="relative max-w-[1071px] mx-auto gap-[27.99px]  bg-white flex flex-col items-center text-center">
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
				<SectionBadge text="Contact Us" />

				<h1 className="font-sora-sans font-bold text-[40.73px] max-w-[80%] leading-[100%] align-middle uppercase text-haiven-blue">
					We’re here to <span className="text-[#FF8900]">assist</span>
				</h1>

				<p className="font-regular text-[16.97px] text-center leading-[150%] mb-[84.5px]">
					Let us know how we can help make your community experience better.
				</p>

				<div className="grid sm:grid-cols-3 justify-between  w-full max-w-[795px] mx-auto">
					{list.map((item, index) => (
						<Card key={index} {...item} />
					))}
				</div>
			</div>
		</div>
	);
};

interface Props {
	title: string;
	icon: string;
	value: string;
}

function Card({ title, icon, value }: Props) {
	return (
		<div className="flex flex-col items-center justify-center text-center">
			<div className="size-[47.52px] border-[4.24px] border-[#D0D3E5] rounded-full bg-haiven-blue flex items-center justify-center mb-[20.36px] ">
				<Image src={icon} alt={title} width={27.15} height={27.15} />
			</div>
			<p className="">{title}</p>
			<a className="" href={value}>
				{value.split(":")[1]}
			</a>
		</div>
	);
}

export default Hero;
