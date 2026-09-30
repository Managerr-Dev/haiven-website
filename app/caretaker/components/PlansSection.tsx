import {
	Check,
	ClipboardCheck,
	House,
	type LucideIcon,
	ShieldCheck,
	SlidersHorizontal,
} from "lucide-react";
import type { PlanName } from "../data";
import CaretakerSupport from "./CaretakerSupport";
import PlanComparison from "./PlanComparison";
import PlanInterestButton from "./PlanInterestButton";

const plans: {
	name: PlanName;
	icon: LucideIcon;
	promise: string;
	benefits: string[];
	price: React.ReactNode;
	cta: string;
	recommended?: boolean;
}[] = [
	{
		name: "Free",
		icon: House,
		promise: "Keep a small property organised.",
		benefits: [
			"1 property · 6 tenants",
			"1 admin account",
			"Records, bills & issues",
		],
		price: (
			<>
				₦0 <span className="text-[13px] font-normal text-(--ct-muted)">/ month</span>
			</>
		),
		cta: "Join free waitlist",
	},
	{
		name: "Essential",
		icon: SlidersHorizontal,
		promise: "Run it with less admin.",
		benefits: [
			"More tenants · 3 admins",
			"Automatic bills & renewals",
			"Reports & team access",
		],
		price: "Paid plan",
		cta: "Get pricing",
		recommended: true,
	},
	{
		name: "Managed",
		icon: ClipboardCheck,
		promise: "Let Haiven follow through.",
		benefits: [
			"Weekly owner reports",
			"Follow-up on open issues",
			"Works with your team",
		],
		price: "Service plan",
		cta: "Discuss support",
	},
	{
		name: "Secure+",
		icon: ShieldCheck,
		promise: "Add security oversight.",
		benefits: [
			"Camera & access integration",
			"Monitoring & incident records",
			"Agreed incident escalation",
		],
		price: "Custom quote",
		cta: "Get assessed",
	},
];

const PlansSection = () => {
	return (
		<section
			id="plans"
			className="ct-plans scroll-mt-24 bg-(--ct-bg) text-(--ct-ink)"
		>
			<div className="mx-auto max-w-[1180px] px-6 py-16 md:py-[88px]">
				<header className="mx-auto mb-12 max-w-[620px] text-center">
					<p className="mb-3 text-[12px] font-semibold tracking-[0.15em] text-(--ct-muted) uppercase">
						Caretaker plans
					</p>
					<h2 className="mb-4 font-alan text-[clamp(30px,4.2vw,44px)] leading-[1.12] font-semibold tracking-[-0.025em] text-(--ct-ink)">
						Start free. Add support
						<br />
						when you need it.
					</h2>
					<p className="mx-auto max-w-[440px] text-[16px] leading-[1.65] text-(--ct-muted)">
						Choose how you run your property. A physical caretaker is always
						optional.
					</p>
				</header>

				<div className="grid grid-cols-1 gap-x-4 gap-y-7 min-[480px]:grid-cols-2 lg:grid-cols-4">
					{plans.map((plan) => {
						const Icon = plan.icon;
						const dark = plan.recommended;
						return (
							<article
								key={plan.name}
								className={`relative flex min-w-0 flex-col rounded-[14px] border px-5 pt-6 pb-5 ${
									dark
										? "border-[#1B2E6B] bg-[#1B2E6B] text-white"
										: "border-(--ct-line) bg-(--ct-paper) text-(--ct-ink)"
								}`}
							>
								{dark && (
									<div className="absolute -top-3 left-4 rounded-[5px] bg-[#00C853] px-2.5 py-[5px] text-[12px] font-bold tracking-[0.02em] whitespace-nowrap text-[#0B2B32]">
										Recommended
									</div>
								)}
								<div
									className={`mt-1 mb-4 flex h-10 w-10 flex-none items-center justify-center rounded-[9px] ${
										dark ? "bg-[#344783] text-white" : "bg-(--ct-soft)"
									}`}
								>
									<Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.65} />
								</div>
								<h3 className="mb-2 font-alan text-[22px] leading-[1.2] font-semibold tracking-[-0.02em]">
									{plan.name}
								</h3>
								<p
									className={`mb-5 min-h-[44px] text-[14.5px] leading-[1.5] ${
										dark ? "text-[#D3DCF2]" : "text-(--ct-muted)"
									}`}
								>
									{plan.promise}
								</p>
								<ul
									className={`m-0 mb-5 flex flex-1 list-none flex-col gap-3 border-t p-0 pt-4 ${
										dark ? "border-[#4B5B8C]" : "border-(--ct-line)"
									}`}
								>
									{plan.benefits.map((benefit) => (
										<li
											key={benefit}
											className="flex items-start gap-2 text-[14px] leading-[1.5]"
										>
											<Check
												aria-hidden="true"
												strokeWidth={2.25}
												className={`mt-[4px] h-3.5 w-3.5 flex-none ${
													dark ? "text-[#56DE90]" : "text-(--ct-check)"
												}`}
											/>
											<span>{benefit}</span>
										</li>
									))}
								</ul>
								<p className="mb-3 min-h-[21px] text-[14px] leading-[1.5] font-semibold">
									{plan.price}
								</p>
								<PlanInterestButton
									plan={plan.name}
									label={plan.cta}
									variant={dark ? "solid" : "outline"}
								/>
							</article>
						);
					})}
				</div>

				<PlanComparison />

				<CaretakerSupport />

				<p className="mt-6 text-center text-[13.5px] leading-[1.6] text-(--ct-muted)">
					Paid pricing confirmed at launch. Hardware quoted separately.
				</p>
			</div>
		</section>
	);
};

export default PlansSection;
