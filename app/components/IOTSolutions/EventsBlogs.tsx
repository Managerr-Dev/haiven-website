import React from "react";
import SectionBadge from "../landing/SectionBadge";
import Link from "next/link";
import Image from "next/image";

const list = [
	{
		title: "The Role of Technology in Modern Estate Management",
		description:
			"Lorem ipsum dolor sit amet consectetur. Eget amet netus morbi massa neque. Quis orci eu rhoncus duis. Pulvinar sem proin leo risus. Dictum risus blandit nec ",
		image: "/images/who-we-are.webp",
		category: "Technology",
		date: "May 15, 2025",
	},
	{
		title: "Sustainable Practices in Estate Maintenance and Development",
		description:
			"Lorem ipsum dolor sit amet consectetur. Eget amet netus morbi massa neque. Quis orci eu rhoncus duis. Pulvinar sem proin leo risus. Dictum risus blandit nec ",
		image: "/images/who-we-2.webp",
		category: "Sustainability",
		date: "May 15, 2025",
	},
	{
		title: "Effective Financial Planning for Long-Term Estate Sustainability",
		description:
			"Lorem ipsum dolor sit amet consectetur. Eget amet netus morbi massa neque. Quis orci eu rhoncus duis. Pulvinar sem proin leo risus. Dictum risus blandit nec ",
		image: "/images/who-we-3.webp",
		category: "Finance",
		date: "May 15, 2025",
	},
];

const EventsBlogs = () => {
	return (
		<section className="py-[84.83px]">
			<div className="max-w-[1112.94px] mx-auto font-sans ">
				<div className="">
					<SectionBadge text="Other Events & Blog Post" />
					<h4 className="text-[#1B1816] mt-[10.18px] font-regular text-[40.72px] leading-[48.86px]">
						Explore Similar Interests and Topics
					</h4>
				</div>
				<div className="mt-[67.86px]">
					<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-[18px]">
						{list.map((item, i) => (
							<BlogCard key={i} {...item} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

interface Props {
	title: string;
	description: string;
	image: string;
	category: string;
	date: string;
}

function BlogCard({ category, date, description, image, title }: Props) {
	return (
		<Link href="">
			<div className="p-[13.57px] bg-[#13247E08] border-[0.68px] border-[#13247E4D] rounded-[10.18px]">
				<div className="mb-[10.18px]">
					<Image src={image} alt={title} width={328.28} height={254.48} />
				</div>
				<div className="font-sans">
					<p className="font-semibold text-haiven-blue leading-[25.45px] text-[16.97px] mb-[10.18px]">
						{title}
					</p>
					<p className="font-light text-[#3C3C43] leading-[20.36px] text-[13.57px] mb-[13.57px]">
						{description}
					</p>

					<hr />
					<p className="my-[20.36px] text-[16.97px] font-semibold leading-[20.36px] text-[#FF8900]">
						{category}
					</p>
					<p className="font-semibold text-haiven-blue leading-[20.36px] text-[16.97px]">
						{date}
					</p>
				</div>
			</div>
		</Link>
	);
}

export default EventsBlogs;
