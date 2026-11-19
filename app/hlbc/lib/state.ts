/**
 * Live HLBC prices and groups from the Haiven Admin API, for server components.
 *
 *   GET {NEXT_PUBLIC_BASE_URL}/hlbc/groups/current   (public, no auth)
 *
 * Revalidated every 60 seconds. If the API is unreachable or answers
 * something unexpected, the page falls back to the built-in prices and shows
 * no group, rather than failing to render.
 */

import { cache } from "react";
import z from "zod";
import { FALLBACK_PRICES, MAX_GROUP_ORDER, type MeterType, type Prices } from "../data";

export type HlbcGroup = {
	number: number;
	/** "001" */
	label: string;
	status: "open" | "closed";
	opensOn: string;
	closesOn: string;
	acceptingRegistrations: boolean;
	minimumMeters: number;
	targetMeters: number;
	/** Signed-up meters while the group is open, paid meters once closed. */
	meters: number;
	metersBasis: "registered" | "paid";
};

export type HlbcState = {
	prices: Prices;
	/** When the live prices took effect; null when using built-in prices. */
	pricesAsAt: string | null;
	groups: Record<MeterType, HlbcGroup | null>;
	upcoming: Record<MeterType, { label: string; opensOn: string; closesOn: string } | null>;
	maxGroupOrder: number;
	/** The API's date (Africa/Lagos), for the group calendar. */
	today: string;
	/** False when the API couldn't be reached and fallbacks are in use. */
	live: boolean;
};

const REVALIDATE_SECONDS = 60;
const TIMEOUT_MS = 5_000;

const phaseSchema = z.object({
	phase: z.enum(["single", "three"]),
	prices: z
		.object({
			retail: z.number(),
			mid: z.number(),
			wholesale: z.number(),
			effective_at: z.string(),
		})
		.nullable(),
	group: z
		.object({
			number: z.number(),
			label: z.string(),
			status: z.enum(["open", "closed"]),
			opens_on: z.string(),
			closes_on: z.string(),
			accepting_registrations: z.boolean(),
			minimum_meters: z.number(),
			target_meters: z.number(),
			meters: z.number(),
			meters_basis: z.enum(["registered", "paid"]),
		})
		.nullable(),
	upcoming_group: z
		.object({ label: z.string(), opens_on: z.string(), closes_on: z.string() })
		.nullable(),
});

const responseSchema = z.object({
	data: z.object({
		today: z.string(),
		max_group_order: z.number(),
		phases: z.array(phaseSchema),
	}),
});

const lagosToday = () =>
	new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Lagos" }).format(new Date());

function fallbackState(): HlbcState {
	return {
		prices: FALLBACK_PRICES,
		pricesAsAt: null,
		groups: { single: null, three: null },
		upcoming: { single: null, three: null },
		maxGroupOrder: MAX_GROUP_ORDER,
		today: lagosToday(),
		live: false,
	};
}

async function fetchState(): Promise<HlbcState> {
	const base = process.env.NEXT_PUBLIC_BASE_URL;
	if (!base) {
		console.error("NEXT_PUBLIC_BASE_URL is not set; HLBC is using built-in prices");
		return fallbackState();
	}

	try {
		const res = await fetch(`${base.replace(/\/+$/, "")}/hlbc/groups/current`, {
			headers: { Accept: "application/json" },
			next: { revalidate: REVALIDATE_SECONDS, tags: ["hlbc"] },
			signal: AbortSignal.timeout(TIMEOUT_MS),
		});
		if (!res.ok) throw new Error(`HTTP ${res.status}`);

		const { data } = responseSchema.parse(await res.json());
		const state = fallbackState();
		state.live = true;
		state.today = data.today;
		state.maxGroupOrder = data.max_group_order;

		for (const p of data.phases) {
			if (p.prices) {
				state.prices = {
					...state.prices,
					[p.phase]: [p.prices.retail, p.prices.mid, p.prices.wholesale],
				};
				// The page shows one "prices as at" date: the most recent change.
				if (!state.pricesAsAt || p.prices.effective_at > state.pricesAsAt)
					state.pricesAsAt = p.prices.effective_at;
			}
			const g = p.group;
			state.groups[p.phase] = g && {
				number: g.number,
				label: g.label,
				status: g.status,
				opensOn: g.opens_on,
				closesOn: g.closes_on,
				acceptingRegistrations: g.accepting_registrations,
				minimumMeters: g.minimum_meters,
				targetMeters: g.target_meters,
				meters: g.meters,
				metersBasis: g.meters_basis,
			};
			const u = p.upcoming_group;
			state.upcoming[p.phase] = u && {
				label: u.label,
				opensOn: u.opens_on,
				closesOn: u.closes_on,
			};
		}
		return state;
	} catch (error) {
		console.error("HLBC state request failed; using built-in prices:", error);
		return fallbackState();
	}
}

/** Shared by the layout and page within one render. */
export const getHlbcState = cache(fetchState);
