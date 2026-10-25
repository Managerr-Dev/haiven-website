"use client";

import { type Role, TEAMS } from "@/app/(site)/careers/data";
import { cn } from "@/lib/utils";
import { Banknote, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const FILTERS = ["All", ...TEAMS];

export default function RolesGrid({ roles }: { roles: Role[] }) {
	const [filter, setFilter] = useState("All");
	const shown = roles.filter((r) => filter === "All" || r.team === filter);

	return (
		<>
			<div
				role="group"
				aria-label="Filter roles by team"
				className="mt-7 mb-8 flex flex-wrap gap-2.5"
			>
				{FILTERS.map((label) => {
					const active = filter === label;
					return (
						<button
							key={label}
							type="button"
							aria-pressed={active}
							onClick={() => setFilter(label)}
							className={cn(
								"cursor-pointer rounded-full border-[1.5px] px-[18px] py-2.5 text-[15px] font-semibold focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#1A4B8C]",
								active
									? "border-[#1B2E6B] bg-[#1B2E6B] text-white"
									: "border-[#C9CFDD] bg-white text-[#1B2E6B]",
							)}
						>
							{label}
						</button>
					);
				})}
			</div>
			<div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,440px),1fr))] gap-6">
				{shown.map((r) => (
					<Link
						key={r.slug}
						href={`/careers/${r.slug}`}
						aria-label={`${r.title}. View role`}
						className="flex flex-col overflow-hidden rounded-[20px] border border-[#E3E7F0] bg-white transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(27,46,107,.12)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#1A4B8C]"
					>
						<div className="relative h-[200px]">
							<Image
								src={r.cardImage}
								alt=""
								fill
								sizes="(min-width: 1000px) 576px, 100vw"
								className="object-cover"
							/>
						</div>
						<div className="flex flex-1 flex-col gap-3.5 px-[26px] pt-6 pb-[26px]">
							<span className="self-start rounded-full bg-[#E8EBF5] px-[11px] py-[5px] text-[13px] font-bold text-[#1B2E6B]">
								{r.team}
							</span>
							<h3 className="text-[21px] font-bold leading-[1.3] text-pretty text-[#1B2E6B]">
								{r.title}
							</h3>
							<div className="flex flex-col gap-2 text-[15px] text-[#363C52]">
								<span className="flex items-start gap-2.5">
									<MapPin size={18} strokeWidth={1.8} className="mt-px shrink-0 text-[#1A4B8C]" />
									{r.cardLoc}
								</span>
								<span className="flex items-start gap-2.5">
									<Clock size={18} strokeWidth={1.8} className="mt-px shrink-0 text-[#1A4B8C]" />
									{r.cardType}
								</span>
								<span className="flex items-start gap-2.5 font-semibold text-[#14182B]">
									<Banknote size={18} strokeWidth={1.8} className="mt-px shrink-0 text-[#1A4B8C]" />
									{r.cardSalary}
								</span>
							</div>
							<span className="mt-auto pt-2 text-base font-bold text-[#1A4B8C]">
								View role →
							</span>
						</div>
					</Link>
				))}
			</div>
		</>
	);
}
