import CareersFaq from "@/app/components/careers/CareersFaq";
import RolesGrid from "@/app/components/careers/RolesGrid";
import TalentPoolButton from "@/app/components/careers/TalentPoolButton";
import { Award, Check, ClipboardCheck, TrendingUp, UserRound } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CAREERS_EMAIL, isClosed, ROLES } from "./data";

// Re-render hourly so roles drop off the page once the closing date passes.
export const revalidate = 3600;

export const metadata: Metadata = {
	title: {
		absolute: "Careers at Haiven | Help us run the properties Lagos lives in",
	},
	description:
		"Haiven is hiring its first operations and growth team in Lagos. See open roles and how we hire.",
	alternates: { canonical: "/careers" },
	openGraph: {
		type: "website",
		url: "/careers",
		title: "Careers at Haiven",
		description:
			"Haiven is hiring its first operations and growth team in Lagos. See open roles and how we hire.",
	},
};

const VALUES = [
	{
		icon: ClipboardCheck,
		title: "If it's not logged, it didn't happen",
		body: "Every job goes into the app with evidence. That record is our customers' proof and our system's memory.",
	},
	{
		icon: UserRound,
		title: "One name per customer",
		body: "Every estate and landlord knows exactly who to call, and that person owns the outcome.",
	},
	{
		icon: TrendingUp,
		title: "Paid for what you move",
		body: "Base pay plus earnings tied to results: commission, install bonuses and property referrals.",
	},
	{
		icon: Award,
		title: "Trained, then trusted",
		body: "Structured training and certification, then more responsibility as your record grows.",
	},
];

const HIRING_STEPS = [
	{
		title: "Apply",
		body: "Send your details and CV through the role page. It takes about 10 minutes.",
	},
	{ title: "Short call", body: "A 15-minute phone screen with our team." },
	{
		title: "Show us the work",
		body: "A practical exercise for your role: a building walk-through, a bench test, a sales challenge or a customer case.",
	},
	{
		title: "Meet the team and decide",
		body: "A final conversation, reference checks, then an offer.",
	},
];

function TalentPoolCard() {
	return (
		<div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-5 rounded-[20px] border border-[#E3E7F0] p-[clamp(24px,3vw,36px)]">
			<div className="flex-[1_1_380px]">
				<h3 className="mb-2 text-2xl font-extrabold text-[#1B2E6B]">
					Don&apos;t see your role?
				</h3>
				<p className="text-[17px] leading-[1.6] text-[#363C52]">
					Leave your details and CV, and we&apos;ll contact you when something
					fits.
				</p>
			</div>
			<TalentPoolButton />
		</div>
	);
}

export default function CareersPage() {
	const roles = isClosed() ? [] : ROLES;
	const hasRoles = roles.length > 0;

	return (
		<>
			<section className="relative overflow-hidden bg-white">
				<Image
					src="/images/haiven-leaf.svg"
					alt=""
					aria-hidden="true"
					width={300}
					height={261}
					className="pointer-events-none absolute -right-10 top-24 hidden w-[300px] opacity-90 min-[1080px]:block"
				/>
				<div className="relative mx-auto max-w-[1200px] px-6 pt-[clamp(140px,14vw,180px)]">
					<p className="flex items-center gap-2.5 text-[15px] font-bold uppercase tracking-[.04em] text-[#1A4B8C]">
						<span className="size-2.5 rounded-full bg-[#00C853]" />
						Careers at Haiven
					</p>
					<h1 className="mt-[18px] mb-[22px] max-w-[860px] text-[clamp(40px,5.6vw,68px)] font-extrabold leading-[1.04] tracking-[-0.03em] text-balance text-[#1B2E6B]">
						Help us run the properties communities live in.
					</h1>
					<p className="max-w-[680px] text-[clamp(17px,1.5vw,20px)] leading-[1.6] text-pretty text-[#363C52]">
						We build the system that runs estates, apartment buildings and
						markets across Lagos: gates, power, payments and security. Now
						we&apos;re hiring the people who take it onto the ground.
					</p>
					<div className="mt-[34px] flex flex-wrap items-center gap-x-7 gap-y-4">
						<a
							href="#open-roles"
							className="flex items-center gap-2.5 rounded-full bg-[#00C853] px-[30px] py-[17px] text-[17px] font-bold text-[#0E1B45] hover:bg-[#00B84C] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#1A4B8C]"
						>
							See open roles
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
								<path d="M12 5v14M6 13l6 6 6-6" />
							</svg>
						</a>
						<a
							href="#how-we-hire"
							className="py-1.5 text-[17px] font-semibold text-[#1A4B8C] underline decoration-2 underline-offset-[5px] hover:text-[#1B2E6B]"
						>
							How we hire
						</a>
					</div>
					<div className="relative mt-[clamp(40px,5vw,64px)] h-[clamp(240px,40vw,520px)] overflow-hidden rounded-3xl">
						<Image
							src="/images/careers/careers-hero.jpg"
							alt="Haiven team members walking through a Lagos estate"
							fill
							priority
							sizes="(min-width: 1200px) 1152px, 100vw"
							className="object-cover object-[center_15%]"
						/>
					</div>
				</div>
			</section>

			<section className="mt-[clamp(56px,7vw,88px)] bg-[#F5F7FA] py-[clamp(64px,8vw,104px)]">
				<div className="mx-auto max-w-[1200px] px-6">
					<h2 className="mb-9 text-[clamp(30px,3.4vw,42px)] font-extrabold tracking-[-0.02em] text-[#1B2E6B]">
						How we work
					</h2>
					<div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
						{VALUES.map(({ icon: Icon, title, body }) => (
							<div key={title} className="flex flex-col gap-3.5 rounded-[18px] bg-white p-7">
								<div className="flex size-12 items-center justify-center rounded-[14px] bg-[#E8EBF5]">
									<Icon size={24} strokeWidth={1.8} className="text-[#1A4B8C]" />
								</div>
								<h3 className="mt-1 text-[19px] font-bold leading-[1.3] text-[#1B2E6B]">
									{title}
								</h3>
								<p className="text-base leading-[1.6] text-[#363C52]">{body}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section id="open-roles" className="scroll-mt-[90px] bg-white py-[clamp(64px,8vw,104px)]">
				<div className="mx-auto max-w-[1200px] px-6">
					<div className="flex flex-wrap items-center gap-3.5">
						<h2 className="text-[clamp(30px,3.4vw,42px)] font-extrabold tracking-[-0.02em] text-[#1B2E6B]">
							Open roles
						</h2>
						<span className="rounded-full bg-[#E2F8EA] px-3 py-1.5 text-sm font-bold text-[#0A5C2E]">
							{roles.length} open
						</span>
					</div>
					{hasRoles ? (
						<RolesGrid roles={roles} />
					) : (
						<>
							<p className="mt-7 mb-6 max-w-[640px] text-lg leading-[1.6] text-[#363C52]">
								No open roles right now. Join our talent pool and we&apos;ll
								contact you when one opens.
							</p>
							<TalentPoolCard />
						</>
					)}
				</div>
			</section>

			<section className="relative overflow-hidden bg-[#E8EBF5] py-[clamp(64px,8vw,104px)]">
				<Image
					src="/images/haiven-leaf.svg"
					alt=""
					aria-hidden="true"
					width={220}
					height={192}
					className="pointer-events-none absolute -left-[60px] -bottom-[50px] w-[220px] opacity-55"
				/>
				<div className="relative mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-16 gap-y-10 px-6">
					<div className="flex-[1_1_440px]">
						<p className="text-[15px] font-bold uppercase tracking-[.04em] text-[#1A4B8C]">
							Not a job opening — a programme
						</p>
						<h2 className="mt-3.5 mb-[18px] text-[clamp(30px,3.6vw,46px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-balance text-[#1B2E6B]">
							Become a Haiven Certified Caretaker
						</h2>
						<p className="max-w-[560px] text-lg leading-[1.65] text-pretty text-[#262B3E]">
							We train and certify professional property Caretakers who run
							buildings with a system behind them. Training is structured, the
							certification is assessed, and you&apos;re placed on properties in
							the Haiven network with ongoing supervision.
						</p>
						<Link
							href="/caretaker"
							className="mt-[30px] inline-flex rounded-full bg-[#00C853] px-7 py-4 text-[17px] font-bold text-[#0E1B45] hover:bg-[#00B84C]"
						>
							Apply for Caretaker training
						</Link>
						<p className="mt-4 text-sm text-[#363C52]">
							Cohorts are small and selection is competitive.
						</p>
					</div>
					<div className="relative h-[380px] flex-[1_1_380px] overflow-hidden rounded-[20px]">
						<Image
							src="/images/careers/caretaker-programme.jpg"
							alt="A Certified Caretaker checking a building's generator room and logging it on a phone"
							fill
							sizes="(min-width: 1000px) 540px, 100vw"
							className="object-cover"
						/>
					</div>
				</div>
			</section>

			<section id="how-we-hire" className="scroll-mt-[90px] bg-[#1B2E6B] py-[clamp(64px,8vw,104px)] text-white">
				<div className="mx-auto max-w-[1200px] px-6">
					<h2 className="mb-12 text-[clamp(30px,3.4vw,42px)] font-extrabold tracking-[-0.02em]">
						How we hire
					</h2>
					<ol className="relative grid grid-cols-1 gap-8 min-[1080px]:grid-cols-4 min-[1080px]:gap-7">
						<li
							aria-hidden="true"
							className="absolute top-[22px] bottom-10 left-[21px] w-0.5 bg-white/22 min-[1080px]:top-[21px] min-[1080px]:right-[22px] min-[1080px]:bottom-auto min-[1080px]:left-[22px] min-[1080px]:h-0.5 min-[1080px]:w-auto"
						/>
						{HIRING_STEPS.map((step, i) => (
							<li key={step.title} className="relative flex gap-5 min-[1080px]:flex-col">
								<span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#00C853] text-lg font-extrabold text-[#0E1B45] shadow-[0_0_0_6px_#1B2E6B]">
									{i + 1}
								</span>
								<div>
									<h3 className="mt-0.5 mb-2 text-xl font-bold">{step.title}</h3>
									<p className="text-base leading-[1.6] text-[#D5DCF0]">{step.body}</p>
								</div>
							</li>
						))}
					</ol>
					<p className="mt-12 flex items-center gap-3 border-t border-white/18 pt-7 text-lg font-semibold">
						<Check size={22} strokeWidth={2.2} className="text-[#00C853]" />
						We reply to every applicant, whatever the outcome.
					</p>
				</div>
			</section>

			{hasRoles && (
				<section className="bg-white pt-[clamp(56px,7vw,88px)]">
					<div className="mx-auto max-w-[1200px] px-6">
						<TalentPoolCard />
					</div>
				</section>
			)}

			<section className="bg-white pt-[clamp(56px,7vw,96px)] pb-[clamp(64px,8vw,104px)]">
				<div className="mx-auto flex max-w-[1200px] flex-wrap gap-x-16 gap-y-8 px-6">
					<div className="flex-[1_1_300px]">
						<h2 className="mb-3.5 text-[clamp(30px,3.4vw,42px)] font-extrabold tracking-[-0.02em] text-[#1B2E6B]">
							Questions
						</h2>
						<p className="text-[17px] leading-[1.6] text-[#363C52]">
							Something else? Email{" "}
							<a
								href={`mailto:${CAREERS_EMAIL}`}
								className="font-semibold text-[#1A4B8C] hover:text-[#1B2E6B]"
							>
								{CAREERS_EMAIL}
							</a>
							.
						</p>
					</div>
					<CareersFaq />
				</div>
			</section>
		</>
	);
}
