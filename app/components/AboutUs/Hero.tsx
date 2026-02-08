import React from "react";
import SectionBadge from "../landing/SectionBadge";
import Image from "next/image";

const list = [
	"/images/who-we-are.webp",
	"/images/who-we-2.webp",
	"/images/who-we-3.webp",
];

const Hero = () => {
	return (
		<div className="bg-white relative min-h-screen xl:min-h-[978px]  font-sans pb-[146px]">
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
				<SectionBadge text="About Us" />

				<h1 className="font-bold text-[40.72px] max-w-[80%] leading-[100%] align-middle uppercase text-haiven-blue">
					Who are we?
				</h1>

				<p className="font-regular text-xl text-center leading-[150%] mb-1">
					At Haiven, our mission is to make every day count by creating a
					smarter, more efficient way to live and manage communities with modern
					community management tools.
				</p>
				<p className="font-regular text-xl text-center leading-[150%] mb-[67.47px]">
					We believe communities thrive when people feel secure, informed, and
					in control.
				</p>
				<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
					{list.map((item, index) => (
						<div key={index} className="">
							<Image
								src={item}
								alt="grid images"
								width={341}
								height={240}
								className="h-full"
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Hero;
