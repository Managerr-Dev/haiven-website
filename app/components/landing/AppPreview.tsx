import Image from "next/image";
import Link from "next/link";
import React from "react";

const AppPreview = () => {
	return (
		<section className="bg-haiven-blue pb-10 px-4 pt-[207px] font-sans ">
			<div className="relative mb-[35px]">
				<div className="bg-white relative rounded-[84px] max-w-[1107.88px] mx-auto px-4 lg:px-0 ">
					<div className="lg:pl-[85px] pt-[107px] pb-[119.81px] ">
						<div className="flex flex-col max-w-[335.93px]">
							<p className="font-extrabold text-3xl lg:text-[40.72px] leading-[100%] lg:leading-[52.59px] tracking-[-0.16%] mb-[6.79px]">
								Download App
							</p>
							<p className="text-[13.57px] font-regular leading-[150%] lg:leading-[100%] tracking-[-0.25px] mb-[27.15px]">
								Skip the stress. Pay bills, manage guests, and stay in control
								of your home, all from one easy-to-use app. Download Haiven and
								simplify your everyday living.
							</p>
						</div>
						<div className="flex gap-[6.79px]">
							<Link href="https://play.google.com/store/apps/details?id=com.anonymous.haiven">
								<Image
									src="/images/playstore.png"
									alt="gooole"
									width={163.72}
									height={55.14}
									className="rounded-lg"
								/>
							</Link>

							<Link href="https://apps.apple.com/ng/app/haiven/id6737174043">
								<Image
									src="/images/app-store.png"
									alt="gooole"
									width={163.72}
									height={55.14}
									className="rounded-lg"
								/>
							</Link>
						</div>
					</div>
					<Image
						src="/images/app-preview.png"
						alt="iphone with a preview of haiven mobile app"
						width={659.23}
						height={547.38}
						className="lg:absolute -top-[200px] -right-20 bottom-20"
					/>
				</div>
			</div>
			<section className="grid grid-cols-8 gap-5">
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
		</section>
	);
};

export default AppPreview;
