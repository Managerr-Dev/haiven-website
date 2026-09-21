"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { scrollToId } from "./ScrollLink";

const navLinks = [
	{ label: "What it runs", target: "runs" },
	{ label: "Product", target: "product" },
	{ label: "Plans", target: "plans" },
];

const CaretakerHeader = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const go = (id: string) => (e: React.MouseEvent) => {
		e.preventDefault();
		setMenuOpen(false);
		scrollToId(id);
	};

	return (
		<header className="sticky top-0 z-60 border-b border-[#E8EBF5] bg-[#FAFBFD]/[0.88] backdrop-blur-[10px]">
			<div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-6 py-3.5">
				<a href="#top" onClick={go("top")} className="flex items-center gap-2.5">
					<Image
						src="/images/caretaker/caretaker-logo.svg"
						alt="Caretaker by Haiven"
						width={117}
						height={26}
						className="h-[26px] w-auto"
						priority
					/>
				</a>

				<nav className="hidden items-center gap-7 md:flex">
					{navLinks.map((link) => (
						<a
							key={link.target}
							href={`#${link.target}`}
							onClick={go(link.target)}
							className="text-[14.5px] text-[#6B7A9E] transition-colors hover:text-[#16234A]"
						>
							{link.label}
						</a>
					))}
					<a
						href="#signup"
						onClick={go("signup")}
						className="rounded-[10px] bg-[#1B2E6B] px-[18px] py-2.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-[#16234A]"
					>
						Start free
					</a>
				</nav>

				<button
					type="button"
					aria-label="Toggle menu"
					aria-expanded={menuOpen}
					onClick={() => setMenuOpen((v) => !v)}
					className="p-1 text-[#16234A] md:hidden"
				>
					{menuOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>

			{menuOpen && (
				<nav className="flex flex-col gap-1 border-t border-[#E8EBF5] px-6 py-3 md:hidden">
					{navLinks.map((link) => (
						<a
							key={link.target}
							href={`#${link.target}`}
							onClick={go(link.target)}
							className="py-2 text-[15px] font-medium text-[#16234A]"
						>
							{link.label}
						</a>
					))}
					<a
						href="#signup"
						onClick={go("signup")}
						className="mt-2 rounded-[10px] bg-[#1B2E6B] px-[18px] py-3 text-center text-[15px] font-semibold text-white"
					>
						Start free
					</a>
				</nav>
			)}
		</header>
	);
};

export default CaretakerHeader;
