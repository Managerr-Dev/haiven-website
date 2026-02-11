"use client";

import { submitContactForm } from "@/app/contact-us/actions";
import { Button } from "@/components/ui/button";
import { startTransition, useActionState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const ContactForm = () => {
	const [state, action, isPending] = useActionState(submitContactForm, null);
	const { executeRecaptcha } = useGoogleReCaptcha();

	const handleAction = async (formData: FormData) => {
		if (!executeRecaptcha) {
			console.error("Execute recaptcha not yet available");
			return;
		}
		const token = await executeRecaptcha("contact_form");
		formData.append("recaptchaToken", token);

		startTransition(() => {
			action(formData);
		});
	};

	return (
		<form
			action={handleAction}
			id="contact_form"
			className="font-sans text-white max-w-[903.7px] mx-auto px-4 large:px-[104px]"
		>
			{state?.message && (
				<div
					className={`p-4 rounded-md mb-4 ${
						state.success
							? "bg-green-50 text-green-800"
							: "bg-red-50 text-red-800"
					}`}
				>
					{state.message}
				</div>
			)}

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
						name="first_name"
						placeholder="First name"
						className="border-[0.85px] border-[#DADADA] rounded-md p-2 bg-white h-auto py-[13.58px] px-[10.54px] font-regular text-[13.58px] leading-[20.37px] text-[#979797]"
						required
					/>
					{state?.errors?.first_name && (
						<p className="text-red-500 text-xs">{state.errors.first_name[0]}</p>
					)}
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
						name="last_name"
						placeholder="Last name"
						className="border-[0.85px] border-[#DADADA] rounded-md p-2 bg-white h-auto py-[13.58px] px-[10.54px] font-regular text-[13.58px] leading-[20.37px] text-[#979797]"
						required
					/>
					{state?.errors?.last_name && (
						<p className="text-red-500 text-xs">{state.errors.last_name[0]}</p>
					)}
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
						name="phone_number"
						placeholder="+234 80 000 0000"
						className="border-[0.85px] border-[#DADADA] rounded-md p-2 bg-white h-auto py-[13.58px] px-[10.54px] font-regular text-[13.58px] leading-[20.37px] text-[#979797]"
						required
					/>
					{state?.errors?.phone_number && (
						<p className="text-red-500 text-xs">
							{state.errors.phone_number[0]}
						</p>
					)}
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
						name="email"
						placeholder="example@example.com"
						className="border-[0.85px] border-[#DADADA] rounded-md p-2 bg-white h-auto py-[13.58px] px-[10.54px] font-regular text-[13.58px] leading-[20.37px] text-[#979797]"
						required
					/>
					{state?.errors?.email && (
						<p className="text-red-500 text-xs">{state.errors.email[0]}</p>
					)}
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
					name="message"
					rows={10}
					placeholder="Leave your message"
					className="border-[0.85px] border-[#DADADA] rounded-md p-2 bg-white h-auto py-[13.58px] px-[10.54px] font-regular text-[13.58px] leading-[20.37px] text-[#979797]"
					required
				></textarea>
				{state?.errors?.message && (
					<p className="text-red-500 text-xs">{state.errors.message[0]}</p>
				)}
			</div>

			<div className="mt-[47.52px]">
				<Button
					disabled={isPending}
					className=" h-auto px-[78.69px] font-medium py-[13.58px] bg-accent-green text-white font-regular leading-[20.37px] rounded-[16.97px] disabled:opacity-50"
				>
					{isPending ? "Submitting..." : "Submit Message"}
				</Button>
			</div>
		</form>
	);
};

export default ContactForm;
