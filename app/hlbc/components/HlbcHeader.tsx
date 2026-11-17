import Image from "next/image";
import Link from "next/link";
import { ctaClass } from "./styles";

const navLinks = [
	{ label: "Your saving", href: "#saving" },
	{ label: "How it works", href: "#how" },
	{ label: "FAQ", href: "#faq" },
];

const HlbcHeader = () => (
	<header className="sticky top-0 z-50 border-b border-[#22358F] bg-haiven-blue">
		<div className="mx-auto flex max-w-[1160px] items-center justify-between gap-4 px-5 py-3">
			<Link href="/" aria-label="Haiven home page" className="flex">
				<Image
					src="/images/haiven-logo-light.png"
					alt="Haiven"
					width={1025}
					height={280}
					priority
					className="block h-[34px] w-auto"
				/>
			</Link>
			<div className="flex items-center gap-7">
				<nav className="hidden gap-6 min-[820px]:flex">
					{navLinks.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className="text-[15px] font-semibold text-white no-underline transition-colors hover:text-accent-green"
						>
							{link.label}
						</a>
					))}
				</nav>
				<a
					href="#register"
					className={`${ctaClass} px-5 py-[11px] text-[15px] whitespace-nowrap`}
				>
					Register free
				</a>
			</div>
		</div>
	</header>
);

export default HlbcHeader;
