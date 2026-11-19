import { cn } from "@/lib/utils";
import { fmt, METERS, type Prices } from "../data";
import PricesAsAt from "./PricesAsAt";
import { container, eyebrowClass, finePrint, green, h2Class, sectionPadding } from "./styles";

const WAVE =
	"M-80 32 Q -60 -22 -40 32 Q -20 86 0 32 Q 20 -22 40 32 Q 60 86 80 32 Q 100 -22 120 32 Q 140 86 160 32 Q 180 -22 200 32 Q 220 86 240 32";

/** One sine wave for single-phase, three offset waves for three-phase. */
const Waves = ({ phases, color }: { phases: 1 | 3; color: string }) => (
	<svg width="180" height="58" viewBox="0 0 200 64" aria-hidden="true">
		<g fill="none" stroke={color} strokeWidth="4" strokeLinecap="round">
			<path d={WAVE} />
			{phases === 3 && (
				<>
					<path d={WAVE} opacity="0.72" transform="translate(26.7 0)" />
					<path d={WAVE} opacity="0.44" transform="translate(53.3 0)" />
				</>
			)}
		</g>
	</svg>
);

const Meters = ({ prices, asAt }: { prices: Prices; asAt: string | null }) => (
	<section id="meters" className="bg-[#F5F7FA]">
		<div className={`${container} ${sectionPadding} flex flex-col gap-9`}>
			<div className="flex flex-col gap-3.5">
				<p className={`${eyebrowClass} ${green}`}>Choose your phase meter</p>
				<h2 className={h2Class}>
					Single or three-phase.
					<br />
					<span className={green}>Both at wholesale.</span>
				</h2>
			</div>

			<div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-5">
				{METERS.map((meter) => {
					const dark = meter.type === "three";
					const [retail, mid, wholesale] = prices[meter.type];
					const muted = dark ? "text-[#C9D0F0]" : "text-[#4A5480]";
					return (
						<article
							key={meter.type}
							className={cn(
								"flex flex-col gap-5 rounded-[28px] p-[clamp(22px,3vw,32px)]",
								dark
									? "bg-haiven-blue text-white"
									: "border border-[rgba(19,36,126,0.12)] bg-white",
							)}
						>
							<Waves phases={dark ? 3 : 1} color={dark ? "#1ED760" : "#00873A"} />
							<div className="flex flex-col gap-1.5">
								<h3 className="m-0 text-[30px] font-extrabold tracking-[-0.03em]">
									{meter.name}
								</h3>
								<span className={cn("text-[15px]", muted)}>{meter.use}</span>
							</div>
							<div className="flex flex-col gap-1">
								<span className={cn("text-xs font-bold tracking-[0.14em]", muted)}>RETAIL</span>
								<span
									className={cn(
										"font-jetbrains text-[22px] font-bold line-through decoration-2",
										muted,
										dark ? "decoration-[#FF6B6B]" : "decoration-[#D03B3B]",
									)}
								>
									{fmt(retail)}
								</span>
								<span
									className={cn(
										"mt-2.5 text-xs font-bold tracking-[0.14em]",
										dark ? "text-accent-green" : "text-[#00873A]",
									)}
								>
									WHOLESALE
								</span>
								<span className="text-[clamp(44px,5vw,58px)] leading-none font-extrabold tracking-[-0.045em]">
									{fmt(wholesale)}
								</span>
								<span className={cn("text-sm", muted)}>per meter + VAT</span>
							</div>
							<dl className={cn("m-0 flex flex-wrap gap-4 text-sm font-semibold", muted)}>
								{[
									["1–99", retail],
									["100–999", mid],
									["1,000+", wholesale],
								].map(([tier, price]) => (
									<div key={tier} className="flex gap-1">
										<dt>{tier}:</dt>
										<dd className={cn("m-0 font-jetbrains font-bold", dark && "text-white")}>
											{fmt(Number(price))}
										</dd>
									</div>
								))}
							</dl>
							<div className="rounded-[14px] bg-accent-green px-4 py-3 text-lg font-extrabold text-haiven-blue">
								Save {fmt(retail - wholesale)} per meter
							</div>
						</article>
					);
				})}
			</div>

			<div className="flex items-center gap-4 rounded-[18px] border-2 border-dashed border-[rgba(19,36,126,0.25)] px-6 py-[18px] text-base leading-normal font-semibold">
				<span aria-hidden="true" className="text-[26px] leading-none font-medium">
					+
				</span>
				<span>
					Meter boxes and circuit breakers are optional, quoted separately on
					request, and not part of the group purchase.
				</span>
			</div>
			<p className={finePrint}>
				<PricesAsAt asAt={asAt} />
			</p>
		</div>
	</section>
);

export default Meters;
