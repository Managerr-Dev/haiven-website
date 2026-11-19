import Image from "next/image";
import { fmt, fmtK, maxSaving, type Prices } from "../data";
import PricesAsAt from "./PricesAsAt";
import { ctaClass } from "./styles";

const promises = [
	"Free to join, nothing to pay yet",
	"Free Haiven app to manage meters and vend power",
	"Live prices, updated with the market",
];

const Hero = ({ prices, asAt }: { prices: Prices; asAt: string | null }) => {
	const [retail, , wholesale] = prices.single;

	return (
		<section id="top" className="overflow-hidden bg-haiven-blue text-white">
			<div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-center gap-[clamp(40px,5vw,64px)] px-6 pt-[clamp(40px,6vw,80px)] pb-[clamp(48px,6vw,80px)]">
				<div className="flex flex-col gap-6">
					<p className="m-0 text-[13px] leading-[1.6] font-bold tracking-[0.16em] text-accent-green uppercase">
						Smart meter group purchase · Haiven Leverage Buying Club
					</p>
					<h1 className="m-0 text-[clamp(54px,9vw,112px)] leading-[0.92] font-extrabold tracking-[-0.045em]">
						Buy together.
						<br />
						<span className="text-accent-green">Pay wholesale.</span>
					</h1>
					<p className="m-0 max-w-[34ch] text-[clamp(19px,2.2vw,23px)] leading-[1.45] font-medium text-pretty text-[#C9D0F0]">
						Join a Haiven group purchase and get smart phase meters at the
						wholesale price. Cost savings of up to{" "}
						<strong className="font-bold text-white">
							{fmt(maxSaving(prices))} on every meter.
						</strong>
					</p>

					<div className="flex max-w-[540px] flex-wrap overflow-hidden rounded-[18px] border-[1.5px] border-[#2B3C94]">
						<div className="flex flex-[1_1_200px] flex-col gap-1 bg-[#0D1A5E] px-5 py-4">
							<span className="text-xs font-bold tracking-[0.14em] text-[#C9D0F0]">
								RETAIL · BUYING ALONE
							</span>
							<span className="font-jetbrains text-[clamp(24px,3vw,32px)] font-bold text-[#C9D0F0] line-through decoration-[#FF6B6B] decoration-[3px]">
								{fmt(retail)}
							</span>
						</div>
						<div className="flex flex-[1_1_200px] flex-col gap-1 bg-accent-green px-5 py-4 text-haiven-blue">
							<span className="text-xs font-bold tracking-[0.14em]">
								WHOLESALE · BUYING TOGETHER
							</span>
							<span className="font-jetbrains text-[clamp(24px,3vw,32px)] font-bold">
								{fmt(wholesale)}
							</span>
						</div>
					</div>
					<p className="-mt-3 mb-0 text-[13px] text-[#C9D0F0]">
						Single-phase meter, per meter. <PricesAsAt asAt={asAt} />
					</p>

					<div className="flex flex-wrap gap-3">
						<a href="#register" className={`${ctaClass} px-7 py-4 text-lg`}>
							Register free <span aria-hidden="true">→</span>
						</a>
						<a
							href="#live"
							className="flex items-center rounded-full border-[1.5px] border-[#4A5BAE] px-[26px] py-[15px] text-lg font-bold text-white no-underline transition-colors hover:border-white"
						>
							See live groups
						</a>
					</div>
					<ul className="m-0 flex list-none flex-col gap-2.5 p-0">
						{promises.map((p) => (
							<li key={p} className="flex items-center gap-3 text-base font-semibold">
								<span aria-hidden="true" className="font-extrabold text-accent-green">
									✓
								</span>
								{p}
							</li>
						))}
					</ul>
				</div>

				<div className="flex justify-center">
					<div className="relative w-full max-w-[420px]">
						{/* Background cut out of the photo, so the shadow follows the meter. */}
						<Image
							src="/images/hlbc/meter-ste18g.webp"
							alt="Haiven STE18-G single-phase GPRS smart meter"
							width={1030}
							height={1526}
							priority
							sizes="(max-width: 480px) 90vw, 420px"
							className="block h-auto w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.45)]"
						/>
						<div className="absolute bottom-[10%] -left-[7%] flex aspect-square w-[36%] -rotate-[10deg] flex-col items-center justify-center rounded-full bg-accent-green text-center text-haiven-blue shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
							<span className="text-[clamp(10px,1.4vw,12px)] font-bold tracking-[0.12em]">
								WHOLESALE
							</span>
							<span className="text-[clamp(28px,4.4vw,44px)] leading-[1.05] font-extrabold tracking-[-0.04em]">
								{fmtK(wholesale)}
							</span>
							<span className="text-[clamp(10px,1.3vw,12px)] leading-tight font-semibold">
								single-phase
								<br />
								per meter + VAT
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
