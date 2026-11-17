"use client";

import { type ListingPhoto } from "@/app/(site)/listings/api";
import { cn } from "@/lib/utils";
import { AlertCircle, Building2, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const focusRing =
	"focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#1A4B8C]";

export const primaryButton = cn(
	"flex cursor-pointer items-center justify-center gap-3 rounded-full bg-[#00C853] px-7 py-4 text-base font-bold text-[#0E1B45] hover:bg-[#00B84C] disabled:cursor-not-allowed disabled:opacity-60",
	focusRing,
);

export const secondaryButton = cn(
	"inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-[1.5px] border-[#1A4B8C] bg-white px-5 py-3 text-[15px] font-bold text-[#1A4B8C] hover:bg-[#F0F3FA] disabled:cursor-not-allowed disabled:opacity-50",
	focusRing,
);

export function Banner({
	children,
	tone = "error",
}: {
	children: React.ReactNode;
	tone?: "error" | "wait";
}) {
	const Icon = tone === "wait" ? Clock : AlertCircle;
	return (
		<div
			role="alert"
			className={cn(
				"flex items-start gap-2.5 rounded-xl px-4 py-3.5 text-[15px] font-semibold leading-[1.45]",
				tone === "wait"
					? "bg-[#FFF4E0] text-[#7A4B00]"
					: "bg-[#FDECEA] text-[#8A1C12]",
			)}
		>
			<Icon size={18} strokeWidth={2.2} className="mt-0.5 shrink-0" />
			<div>{children}</div>
		</div>
	);
}

export function Spinner() {
	return (
		<span
			aria-hidden="true"
			className="inline-block size-[18px] animate-spin rounded-full border-[2.5px] border-[rgba(14,27,69,.25)] border-t-[#0E1B45]"
		/>
	);
}

/** A listing photo that falls back to a plain panel if it's missing or fails. */
export function ListingImage({
	photo,
	alt,
	sizes,
	priority = false,
}: {
	photo?: ListingPhoto;
	alt: string;
	sizes: string;
	priority?: boolean;
}) {
	const [failed, setFailed] = useState(false);
	if (!photo || failed) {
		return (
			<div className="absolute inset-0 flex items-center justify-center bg-[#E8EBF5]">
				<Building2 size={44} strokeWidth={1.4} className="text-[#8D97B5]" />
			</div>
		);
	}
	return (
		// Hosts upload to storage on the API's domain, which varies by environment,
		// so these skip the Next.js image optimizer and its domain allowlist.
		<Image
			src={photo.url}
			alt={alt}
			fill
			unoptimized
			priority={priority}
			sizes={sizes}
			onError={() => setFailed(true)}
			className="object-cover"
		/>
	);
}

/** A full-width message in place of a page or results: not found, errors, empty. */
export function StateMessage({
	icon,
	title,
	children,
	action,
}: {
	icon?: React.ReactNode;
	title: string;
	children: React.ReactNode;
	action?: React.ReactNode;
}) {
	return (
		<div
			role="status"
			className="flex flex-col items-center gap-3 rounded-[20px] border border-[#E3E7F0] bg-white px-6 py-[clamp(40px,6vw,72px)] text-center"
		>
			{icon && (
				<span className="flex size-16 items-center justify-center rounded-full bg-[#E8EBF5] text-[#1A4B8C]">
					{icon}
				</span>
			)}
			<h2 className="mt-1 text-[clamp(22px,2.4vw,28px)] font-extrabold tracking-[-0.02em] text-[#1B2E6B]">
				{title}
			</h2>
			<p className="max-w-[520px] text-base leading-[1.6] text-[#363C52]">
				{children}
			</p>
			{action && <div className="mt-3">{action}</div>}
		</div>
	);
}

export function NotAvailable() {
	return (
		<StateMessage
			icon={<Building2 size={30} strokeWidth={1.8} />}
			title="This listing isn't available"
			action={
				<Link href="/listings" className={primaryButton}>
					Browse other listings
				</Link>
			}
		>
			It may have been let or taken down by the host, or the link may be out of
			date.
		</StateMessage>
	);
}
