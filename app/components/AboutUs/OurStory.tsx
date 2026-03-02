import React from "react";
import SectionBadge from "../landing/SectionBadge";

const OurStory = () => {
	return (
		<section className="bg-haiven-blue py-[153.35px] font-sans">
			<div className="max-w-[976px] mx-auto bg-white py-[33.89px] px-[48.44px]">
				<div className="text-center flex flex-col items-center">
					<SectionBadge text="Our Values" />
					<h1 className="mt-[20.33px] font-bold text-[40.67px] max-w-[80%] leading-[100%] align-middle uppercase text-haiven-blue mb-[8.47px]">
						Our Story
					</h1>
					<div className="space-y-3 text-[#1D2C4D]">
						<p className="font-regular text-[13.56px] leading-[150%]">
							Haiven is a technology company making property and facility
							management simpler. Our journey began in 2014, driven by an idea
							to bring efficient systems from large organizations to everyday
							communities. This became a reality in 2019 with our MVP, and our
							first client is still with us.
						</p>
						<p className="font-regular text-[13.56px] leading-[150%]">
							In July 2024, our founder committed fully to Haiven, a platform
							built from years of experience to help people manage communities
							better every day.
						</p>
						<p className="font-regular text-[13.56px] leading-[150%]">
							Today, Haiven makes access, utility payments, and facility
							management easier, alongside a vibrant online marketplace. We
							simplify property complexities, bringing peace of mind and
							creating well-connected, dependable, and efficient spaces across
							Africa.
						</p>
					</div>

					<div className="max-w-[685.4px] mx-auto mt-[67.29px]">
						<div className="flex flex-col md:flex-row items-center gap-4 lg:gap-[130px] mb-4 lg:mb-[118.61px]">
							<p className="font-medium text-[27.11px] leading-[40.67px] text-black">
								Mission
							</p>
							<p className="font-sora-sans font-light text-start text-[13.56px] leading-[20.33px] text-[#3C3C43]">
								To make every day count with a more efficient way of living and
								operating residential and commercial communities with our tech
								solution.
							</p>
						</div>

						<div className="flex flex-col md:flex-row items-center gap-4 lg:gap-[130px]">
							<p className="font-medium text-[27.11px] leading-[40.67px] text-black">
								Vision
							</p>
							<p className="font-sora-sans font-light text-start text-[13.56px] leading-[20.33px] text-[#3C3C43]">
								To be the digital backbone powering safe, sustainable, and
								connected communities across Africa’s residential and commercial
								sectors.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default OurStory;
