import React from "react";
import Hero from "../components/IOTSolutions/Hero";
import WhatWeDo from "../components/IOTSolutions/WhatWeDo";
import EventsBlogs from "../components/IOTSolutions/EventsBlogs";
import Image from "next/image";

const page = () => {
	return (
		<div className="relative">
			<Hero />
			<WhatWeDo />
			<EventsBlogs />
			<section className="bg-haiven-blue py-[11.48px] grid grid-cols-8 gap-5">
				{Array(8)
					.fill(1)
					.map((_, index) => (
						<Image
							key={index}
							src="/images/haiven-leaf-light.png"
							alt="decorative leaf"
							width={150.47}
							height={113.34}
						/>
					))}
			</section>
		</div>
	);
};

export default page;
