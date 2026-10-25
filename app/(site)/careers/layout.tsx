import { Plus_Jakarta_Sans } from "next/font/google";

const jakartaSans = Plus_Jakarta_Sans({
	variable: "--font-jakarta-sans",
	subsets: ["latin"],
	display: "swap",
});

export default function CareersLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div
			className={`${jakartaSans.variable} bg-white font-jakarta text-[#14182B] antialiased`}
		>
			{children}
		</div>
	);
}
