"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
	alonePrice,
	fmt,
	METER_TYPES,
	type MeterType,
	POOL_MINIMUM,
	POOL_TARGET,
	poolPrice,
} from "../data";
import { MAX_QTY } from "../validation";
import {
	container,
	ctaClass,
	eyebrowClass,
	h2Class,
	mono,
	sectionPadding,
} from "./styles";

const labelClass =
	"text-[13px] font-bold tracking-[0.14em] text-[#4A5584] uppercase";
const stepperBtn =
	"h-[52px] w-[52px] shrink-0 cursor-pointer rounded-[14px] border-[1.5px] border-[#D5DAE8] bg-white text-2xl font-bold text-haiven-blue transition-colors hover:border-haiven-blue";

const clampQty = (n: number) => Math.max(1, Math.min(MAX_QTY, n));

const Calculator = () => {
	const [type, setType] = useState<MeterType>("single");
	const [qty, setQty] = useState(10);
	// What's in the box while typing, so clearing it doesn't snap straight to 1.
	const [qtyDraft, setQtyDraft] = useState("10");
	const [pool, setPool] = useState(POOL_TARGET);

	const changeQty = (n: number) => {
		const next = clampQty(n);
		setQty(next);
		setQtyDraft(String(next));
	};

	const alone = alonePrice(type, qty);
	const unit = Math.round(poolPrice(type, pool));

	return (
		<section id="saving" className="scroll-mt-[60px] bg-[#F5F7FA]">
			<div className={`${container} ${sectionPadding} flex flex-col gap-10`}>
				<div className="flex max-w-[720px] flex-col gap-4">
					<p className={`${eyebrowClass} text-[#00873A]`}>Your saving</p>
					<h2 className={h2Class}>
						The fuller the pool,
						<br />
						<span className="text-[#00873A]">the lower the price.</span>
					</h2>
				</div>

				<div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-5">
					{/* Inputs */}
					<div className="flex flex-col gap-8 rounded-[20px] bg-white p-[clamp(22px,3vw,36px)]">
						<div className="flex flex-col gap-3">
							<span className={labelClass} id="meter-type-label">
								Meter type
							</span>
							<div
								role="radiogroup"
								aria-labelledby="meter-type-label"
								className="grid grid-cols-2 gap-1.5 rounded-[14px] bg-[#EEF1F7] p-1.5"
							>
								{METER_TYPES.map((m) => (
									<button
										key={m.value}
										type="button"
										role="radio"
										aria-checked={type === m.value}
										onClick={() => setType(m.value)}
										className={cn(
											"h-12 cursor-pointer rounded-[10px] text-[15px] font-bold transition-colors",
											type === m.value
												? "bg-haiven-blue text-white"
												: "bg-transparent text-haiven-blue hover:bg-white/60",
										)}
									>
										{m.label}
									</button>
								))}
							</div>
						</div>

						<div className="flex flex-col gap-3">
							<label htmlFor="calc-qty" className={labelClass}>
								Meters you need
							</label>
							<div className="flex items-center gap-2.5">
								<button
									type="button"
									aria-label="Fewer"
									onClick={() => changeQty(qty - 1)}
									className={stepperBtn}
								>
									−
								</button>
								<input
									id="calc-qty"
									type="number"
									inputMode="numeric"
									min={1}
									max={MAX_QTY}
									value={qtyDraft}
									onChange={(e) => {
										setQtyDraft(e.target.value);
										const n = parseInt(e.target.value, 10);
										if (Number.isFinite(n)) setQty(clampQty(n));
									}}
									onBlur={() => setQtyDraft(String(qty))}
									className={`${mono} h-[52px] min-w-0 flex-1 rounded-[14px] border-[1.5px] border-[#D5DAE8] bg-white text-center text-[22px] font-bold text-haiven-blue`}
								/>
								<button
									type="button"
									aria-label="More"
									onClick={() => changeQty(qty + 1)}
									className={stepperBtn}
								>
									+
								</button>
							</div>
							<span className="text-sm text-[#4A5584]">
								From 1 to 999. Buying alone, you’d pay {fmt(alone)} each.
							</span>
						</div>

						<div className="flex flex-col gap-3">
							<div className="flex items-baseline justify-between gap-3">
								<label htmlFor="calc-pool" className={labelClass}>
									Pool closes at
								</label>
								<span className={`${mono} text-lg font-bold`}>
									{pool.toLocaleString("en-NG")} paid
								</span>
							</div>
							<input
								id="calc-pool"
								type="range"
								min={POOL_MINIMUM}
								max={POOL_TARGET}
								step={10}
								value={pool}
								onChange={(e) => setPool(Number(e.target.value))}
								className="h-7 w-full cursor-pointer accent-accent-green"
							/>
							<div className="flex justify-between text-[13px] font-semibold text-[#4A5584]">
								<span>300 · pool goes ahead</span>
								<span>1,000 · full wholesale</span>
							</div>
						</div>
					</div>

					{/* Result */}
					<div
						aria-live="polite"
						className="flex flex-col gap-5 rounded-[20px] bg-haiven-blue p-[clamp(22px,3vw,36px)] text-white"
					>
						<div className="flex flex-col gap-1">
							<span className="text-[13px] font-bold tracking-[0.14em] text-[#C9D0F0] uppercase">
								Price per meter
							</span>
							<span
								className={`${mono} text-[clamp(34px,4.6vw,48px)] font-bold tracking-[-0.02em]`}
							>
								{fmt(unit)}
							</span>
						</div>
						<div className="flex flex-col border-t border-[#2B3C94]">
							<div className="flex justify-between gap-3 border-b border-[#2B3C94] py-3.5">
								<span className="font-semibold text-[#C9D0F0]">Buying alone</span>
								<span
									className={`${mono} font-medium line-through decoration-[#FF6B6B]`}
								>
									{fmt(alone * qty)}
								</span>
							</div>
							<div className="flex justify-between gap-3 border-b border-[#2B3C94] py-3.5">
								<span className="font-semibold text-[#C9D0F0]">
									Through the pool
								</span>
								<span className={`${mono} font-bold`}>{fmt(unit * qty)}</span>
							</div>
						</div>
						<div className="mt-auto flex flex-col gap-1">
							<span className={`${mono} text-sm font-bold tracking-[0.18em]`}>
								YOU KEEP
							</span>
							<span className="text-[clamp(44px,6.4vw,68px)] leading-none font-extrabold tracking-[-0.04em] text-accent-green">
								{fmt((alone - unit) * qty)}
							</span>
						</div>
						<a
							href="#register"
							className={`${ctaClass} self-start px-6 py-3.5 text-[17px]`}
						>
							Register free <span aria-hidden="true">→</span>
						</a>
					</div>
				</div>

				<p className="m-0 max-w-[760px] text-sm leading-[1.55] text-[#4A5584]">
					Estimate, per meter, excluding VAT and courier. Only cleared payments
					count toward the pool. Final prices are confirmed by Haiven after
					provisional closure and are subject to supplier confirmation.
				</p>
			</div>
		</section>
	);
};

export default Calculator;
