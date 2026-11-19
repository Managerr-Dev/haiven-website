import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import HlbcFooter from "./components/HlbcFooter";
import HlbcHeader from "./components/HlbcHeader";
import StickyCta from "./components/StickyCta";
import { getHlbcState } from "./lib/state";

const jakartaSans = Plus_Jakarta_Sans({
	variable: "--font-jakarta-sans",
	subsets: ["latin"],
	display: "swap",
	fallback: ["system-ui", "sans-serif"],
});

const jetbrainsMono = JetBrains_Mono({
	variable: "--font-jetbrains-mono",
	subsets: ["latin"],
	// Load the variable font rather than pinned weights: Google serves pinned
	// instances of variable fonts from /l/font?kit=… URLs, which Turbopack can't
	// resolve, breaking the Vercel build. The variable file covers 500 and 700.
	display: "swap",
	fallback: ["ui-monospace", "monospace"],
});

const title = "Haiven Group Purchase: Smart meters at wholesale price | HLBC";
const description =
	"Join a Haiven group purchase and get smart phase meters at the wholesale price, even if you only need one. Free to join, nothing to pay until your group closes.";

export const metadata: Metadata = {
	title: { absolute: title },
	description,
	alternates: { canonical: "/hlbc" },
	openGraph: {
		type: "website",
		url: "/hlbc",
		title,
		description,
		// A segment-level openGraph object replaces the root one, so the
		// file-based app/opengraph-image.png isn't inherited — set it explicitly.
		images: [{ url: "/opengraph-image.png", width: 3600, height: 1890 }],
	},
	twitter: {
		card: "summary_large_image",
		title,
		description,
		images: ["/opengraph-image.png"],
	},
};

export default async function HlbcLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const { prices, pricesAsAt } = await getHlbcState();

	return (
		<div
			className={`${jakartaSans.variable} ${jetbrainsMono.variable} min-h-screen bg-[#F5F7FA] font-jakarta text-haiven-blue antialiased`}
		>
			<HlbcHeader />
			<main>{children}</main>
			<HlbcFooter asAt={pricesAsAt} />
			<StickyCta prices={prices} />
		</div>
	);
}
