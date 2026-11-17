import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import HlbcFooter from "./components/HlbcFooter";
import HlbcHeader from "./components/HlbcHeader";
import StickyCta from "./components/StickyCta";

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

const title = "Haiven Leverage Buying Club — smart meters at pool prices";
const description =
	"Join the HLBC pool and pay as low as the 1,000-meter price for GPRS smart meters, even if you only need one. Free, non-binding registration.";

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

export default function HlbcLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div
			className={`${jakartaSans.variable} ${jetbrainsMono.variable} min-h-screen bg-[#F5F7FA] font-jakarta text-haiven-blue antialiased`}
		>
			<HlbcHeader />
			<main>{children}</main>
			<HlbcFooter />
			<StickyCta />
		</div>
	);
}
