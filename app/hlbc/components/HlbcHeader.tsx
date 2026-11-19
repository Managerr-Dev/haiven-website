import Image from "next/image";
import Link from "next/link";
import { ctaClass } from "./styles";

const navLinks = [
	{ label: "Live groups", href: "#live" },
	{ label: "Your savings", href: "#calculator" },
	{ label: "How it works", href: "#how" },
	{ label: "FAQ", href: "#faq" },
];

const HlbcHeader = () => (
	<header className="sticky top-0 z-50 border-b border-[#22358F] bg-haiven-blue">
		<div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-6 py-3">
			<div className="flex items-center gap-5">
				<Link href="/" aria-label="Haiven home page" className="flex">
					<Image
						src="/images/haiven-logo-light.png"
						alt="Haiven"
						width={1025}
						height={280}
						priority
						className="block h-[38px] w-auto"
					/>
				</Link>
				<span className="hidden rounded-full border-[1.5px] border-[#2B3C94] px-3 py-1.5 font-jetbrains text-[11px] font-bold tracking-[0.14em] whitespace-nowrap text-accent-green min-[1240px]:inline">
					SMART METERS · SMARTER PRICES
				</span>
			</div>
			<div className="flex items-center gap-7">
				<nav aria-label="Page sections" className="hidden gap-6 min-[900px]:flex">
					{navLinks.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className="text-[15px] font-semibold whitespace-nowrap text-white no-underline transition-colors hover:text-accent-green"
						>
							{link.label}
						</a>
					))}
				</nav>
				<a
					href="#register"
					className={`${ctaClass} px-5 py-[11px] text-[15px] whitespace-nowrap`}
				>
					Register free <span aria-hidden="true">→</span>
				</a>
			</div>
		</div>
	</header>
);

export default HlbcHeader;
