"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
	isLightPage: boolean;
	isScrolled: boolean;
}

const NavbarDownload = ({ isLightPage, isScrolled }: Props) => {
	const handleDownload = () => {
		const userAgent = navigator.userAgent || navigator.vendor;
		const isApple = /iPad|iPhone|iPod|Macintosh/.test(userAgent);
		const url = isApple
			? "https://apps.apple.com/app/id6478140231"
			: "https://play.google.com/store/apps/details?id=com.anonymous.haiven";
		window.open(url, "_blank");
	};

	return (
		<Button
			onClick={handleDownload}
			className={cn(
				"py-4 h-auto px-10 bg-accent-green font-semibold rounded-[10.18px] transition-colors duration-300 cursor-pointer hover:bg-white hover:text-haiven-blue",
				isLightPage && !isScrolled ? "text-white" : "text-haiven-blue",
			)}
		>
			Download App
		</Button>
	);
};

export default NavbarDownload;
