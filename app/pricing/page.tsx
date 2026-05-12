"use client";

import { CheckCircle2, Info } from "lucide-react";
import { useState } from "react";
import SectionBadge from "../components/landing/SectionBadge";
import Image from "next/image";
import { cn } from "@/lib/utils";

const planFeatures = [
	"Digital Access Control",
	"In-App Messaging",
	"Admin Dashboard",
	"Payment Wallet",
	"Announcements",
	"Voting & Polls",
	"Service Marketplace",
	"Issue Tracking",
	"Revenue Acquisition",
];

const plans = [
	{
		name: "Standard plan",
		price: "N2500/mth",
		badge: "Up to 500 Units",
		description:
			"Lite plan with access control and electricity vending for automated management of estates with up to 500 reserve resources.",
		featured: false,
		cta: "Get started",
	},
	{
		name: "Freemium plan",
		price: "N0/mth",
		badge: "Most popular",
		description: "Validate the system first before adding more features",
		featured: true,
		cta: "Get started",
	},
	{
		name: "Super plan",
		price: "N2000/mth",
		badge: "500 - 5000 Units",
		description:
			"Lite plan with access control and electricity vending for automated management of estates with up to 500 reserve resources.",
		featured: false,
		cta: "Get Annual",
	},
];

const addons = [
	{
		name: "Technical Support",
		description:
			"Access to technical support services, system updates, patches, and maintenance releases. Following these monthly comprehensive support period.",
		pricing: "5% of Annual Core Subscription Fee / year",
		icon: null,
	},
	{
		name: "Infrastructure Fee",
		description:
			"An annual fee for integrated system covering fee unlimited data storage, and baseline cloud service costs associated with supporting each specific System Integration.",
		pricing: "NGN5,000 / per integrated system",
		icon: "orange",
	},
];

const calculatorPlans = [
	{ name: "Standard Plan", displayPrice: "N1500/Unit", ratePerUnit: 40 },
	{ name: "Super Plan", displayPrice: "N1500/Unit", ratePerUnit: 40 },
	{ name: "Mega Plan", displayPrice: "N1500/Unit", ratePerUnit: 40 },
	{ name: "Enterprise Plan", displayPrice: "N1500/Unit", ratePerUnit: 40 },
];

const BASE_FEE = 1500;

export default function PricingPage() {
	const [units, setUnits] = useState(500);
	const [manualUnits, setManualUnits] = useState("");
	const [selectedPlan, setSelectedPlan] = useState("Standard Plan");
	const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
		"monthly",
	);

	const effectiveUnits = manualUnits ? Math.max(1, Number(manualUnits)) : units;
	const activePlan = calculatorPlans.find((p) => p.name === selectedPlan)!;
	const unitSubtotal = effectiveUnits * activePlan.ratePerUnit;
	const totalMonthly = BASE_FEE + unitSubtotal;

	return (
		<main className="bg-white pb-24  text-[#1d2d35]">
			<div className="bg-white relative px-4 font-sans mb-[27.68px]">
				<div className="relative max-w-[1071px] mx-auto gap-[27.99px] pt-[167px] bg-white flex flex-col items-center text-center">
					<Image
						src="/images/haiven-leaf.svg"
						alt="decorative leaf"
						width={126.8}
						height={108.85}
						className="absolute top-20 left-20"
						preload={false}
					/>

					<Image
						src="/images/haiven-leaf.svg"
						alt="decorative leaf"
						width={126.8}
						height={108.85}
						className="absolute top-30 right-0"
						preload={false}
					/>
					<Image
						src="/images/haiven-leaf.svg"
						alt="decorative leaf"
						width={126.8}
						height={108.85}
						className="absolute left-[40%] top-1/2 -translate-y-1/2"
						preload={false}
					/>
					<Image
						src="/images/haiven-leaf.svg"
						alt="decorative leaf"
						width={126.8}
						height={108.85}
						className="absolute top-1/2  left-0"
						preload={false}
					/>
					<Image
						src="/images/haiven-leaf.svg"
						alt="decorative leaf"
						width={126.8}
						height={108.85}
						className="absolute top-1/2  right-0"
						preload={false}
					/>
					<SectionBadge text="Pricing" />

					<h1 className="font-bold text-[40.72px] max-w-[80%] leading-[100%] align-middle uppercase text-haiven-blue">
						Core Pricing <span className="text-[#FF8900]">Plan</span>
					</h1>

					<p className="font-regular text-base text-center leading-[150%]">
						Simple, transparent pricing for every community size.
					</p>
				</div>
			</div>
			{/* Pricing Plans */}
			<section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 font-sans">
				{/* <div className="text-center">
					<p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#13247e]/70">
						Simple, transparent pricing for every community size.
					</p>
					<h1 className="mt-3 text-3xl font-extrabold uppercase text-[#13247e]">
						{billingCycle === "monthly" ? "Monthly Billing" : "Annual Billing"}
					</h1>
				</div> */}

				{/* Billing Toggle */}
				<div className="flex flex-col items-center gap-3">
					<div className="mx-auto flex gap-2 border border-[#F2F4F7] rounded-md bg-[#F9FAFB] p-1.5">
						<button
							onClick={() => setBillingCycle("monthly")}
							className={`rounded-[6px] px-5 py-2 text-xs font-semibold transition-colors ${
								billingCycle === "monthly"
									? "bg-white text-[#344054]"
									: "text-[#8E8E93] hover:bg-gray-50"
							}`}
						>
							Monthly Billing
						</button>
						<button
							onClick={() => setBillingCycle("annual")}
							className={`rounded-[6px] px-5 py-2 text-xs font-semibold transition-colors ${
								billingCycle === "annual"
									? "bg-white text-[#344054]"
									: "text-[#8E8E93] hover:bg-gray-50"
							}`}
						>
							Annual Billing
						</button>
					</div>
				</div>

				{/* Important Notice */}
				<div className="flex items-center gap-1 font-semibold bg-[#F99F431F] p-3 ">
					<div className="text-[#6f5127] flex items-center">
						<Info className="mr-1 inline text-[#CF9558]" />
						<span className="font-semibold tracking-tight text-2xl font-poppins-sans  text-[#3B3C3D]">
							Important
						</span>
					</div>
					<p className="text-xs leading-4.5 font-sans text-[#8E8E93]">
						Haiven charges per unit, not per property. For example, a 20-unit
						apartment building would be charged for 20 units.
					</p>
				</div>

				{/* Pricing Cards */}
				<div className="grid gap-6 md:grid-cols-3 items-center">
					{plans.map((plan) => (
						<article
							key={plan.name + plan.price}
							className={`relative flex flex-col rounded-[14.13px] bg-white shadow-[0_4px_20px_0_rgba(19,36,126,0.12)]`}
						>
							<div
								className="py-5 px-7 rounded-t-[14.13px]"
								style={
									plan.featured
										? {
												background:
													"linear-gradient(180deg, #13247E 0%, #1ED760 100%)",
											}
										: {}
								}
							>
								{/* Badge */}
								<p
									className={`inline-block min-w-[125px] self-start rounded-full px-2.5 py-1 text-[10px] font-medium capitalize tracking-[0.06em] ${
										plan.featured
											? "bg-white/20 text-white"
											: "bg-[#1ED760] text-[#13247E]"
									}`}
								>
									{plan.name}
								</p>

								{/* Price */}
								<h2 className="mt-1 text-[42.39px] leading-[52.99px] tracking-[-2px]  font-semibold ">
									{plan.price}
								</h2>
								{/* Plan badge */}
								<p
									className={` text-[10px] font-semibold uppercase tracking-widest mb-7 ${
										plan.featured ? "text-white/70" : "text-[#8c94a2]"
									}`}
								>
									{plan.badge}
								</p>

								<hr />
							</div>

							<div className="px-7 pt-3">
								{/* Description */}
								<p className="text-sm leading-5.25 text-[#475467]">
									{plan.description}
								</p>

								{/* Features */}
								<ul className="mt-6 flex-1 space-y-3.5 mb-3">
									{planFeatures.map((feature) => (
										<li
											key={feature}
											className="flex items-center gap-2 text-sm leading-5.25  text-[#475467]"
										>
											<CheckCircle2 className="h-5 w-5 shrink-0 text-[#1ED760]" />
											<span>{feature}</span>
										</li>
									))}
								</ul>

								<div className="border-t py-7">
									<button
										className={`bg-[#1ED760] text-white leading-5.25  w-full rounded-lg py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 										}`}
									>
										{plan.cta}
									</button>
								</div>
								{/* CTA */}
							</div>
						</article>
					))}
				</div>

				{/* See more plans */}
				<div className="mt-2 flex justify-end">
					<button className="inline-flex items-center gap-2 text-xs font-medium text-[#5d6b7d] underline">
						See more plans
						<span
							className="inline-block h-5 w-5 rounded"
							style={{
								background: "linear-gradient(135deg, #13247E 0%, #1ED760 100%)",
							}}
						/>
					</button>
				</div>
			</section>

			{/* Add-ons & Integration */}
			<section className="mx-auto mt-20 w-full max-w-6xl px-4">
				<div className="mb-6 text-center">
					<p className="text-[11px] uppercase tracking-[0.2em] text-[#8c94a2]">
						+ optional
					</p>
					<h2 className="mt-2 text-4xl font-extrabold uppercase text-[#13247e]">
						<span style={{ color: "#FF8900" }}>Add-ons</span> &amp; Integration
					</h2>
				</div>

				<div className="overflow-hidden rounded-2xl border border-[#dfe6ef] bg-white shadow-[0_4px_24px_0_rgba(19,36,126,0.08)]">
					{/* Table header */}
					<div className="grid grid-cols-[1.5fr_2.5fr_1.5fr] bg-[#13247e] px-6 py-3 text-sm font-semibold text-white">
						<p>Add-On</p>
						<p>Description</p>
						<p>Pricing</p>
					</div>

					{addons.map((addon, index) => (
						<div
							key={addon.name}
							className={`grid grid-cols-[1.5fr_2.5fr_1.5fr] gap-4 px-6 py-5 text-sm ${
								index < addons.length - 1 ? "border-b border-[#e6edf5]" : ""
							}`}
						>
							<div className="flex items-start gap-2">
								{addon.icon === "orange" && (
									<span
										className="mt-0.5 inline-block h-4 w-1.5 shrink-0 rounded-sm"
										style={{ backgroundColor: "#FF8900" }}
									/>
								)}
								<p className="font-semibold text-[#2f3f55]">{addon.name}</p>
							</div>
							<p className="text-[#5d6b7d]">{addon.description}</p>
							<p className="font-semibold text-[#13247e]">{addon.pricing}</p>
						</div>
					))}
				</div>
			</section>

			{/* Interactive Calculator */}
			<section className="mx-auto mt-20 w-full max-w-6xl px-4">
				<div className="mb-6 text-center">
					<p className="text-[11px] uppercase tracking-[0.2em] text-[#8c94a2]">
						+ calculator
					</p>
					<h2 className="mt-2 text-4xl font-extrabold uppercase text-[#13247e]">
						Interactive <span style={{ color: "#FF8900" }}>Calculator</span>
					</h2>
				</div>

				<div className="overflow-hidden rounded-2xl border border-[#dfe6ef] bg-white shadow-[0_4px_24px_0_rgba(19,36,126,0.08)]">
					{/* Calculator header */}
					<div
						className="px-6 py-4"
						style={{
							background: "linear-gradient(90deg, #13247E 0%, #1ED760 100%)",
						}}
					>
						<p className="text-base font-bold text-white">
							Monthly Price Calculator
						</p>
						<p className="text-xs text-white/80">
							Estimate your monthly cost based on your specific needs.
						</p>
					</div>

					<div className="space-y-6 p-6">
						{/* Info notice */}
						<div className="flex items-start gap-2 rounded-lg bg-[#edf3fb] px-3 py-2.5 text-xs text-[#5d6b7d]">
							<Info className="mt-0.5 h-4 w-4 shrink-0 text-[#4f7aa9]" />
							<span>
								Add-ons are per year and not monthly. For example: 1 unit
								apartments building would be charged N1000 only.
							</span>
						</div>

						{/* Units Slider */}
						<div>
							<div className="mb-2 flex items-center justify-between">
								<label
									htmlFor="units-slider"
									className="cursor-pointer text-sm font-medium text-[#2d3e54]"
								>
									Number of Units
								</label>
								<span className="text-sm font-bold text-[#13247e]">
									{effectiveUnits}
								</span>
							</div>
							<input
								id="units-slider"
								type="range"
								min={1}
								max={2000}
								value={units}
								onChange={(e) => {
									setUnits(Number(e.target.value));
									setManualUnits("");
								}}
								className="h-2 w-full cursor-pointer appearance-none rounded-full"
								style={{ accentColor: "#1ED760" }}
							/>
							<div className="mt-2 flex justify-between text-[11px] font-medium">
								{[1, 500, 1000, 1500, 2000].map((mark) => (
									<button
										key={mark}
										type="button"
										onClick={() => {
											setUnits(mark);
											setManualUnits("");
										}}
										className={`transition-colors ${
											units === mark && !manualUnits
												? "font-bold text-[#13247e]"
												: "text-[#8c94a2] hover:text-[#13247e]"
										}`}
									>
										{mark}
									</button>
								))}
							</div>
						</div>

						{/* Or enter manually */}
						<div>
							<label
								htmlFor="manual-units"
								className="mb-1 block cursor-pointer text-sm font-medium text-[#2d3e54]"
							>
								Or enter manually
							</label>
							<input
								id="manual-units"
								type="number"
								placeholder="e.g. 500"
								value={manualUnits}
								onChange={(e) => setManualUnits(e.target.value)}
								className="w-full rounded-lg border border-[#dfe6ef] bg-[#f7fafc] px-3 py-2.5 text-sm text-[#2d3e54] outline-none focus:border-[#13247e]"
							/>
						</div>

						{/* Recommendation */}
						<div className="flex items-start gap-2 rounded-lg bg-[#edf3fb] px-3 py-2.5 text-xs text-[#5d6b7d]">
							<Info className="mt-0.5 h-4 w-4 shrink-0 text-[#4f7aa9]" />
							<span>
								Based on your cost ({effectiveUnits}+),{" "}
								<span className="font-semibold text-[#13247e]">
									Annual plan is recommended
								</span>{" "}
								along with recommended pay along with Base Plan.
							</span>
						</div>

						{/* Select Plan */}
						<div>
							<p className="mb-2 text-sm font-medium text-[#2d3e54]">
								Select Plan
							</p>
							<div className="space-y-2">
								{calculatorPlans.map((plan) => (
									<label
										key={plan.name}
										className={`flex cursor-pointer items-center justify-between rounded-lg border px-4 py-3 transition-colors ${
											selectedPlan === plan.name
												? "border-[#13247e]/30 bg-[#f7fafc]"
												: "border-[#e5e9ef] bg-white hover:border-[#13247e]/20"
										}`}
									>
										<div className="flex items-center gap-3">
											<input
												type="radio"
												name="calculator-plan"
												checked={selectedPlan === plan.name}
												onChange={() => setSelectedPlan(plan.name)}
												className="accent-[#1ED760]"
											/>
											<span className="text-sm font-medium text-[#2d3e54]">
												{plan.name}
											</span>
										</div>
										<span className="text-xs font-medium text-[#5d6b7d]">
											{plan.displayPrice}
										</span>
									</label>
								))}
							</div>
						</div>

						{/* Monthly Subscription Fee Breakdown */}
						<div className="rounded-xl border-2 border-dashed border-[#13247e]/25 bg-[#f0f5fb] p-4">
							<p className="mb-3 text-sm font-semibold text-[#2d3e54]">
								Monthly Subscription Fee:
							</p>
							<div className="space-y-2.5">
								<div className="flex items-center justify-between">
									<span className="text-sm font-semibold text-[#13247e]">
										Breakdown:
									</span>
									<span className="text-sm font-semibold text-[#13247e]">
										N{BASE_FEE.toLocaleString()}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm font-semibold text-[#2d3e54]">
										{effectiveUnits} units @N{activePlan.ratePerUnit}/unit (1-
										{effectiveUnits} units ({selectedPlan}))
									</span>
									<span className="text-sm font-semibold text-[#2d3e54]">
										N{unitSubtotal.toLocaleString()}
									</span>
								</div>
								<div className="flex items-center justify-between border-t border-[#13247e]/15 pt-2.5">
									<span className="text-base font-bold text-[#13247e]">
										Total Monthly Cost
									</span>
									<span className="text-base font-bold text-[#13247e]">
										N{totalMonthly.toLocaleString()}
									</span>
								</div>
							</div>
						</div>

						{/* Transaction fee note */}
						<div className="rounded-lg border border-[#f0d9b8] bg-[#fff5e7] px-3 py-2.5 text-xs text-[#8f6f42]">
							All plans include a 0.2% transaction fee on payments and N1,000
							monthly messaging credit.
						</div>

						{/* Schedule a Call */}
						<button
							className="w-full rounded-lg py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
							style={{ backgroundColor: "#1ED760" }}
						>
							Schedule a Call
						</button>
					</div>
				</div>
			</section>
		</main>
	);
}
