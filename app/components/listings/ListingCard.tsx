import type { ListingOffer } from "@/app/(site)/listings/api";
import {
	frequencyLabel,
	money,
	offerLocation,
	offerSubtitle,
	offerTitle,
	offerTypeLabel,
	roomSummary,
	sortPhotos,
} from "@/app/(site)/listings/format";
import { Bath, BedDouble, MapPin } from "lucide-react";
import Link from "next/link";
import { focusRing, ListingImage } from "./ui";

export default function ListingCard({ offer }: { offer: ListingOffer }) {
	const title = offerTitle(offer);
	const subtitle = offerSubtitle(offer);
	const location = offerLocation(offer);
	const rooms = roomSummary(offer);

	return (
		<Link
			href={`/listings/${offer.id}?offer=${offer.type}`}
			className={`flex flex-col overflow-hidden rounded-[20px] border border-[#E3E7F0] bg-white transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(27,46,107,.12)] ${focusRing}`}
		>
			<div className="relative h-[210px] bg-[#E8EBF5]">
				<ListingImage
					photo={sortPhotos(offer.photos)[0]}
					alt=""
					sizes="(min-width: 1080px) 400px, (min-width: 640px) 50vw, 100vw"
				/>
				<span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1.5 text-[13px] font-bold text-[#1B2E6B] shadow-sm">
					{offerTypeLabel(offer.type)}
				</span>
			</div>
			<div className="flex flex-1 flex-col gap-2.5 p-5">
				<p className="text-[22px] font-extrabold tracking-[-0.01em] text-[#1B2E6B]">
					{money(offer.price, offer.currency)}{" "}
					<span className="text-sm font-semibold tracking-normal text-[#4A5168]">
						{frequencyLabel(offer.frequency)}
					</span>
				</p>
				<div>
					<h3 className="text-[17px] font-bold leading-[1.3] text-[#14182B]">
						{title}
					</h3>
					{subtitle && <p className="text-[15px] text-[#4A5168]">{subtitle}</p>}
				</div>
				{location && (
					<p className="flex items-center gap-2 text-[15px] text-[#363C52]">
						<MapPin size={16} strokeWidth={1.8} className="shrink-0 text-[#1A4B8C]" />
						{location}
					</p>
				)}
				{(rooms.bedrooms || rooms.bathrooms) && (
					<div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-1 text-sm font-medium text-[#363C52]">
						{rooms.bedrooms && (
							<span className="flex items-center gap-1.5">
								<BedDouble size={16} strokeWidth={1.8} className="text-[#1A4B8C]" />
								{rooms.bedrooms}
							</span>
						)}
						{rooms.bathrooms && (
							<span className="flex items-center gap-1.5">
								<Bath size={16} strokeWidth={1.8} className="text-[#1A4B8C]" />
								{rooms.bathrooms}
							</span>
						)}
					</div>
				)}
			</div>
		</Link>
	);
}

export function ListingCardSkeleton() {
	return (
		<div
			aria-hidden="true"
			className="flex animate-pulse flex-col overflow-hidden rounded-[20px] border border-[#E3E7F0] bg-white"
		>
			<div className="h-[210px] bg-[#E8EBF5]" />
			<div className="flex flex-col gap-3 p-5">
				<div className="h-6 w-2/3 rounded-md bg-[#E8EBF5]" />
				<div className="h-4 w-4/5 rounded-md bg-[#EEF0F5]" />
				<div className="h-4 w-1/2 rounded-md bg-[#EEF0F5]" />
			</div>
		</div>
	);
}
