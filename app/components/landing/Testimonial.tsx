"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import SectionBadge from "./SectionBadge";

export const testimonials = [
	{
		id: 1,
		name: "Tunde A",
		community: "Facility Manager - Oba Elegushi",
		testimony:
			"Before Haiven, we were using too many tools to manage simple things. Now, I can track maintenance, approve requests, and stay updated in real-time. It just makes my work less stressful.",
		image: "/images/tunde-a.webp",
	},
	{
		id: 2,
		name: "Grace O",
		community: "Facility Manager - Pearl Nuga Park Estate",
		testimony:
			"I don't have to chase residents about bills anymore. Haiven helps me send reminders and keep track of payments without stress. It really makes my job easier.",
		image: "/images/grace-o.webp",
	},
	{
		id: 3,
		name: "Yewande K",
		community: "Resident - Lekki Garden Phase 1",
		testimony:
			"Everything I need is on the app, paying bills, checking my payment history, even sending access codes to guests. It just makes life simpler.",
		image: "/images/yewande-k.webp",
	},
	{
		id: 4,
		name: "Chuka E",
		community: "Real Estate Developer - PWAN",
		testimony:
			"We use Haiven across a few of our estates. It helps us stay organized and gives residents a better experience. It's now part of our standard setup.",
		image: "/images/chuka-e.webp",
	},
	{
		id: 5,
		name: "Chinedu I",
		community: "Facility Manager - Oba Elegushi",
		testimony:
			"Before Haiven, we were using too many tools to manage simple things. Now, I can track maintenance, approve requests, and stay updated in real-time. It just makes my work less stressful.",
		image: "/images/chinedu-i.webp",
	},
	{
		id: 6,
		name: "Amaka I",
		community: "Estate Manager - Cedarwoods Apartments",
		testimony:
			"Since we started using Haiven, communication with residents has improved a lot. I can send updates quickly, and the security team now logs every visitor easily. It just works.",
		image: "/images/amaka-i.webp",
	},
	{
		id: 7,
		name: "Anonymous",
		community: "Chief Security Officer - Victory Estate",
		testimony:
			"Before Haiven, we relied on handwritten gate logs, people could enter with just a name. Now, with guest codes, we know exactly who's coming in, when and when they exit the estate. It's safer, smarter, and my guards love it.",
		image: "",
	},
	{
		id: 8,
		name: "Daniel A",
		community: "Artisan",
		testimony:
			"Joining Haiven's vendor marketplace gave my electrical business more visibility. I now get steady jobs from estates on the platform, and it's helped me grow my income and reputation.",
		image: "/images/daniel-a.webp",
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
			<div className="px-4 lg:px-[84px] pt-[84px] flex flex-col justify-center items-center gap-[27.99px] text-center">
				<SectionBadge text="Testimonials" />
				<h6 className="font-bold text-3xl lg:text-[40.72px] text-white leading-[100%]">
					WHAT OUR CUSTOMER SAY ABOUT{" "}
					<span className="text-accent-green">OUR SERVICES</span>
				</h6>
			</div>
			<div className="mt-[75.47px]">
				<div className="mb-[56.99px] overflow-hidden" ref={emblaRef}>
					<div className="flex items-center ">
						{testimonials.map((item) => (
							<div
								key={item.id}
								className="shrink-0 h-[280px] basis-[380px] px-2"
							>
								<TestimonialCard
									id={item.id}
									community={item.community}
									name={item.name}
									testimony={item.testimony}
									image={item.image}
								/>
							</div>
						))}
					</div>
				</div>
				<div className="overflow-hidden" ref={rtlEmblaRef}>
					<div className="flex">
						{testimonials.map((item) => (
							<div
								key={item.id}
								className="shrink-0 h-[280px] basis-[380px] px-2"
							>
								<TestimonialCard
									id={item.id}
									community={item.community}
									name={item.name}
									testimony={item.testimony}
									image={item.image}
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
	id: number;
	name: string;
	community: string;
	testimony: string;
	image: string;
}

function TestimonialCard({ community, id, name, testimony, image }: Props) {
	return (
		<div className="size-full">
			<div className="p-[20.36px] font-sans bg-white h-full  rounded-[10.18px]">
				<div className="flex gap-[25.45px] mb-[15.45px]">
					<div className="size-[55.99px] rounded-full">
						<Image
							src={image || "/images/User.png"}
							alt="user"
							width={55.99}
							height={55.99}
							className="rounded-full"
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
