import type { Metadata } from "next";
import { Alan_Sans, Instrument_Sans } from "next/font/google";
import CaretakerFooter from "./components/CaretakerFooter";
import CaretakerHeader from "./components/CaretakerHeader";

const alanSans = Alan_Sans({
	variable: "--font-alan-sans",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	display: "swap",
	// Alan Sans has no entry in Next's font-metrics database, so it can't
	// synthesise a size-adjusted fallback ("Failed to find font override
	// values"). Turn that off and hand it an explicit fallback stack instead.
	adjustFontFallback: false,
	fallback: ["Instrument Sans", "system-ui", "sans-serif"],
});

const instrumentSans = Instrument_Sans({
	variable: "--font-instrument-sans",
	subsets: ["latin"],
	display: "swap",
	fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
	title: {
		absolute: "Caretaker by Haiven — property management, on the record",
	},
	description:
		"Run your property from your phone with one system for records, work orders, payments, access and reporting. When you need physical presence, add a certified Caretaker on the ground.",
	alternates: { canonical: "/caretaker" },
	openGraph: {
		type: "website",
		url: "/caretaker",
		title: "Caretaker by Haiven — property management, on the record",
		description:
			"One system for records, work orders, payments, access and reporting — with a certified Caretaker on the ground when you need one.",
	},
};

export default function CaretakerLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div
			className={`${alanSans.variable} ${instrumentSans.variable} min-h-screen bg-[#FAFBFD] font-instrument text-[#16234A]`}
		>
			<CaretakerHeader />
			<main id="top">{children}</main>
			<CaretakerFooter />
		</div>
	);
}
