"use client";

import React from "react";
import SectionBadge from "./SectionBadge";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

const testimonial = [
	{
		id: "1",
		name: "Joshua Biyere",
		community: "Lekki Phase 1",
		testimony:
			"Since we started using Haiven, communication with residents has improved a lot. I can send updates quickly, and the security team now logs every visitor easily. It just works.",
	},
	{
		id: "2",
		name: "Joshua Biyere",
		community: "Lekki Phase 1",
		testimony:
			"Since we started using Haiven, communication with residents has improved a lot. I can send updates quickly, and the security team now logs every visitor easily. It just works.",
	},
	{
		id: "3",
		name: "Joshua Biyere",
		community: "Lekki Phase 1",
		testimony:
			"Since we started using Haiven, communication with residents has improved a lot. I can send updates quickly, and the security team now logs every visitor easily. It just works.",
	},
	{
		id: "4",
		name: "Joshua Biyere",
		community: "Lekki Phase 1",
		testimony:
			"Since we started using Haiven, communication with residents has improved a lot. I can send updates quickly, and the security team now logs every visitor easily. It just works.",
	},
	{
		id: "5",
		name: "Joshua Biyere",
		community: "Lekki Phase 1",
		testimony:
			"Since we started using Haiven, communication with residents has improved a lot. I can send updates quickly, and the security team now logs every visitor easily. It just works.",
	},
	{
		id: "6",
		name: "Joshua Biyere",
		community: "Lekki Phase 1",
		testimony:
			"Since we started using Haiven, communication with residents has improved a lot. I can send updates quickly, and the security team now logs every visitor easily. It just works.",
	},
];

const Testimonial = () => {
	const [emblaRef] = useEmblaCarousel(
		{
			loop: true,
			direction: "ltr",
		},
		[
			AutoScroll({
				speed: 1.2, // autoplay speed
				startDelay: 0, // start immediately
				stopOnInteraction: false,
				stopOnMouseEnter: true, // pause on hover (optional)
			}),
		],
	);

	const [rtlEmblaRef] = useEmblaCarousel(
		{
			loop: true,
		},
		[
			AutoScroll({
				speed: -1.2, // 👈 reverse direction
				startDelay: 0,
				stopOnInteraction: false,
				stopOnMouseEnter: true,
			}),
		],
	);
	return (
		<div className="font-sans bg-haiven-blue pb-[101px] relative">
			<Image
				src="/images/haiven-leaf-light.png"
				alt="decorative leaf"
				width={101.69}
				height={86.85}
				className="absolute top-[207px] left-0"
			/>
			<Image
				src="/images/haiven-leaf-light.png"
				alt="decorative leaf"
				width={101.69}
				height={86.85}
				className="absolute top-0 left-[57px]"
			/>
			<div className="px-[84px] pt-[84px] flex flex-col justify-center items-center gap-[27.99px]">
				<SectionBadge text="Testimonials" />
				<h6 className="font-bold text-[40.72px] text-white leading-[100%]">
					WHAT OUR CUSTOMER SAY ABOUT{" "}
					<span className="text-accent-green">OUR SERVICES</span>
				</h6>
			</div>
			<div className="mt-[75.47px]">
				<div className="mb-[56.99px] overflow-hidden" ref={emblaRef}>
					<div className="flex items-center ">
						{testimonial.map((item) => (
							<div key={item.id} className="shrink-0 basis-[380px] px-2">
								<TestimonialCard
									id={item.id}
									community={item.community}
									name={item.name}
									testimony={item.testimony}
								/>
							</div>
						))}
					</div>
				</div>
				<div className="overflow-hidden" ref={rtlEmblaRef}>
					<div className="flex items-center">
						{testimonial.map((item) => (
							<div key={item.id} className="shrink-0 basis-[380px] px-2">
								<TestimonialCard
									id={item.id}
									community={item.community}
									name={item.name}
									testimony={item.testimony}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

interface Props {
	id: string;
	name: string;
	community: string;
	testimony: string;
}

function TestimonialCard({ community, id, name, testimony }: Props) {
	return (
		<div className="w-full">
			<div className="p-[20.36px] font-sans bg-white   rounded-[10.18px]">
				<div className="flex gap-[25.45px] mb-[15.45px]">
					<div className="size-[55.99px] rounded-full">
						<Image
							src="/images/User.png"
							alt="user"
							width={55.99}
							height={55.99}
						/>
					</div>
					<div className="">
						<p className="font-normal text-[20.36px] leading[26.3px] text-[#020202]">
							{name} {id}
						</p>
						<p className="text-[13.57px] leading-[20.36px] font-light">
							{community}
						</p>
					</div>
				</div>
				<hr />
				<div className="mt-[23.75px]">
					<p className="font-medium text-[13.57px] leading-[20.36px] text-[#373737]">
						{testimony}
					</p>
				</div>
			</div>
		</div>
	);
}

export default Testimonial;
