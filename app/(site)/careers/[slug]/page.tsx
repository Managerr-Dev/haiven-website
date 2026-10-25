import ApplicationForm from "@/app/components/careers/ApplicationForm";
import ShareRole from "@/app/components/careers/ShareRole";
import TalentPoolButton from "@/app/components/careers/TalentPoolButton";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
	CLOSES_AT,
	CLOSES_LABEL,
	DATE_POSTED,
	getRole,
	isClosed,
	type ListItem,
	type Role,
	ROLES,
	SITE_URL,
} from "../data";

// Re-render hourly so the apply form closes once the closing date passes.
export const revalidate = 3600;
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
	return ROLES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const role = getRole((await params).slug);
	if (!role) return {};
	const description = `${role.short} at Haiven. ${role.sLoc}. ${role.sSalary}. Closes ${CLOSES_LABEL}.`;
	return {
		title: { absolute: `${role.title} | Careers at Haiven` },
		description,
		alternates: { canonical: `/careers/${role.slug}` },
		openGraph: {
			type: "website",
			url: `/careers/${role.slug}`,
			title: `${role.title} | Careers at Haiven`,
			description,
			images: [role.photo],
		},
	};
}

const itemText = (item: ListItem) =>
	typeof item === "string" ? item : `${item.lead} ${item.text}`;

function jobPostingJsonLd(role: Role) {
	const description = role.sections
		.map(
			(s) =>
				`<h2>${s.heading}</h2>` +
				(s.paras ?? []).map((p) => `<p>${p}</p>`).join("") +
				(s.groups ?? [])
					.map(
						(g) =>
							(g.sub ? `<h3>${g.sub}</h3>` : "") +
							`<ul>${g.items.map((i) => `<li>${itemText(i)}</li>`).join("")}</ul>`,
					)
					.join(""),
		)
		.join("");
	const data = {
		"@context": "https://schema.org/",
		"@type": "JobPosting",
		title: role.title,
		description,
		datePosted: DATE_POSTED,
		validThrough: CLOSES_AT.toISOString(),
		employmentType: "FULL_TIME",
		hiringOrganization: {
			"@type": "Organization",
			name: "Haiven",
			sameAs: SITE_URL,
			logo: `${SITE_URL}/images/haiven-logo-blue.svg`,
		},
		jobLocation: {
			"@type": "Place",
			address: {
				"@type": "PostalAddress",
				addressLocality: "Lagos",
				addressRegion: "Lagos",
				addressCountry: "NG",
			},
		},
		baseSalary: {
			"@type": "MonetaryAmount",
			currency: "NGN",
			value: {
				"@type": "QuantitativeValue",
				minValue: role.minSalary,
				maxValue: role.maxSalary,
				unitText: "MONTH",
			},
		},
	};
	// Escape "<" so role copy can never close the script tag early.
	return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default async function RolePage({ params }: Props) {
	const role = getRole((await params).slug);
	if (!role) notFound();

	const closed = isClosed();
	// Every role shares one closing date, so once closed there are no others to list.
	const otherRoles = closed ? [] : ROLES.filter((r) => r.slug !== role.slug);
	const url = `${SITE_URL}/careers/${role.slug}`;

	return (
		<>
			{!closed && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: jobPostingJsonLd(role) }}
				/>
			)}

			<div className="mx-auto max-w-[1200px] px-6 pt-[clamp(120px,12vw,140px)]">
				<nav aria-label="Breadcrumb" className="flex items-center gap-2.5 text-[15px] text-[#4A5168]">
					<Link href="/careers" className="font-semibold text-[#1A4B8C] hover:text-[#1B2E6B]">
						Careers
					</Link>
					<span aria-hidden="true">/</span>
					<span aria-current="page">{role.short}</span>
				</nav>

				{closed && (
					<div
						role="status"
						className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2.5 rounded-[14px] border border-[#F2C98A] bg-[#FFF4E5] px-[22px] py-[18px]"
					>
						<strong className="text-base text-[#6B3B00]">
							This role has closed. Applications are no longer being accepted.
						</strong>
						<Link href="/careers" className="font-bold text-[#1A4B8C]">
							See open roles
						</Link>
						<TalentPoolButton className="cursor-pointer text-base font-bold text-[#1A4B8C] underline" />
					</div>
				)}

				<h1 className="mt-[22px] mb-[18px] max-w-[900px] text-[clamp(32px,4.2vw,52px)] font-extrabold leading-[1.08] tracking-[-0.025em] text-balance text-[#1B2E6B]">
					{role.title}
				</h1>
				<ul aria-label="Role details" className="flex flex-wrap gap-2">
					{role.chips.map((chip) => (
						<li key={chip} className="rounded-full bg-[#E8EBF5] px-[13px] py-[7px] text-sm font-semibold text-[#1B2E6B]">
							{chip}
						</li>
					))}
				</ul>

				<div className="mt-[clamp(28px,4vw,48px)] flex flex-col items-start gap-[clamp(28px,4vw,56px)] min-[1080px]:flex-row-reverse">
					<aside
						aria-label="Role summary"
						className="w-full rounded-[20px] border border-[#E3E7F0] bg-white p-[26px] shadow-[0_14px_36px_rgba(27,46,107,.08)] min-[1080px]:sticky min-[1080px]:top-[110px] min-[1080px]:w-[360px] min-[1080px]:flex-none"
					>
						<span className="inline-block rounded-full bg-[#E8EBF5] px-[11px] py-[5px] text-[13px] font-bold text-[#1B2E6B]">
							{role.team}
						</span>
						<h2 className="mt-3.5 mb-[18px] text-[19px] font-bold leading-[1.35] text-[#1B2E6B]">
							{role.title}
						</h2>
						<dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 text-[15px]">
							{[
								["Team", role.team],
								["Location", role.sLoc],
								["Type", role.sType],
								["Salary", role.sSalary],
								["Closes", CLOSES_LABEL],
							].map(([term, detail]) => (
								<div key={term} className="contents">
									<dt className="text-[#4A5168]">{term}</dt>
									<dd className="font-semibold text-[#14182B]">{detail}</dd>
								</div>
							))}
						</dl>
						{!closed && (
							<a
								href="#apply"
								className="mt-[22px] block w-full rounded-full bg-[#00C853] p-4 text-center text-[17px] font-bold text-[#0E1B45] hover:bg-[#00B84C] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#1A4B8C]"
							>
								Apply now
							</a>
						)}
						<ShareRole url={url} title={role.title} />
					</aside>

					<article className="min-w-0 max-w-[760px] flex-1">
						<div className="relative mb-10 h-[clamp(220px,32vw,400px)] overflow-hidden rounded-[20px]">
							<Image
								src={role.photo}
								alt={role.photoAlt}
								fill
								priority
								sizes="(min-width: 1080px) 760px, 100vw"
								className="object-cover"
							/>
						</div>
						{role.sections.map((section) => (
							<section key={section.heading} className="pb-9">
								<h2 className="mb-3.5 text-[clamp(22px,2.2vw,26px)] font-extrabold tracking-[-0.01em] text-[#1B2E6B]">
									{section.heading}
								</h2>
								{section.paras?.map((p) => (
									<p key={p} className="mb-3.5 text-[17px] leading-[1.7] text-pretty text-[#262B3E]">
										{p}
									</p>
								))}
								{section.groups?.map((group, gi) => (
									<div key={group.sub ?? gi} className="mb-[18px]">
										{group.sub && (
											<h3 className="mt-[22px] mb-3 text-base font-bold text-[#1A4B8C]">
												{group.sub}
											</h3>
										)}
										<ul className="flex flex-col gap-3">
											{group.items.map((item) => (
												<li key={itemText(item)} className="flex gap-3.5 text-[17px] leading-[1.65] text-[#262B3E]">
													<span aria-hidden="true" className="mt-[11px] size-2 shrink-0 rounded-full bg-[#00C853]" />
													<span>
														{typeof item === "string" ? (
															item
														) : (
															<>
																<strong className="text-[#14182B]">{item.lead} </strong>
																{item.text}
															</>
														)}
													</span>
												</li>
											))}
										</ul>
									</div>
								))}
							</section>
						))}
						{role.photo2 && (
							<figure className="mb-9">
								<div className="relative h-[clamp(220px,32vw,400px)] overflow-hidden rounded-[20px]">
									<Image
										src={role.photo2.src}
										alt={role.photo2.alt}
										fill
										sizes="(min-width: 1080px) 760px, 100vw"
										className="object-cover"
									/>
								</div>
								<figcaption className="mt-3 text-sm text-[#4A5168]">
									{role.photo2.caption}
								</figcaption>
							</figure>
						)}
					</article>
				</div>
			</div>

			{!closed && (
				<ApplicationForm
					slug={role.slug}
					roleTitle={role.title}
					roleShort={role.short}
					closesLabel={CLOSES_LABEL}
				/>
			)}

			{otherRoles.length > 0 && (
			<section id="other-roles" className="scroll-mt-[90px] bg-white py-[clamp(56px,7vw,88px)]">
				<div className="mx-auto max-w-[1200px] px-6">
					<h2 className="mb-7 text-[clamp(26px,3vw,34px)] font-extrabold tracking-[-0.02em] text-[#1B2E6B]">
						Other open roles
					</h2>
					<div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-5">
						{otherRoles.map((r) => (
							<Link
								key={r.slug}
								href={`/careers/${r.slug}`}
								aria-label={`${r.title}. View role`}
								className="flex flex-col gap-3 rounded-[18px] border border-[#E3E7F0] bg-white p-6 transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(27,46,107,.12)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#1A4B8C]"
							>
								<span className="self-start rounded-full bg-[#E8EBF5] px-[11px] py-[5px] text-[13px] font-bold text-[#1B2E6B]">
									{r.team}
								</span>
								<h3 className="text-lg font-bold leading-[1.35] text-[#1B2E6B]">{r.title}</h3>
								<span className="text-sm text-[#363C52]">
									{r.cardLoc} · {r.cardType}
								</span>
								<span className="text-sm font-semibold text-[#14182B]">{r.cardSalary}</span>
								<span className="mt-auto pt-1.5 text-[15px] font-bold text-[#1A4B8C]">
									View role →
								</span>
							</Link>
						))}
					</div>
				</div>
			</section>
			)}

			{role.strip && (
				<section className="bg-[#E8EBF5] py-[clamp(40px,5vw,56px)]">
					<div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-10 gap-y-5 px-6">
						<div className="flex-[1_1_420px]">
							<p className="mb-2 text-sm font-bold uppercase tracking-[.04em] text-[#1A4B8C]">
								Not a job opening — a programme
							</p>
							<h2 className="mb-2 text-[clamp(22px,2.4vw,28px)] font-extrabold text-[#1B2E6B]">
								Become a Haiven Certified Caretaker
							</h2>
							<p className="text-base leading-[1.6] text-[#262B3E]">
								Cohorts are small and selection is competitive.
							</p>
						</div>
						<Link
							href="/caretaker"
							className="rounded-full bg-[#1B2E6B] px-[26px] py-4 text-base font-bold text-white hover:bg-[#1A4B8C]"
						>
							Apply for Caretaker training
						</Link>
					</div>
				</section>
			)}
		</>
	);
}
