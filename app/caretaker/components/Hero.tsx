import Image from "next/image";
import ScrollLink from "./ScrollLink";

const Hero = () => {
	return (
		<section className="mx-auto max-w-[1180px] px-6 pt-16 pb-10 md:pt-[88px]">
			<div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14">
				<div>
					<p className="mb-[22px] text-[12.5px] font-semibold tracking-[0.1em] text-[#00A344] uppercase">
						Technology first. Human support when needed.
					</p>
					<h1 className="mb-6 font-alan text-[clamp(38px,4.6vw,62px)] leading-[1.04] font-semibold tracking-[-0.02em] text-balance text-[#16234A]">
						Who is looking after your property when you&rsquo;re not there?
					</h1>
					<p className="mb-5 max-w-[38em] text-[18px] leading-[1.6] text-pretty text-[#6B7A9E]">
						Run your property from your phone with one system for records, work
						orders, payments, access and reporting. When you need physical
						presence, add a certified Caretaker on the ground.
					</p>
					<p className="mb-8 text-[16.5px] leading-[1.6] font-medium text-[#16234A]">
						Every job recorded. Every naira accounted for. Every decision yours.
					</p>
					<div className="flex flex-wrap items-center gap-3">
						<ScrollLink
							target="signup"
							className="rounded-[12px] bg-[#00C853] px-[26px] py-[15px] text-[15.5px] font-semibold text-[#0B2E1B] transition-colors hover:bg-[#00B84A]"
						>
							Start free
						</ScrollLink>
						<ScrollLink
							target="signup"
							className="rounded-[12px] border border-[#D7DDEE] bg-white px-[26px] py-[15px] text-[15.5px] font-semibold text-[#1B2E6B] transition-colors hover:bg-[#E8EBF5]"
						>
							Apply for the Demo
						</ScrollLink>
					</div>
					<p className="mt-5 text-[13.5px] text-[#6B7A9E] tabular-nums">
						Demo properties from 1 October. Caretaker opens 1 November 2026.
					</p>
				</div>

				<div className="relative">
					<div className="aspect-[16/11] overflow-hidden rounded-[20px] bg-[#E8EBF5]">
						<Image
							src="/images/caretaker/hero.webp"
							alt="A property owner walking out of a gated Lagos apartment development, checking his phone, with a security officer at the gate behind him"
							width={1672}
							height={941}
							priority
							className="h-full w-full object-cover object-[50%_35%]"
						/>
					</div>
					<div className="mt-4 w-full rounded-[16px] border border-[#E8EBF5] bg-white p-[18px] shadow-[0_18px_44px_rgba(27,46,107,0.16)] sm:absolute sm:-bottom-9 sm:-left-8 sm:mt-0 sm:w-[300px]">
						<p className="mb-3.5 text-[11px] font-semibold tracking-[0.11em] text-[#6B7A9E] uppercase">
							Today&rsquo;s log
						</p>
						<div
							data-logline
							className="flex items-baseline gap-3 border-b border-[#F0F2F8] pb-3 [animation:logIn_0.55s_cubic-bezier(0.16,1,0.3,1)_0.5s_both]"
						>
							<span className="text-[13px] font-semibold text-[#00A344] tabular-nums">
								07:14
							</span>
							<span className="text-[14px] text-[#16234A]">
								Water tank checked{" "}
								<span className="text-[#6B7A9E]">&middot; Block B</span>
							</span>
						</div>
						<div
							data-logline
							className="flex items-baseline gap-3 pt-3 [animation:logIn_0.55s_cubic-bezier(0.16,1,0.3,1)_1.15s_both]"
						>
							<span className="text-[13px] font-semibold text-[#00A344] tabular-nums">
								09:02
							</span>
							<span className="text-[14px] text-[#16234A]">
								Complaint received{" "}
								<span className="text-[#6B7A9E]">&middot; Flat 4</span>
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
