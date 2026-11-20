"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
	alonePrice,
	fmt,
	GROUP_MINIMUM,
	GROUP_TARGET,
	groupPrice,
	MAX_GROUP_ORDER,
	METERS,
	type MeterType,
	type Prices,
} from "../data";
import { useOrder } from "./OrderContext";
import PricesAsAt from "./PricesAsAt";
import { container, ctaClass, eyebrowClass, green, h2Class, leadClass, sectionPadding } from "./styles";

const label = "text-[13px] font-bold tracking-[0.12em] text-[#4A5480]";
const stepper =
	"h-[54px] w-[54px] flex-none cursor-pointer rounded-[14px] border-none bg-white text-2xl font-extrabold text-haiven-blue";

const clampQty = (n: number) => Math.max(1, Math.min(MAX_GROUP_ORDER, n));

type Props = { prices: Prices; asAt: string | null; today: string };

const Calculator = ({ prices, asAt, today }: Props) => {
	const { orderOnly } = useOrder();
	const [type, setType] = useState<MeterType>("single");
	const [qty, setQty] = useState(20);
	// The box's text while typing, so clearing it doesn't snap straight to 1.
	const [qtyDraft, setQtyDraft] = useState("20");
	const [pool, setPool] = useState(GROUP_TARGET);

	const changeQty = (n: number) => {
		const next = clampQty(n);
		setQty(next);
		setQtyDraft(String(next));
	};

	const alone = alonePrice(prices, type, qty);
	const unit = Math.round(groupPrice(prices, type, pool));
	const saving = (alone - unit) * qty;
	const extra = Math.floor(saving / unit);
	const meterName = type === "single" ? "single-phase meter" : "three-phase meter";
	const [y, m, d] = today.split("-");

	return (
		<section id="calculator" className="scroll-mt-16 bg-white">
			<div className={`${container} ${sectionPadding} flex flex-col gap-9`}>
				<div className="flex flex-col gap-3.5">
					<p className={`${eyebrowClass} ${green}`}>Your cost savings</p>
					<h2 className={h2Class}>
						Bigger group.
						<br />
						<span className={green}>Bigger savings.</span>
					</h2>
					<p className={leadClass}>
						Pick your phase meter and how many you need, then slide the group size
						to see your price and cost savings.
					</p>
				</div>

				<div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] overflow-hidden rounded-[28px] bg-[#F5F7FA]">
					{/* Inputs */}
					<div className="flex flex-col gap-[30px] p-[clamp(22px,3vw,40px)]">
						<div className="flex flex-col gap-2.5">
							<span className={label} id="calc-phase">
								PHASE METER
							</span>
							<div
								role="radiogroup"
								aria-labelledby="calc-phase"
								className="grid grid-cols-2 gap-1.5 rounded-2xl bg-[#E8EBF5] p-1.5"
							>
								{METERS.map((meter) => (
									<button
										key={meter.type}
										type="button"
										role="radio"
										aria-checked={type === meter.type}
										onClick={() => setType(meter.type)}
										className={cn(
											"flex min-h-[60px] cursor-pointer flex-col items-center justify-center gap-0.5 rounded-xl border-none p-2 transition-colors",
											type === meter.type
												? "bg-haiven-blue text-white"
												: "bg-transparent text-haiven-blue hover:bg-white/60",
										)}
									>
										<span className="text-base font-extrabold">{meter.short}</span>
										<span className="text-[13px] font-medium opacity-80">
											{meter.type === "single" ? "homes & flats" : "larger & commercial"}
										</span>
									</button>
								))}
							</div>
						</div>

						<div className="flex flex-col gap-2.5">
							<label htmlFor="calc-qty" className={label}>
								HOW MANY METERS?
							</label>
							<div className="flex items-center gap-2.5">
								<button
									type="button"
									aria-label="One fewer meter"
									onClick={() => changeQty(qty - 1)}
									className={stepper}
								>
									−
								</button>
								<input
									id="calc-qty"
									type="number"
									inputMode="numeric"
									min={1}
									max={MAX_GROUP_ORDER}
									value={qtyDraft}
									onChange={(e) => {
										setQtyDraft(e.target.value);
										const n = parseInt(e.target.value, 10);
										if (Number.isFinite(n)) setQty(clampQty(n));
									}}
									onBlur={() => setQtyDraft(String(qty))}
									className="h-[54px] min-w-0 flex-1 rounded-[14px] border-2 border-[rgba(19,36,126,0.12)] bg-white text-center font-jetbrains text-2xl font-bold text-haiven-blue"
								/>
								<button
									type="button"
									aria-label="One more meter"
									onClick={() => changeQty(qty + 1)}
									className={stepper}
								>
									+
								</button>
							</div>
							<span className="text-sm text-[#4A5480]">
								Up to {MAX_GROUP_ORDER.toLocaleString("en-NG")} per order. Need more?
								Register and we’ll treat it as a special order.
							</span>
						</div>

						<div className="flex flex-col gap-2.5">
							<div className="flex items-baseline justify-between gap-3">
								<label htmlFor="calc-pool" className={label}>
									PAID METERS IN THE GROUP
								</label>
								<span className="font-jetbrains text-xl font-bold">
									{pool.toLocaleString("en-NG")}
								</span>
							</div>
							<input
								id="calc-pool"
								type="range"
								min={GROUP_MINIMUM}
								max={GROUP_TARGET}
								step={50}
								value={pool}
								onChange={(e) => setPool(Number(e.target.value))}
								className="h-[30px] w-full cursor-pointer accent-accent-green"
							/>
							<div className="flex justify-between gap-3 text-[13px] font-semibold text-[#4A5480]">
								<span>300 · group goes ahead</span>
								<span>1,000 · wholesale price</span>
							</div>
						</div>
						<p className="m-0 text-sm leading-normal text-[#4A5480]">
							A group needs at least 300 paid meters to go ahead. Only cleared
							payments count.
						</p>
					</div>

					{/* Receipt */}
					<div className="flex flex-col gap-5 bg-haiven-blue p-[clamp(22px,3vw,40px)]">
						<div
							aria-live="polite"
							className="relative flex flex-col gap-3 rounded-md bg-white px-[26px] pt-7 pb-[26px] font-jetbrains text-haiven-blue shadow-[0_30px_50px_-20px_rgba(0,0,0,0.5)]"
						>
							<div className="flex justify-between gap-3 text-xs font-bold tracking-[0.12em] text-[#4A5480]">
								<span>HLBC · GROUP PURCHASE</span>
								<span>
									{d}.{m}.{y}
								</span>
							</div>
							<div className="border-t-2 border-dashed border-[#D5DAE8]" />
							<div className="flex justify-between gap-3 text-[15px] font-medium">
								<span>
									{qty} × {meterName}
								</span>
								<span>{fmt(unit)} ea.</span>
							</div>
							<div className="flex justify-between gap-3 text-[15px] font-medium text-[#4A5480]">
								<span>Retail (buying alone)</span>
								<span className="line-through decoration-[#D03B3B]">{fmt(alone * qty)}</span>
							</div>
							<div className="flex justify-between gap-3 text-[15px] font-bold">
								<span>Group purchase</span>
								<span>{fmt(unit * qty)}</span>
							</div>
							<div className="border-t-2 border-dashed border-[#D5DAE8]" />
							<span className="text-[13px] font-bold tracking-[0.18em]">COST SAVINGS</span>
							<span className="font-jakarta text-[clamp(44px,6vw,64px)] leading-none font-extrabold tracking-[-0.045em] text-[#00873A]">
								{fmt(saving)}
							</span>
							{extra >= 1 && (
								<div className="mt-1 -rotate-6 self-end rounded-[10px] border-[3px] border-[#00873A] px-3.5 py-2 text-center text-sm leading-[1.3] font-bold tracking-[0.06em] text-[#00873A]">
									ENOUGH FOR
									<br />
									<span className="text-xl">
										+{extra} MORE METER{extra === 1 ? "" : "S"}
									</span>
								</div>
							)}
						</div>
						<p className="m-0 text-[13px] leading-[1.55] text-[#C9D0F0]">
							Illustrative. <PricesAsAt asAt={asAt} /> Your final price is set on
							paid meters when your group closes, subject to supplier confirmation.
						</p>
						<a
							href="#register"
							onClick={() => orderOnly(type, qty)}
							className={`${ctaClass} self-start px-[26px] py-[15px] text-[17px]`}
						>
							Register for these meters <span aria-hidden="true">→</span>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Calculator;
