import { Button } from "@/components/ui/button";
import React from "react";

const ContactForm = () => {
	return (
		<form className="font-sans text-white px-[104px]">
			<div className="grid sm:grid-cols-2 gap-x-[42.43px] gap-y-[30.55px]">
				<div className="flex flex-col gap-2">
					<label
						className="font-regular text-[13.58px] leading-[20.37px] -tracking-[0.25px]"
						htmlFor="first_name"
					>
						First Name <span className="text-accent-green">*</span>
					</label>
					<input
						type="text"
						id="first_name"
						placeholder="First name"
						className="border-[0.85px] border-[#DADADA] rounded-md p-2 bg-white h-auto py-[13.58px] px-[10.54px] font-regular text-[13.58px] leading-[20.37px] text-[#979797]"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label
						className="font-regular text-[13.58px] leading-[20.37px] -tracking-[0.25px]"
						htmlFor="last_name"
					>
						Last Name <span className="text-accent-green">*</span>
					</label>
					<input
						type="text"
						id="last_name"
						placeholder="Last name"
						className="border-[0.85px] border-[#DADADA] rounded-md p-2 bg-white h-auto py-[13.58px] px-[10.54px] font-regular text-[13.58px] leading-[20.37px] text-[#979797]"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label
						className="font-regular text-[13.58px] leading-[20.37px] -tracking-[0.25px]"
						htmlFor="phone_number"
					>
						Phone Number <span className="text-accent-green">*</span>
					</label>
					<input
						type="tel"
						id="phone_number"
						placeholder="+234 80 000 0000"
						className="border-[0.85px] border-[#DADADA] rounded-md p-2 bg-white h-auto py-[13.58px] px-[10.54px] font-regular text-[13.58px] leading-[20.37px] text-[#979797]"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label
						className="font-regular text-[13.58px] leading-[20.37px] -tracking-[0.25px]"
						htmlFor="email"
					>
						Email Address <span className="text-accent-green">*</span>
					</label>
					<input
						type="email"
						id="email"
						placeholder="example@example.com"
						className="border-[0.85px] border-[#DADADA] rounded-md p-2 bg-white h-auto py-[13.58px] px-[10.54px] font-regular text-[13.58px] leading-[20.37px] text-[#979797]"
					/>
				</div>
			</div>

			<div className="mt-[30.55px] flex flex-col gap-2">
				<label
					className="font-regular text-[13.58px] leading-[20.37px] -tracking-[0.25px]"
					htmlFor="message"
				>
					Message <span className="text-accent-green">*</span>
				</label>
				<textarea
					id="message"
					rows={10}
					placeholder="Leave your message"
					className="border-[0.85px] border-[#DADADA] rounded-md p-2 bg-white h-auto py-[13.58px] px-[10.54px] font-regular text-[13.58px] leading-[20.37px] text-[#979797]"
				></textarea>
			</div>

			<div className="mt-[47.52px]">
				<Button className=" h-auto px-[78.69px] font-medium py-[13.58px] bg-accent-green text-white font-regular leading-[20.37px] rounded-[16.97px]">
					Submit Message
				</Button>
			</div>
		</form>
	);
};

export default ContactForm;
