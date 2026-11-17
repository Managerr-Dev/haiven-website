"use client";

import {
	fetchAmenityOptions,
	fetchListings,
	type OfferType,
} from "@/app/(site)/listings/api";
import {
	countActiveFilters,
	EMPTY_FILTERS,
	filtersToSearch,
	type ListingFilters,
	readFilters,
} from "@/app/(site)/listings/filters";
import { plural } from "@/app/(site)/listings/format";
import { splitApiError } from "@/app/(site)/listings/validation";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, SearchX, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import ListingCard, { ListingCardSkeleton } from "./ListingCard";
import ListingFiltersForm from "./ListingFiltersForm";
import { focusRing, primaryButton, secondaryButton, StateMessage } from "./ui";
import { useRemote } from "./useRemote";

const TYPE_CHOICES: { value: OfferType | ""; label: string }[] = [
	{ value: "", label: "All" },
	{ value: "rent", label: "For rent" },
	{ value: "shortlet", label: "Short stays" },
];

const FILTER_FIELDS = ["state", "city", "min_price", "max_price", "bedrooms", "amenities"];

const urlFor = (filters: ListingFilters) => {
	const search = filtersToSearch(filters);
	return search ? `/listings?${search}` : "/listings";
};

export default function ListingsBrowser() {
	const router = useRouter();
	const search = useSearchParams().toString();
	const filters = useMemo(
		() => readFilters(new URLSearchParams(search)),
		[search],
	);
	const [panelOpen, setPanelOpen] = useState(false);

	const loadListings = useCallback(
		(signal: AbortSignal) => fetchListings(filters, signal),
		[filters],
	);
	const listings = useRemote(loadListings);
	const amenities = useRemote(fetchAmenityOptions);

	const go = (next: ListingFilters) =>
		router.push(urlFor(next), { scroll: false });

	const rejected =
		listings.error?.code === "validation_failed"
			? splitApiError(listings.error, FILTER_FIELDS)
			: null;
	const activeCount = countActiveFilters(filters);
	const hasAnyFilter = activeCount > 0 || filters.type !== "";
	const offers = listings.data?.offers ?? [];
	const meta = listings.data?.meta;
	const total = meta?.total ?? offers.length;
	const lastPage = meta?.last_page ?? 1;
	const pastLastPage = filters.page > 1 && total > 0 && offers.length === 0;

	const pageLink = (page: number, label: string, icon: React.ReactNode) => (
		<Link href={urlFor({ ...filters, page })} className={secondaryButton}>
			{icon}
			{label}
		</Link>
	);

	return (
		<div className="mt-8 grid grid-cols-1 gap-8 min-[1080px]:grid-cols-[300px_minmax(0,1fr)]">
			<aside>
				<button
					type="button"
					aria-expanded={panelOpen}
					aria-controls="listing-filters"
					onClick={() => setPanelOpen((open) => !open)}
					className={cn(secondaryButton, "w-full min-[1080px]:hidden")}
				>
					<SlidersHorizontal size={18} strokeWidth={2} />
					Filters
					{activeCount > 0 && ` (${activeCount})`}
				</button>
				<div
					id="listing-filters"
					className={cn(
						"mt-4 rounded-[20px] border border-[#E3E7F0] bg-white p-5 min-[1080px]:mt-0 min-[1080px]:block",
						!panelOpen && "hidden",
					)}
				>
					<ListingFiltersForm
						// Remounts when applied filters change (a new URL, back or forward)
						// but not for the type pills or paging, so a half-typed draft survives.
						key={filtersToSearch({ ...filters, type: "", page: 1 })}
						applied={filters}
						amenityOptions={amenities.data ?? []}
						amenitiesUnavailable={!!amenities.error}
						serverErrors={rejected?.fields ?? {}}
						onApply={(draft) => {
							setPanelOpen(false);
							go({ ...draft, type: filters.type });
						}}
						onClear={() => {
							setPanelOpen(false);
							go(EMPTY_FILTERS);
						}}
					/>
				</div>
			</aside>

			<div className="min-w-0">
				<div className="flex flex-wrap items-center justify-between gap-3">
					<div
						role="group"
						aria-label="Filter by type of stay"
						className="flex flex-wrap gap-2"
					>
						{TYPE_CHOICES.map(({ value, label }) => {
							const active = filters.type === value;
							return (
								<button
									key={label}
									type="button"
									aria-pressed={active}
									onClick={() => go({ ...filters, type: value, page: 1 })}
									className={cn(
										"cursor-pointer rounded-full border-[1.5px] px-[18px] py-2.5 text-[15px] font-semibold",
										focusRing,
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
					<p aria-live="polite" className="text-[15px] font-semibold text-[#4A5168]">
						{!listings.loading && !listings.error && plural(total, "listing")}
					</p>
				</div>

				<div className="mt-6">
					{listings.loading ? (
						<div
							role="status"
							aria-label="Loading listings"
							className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,290px),1fr))] gap-5"
						>
							{Array.from({ length: 6 }, (_, i) => (
								<ListingCardSkeleton key={i} />
							))}
						</div>
					) : rejected ? (
						<StateMessage title="Check your filters">
							{rejected.banner}
						</StateMessage>
					) : listings.error ? (
						<StateMessage
							title={
								listings.error.status === 429
									? "Try again shortly"
									: "We couldn't load listings"
							}
							action={
								<button
									type="button"
									onClick={listings.retry}
									className={primaryButton}
								>
									Try again
								</button>
							}
						>
							{listings.error.message}
						</StateMessage>
					) : pastLastPage ? (
						<StateMessage
							icon={<SearchX size={30} strokeWidth={1.8} />}
							title="That page doesn't exist"
							action={
								<Link
									href={urlFor({ ...filters, page: 1 })}
									className={primaryButton}
								>
									Go to the first page
								</Link>
							}
						>
							There are fewer pages of results than that link expected.
						</StateMessage>
					) : offers.length === 0 ? (
						<StateMessage
							icon={<SearchX size={30} strokeWidth={1.8} />}
							title={
								hasAnyFilter
									? "No listings match your filters"
									: "No listings yet"
							}
							action={
								hasAnyFilter ? (
									<button
										type="button"
										onClick={() => go(EMPTY_FILTERS)}
										className={primaryButton}
									>
										Clear all filters
									</button>
								) : undefined
							}
						>
							{hasAnyFilter
								? "Try a wider price range, fewer amenities or a different area."
								: "There's nothing listed right now. Please check back soon."}
						</StateMessage>
					) : (
						<>
							<div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,290px),1fr))] gap-5">
								{offers.map((offer) => (
									<ListingCard key={offer.offering_id} offer={offer} />
								))}
							</div>
							{lastPage > 1 && (
								<nav
									aria-label="Pages of results"
									className="mt-9 flex flex-wrap items-center justify-center gap-4"
								>
									{filters.page > 1 &&
										pageLink(
											filters.page - 1,
											"Previous",
											<ChevronLeft size={18} strokeWidth={2.2} />,
										)}
									<span className="text-[15px] font-semibold text-[#4A5168]">
										Page {filters.page} of {lastPage}
									</span>
									{filters.page < lastPage &&
										pageLink(
											filters.page + 1,
											"Next",
											<ChevronRight size={18} strokeWidth={2.2} />,
										)}
								</nav>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export function ListingsBrowserFallback() {
	return (
		<div
			role="status"
			aria-label="Loading listings"
			className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(min(100%,290px),1fr))] gap-5"
		>
			{Array.from({ length: 6 }, (_, i) => (
				<ListingCardSkeleton key={i} />
			))}
		</div>
	);
}
