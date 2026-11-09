"use client";

import {
	fetchListingOffers,
	type ListingAmenity,
	type ListingOffer,
} from "@/app/(site)/listings/api";
import {
	formatClock,
	frequencyLabel,
	humanize,
	money,
	offerLocation,
	offerSubtitle,
	offerTitle,
	offerTypeLabel,
	plural,
	roomSummary,
	sortPhotos,
} from "@/app/(site)/listings/format";
import { cn } from "@/lib/utils";
import { ArrowLeft, Bath, BedDouble, Check, Clock, Home, MapPin, Moon, Toilet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import BookingRequestForm from "./BookingRequestForm";
import EnquiryForm from "./EnquiryForm";
import PhotoGallery from "./PhotoGallery";
import { focusRing, NotAvailable, primaryButton, StateMessage } from "./ui";
import { useRemote } from "./useRemote";

const sectionHeading =
	"text-xl font-extrabold tracking-[-0.01em] text-[#1B2E6B]";

function Fact({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
	return (
		<span className="flex items-center gap-2 rounded-full bg-[#E8EBF5] px-3.5 py-2 text-sm font-semibold text-[#1B2E6B]">
			{icon}
			{children}
		</span>
	);
}

function AmenityGroup({
	title,
	amenities,
}: {
	title: string;
	amenities: ListingAmenity[];
}) {
	if (amenities.length === 0) return null;
	return (
		<div>
			<h3 className="text-[15px] font-bold text-[#14182B]">{title}</h3>
			<ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
				{amenities.map((amenity) => (
					<li key={amenity.id} className="flex items-start gap-2.5 text-[15px] text-[#363C52]">
						<Check size={18} strokeWidth={2.4} className="mt-0.5 shrink-0 text-[#00A347]" />
						<span>
							{amenity.name}
							{amenity.note && (
								<span className="block text-[13px] text-[#4A5168]">{amenity.note}</span>
							)}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
}

function RentCosts({ offer }: { offer: ListingOffer }) {
	const deposit = offer.caution_deposit ?? 0;
	if (deposit <= 0) return null;
	return (
		<div className="flex justify-between gap-3 rounded-2xl bg-[#F5F7FA] px-4 py-3.5 text-sm text-[#363C52]">
			<span>Caution deposit</span>
			<span className="font-semibold text-[#14182B]">
				{money(deposit, offer.currency)}
			</span>
		</div>
	);
}

function ShortletFees({ offer }: { offer: ListingOffer }) {
	const cleaning = offer.cleaning_fee ?? 0;
	const deposit = offer.caution_deposit ?? 0;
	if (cleaning <= 0 && deposit <= 0) return null;
	return (
		<div className="flex flex-col gap-2 rounded-2xl bg-[#F5F7FA] px-4 py-3.5 text-sm text-[#363C52]">
			{cleaning > 0 && (
				<div className="flex justify-between gap-3">
					<span>Cleaning fee</span>
					<span className="font-semibold text-[#14182B]">
						{money(cleaning, offer.currency)}
					</span>
				</div>
			)}
			{deposit > 0 && (
				<div className="flex justify-between gap-3">
					<span>Caution deposit</span>
					<span className="font-semibold text-[#14182B]">
						{money(deposit, offer.currency)}
					</span>
				</div>
			)}
		</div>
	);
}

function OfferView({
	offer,
	offers,
	onSelectOffer,
	onGone,
}: {
	offer: ListingOffer;
	offers: ListingOffer[];
	onSelectOffer: (type: ListingOffer["type"]) => void;
	onGone: () => void;
}) {
	const [sent, setSent] = useState(false);
	const title = offerTitle(offer);
	const subtitle = offerSubtitle(offer);
	const location = offerLocation(offer);
	const rooms = roomSummary(offer);
	const space = humanize(offer.space_type);
	const isShortlet = offer.type === "shortlet";
	const checkIn = formatClock(offer.check_in_time);
	const checkOut = formatClock(offer.check_out_time);
	const inUnit = offer.amenities?.in_the_unit ?? [];
	const inBuilding = offer.amenities?.in_the_building ?? [];
	const organization = offer.organization;
	const formTitle = isShortlet ? "Request to book" : "Enquire about this home";
	const priceLine = `${money(offer.price, offer.currency)} ${frequencyLabel(offer.frequency)}`.trim();

	useEffect(() => {
		document.title = `${title} — Haiven`;
	}, [title]);

	const scrollToForm = () =>
		document.getElementById("listing-form")?.scrollIntoView({ behavior: "smooth" });

	return (
		<>
			<PhotoGallery key={offer.offering_id} photos={sortPhotos(offer.photos)} title={title} />

			<div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-9 min-[1080px]:grid-cols-[minmax(0,1fr)_420px]">
				<div className="flex min-w-0 flex-col gap-8">
					<div>
						{offers.length > 1 ? (
							<div
								role="group"
								aria-label="Choose how to stay here"
								className="mb-4 flex flex-wrap gap-2"
							>
								{offers.map((item) => {
									const active = item.offering_id === offer.offering_id;
									return (
										<button
											key={item.offering_id}
											type="button"
											aria-pressed={active}
											onClick={() => onSelectOffer(item.type)}
											className={cn(
												"cursor-pointer rounded-full border-[1.5px] px-[18px] py-2.5 text-[15px] font-semibold",
												focusRing,
												active
													? "border-[#1B2E6B] bg-[#1B2E6B] text-white"
													: "border-[#C9CFDD] bg-white text-[#1B2E6B]",
											)}
										>
											{offerTypeLabel(item.type)}
										</button>
									);
								})}
							</div>
						) : (
							<span className="mb-3 inline-block rounded-full bg-[#E8EBF5] px-3 py-1.5 text-[13px] font-bold text-[#1B2E6B]">
								{offerTypeLabel(offer.type)}
							</span>
						)}
						<h1 className="text-[clamp(28px,3.6vw,42px)] font-extrabold leading-[1.12] tracking-[-0.02em] text-balance text-[#1B2E6B]">
							{title}
						</h1>
						{subtitle && (
							<p className="mt-1 text-lg font-semibold text-[#363C52]">{subtitle}</p>
						)}
						{location && (
							<p className="mt-2 flex items-center gap-2 text-base text-[#363C52]">
								<MapPin size={18} strokeWidth={1.8} className="shrink-0 text-[#1A4B8C]" />
								{location}
							</p>
						)}
					</div>

					<div className="flex flex-wrap gap-2">
						{space && (
							<Fact icon={<Home size={16} strokeWidth={1.8} />}>{space}</Fact>
						)}
						{rooms.bedrooms && (
							<Fact icon={<BedDouble size={16} strokeWidth={1.8} />}>{rooms.bedrooms}</Fact>
						)}
						{rooms.bathrooms && (
							<Fact icon={<Bath size={16} strokeWidth={1.8} />}>{rooms.bathrooms}</Fact>
						)}
						{rooms.toilets && (
							<Fact icon={<Toilet size={16} strokeWidth={1.8} />}>{rooms.toilets}</Fact>
						)}
					</div>

					{offer.description && (
						<section>
							<h2 className={sectionHeading}>About this home</h2>
							<p className="mt-3 whitespace-pre-line text-base leading-[1.7] text-[#363C52]">
								{offer.description}
							</p>
						</section>
					)}

					{isShortlet && (checkIn || checkOut || offer.min_nights) && (
						<section>
							<h2 className={sectionHeading}>Stay details</h2>
							<div className="mt-3 flex flex-wrap gap-2">
								{checkIn && (
									<Fact icon={<Clock size={16} strokeWidth={1.8} />}>Check-in from {checkIn}</Fact>
								)}
								{checkOut && (
									<Fact icon={<Clock size={16} strokeWidth={1.8} />}>Check-out by {checkOut}</Fact>
								)}
								{offer.min_nights ? (
									<Fact icon={<Moon size={16} strokeWidth={1.8} />}>
										Minimum stay {plural(offer.min_nights, "night")}
									</Fact>
								) : null}
							</div>
						</section>
					)}

					{(inUnit.length > 0 || inBuilding.length > 0) && (
						<section className="flex flex-col gap-5">
							<h2 className={sectionHeading}>Amenities</h2>
							<AmenityGroup title="In the unit" amenities={inUnit} />
							<AmenityGroup title="In the building" amenities={inBuilding} />
						</section>
					)}

					{organization?.name && (
						<section className="flex items-center gap-3 border-t border-[#E3E7F0] pt-6">
							{organization.logo_url && (
								<Image
									src={organization.logo_url}
									alt=""
									width={44}
									height={44}
									unoptimized
									className="size-11 rounded-full object-cover"
								/>
							)}
							<p className="text-[15px] text-[#363C52]">
								Listed by{" "}
								<span className="font-bold text-[#14182B]">{organization.name}</span>
							</p>
						</section>
					)}
				</div>

				<aside
					id="listing-form"
					className="flex scroll-mt-24 flex-col gap-4 self-start rounded-[20px] border border-[#E3E7F0] bg-white p-[clamp(18px,2vw,24px)]"
				>
					<p className="text-[26px] font-extrabold tracking-[-0.01em] text-[#1B2E6B]">
						{money(offer.price, offer.currency)}{" "}
						<span className="text-[15px] font-semibold tracking-normal text-[#4A5168]">
							{frequencyLabel(offer.frequency)}
						</span>
					</p>
					{isShortlet ? <ShortletFees offer={offer} /> : <RentCosts offer={offer} />}
					{!sent && (
						<h2 className="text-lg font-extrabold text-[#1B2E6B]">{formTitle}</h2>
					)}
					{isShortlet ? (
						<BookingRequestForm offer={offer} onGone={onGone} onSent={() => setSent(true)} />
					) : (
						<EnquiryForm offer={offer} onGone={onGone} onSent={() => setSent(true)} />
					)}
				</aside>
			</div>

			{!sent && (
				<>
					<div className="fixed inset-x-0 bottom-0 z-45 flex items-center gap-3 border-t border-[#E3E7F0] bg-white px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(27,46,107,.1)] min-[1080px]:hidden">
						<p className="min-w-0 flex-1 truncate text-sm font-bold text-[#1B2E6B]">
							{priceLine}
						</p>
						<button
							type="button"
							onClick={scrollToForm}
							className={cn(primaryButton, "shrink-0 px-6 py-3 text-[15px]")}
						>
							{isShortlet ? "Request to book" : "Enquire"}
						</button>
					</div>
					{/* Keeps the fixed bar from covering the bottom of the footer. */}
					<style>{"@media (max-width:1079px){body{padding-bottom:76px}}"}</style>
				</>
			)}
		</>
	);
}

export default function ListingDetail({ unitId }: { unitId: string }) {
	const router = useRouter();
	const requested = useSearchParams().get("offer");
	const load = useCallback(
		(signal: AbortSignal) => fetchListingOffers(unitId, signal),
		[unitId],
	);
	const { data: offers, error, loading, retry } = useRemote(load);
	const [gone, setGone] = useState(false);

	let content: React.ReactNode;
	if (loading) {
		content = <DetailSkeleton />;
	} else if (gone || error?.status === 404 || offers?.length === 0) {
		content = <NotAvailable />;
	} else if (error || !offers) {
		content = (
			<StateMessage
				title={error?.status === 429 ? "Try again shortly" : "We couldn't load this listing"}
				action={
					<button type="button" onClick={retry} className={primaryButton}>
						Try again
					</button>
				}
			>
				{error?.message}
			</StateMessage>
		);
	} else {
		const offer = offers.find((item) => item.type === requested) ?? offers[0];
		content = (
			<OfferView
				key={offer.offering_id}
				offer={offer}
				offers={offers}
				onSelectOffer={(type) =>
					router.replace(`/listings/${unitId}?offer=${type}`, { scroll: false })
				}
				onGone={() => setGone(true)}
			/>
		);
	}

	return (
		<>
			<Link
				href="/listings"
				className="mb-5 inline-flex items-center gap-2 text-[15px] font-bold text-[#1A4B8C] hover:text-[#1B2E6B]"
			>
				<ArrowLeft size={18} strokeWidth={2.2} />
				All listings
			</Link>
			{content}
		</>
	);
}

export function DetailSkeleton() {
	return (
		<div role="status" aria-label="Loading listing" className="animate-pulse">
			<div className="h-[clamp(250px,44vw,500px)] rounded-3xl bg-[#E8EBF5]" />
			<div className="mt-8 grid grid-cols-1 gap-12 min-[1080px]:grid-cols-[minmax(0,1fr)_420px]">
				<div className="flex flex-col gap-4">
					<div className="h-10 w-3/4 rounded-md bg-[#E8EBF5]" />
					<div className="h-5 w-1/3 rounded-md bg-[#EEF0F5]" />
					<div className="h-24 rounded-md bg-[#EEF0F5]" />
				</div>
				<div className="h-[320px] rounded-[20px] bg-[#EEF0F5]" />
			</div>
		</div>
	);
}
