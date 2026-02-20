"use client";

import { submitDemoRequest } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { startTransition, useActionState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const BookADemoForm = ({ children }: { children: React.ReactNode }) => {
	const [state, action, isPending] = useActionState(submitDemoRequest, null);
	const { executeRecaptcha } = useGoogleReCaptcha();

	const handleAction = async (formData: FormData) => {
		if (!executeRecaptcha) {
			console.error("Execute recaptcha not yet available");
			return;
		}
		const token = await executeRecaptcha("demo_form");

		formData.append("reCAPTCHA", token);

		startTransition(() => {
			action(formData);
		});
	};
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="max-h-[80vh] overflow-y-scroll">
				<DialogTitle>Book a demo</DialogTitle>
				<form
					action={handleAction}
					id="demo_form"
					className="font-sans text-black"
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

					{state?.success ? (
						""
					) : (
						<>
							<div className="grid sm:grid-cols-2 gap-x-[42.43px] gap-y-[30.55px]">
								<div className="flex flex-col gap-2">
									<label
										className="font-regular text-[13.58px] leading-[20.37px] -tracking-[0.25px]"
										htmlFor="first_name"
									>
										Name <span className="text-accent-green">*</span>
									</label>
									<input
										type="text"
										id="name"
										name="name"
										placeholder="Full name"
										className="border-[0.85px] border-[#DADADA] rounded-md p-2 bg-white h-auto py-[13.58px] px-[10.54px] font-regular text-[13.58px] leading-[20.37px]  placeholder:text-[#979797] text-black"
										required
									/>
									{state?.errors?.name && (
										<p className="text-red-500 text-xs">
											{state.errors.name[0]}
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
										className="border-[0.85px] border-[#DADADA] rounded-md p-2 bg-white h-auto py-[13.58px] px-[10.54px] font-regular text-[13.58px] leading-[20.37px]  placeholder:text-[#979797] text-black"
										required
									/>
									{state?.errors?.email && (
										<p className="text-red-500 text-xs">
											{state.errors.email[0]}
										</p>
									)}
								</div>
							</div>
							<div className="flex flex-col gap-2 mt-[30.55px]">
								<label
									className="font-regular text-[13.58px] leading-[20.37px] -tracking-[0.25px]"
									htmlFor="community_name"
								>
									Residence/Community/Company Name{" "}
									<span className="text-accent-green">*</span>
								</label>
								<input
									type="text"
									id="community_name"
									name="community_name"
									placeholder="haiven estate"
									className="border-[0.85px] border-[#DADADA] rounded-md p-2 bg-white h-auto py-[13.58px] px-[10.54px] font-regular text-[13.58px] leading-[20.37px]  placeholder:text-[#979797] text-black"
									required
								/>
								{state?.errors?.community_name && (
									<p className="text-red-500 text-xs">
										{state.errors.community_name[0]}
									</p>
								)}
							</div>

							<div className="mt-[30.55px] flex flex-col gap-2">
								<label
									className="font-regular text-[13.58px] leading-[20.37px] -tracking-[0.25px]"
									htmlFor="message"
								>
									What problem are you trying to solve?{" "}
									<span className="text-accent-green">*</span>
								</label>
								<textarea
									id="message"
									name="message"
									rows={10}
									placeholder="Leave your message"
									className="border-[0.85px] border-[#DADADA] rounded-md p-2 bg-white h-auto py-[13.58px] px-[10.54px] font-regular text-[13.58px] leading-[20.37px] placeholder:text-[#979797] text-black"
									required
								></textarea>
								{state?.errors?.message && (
									<p className="text-red-500 text-xs">
										{state.errors.message[0]}
									</p>
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
						</>
					)}
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default BookADemoForm;
