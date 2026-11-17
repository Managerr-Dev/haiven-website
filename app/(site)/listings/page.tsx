import ListingsBrowser, {
	ListingsBrowserFallback,
} from "@/app/components/listings/ListingsBrowser";
import type { Metadata } from "next";
import { Suspense } from "react";

const description =
	"Browse verified homes to rent and short stays on Haiven. Filter by location, price, bedrooms and amenities.";

export const metadata: Metadata = {
	title: "Homes to rent and short stays",
	description,
	alternates: { canonical: "/listings" },
	openGraph: {
		type: "website",
		url: "/listings",
		title: "Homes to rent and short stays on Haiven",
		description,
	},
};

export default function ListingsPage() {
	return (
		<section className="bg-[#F5F7FA] pt-[clamp(112px,11vw,144px)] pb-[clamp(64px,8vw,104px)]">
			<div className="mx-auto max-w-[1200px] px-[clamp(16px,2vw,24px)]">
				<h1 className="text-[clamp(32px,4.4vw,52px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-balance text-[#1B2E6B]">
					Find your next home or short stay
				</h1>
				<p className="mt-3 max-w-[640px] text-[clamp(16px,1.4vw,18px)] leading-[1.6] text-[#363C52]">
					Homes to rent and short stays, listed by verified properties on Haiven.
				</p>
				<Suspense fallback={<ListingsBrowserFallback />}>
					<ListingsBrowser />
				</Suspense>
			</div>
		</section>
	);
}
