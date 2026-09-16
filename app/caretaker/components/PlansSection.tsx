import PlanInterestButton from "./PlanInterestButton";
import ScrollLink from "./ScrollLink";

const featureList = (items: string[], tone: "light" | "dark") => (
	<ul
		className={`m-0 mb-[26px] flex list-none flex-col gap-2.5 p-0 text-[14.5px] ${
			tone === "dark" ? "text-[#E8EBF5]" : "text-[#16234A]"
		}`}
	>
		{items.map((item) => (
			<li key={item}>{item}</li>
		))}
	</ul>
);

const PlansSection = () => {
	return (
		<section
			id="plans"
			className="scroll-mt-24 border-y border-[#E8EBF5] bg-white"
		>
			<div className="mx-auto max-w-[1180px] px-6 py-16 md:py-[88px]">
				<h2 className="mb-4 font-alan text-[clamp(28px,3.2vw,40px)] leading-[1.12] font-semibold tracking-[-0.015em] text-[#16234A]">
					Choose the setup that fits your property
				</h2>
				<p className="mb-12 text-[17px] leading-[1.6] text-[#6B7A9E]">
					Start with software. Add people and deeper operational support when your
					property needs it.
				</p>

				<p className="mb-5 text-[11px] font-semibold tracking-[0.13em] text-[#6B7A9E] uppercase">
					Software
				</p>
				<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
					<div className="flex flex-col rounded-[18px] border border-[#E8EBF5] bg-[#FAFBFD] p-[30px]">
						<p className="mb-1.5 font-alan text-[20px] font-semibold text-[#16234A]">
							Free
						</p>
						<p className="mb-[18px] text-[14.5px] text-[#6B7A9E]">
							For getting started
						</p>
						<p className="mb-[22px] text-[13.5px] font-semibold text-[#00A344]">
							Free while you&rsquo;re running one property
						</p>
						{featureList(
							[
								"Unit and tenant records",
								"Owner dashboard",
								"Complaint log",
								"Visitor register",
								"Bill reminders",
							],
							"light",
						)}
						<ScrollLink
							target="signup"
							className="mt-auto rounded-[12px] bg-[#00C853] px-5 py-[13px] text-center text-[15px] font-semibold text-[#0B2E1B] transition-colors hover:bg-[#00B84A]"
						>
							Start free
						</ScrollLink>
					</div>

					<div className="flex flex-col rounded-[18px] border border-[#E8EBF5] bg-[#FAFBFD] p-[30px]">
						<p className="mb-1.5 font-alan text-[20px] font-semibold text-[#16234A]">
							Essential
						</p>
						<p className="mb-[18px] text-[14.5px] text-[#6B7A9E]">
							For running the property digitally
						</p>
						<p className="mb-[22px] text-[13.5px] font-semibold text-[#6B7A9E]">
							Pricing confirmed at launch
						</p>
						{featureList(
							[
								"Everything in Free",
								"Tenant app and payments",
								"Full reporting",
								"Multi-property dashboard",
							],
							"light",
						)}
						<PlanInterestButton plan="Essential" variant="outline" />
					</div>
				</div>

				<div className="my-[52px] h-px bg-[#E8EBF5]" />

				<p className="mb-5 text-[11px] font-semibold tracking-[0.13em] text-[#6B7A9E] uppercase">
					With a certified Caretaker
				</p>
				<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
					<div className="flex flex-col rounded-[18px] border border-[#13214F] bg-[#13214F] p-[30px]">
						<div className="mb-1.5 flex items-center justify-between gap-3">
							<p className="font-alan text-[20px] font-semibold text-white">
								Managed
							</p>
							<span className="rounded-full bg-[#00C853] px-2.5 py-[5px] text-[11px] font-semibold tracking-[0.09em] text-[#0B2E1B] uppercase">
								Recommended
							</span>
						</div>
						<p className="mb-[18px] text-[14.5px] text-[#B9C4DF]">
							For properties that need a certified Caretaker
						</p>
						<p className="mb-[22px] text-[13.5px] font-semibold text-[#8FA0C6]">
							Pricing confirmed at launch
						</p>
						{featureList(
							[
								"Everything in Essential",
								"Certified Caretaker placed",
								"Training and supervision",
								"Weekly owner reporting",
							],
							"dark",
						)}
						<PlanInterestButton plan="Managed" variant="solid" />
					</div>

					<div className="flex flex-col rounded-[18px] border border-[#E8EBF5] bg-[#FAFBFD] p-[30px]">
						<p className="mb-1.5 font-alan text-[20px] font-semibold text-[#16234A]">
							Secure+
						</p>
						<p className="mb-[18px] text-[14.5px] text-[#6B7A9E]">
							For properties that need tighter operational and security support
						</p>
						<p className="mb-[22px] text-[13.5px] font-semibold text-[#6B7A9E]">
							Pricing confirmed at launch
						</p>
						{featureList(
							[
								"Everything in Managed",
								"Camera and security integration",
								"Monitoring and incident workflow",
								"Priority emergency response",
							],
							"light",
						)}
						<PlanInterestButton plan="Secure+" variant="outline" />
					</div>
				</div>

				<p className="mt-9 text-[15px] text-[#6B7A9E]">
					Not sure which fits? Apply for the Demo and we&rsquo;ll recommend the
					best setup for your property.
				</p>
			</div>
		</section>
	);
};

export default PlansSection;
