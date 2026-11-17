import { cn } from "@/lib/utils";
import { fmt, POOL_TARGET, poolPrice, TABLE_TIERS } from "../data";
import { container, eyebrowClass, mono, sectionPadding } from "./styles";

const PriceCalculation = () => (
	<section className="bg-[#F5F7FA]">
		<div
			className={`${container} ${sectionPadding} grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-10`}
		>
			<div className="flex flex-col gap-5">
				<p className={`${eyebrowClass} text-[#00873A]`}>Transparent pricing</p>
				<h2 className="m-0 text-[clamp(32px,4.6vw,52px)] leading-[1.02] font-extrabold tracking-[-0.04em]">
					How your price is calculated.
				</h2>
				<p className="m-0 text-[17px] leading-[1.55] text-[#3A4573]">
					Between 300 and 1,000 paid meters, the discount scales with the pool.
					Every buyer in a pool pays the same price per meter, whatever their
					quantity.
				</p>
				<div
					className={`${mono} rounded-2xl bg-haiven-blue px-[22px] py-5 text-[15px] leading-[1.7] text-white`}
				>
					<span className="text-accent-green">pool price</span> =<br />
					100–999 price
					<br />− (100–999 price − 1,000+ price)
					<br />× paid meters ÷ 1,000
				</div>
				<p className="m-0 text-sm leading-[1.55] text-[#4A5584]">
					Below 300 paid meters the pool does not go ahead. At 1,000 or more,
					the full wholesale price applies.
				</p>
			</div>

			<div className="overflow-hidden rounded-[20px] bg-white">
				<table className="w-full">
					<thead>
						<tr className="bg-[#EEF1F7] text-xs font-bold tracking-[0.12em] text-[#4A5584]">
							<th scope="col" className="px-5 py-4 text-left font-bold">
								PAID METERS
							</th>
							<th scope="col" className="px-2 py-4 text-right font-bold">
								SINGLE-PHASE
							</th>
							<th scope="col" className="px-5 py-4 text-right font-bold">
								THREE-PHASE
							</th>
						</tr>
					</thead>
					<tbody className={`${mono} text-base font-bold`}>
						{TABLE_TIERS.map((n, i) => {
							const full = n === POOL_TARGET;
							return (
								<tr
									key={n}
									className={cn(
										i > 0 && "border-t border-[#EEF1F7]",
										full
											? "bg-haiven-blue text-accent-green"
											: "bg-white text-haiven-blue",
									)}
								>
									<th scope="row" className="px-5 py-4 text-left font-bold">
										{n.toLocaleString("en-NG")}
									</th>
									<td className="px-2 py-4 text-right">
										{fmt(poolPrice("single", n))}
									</td>
									<td className="px-5 py-4 text-right">
										{fmt(poolPrice("three", n))}
									</td>
								</tr>
							);
						})}
					</tbody>
					<tfoot>
						<tr className="border-t border-[#EEF1F7]">
							<td colSpan={3} className="px-5 py-3.5 text-[13px] text-[#4A5584]">
								Illustrative, per meter, excl. VAT and courier.
							</td>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	</section>
);

export default PriceCalculation;
