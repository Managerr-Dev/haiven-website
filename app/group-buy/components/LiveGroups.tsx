import { cn } from "@/lib/utils";
import { fmt, fmtDate, METERS, type MeterType, type Prices } from "../data";
import type { HlbcGroup, HlbcState } from "../lib/state";
import JoinGroupButton from "./JoinGroupButton";
import PricesAsAt from "./PricesAsAt";
import { container, finePrint, green, h2Class, leadClass, sectionPadding } from "./styles";

// ---- dates (YYYY-MM-DD, compared in UTC so time zones can't shift a day)

const DAY_MS = 86_400_000;
const toUtc = (iso: string) => Date.parse(`${iso.slice(0, 10)}T00:00:00Z`);
const daysBetween = (from: string, to: string) =>
	Math.round((toUtc(to) - toUtc(from)) / DAY_MS);

/** Longest calendar drawn; longer groups show their last six weeks. */
const MAX_CALENDAR_DAYS = 42;

function calendar(group: HlbcGroup, today: string) {
	const total = Math.max(1, daysBetween(group.opensOn, group.closesOn) + 1);
	const start = Math.max(0, total - MAX_CALENDAR_DAYS);
	return Array.from({ length: total - start }, (_, i) => {
		const t = toUtc(group.opensOn) + (start + i) * DAY_MS;
		const iso = new Date(t).toISOString().slice(0, 10);
		return {
			iso,
			day: new Date(t).getUTCDate(),
			past: iso < today,
			isToday: iso === today,
			isLast: i === total - start - 1,
		};
	});
}

// ---- pieces

const Badge = ({ tone, children }: { tone: "open" | "closing" | "closed" | "soon"; children: string }) => (
	<span
		className={cn(
			"flex-none rounded-full px-3 py-[7px] text-xs font-extrabold tracking-[0.12em]",
			tone === "open" && "bg-accent-green text-haiven-blue",
			tone === "closing" && "bg-[#FFE7A3] text-haiven-blue",
			tone === "closed" && "bg-haiven-blue text-white",
			tone === "soon" && "bg-[#E8EBF5] text-haiven-blue",
		)}
	>
		{children}
	</span>
);

const Calendar = ({ group, today }: { group: HlbcGroup; today: string }) => (
	<ol
		aria-label={`Open ${fmtDate(group.opensOn)} to ${fmtDate(group.closesOn)}`}
		className="m-0 grid list-none grid-cols-7 gap-1 p-0"
	>
		{calendar(group, today).map((d) => (
			<li
				key={d.iso}
				className={cn(
					"flex aspect-square flex-col items-center justify-center gap-px rounded-lg font-jetbrains",
					d.isToday
						? "bg-accent-green text-haiven-blue"
						: d.isLast
							? "bg-haiven-blue text-accent-green"
							: d.past
								? "bg-[#F5F7FA] text-[#8A92B8]"
								: "bg-[#E8EBF5] text-haiven-blue",
				)}
			>
				<span className={cn("text-sm font-bold", d.past && !d.isToday && "line-through")}>
					{d.day}
				</span>
				<span className="text-[8px] font-extrabold tracking-[0.08em]">
					{d.isToday ? "TODAY" : d.isLast ? "CLOSES" : ""}
				</span>
			</li>
		))}
	</ol>
);

const Progress = ({ group }: { group: HlbcGroup }) => {
	const pct = (n: number) => `${Math.min(100, (n / group.targetMeters) * 100)}%`;
	const minimumAt = pct(group.minimumMeters);

	return (
		<div className="flex flex-col gap-2">
			<div
				role="progressbar"
				aria-valuemin={0}
				aria-valuemax={group.targetMeters}
				aria-valuenow={Math.min(group.meters, group.targetMeters)}
				aria-label={`${group.meters.toLocaleString("en-NG")} of ${group.targetMeters.toLocaleString("en-NG")} meters`}
				className="relative h-4 rounded-lg bg-[#E8EBF5]"
			>
				<div
					className="absolute inset-y-0 left-0 rounded-lg bg-accent-green"
					style={{ width: pct(group.meters) }}
				/>
				<div
					className="absolute -top-1.5 h-7 w-[3px] rounded-sm bg-haiven-blue"
					style={{ left: minimumAt }}
				/>
				<div className="absolute -top-1.5 right-0 h-7 w-[3px] rounded-sm bg-haiven-blue" />
			</div>
			<div className="relative h-[18px] text-xs font-bold text-[#4A5480]">
				<span
					className="absolute -translate-x-1/2 whitespace-nowrap"
					style={{ left: minimumAt }}
				>
					{group.minimumMeters.toLocaleString("en-NG")} · group goes ahead
				</span>
				<span className="absolute right-0 whitespace-nowrap">
					{group.targetMeters.toLocaleString("en-NG")} · wholesale price
				</span>
			</div>
		</div>
	);
};

const PriceTiles = ({ prices, type }: { prices: Prices; type: MeterType }) => (
	<div className="grid grid-cols-2 gap-2.5">
		<div className="flex flex-col gap-0.5 rounded-[14px] bg-[#F5F7FA] px-4 py-3">
			<span className="text-[11px] font-bold tracking-[0.12em] text-[#4A5480]">RETAIL</span>
			<span className="font-jetbrains text-xl font-bold">{fmt(prices[type][0])}</span>
		</div>
		<div className="flex flex-col gap-0.5 rounded-[14px] bg-accent-green px-4 py-3">
			<span className="text-[11px] font-bold tracking-[0.12em]">WHOLESALE</span>
			<span className="font-jetbrains text-xl font-bold">{fmt(prices[type][2])}</span>
		</div>
	</div>
);

// ---- card

type CardProps = {
	type: MeterType;
	name: string;
	state: HlbcState;
};

const GroupCard = ({ type, name, state }: CardProps) => {
	const group = state.groups[type];
	const upcoming = state.upcoming[type];
	const card =
		"flex flex-col gap-5 rounded-[26px] border border-[rgba(19,36,126,0.12)] bg-white p-[clamp(20px,3vw,30px)]";

	if (!group) {
		return (
			<article className={card}>
				<div className="flex items-start justify-between gap-3">
					<div className="flex flex-col gap-1">
						<h3 className="m-0 text-2xl font-extrabold tracking-[-0.02em]">{name}</h3>
						<span className="text-sm font-semibold text-[#4A5480]">
							{upcoming
								? `Group purchase ${upcoming.label} · opens ${fmtDate(upcoming.opensOn)}`
								: "Next group purchase"}
						</span>
					</div>
					<Badge tone="soon">SOON</Badge>
				</div>
				<p className="m-0 text-lg leading-normal font-semibold">
					{!state.live
						? "Live group details are unavailable right now. You can still register, and we’ll confirm your group on WhatsApp."
						: upcoming
							? `The next group opens on ${fmtDate(upcoming.opensOn)} and closes on ${fmtDate(upcoming.closesOn)}. Register now and we’ll message you when it opens.`
							: "The next group opens soon. Register now and we’ll message you on WhatsApp when it opens."}
				</p>
				<PriceTiles prices={state.prices} type={type} />
				<JoinGroupButton type={type}>Register interest →</JoinGroupButton>
			</article>
		);
	}

	const closed = group.status === "closed";
	const closing = !closed && !group.acceptingRegistrations;
	const daysLeft = Math.max(0, daysBetween(state.today, group.closesOn) + 1);

	return (
		<article className={card}>
			<div className="flex items-start justify-between gap-3">
				<div className="flex flex-col gap-1">
					<h3 className="m-0 text-2xl font-extrabold tracking-[-0.02em]">{name}</h3>
					<span className="text-sm font-semibold text-[#4A5480]">
						Group purchase {group.label} · {closed ? "closed" : "closes"}{" "}
						{fmtDate(group.closesOn)}
					</span>
				</div>
				<Badge tone={closed ? "closed" : closing ? "closing" : "open"}>
					{closed ? "CLOSED" : closing ? "CLOSING" : "OPEN"}
				</Badge>
			</div>

			<Calendar group={group} today={state.today} />

			<div className="flex flex-wrap items-baseline gap-3">
				<span className="text-[clamp(48px,6vw,64px)] leading-none font-extrabold tracking-[-0.05em]">
					{group.meters.toLocaleString("en-NG")}
				</span>
				<span className="font-bold text-[#4A5480]">
					{closed
						? "paid meters · price set on these"
						: closing
							? "meters joined · group closing"
							: `meters joined so far · ${daysLeft} day${daysLeft === 1 ? "" : "s"} left`}
				</span>
			</div>

			<Progress group={group} />
			<PriceTiles prices={state.prices} type={type} />

			<JoinGroupButton type={type}>
				{closed || closing ? "Register for the next group →" : "Join this group →"}
			</JoinGroupButton>
		</article>
	);
};

// ---- section

const LiveGroups = ({ state }: { state: HlbcState }) => (
	<section id="live" className="scroll-mt-16 bg-[#F5F7FA]">
		<div className={`${container} ${sectionPadding} flex flex-col gap-9`}>
			<div className="flex flex-col gap-3.5">
				<span className="flex items-center gap-2.5 text-sm font-bold text-[#00873A]">
					<span className="h-2.5 w-2.5 rounded-full bg-accent-green shadow-[0_0_0_4px_rgba(30,215,96,0.25)]" />
					Live
				</span>
				<h2 className={h2Class}>
					Group purchases
					<br />
					<span className={green}>open now.</span>
				</h2>
				<p className={leadClass}>
					Each phase meter has its own group, open for up to 21 days. The closer
					a group gets to 1,000 meters, the closer everyone gets to the wholesale
					price.
				</p>
			</div>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] gap-5">
				{METERS.map((m) => (
					<GroupCard key={m.type} type={m.type} name={m.name} state={state} />
				))}
			</div>
			<p className={finePrint}>
				<PricesAsAt asAt={state.pricesAsAt} /> While a group is open, the count
				shows meters joined. Your final price is set by paid meters only, once
				the group closes.
			</p>
		</div>
	</section>
);

export default LiveGroups;
