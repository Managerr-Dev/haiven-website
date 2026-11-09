"use client";

import type { ListingPhoto } from "@/app/(site)/listings/api";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { focusRing, ListingImage } from "./ui";

const SLIDE_HEIGHT = "h-[clamp(250px,44vw,500px)]";

const arrowClass = cn(
	"absolute top-1/2 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-[#1B2E6B] shadow-md disabled:hidden",
	focusRing,
);

export default function PhotoGallery({
	photos,
	title,
}: {
	photos: ListingPhoto[];
	title: string;
}) {
	const [viewportRef, embla] = useEmblaCarousel({ align: "start" });
	const [index, setIndex] = useState(0);

	useEffect(() => {
		if (!embla) return;
		const onSelect = () => setIndex(embla.selectedScrollSnap());
		embla.on("select", onSelect);
		return () => {
			embla.off("select", onSelect);
		};
	}, [embla]);

	if (photos.length === 0) {
		return (
			<div className={cn("relative overflow-hidden rounded-3xl", SLIDE_HEIGHT)}>
				<ListingImage alt="" sizes="100vw" />
			</div>
		);
	}

	const altFor = (photo: ListingPhoto, i: number) =>
		photo.caption || `${title}, photo ${i + 1} of ${photos.length}`;

	return (
		<div className="flex flex-col gap-3">
			<div className="relative">
				<div ref={viewportRef} className="overflow-hidden rounded-3xl">
					<div className="flex">
						{photos.map((photo, i) => (
							<div
								key={photo.id}
								className={cn("relative min-w-0 flex-[0_0_100%]", SLIDE_HEIGHT)}
							>
								<ListingImage
									photo={photo}
									alt={altFor(photo, i)}
									sizes="(min-width: 1200px) 1152px, 100vw"
									priority={i === 0}
								/>
							</div>
						))}
					</div>
				</div>
				{photos.length > 1 && (
					<>
						<button
							type="button"
							aria-label="Previous photo"
							disabled={index === 0}
							onClick={() => embla?.scrollPrev()}
							className={cn(arrowClass, "left-3")}
						>
							<ChevronLeft size={22} strokeWidth={2.2} />
						</button>
						<button
							type="button"
							aria-label="Next photo"
							disabled={index === photos.length - 1}
							onClick={() => embla?.scrollNext()}
							className={cn(arrowClass, "right-3")}
						>
							<ChevronRight size={22} strokeWidth={2.2} />
						</button>
						<span className="absolute bottom-3 right-3 rounded-full bg-[rgba(14,27,69,.75)] px-3 py-1 text-[13px] font-semibold text-white">
							{index + 1} / {photos.length}
						</span>
					</>
				)}
			</div>
			{photos.length > 1 && (
				<div className="flex gap-2 overflow-x-auto pb-1">
					{photos.map((photo, i) => (
						<button
							key={photo.id}
							type="button"
							aria-label={`Show photo ${i + 1} of ${photos.length}`}
							aria-current={i === index || undefined}
							onClick={() => embla?.scrollTo(i)}
							className={cn(
								"relative h-16 w-[88px] shrink-0 cursor-pointer overflow-hidden rounded-[10px] border-2",
								focusRing,
								i === index ? "border-[#1B2E6B]" : "border-transparent opacity-75",
							)}
						>
							<Image
								src={photo.url}
								alt=""
								fill
								unoptimized
								sizes="88px"
								className="object-cover"
							/>
						</button>
					))}
				</div>
			)}
		</div>
	);
}
