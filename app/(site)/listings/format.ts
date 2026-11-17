import type { ListingOffer, ListingPhoto } from "./api";

/** Formats integer kobo as money. */
export function money(kobo: number, currency?: string | null) {
	const code = currency || "NGN";
	try {
		return new Intl.NumberFormat("en-NG", {
			style: "currency",
			currency: code,
			maximumFractionDigits: kobo % 100 === 0 ? 0 : 2,
		}).format(kobo / 100);
	} catch {
		return `${code} ${(kobo / 100).toLocaleString()}`;
	}
}

const FREQUENCY_LABELS: Record<string, string> = {
	nightly: "per night",
	daily: "per day",
	weekly: "per week",
	monthly: "per month",
	quarterly: "per quarter",
	yearly: "per year",
	annually: "per year",
};

/** "per night", "per year"; an unrecognised frequency is shown as it came. */
export const frequencyLabel = (frequency?: string | null) =>
	frequency
		? (FREQUENCY_LABELS[frequency.toLowerCase()] ??
			frequency.replace(/_/g, " "))
		: "";

export const offerTypeLabel = (type: ListingOffer["type"]) =>
	type === "shortlet" ? "Short stay" : "For rent";

export const plural = (count: number, noun: string) =>
	`${count} ${noun}${count === 1 ? "" : "s"}`;

/** Hosts often name units "3" or "B4"; give bare codes a "Unit" prefix. */
export const unitLabel = (name?: string | null) =>
	!name ? null : /^[a-z]{2,}\b/i.test(name) ? name : `Unit ${name}`;

/** The heading for an offer: the building, or the unit when there's no building. */
export const offerTitle = (offer: ListingOffer) =>
	offer.property?.name || unitLabel(offer.name) || "Listing";

/** The unit line under the heading; null when the heading already is the unit. */
export const offerSubtitle = (offer: ListingOffer) =>
	offer.property?.name ? unitLabel(offer.name) : null;

export const offerLocation = (offer: ListingOffer) =>
	[offer.city, offer.state].filter(Boolean).join(", ");

export function roomSummary(offer: ListingOffer) {
	const { bedrooms, bathrooms, toilets } = offer.rooms ?? {};
	return {
		bedrooms:
			bedrooms == null
				? null
				: bedrooms === 0
					? "Studio"
					: plural(bedrooms, "bedroom"),
		bathrooms: bathrooms == null ? null : plural(bathrooms, "bathroom"),
		toilets: toilets == null ? null : plural(toilets, "toilet"),
	};
}

/** "self_contained" becomes "Self contained". */
export function humanize(value?: string | null) {
	if (!value) return null;
	const text = value.replace(/_/g, " ");
	return text.charAt(0).toUpperCase() + text.slice(1);
}

/** "14:00:00" becomes "2:00 pm". */
export function formatClock(time?: string | null) {
	const match = time?.match(/^(\d{1,2}):(\d{2})/);
	if (!match) return null;
	const hour = Number(match[1]);
	const suffix = hour >= 12 ? "pm" : "am";
	return `${hour % 12 || 12}:${match[2]} ${suffix}`;
}

/** Cover first, then in the host's order. */
export function sortPhotos(photos?: ListingPhoto[] | null) {
	return [...(photos ?? [])].sort(
		(a, b) =>
			Number(b.is_cover ?? false) - Number(a.is_cover ?? false) ||
			(a.position ?? 0) - (b.position ?? 0),
	);
}
