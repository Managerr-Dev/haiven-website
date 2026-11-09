import ListingDetail, {
	DetailSkeleton,
} from "@/app/components/listings/ListingDetail";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Listing details",
	description: "See photos, details and costs for this listing on Haiven.",
};

export default async function ListingPage({
	params,
}: {
	params: Promise<{ listingId: string }>;
}) {
	const { listingId } = await params;
	return (
		<section className="bg-white pt-[clamp(104px,10vw,128px)] pb-[clamp(56px,7vw,96px)]">
			<div className="mx-auto max-w-[1200px] px-[clamp(16px,2vw,24px)]">
				<Suspense fallback={<DetailSkeleton />}>
					<ListingDetail unitId={listingId} />
				</Suspense>
			</div>
		</section>
	);
}
