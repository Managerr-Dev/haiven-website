import type { OfferType } from "./api";

/**
 * Listing filters as they live in the URL. Prices in the URL and the form are
 * whole naira; toApiParams is the one place they become kobo.
 */
export interface ListingFilters {
	type: OfferType | "";
	state: string;
	city: string;
	minPrice: string;
	maxPrice: string;
	bedrooms: string;
	amenities: string[];
	page: number;
}

export const EMPTY_FILTERS: ListingFilters = {
	type: "",
	state: "",
	city: "",
	minPrice: "",
	maxPrice: "",
	bedrooms: "",
	amenities: [],
	page: 1,
};

export const PER_PAGE = 12;
export const MAX_AMENITIES = 20;
export const MAX_PLACE_LENGTH = 100;

/** Stays inside the safe integer range once multiplied up to kobo. */
const NAIRA = /^\d{1,13}$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const isValidNaira = (value: string) => NAIRA.test(value);
export const nairaToKobo = (naira: string) => Number(naira) * 100;

/** Reads filters from the URL, dropping anything the API would reject. */
export function readFilters(params: URLSearchParams): ListingFilters {
	const text = (key: string) =>
		(params.get(key) ?? "").trim().slice(0, MAX_PLACE_LENGTH);
	const naira = (key: string) => {
		const value = text(key);
		return isValidNaira(value) ? value : "";
	};

	const type = params.get("type");
	const minPrice = naira("min_price");
	let maxPrice = naira("max_price");
	if (minPrice && maxPrice && Number(maxPrice) < Number(minPrice)) maxPrice = "";

	const bedrooms = text("bedrooms");
	const page = Number(params.get("page"));

	return {
		type: type === "rent" || type === "shortlet" ? type : "",
		state: text("state"),
		city: text("city"),
		minPrice,
		maxPrice,
		bedrooms: /^\d{1,2}$/.test(bedrooms) ? String(Number(bedrooms)) : "",
		amenities: [
			...new Set(params.getAll("amenities").filter((id) => UUID.test(id))),
		].slice(0, MAX_AMENITIES),
		page: Number.isInteger(page) && page > 0 ? page : 1,
	};
}

/** The query string for this site's URL, without a leading "?". */
export function filtersToSearch(filters: ListingFilters) {
	const params = new URLSearchParams();
	if (filters.type) params.set("type", filters.type);
	if (filters.state) params.set("state", filters.state);
	if (filters.city) params.set("city", filters.city);
	if (filters.minPrice) params.set("min_price", filters.minPrice);
	if (filters.maxPrice) params.set("max_price", filters.maxPrice);
	if (filters.bedrooms) params.set("bedrooms", filters.bedrooms);
	for (const id of filters.amenities) params.append("amenities", id);
	if (filters.page > 1) params.set("page", String(filters.page));
	return params.toString();
}

export function toApiParams(filters: ListingFilters) {
	const params = new URLSearchParams({ per_page: String(PER_PAGE) });
	if (filters.type) params.set("type", filters.type);
	if (filters.state) params.set("state", filters.state);
	if (filters.city) params.set("city", filters.city);
	if (filters.minPrice) {
		params.set("min_price", String(nairaToKobo(filters.minPrice)));
	}
	if (filters.maxPrice) {
		params.set("max_price", String(nairaToKobo(filters.maxPrice)));
	}
	if (filters.bedrooms) params.set("bedrooms", filters.bedrooms);
	for (const id of filters.amenities) params.append("amenities[]", id);
	if (filters.page > 1) params.set("page", String(filters.page));
	return params;
}

/** How many filters are set, not counting the rent/shortlet choice or page. */
export const countActiveFilters = (filters: ListingFilters) =>
	[filters.state, filters.city, filters.minPrice, filters.maxPrice, filters.bedrooms].filter(
		Boolean,
	).length + filters.amenities.length;
