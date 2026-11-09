"use client";

import {
	addDays,
	canCheckIn,
	canCheckOut,
	diffDays,
	formatDay,
	monthGrid,
	monthOf,
	shiftMonth,
	type StayRules,
} from "@/app/(site)/listings/dates";
import { plural } from "@/app/(site)/listings/format";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { focusRing } from "./ui";

export interface StayDates {
	checkIn: string | null;
	checkOut: string | null;
}

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const monthButton = cn(
	"flex size-11 cursor-pointer items-center justify-center rounded-full text-[#1B2E6B] hover:bg-[#E8EBF5] disabled:cursor-not-allowed disabled:opacity-30",
	focusRing,
);

export default function StayCalendar({
	dates,
	rules,
	onChange,
}: {
	dates: StayDates;
	rules: StayRules;
	onChange: (dates: StayDates) => void;
}) {
	const { checkIn, checkOut } = dates;
	const [month, setMonth] = useState(monthOf(checkIn ?? rules.firstDay));
	const grid = useMemo(() => monthGrid(month), [month]);

	const choosingCheckOut = !!checkIn && !checkOut;
	const firstMonth = monthOf(rules.firstDay);
	const lastMonth = monthOf(rules.lastDay);

	const isSelectable = (day: string) => {
		if (choosingCheckOut) {
			if (canCheckOut(checkIn, day, rules)) return true;
			// Too close to the check-in to meet the minimum stay.
			if (day > checkIn && day < addDays(checkIn, rules.minNights)) return false;
			if (day === checkIn) return true;
		}
		return canCheckIn(day, rules);
	};

	const pick = (day: string) => {
		if (choosingCheckOut) {
			if (day === checkIn) return onChange({ checkIn: null, checkOut: null });
			if (canCheckOut(checkIn, day, rules)) {
				return onChange({ checkIn, checkOut: day });
			}
		}
		onChange({ checkIn: day, checkOut: null });
	};

	const hint = choosingCheckOut
		? `Now choose your check-out date.${
				rules.minNights > 1
					? ` The minimum stay is ${plural(rules.minNights, "night")}.`
					: ""
			}`
		: checkIn && checkOut
			? `${plural(diffDays(checkIn, checkOut), "night")} selected. Choose a date to start again.`
			: "Choose your check-in date.";

	return (
		<div>
			<div className="flex items-center justify-between">
				<button
					type="button"
					aria-label="Previous month"
					disabled={month <= firstMonth}
					onClick={() => setMonth((m) => shiftMonth(m, -1))}
					className={monthButton}
				>
					<ChevronLeft size={20} strokeWidth={2.2} />
				</button>
				<span aria-live="polite" className="text-base font-bold text-[#1B2E6B]">
					{formatDay(`${month}-01`, { month: "long", year: "numeric" })}
				</span>
				<button
					type="button"
					aria-label="Next month"
					disabled={month >= lastMonth}
					onClick={() => setMonth((m) => shiftMonth(m, 1))}
					className={monthButton}
				>
					<ChevronRight size={20} strokeWidth={2.2} />
				</button>
			</div>

			<div className="mt-2 grid grid-cols-7 text-center text-[13px] font-semibold text-[#4A5168]">
				{WEEKDAYS.map((day) => (
					<span key={day} className="py-1">
						{day}
					</span>
				))}
			</div>

			<div className="grid grid-cols-7 gap-y-1">
				{grid.map((day, i) => {
					if (!day) return <span key={`blank-${i}`} />;
					const selectable = isSelectable(day);
					const isEdge = day === checkIn || day === checkOut;
					const inRange =
						!!checkIn && !!checkOut && day > checkIn && day < checkOut;
					const blocked = rules.blocked.has(day);
					const suffix = [
						day === checkIn && "check-in",
						day === checkOut && "check-out",
						!selectable && "unavailable",
					]
						.filter(Boolean)
						.join(", ");
					return (
						<button
							key={day}
							type="button"
							disabled={!selectable}
							aria-pressed={isEdge}
							aria-label={`${formatDay(day, {
								weekday: "long",
								day: "numeric",
								month: "long",
								year: "numeric",
							})}${suffix ? `, ${suffix}` : ""}`}
							onClick={() => pick(day)}
							className={cn(
								"flex h-11 items-center justify-center rounded-[10px] text-[15px] font-semibold",
								focusRing,
								isEdge
									? "cursor-pointer bg-[#1B2E6B] text-white"
									: inRange
										? "cursor-pointer rounded-none bg-[#E8EBF5] text-[#1B2E6B]"
										: selectable
											? "cursor-pointer text-[#14182B] hover:bg-[#E8EBF5]"
											: cn(
													"cursor-not-allowed text-[#9AA3B8]",
													blocked && "bg-[#F5F7FA] line-through",
												),
							)}
						>
							{Number(day.slice(8))}
						</button>
					);
				})}
			</div>

			<p aria-live="polite" className="mt-3 text-sm text-[#4A5168]">
				{hint}
			</p>
		</div>
	);
}

export function StayCalendarSkeleton() {
	return (
		<div role="status" aria-label="Loading availability" className="animate-pulse">
			<div className="mx-auto h-11 w-40 rounded-md bg-[#EEF0F5]" />
			<div className="mt-2 grid grid-cols-7 gap-1">
				{Array.from({ length: 35 }, (_, i) => (
					<div key={i} className="h-11 rounded-[10px] bg-[#F5F7FA]" />
				))}
			</div>
		</div>
	);
}
