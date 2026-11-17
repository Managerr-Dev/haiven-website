import type { BlockedRange } from "./api";

/**
 * The API dates a stay in the organization's timezone but listings don't say
 * which one that is. Every date on these pages goes through this constant, so
 * it can be replaced by a per-listing value if the API starts returning it.
 */
export const LISTING_TIMEZONE = "Africa/Lagos";

/** The API allows at most one year ahead; a day less stays clear of it near midnight. */
export const AVAILABILITY_WINDOW_DAYS = 364;
export const MAX_NIGHTS = 365;

const DAY_MS = 86_400_000;

/* ---------- calendar days, as "YYYY-MM-DD" strings ---------- */

const toUtc = (day: string) => Date.parse(`${day}T00:00:00Z`);
const fromUtc = (ms: number) => new Date(ms).toISOString().slice(0, 10);

export const addDays = (day: string, count: number) =>
	fromUtc(toUtc(day) + count * DAY_MS);

export const diffDays = (from: string, to: string) =>
	Math.round((toUtc(to) - toUtc(from)) / DAY_MS);

export const formatDay = (
	day: string,
	options: Intl.DateTimeFormatOptions = {
		weekday: "short",
		day: "numeric",
		month: "short",
	},
) =>
	new Intl.DateTimeFormat("en-GB", { ...options, timeZone: "UTC" }).format(
		toUtc(day),
	);

/** The date and 24-hour time of an instant in the listing timezone. */
function zonedParts(instant: Date) {
	const parts = Object.fromEntries(
		new Intl.DateTimeFormat("en-GB", {
			timeZone: LISTING_TIMEZONE,
			hourCycle: "h23",
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		})
			.formatToParts(instant)
			.map((part) => [part.type, part.value]),
	);
	return {
		day: `${parts.year}-${parts.month}-${parts.day}`,
		time: `${parts.hour}:${parts.minute}:${parts.second}`,
	};
}

export const todayInZone = (now: Date) => zonedParts(now).day;

/**
 * The first day that can still be a check-in. The API wants a future check-in,
 * so today only counts while today's check-in time hasn't passed.
 */
export function firstBookableDay(now: Date, checkInTime?: string | null) {
	const { day, time } = zonedParts(now);
	return checkInTime && time < checkInTime.padEnd(8, ":00")
		? day
		: addDays(day, 1);
}

/**
 * Turns the API's UTC ranges into blocked nights, named by the day they start.
 * Ranges are half-open: the night of the check-out day stays free, so one
 * guest's check-out day can be the next guest's check-in day.
 */
export function blockedNights(
	ranges: BlockedRange[],
	windowStart: string,
	windowEnd: string,
) {
	const nights = new Set<string>();
	for (const range of ranges) {
		const start = new Date(range.from);
		const end = new Date(range.to);
		if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) continue;

		const firstNight = zonedParts(start).day;
		const lastDay = zonedParts(end).day;
		// A range inside one day still takes that day's night.
		const stop = lastDay > firstNight ? lastDay : addDays(firstNight, 1);

		let night = firstNight < windowStart ? windowStart : firstNight;
		while (night < stop && night < windowEnd) {
			nights.add(night);
			night = addDays(night, 1);
		}
	}
	return nights;
}

export interface StayRules {
	blocked: Set<string>;
	minNights: number;
	firstDay: string;
	/** The latest allowed check-out day. */
	lastDay: string;
}

function nightsAreFree(from: string, count: number, blocked: Set<string>) {
	for (let i = 0; i < count; i++) {
		if (blocked.has(addDays(from, i))) return false;
	}
	return true;
}

/** Also rejects gaps too short to fit the minimum stay. */
export function canCheckIn(day: string, rules: StayRules) {
	return (
		day >= rules.firstDay &&
		addDays(day, rules.minNights) <= rules.lastDay &&
		nightsAreFree(day, rules.minNights, rules.blocked)
	);
}

/** A blocked day can still be a check-out, because that night isn't used. */
export function canCheckOut(checkIn: string, day: string, rules: StayRules) {
	const nights = diffDays(checkIn, day);
	return (
		nights >= rules.minNights &&
		nights <= MAX_NIGHTS &&
		day <= rules.lastDay &&
		nightsAreFree(checkIn, nights, rules.blocked)
	);
}

/* ---------- month grid ---------- */

/** "YYYY-MM" for the month containing a day. */
export const monthOf = (day: string) => day.slice(0, 7);

export function shiftMonth(month: string, delta: number) {
	const [year, index] = month.split("-").map(Number);
	return fromUtc(Date.UTC(year, index - 1 + delta, 1)).slice(0, 7);
}

/** The days of a month, Monday first, with null for the leading blanks. */
export function monthGrid(month: string): (string | null)[] {
	const [year, index] = month.split("-").map(Number);
	const lead = (new Date(Date.UTC(year, index - 1, 1)).getUTCDay() + 6) % 7;
	const length = new Date(Date.UTC(year, index, 0)).getUTCDate();
	const first = `${month}-01`;
	return [
		...Array.from({ length: lead }, () => null),
		...Array.from({ length }, (_, i) => addDays(first, i)),
	];
}
