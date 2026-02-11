import React from "react";
import SectionBadge from "./SectionBadge";
import Image from "next/image";

const list = [
	{
		link: "/images/lekki-gardens.webp",
		name: "lekki gardens",
	},
	{
		link: "/images/pwan-homes.webp",
		name: "pwan homes",
	},
	{
		link: "/images/jc-international.webp",
		name: "JC international",
	},
	{
		link: "/images/stron.webp",
		name: "Stron",
	},
	{
		link: "/images/watsoo.webp",
		name: "Watsoo",
	},

	{
		link: "/images/providus.webp",
		name: "Providus Bank",
	},
	{
		link: "/images/aedc.webp",
		name: "AEDC",
	},
	{
		link: "/images/c-b.webp",
		name: "CB",
	},
	{
		link: "/images/bedc.webp",
		name: "BEDC",
	},
	{
		link: "/images/eve-electric.webp",
		name: "Eve Electric",
	},
];

const Partners = () => {
	return (
		<div className="py-14 px-4">
			<div className="max-w-[1079px] mx-auto flex items-center justify-center flex-col gap-14">
				<SectionBadge text="Our Clients & Partners" />
				<div className="">
					<div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-y-[37px] gap-x-[71px]">
						{list.map((item, index) => (
							<Image
								key={index}
								alt={item.name}
								src={item.link}
								height={159}
								width={159}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Partners;
