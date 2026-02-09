import Image from "next/image";
import Link from "next/link";
import React from "react";
import Navigation from "./Navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
	return (
		<footer className="bg-[#FAFBFC] px-4 pt-[142.07px] pb-[87.95px] font-sans">
			<div className="max-w-[1129.53px] mx-auto">
				<div className="flex flex-wrap justify-between items-start gap-4 mb-[29.61px]">
					<div className="flex flex-col">
						<Image
							src="/images/haiven-logo-blue.svg"
							alt="logo"
							width={133.28}
							height={36.43}
							className="mb-[10.18px]"
						/>
						<p className="mb-[22.9px] font-medium text-[13.57px] leading-[18.66px]">
							Powering Smarter Living, Every Day
						</p>
						<div className="">
							<Navigation
								variant="footer"
								className="font-medium text-[15.27px] leading-[20.36px]"
							/>
						</div>
					</div>
					<div className="">
						<form className="md:min-w-[422.89px]">
							<label
								htmlFor="newsletter"
								className="font-medium text-[11.88px] leading-[16.97px] mb-[5.09px] block"
							>
								Subscribe to our newsletter to stay up to date
							</label>
							<div className="flex gap-1">
								<Input
									className="py-[10.18px] px-[11.88px] bg-white font-medium text-[11.88px] leading-[16.97px] placeholder:text-[#344054] text-black border-[0.85px] rounded-[6.79px] shadow-[0px_0.85px_1.7px_0px_#1018280D]"
									placeholder="Enter your email"
								/>
								<Button className="bg-haiven-blue text-white py-[10.18px] px-[16.97px] font-semibold text-[13.57px] leading-[20.36px] rounded-[6.79px] border-[0.85px] border-[#13247E]">
									Subscribe
								</Button>
							</div>
						</form>
					</div>
				</div>
				<div className="flex gap-4 pt-[27.15px] flex-wrap justify-between max-w-[1058.68px] text-[#3B3C3D]">
					<p className="font-medium text-[13.57px] leading-[20.36px] text-[#3B3C3D]">
						&copy; {new Date().getFullYear()} Haiven. All rights reserved.
					</p>
					<div className="flex items-center gap-[13.57px] ">
						<Link
							href="/"
							className="font-medium text-[13.57px] leading-[20.36px]"
						>
							Terms
						</Link>
						<Link
							href="/"
							className="font-medium text-[13.57px] leading-[20.36px]"
						>
							Privacy
						</Link>
						<Link
							href="/"
							className="font-medium text-[13.57px] leading-[20.36px]"
						>
							Cookie
						</Link>
					</div>
					<div className="flex items-center gap-[20.36px]">
						<Link href="/">
							<Image
								src="/images/twitter.png"
								alt="twitter"
								width={20.36}
								height={20.36}
							/>
						</Link>
						<Link href="/">
							<Image
								src="/images/instagram.png"
								alt="instagram"
								width={20.36}
								height={20.36}
							/>
						</Link>
						<Link href="/">
							<Image
								src="/images/facebook.png"
								alt="facebook"
								width={20.36}
								height={20.36}
							/>
						</Link>
						<Link href="/">
							<Image
								src="/images/linkedin.png"
								alt="linkedin"
								width={20.36}
								height={20.36}
							/>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
