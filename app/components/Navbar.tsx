"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Navigation from "./Navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import NavbarDownload from "./NavbarDownload";

const Navbar = () => {
	const pathname = usePathname();
	const [isScrolled, setIsScrolled] = useState(false);
	const isLightPage = pathname !== "/";

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 20) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div
			className={cn(
				"fixed top-0 left-0 w-full z-100 transition-all duration-300 font-sans",
				isScrolled
					? "bg-haiven-blue/60 backdrop-blur-lg border-b border-white/10 py-2"
					: "py-4",
			)}
		>
			<div className="max-w-[1312px] mx-auto">
				<div className="flex items-center justify-between">
					{/* logo */}
					<Link href="/">
						<Image
							src={
								isLightPage && !isScrolled
									? "/images/haiven-logo-blue.svg"
									: "/images/haiven-logo-light.png"
							}
							width={256.08}
							height={70}
							alt="Haiven Logo"
						/>
					</Link>

					{/* links */}
					<nav>
						<Navigation isScrolled={isScrolled} />
					</nav>

					{/* button */}

					<NavbarDownload isLightPage={isLightPage} isScrolled={isScrolled} />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
