"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Navigation from "./Navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import NavbarDownload from "./NavbarDownload";
import { Menu, X } from "lucide-react";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
	const pathname = usePathname();
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
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

	// Reset menu state when pathname changes
	useEffect(() => {
		setIsMenuOpen(false);
	}, [pathname]);

	// Prevent scrolling when menu is open
	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isMenuOpen]);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	return (
		<>
			<div
				className={cn(
					"fixed top-0 left-0 w-full z-100 transition-all duration-300 font-sans",
					isScrolled || isMenuOpen
						? "bg-haiven-blue/60 backdrop-blur-lg border-b border-white/10 py-2"
						: "py-4",
				)}
			>
				<div className="max-w-[1312px] mx-auto px-6">
					<div className="flex items-center justify-between">
						{/* logo */}
						<Link href="/" className="relative z-110">
							<Image
								src={
									isLightPage && !isScrolled && !isMenuOpen
										? "/images/haiven-logo-blue.svg"
										: "/images/haiven-logo-light.png"
								}
								width={200.08}
								height={70}
								alt="Haiven Logo"
								loading="eager"
								className="w-[100px] md:w-[180px] xl:w-[200px] h-auto"
							/>
						</Link>

						{/* Desktop links */}
						<nav className="hidden lg:block">
							<Navigation isScrolled={isScrolled} />
						</nav>

						{/* Desktop button */}
						<div className="hidden lg:block">
							<NavbarDownload
								isLightPage={isLightPage}
								isScrolled={isScrolled}
							/>
						</div>

						{/* Mobile toggle button */}
						<button
							className={cn(
								"lg:hidden p-2 z-110 transition-colors",
								isLightPage && !isScrolled && !isMenuOpen
									? "text-haiven-blue"
									: "text-white",
							)}
							onClick={toggleMenu}
							aria-label="Toggle menu"
						>
							{isMenuOpen ? <X size={32} /> : <Menu size={32} />}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu Overlay */}
			<MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
		</>
	);
};

export default Navbar;
