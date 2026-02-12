import type { Metadata } from "next";
import { Montserrat, Sora } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import RecaptchaProvider from "./components/RecaptchaProvider";

const montserratSans = Montserrat({
	variable: "--font-montserrat-sans",
	subsets: ["latin"],
});

const soraSans = Sora({
	variable: "--font-sora-sans",
	subsets: ["latin"],
});

const siteName = "Haiven";
const companyName = "Haiven Smart Systems Limited";
const url = "https://haiven.net";
const residentUrl = "https://resident.haiven.net";

export const metadata: Metadata = {
	metadataBase: new URL(url),

	title: {
		default: `${siteName} — Smart Community & Estate Management`,
		template: `%s — ${siteName}`,
	},
	description:
		"Haiven is an all-in-one community and estate management platform for gated communities, estates, hostels, apartments, and facilities—manage residents and guests, collect payments for bills and dues, run visitor management, access control, facility bookings, and community communication in one secure app.",

	applicationName: siteName,
	generator: "Next.js",
	referrer: "origin-when-cross-origin",
	keywords: [
		"Haiven",
		"estate management",
		"community management",
		"gated community software",
		"resident app",
		"visitor management",
		"access control",
		"wallet",
		"payment collection",
		"bills and dues",
		"facility booking",
		"security management",
		"property management Nigeria",
		"hostel management",
		"apartment management",
	],

	authors: [{ name: companyName, url }],
	creator: companyName,
	publisher: companyName,

	alternates: {
		canonical: "/",
		// If you have localized pages later:
		// languages: { "en-NG": "/en-ng" },
	},

	openGraph: {
		type: "website",
		url,
		siteName,
		title: `${siteName} — Smart Community & Estate Management`,
		description:
			"All-in-one platform for communities and estates: payments (wallet, bills & dues), visitor management, access control, facility bookings, and resident communication.",
		locale: "en_NG",
	},

	twitter: {
		card: "summary_large_image",
		title: `${siteName} — Smart Community & Estate Management`,
		description:
			"Payments + visitor management + access control + facility booking + community communication—built for estates, hostels, and residential communities.",

		site: "@Haiven_ng",
		creator: "@Haiven_ng",
	},

	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},

	category: "technology",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${montserratSans.variable} ${soraSans.variable} antialiased`}
			>
				<RecaptchaProvider>
					<Navbar />
					{children}
					<Footer />
				</RecaptchaProvider>
			</body>
		</html>
	);
}
