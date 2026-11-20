import { cn } from "@/lib/utils";
import { fmt, GROUP_TARGET, groupPrice, type Prices, TABLE_TIERS } from "../data";
import PricesAsAt from "./PricesAsAt";
import { container, eyebrowClass, finePrint, green, h2Class, sectionPadding } from "./styles";

const cell = "px-[22px] py-4 text-left";
const rule = "border-b border-[rgba(19,36,126,0.12)]";

const PriceCalculation = ({ prices, asAt }: { prices: Prices; asAt: string | null }) => (
	<section id="pricing" className="bg-[#F5F7FA]">
		<div
			className={`${container} ${sectionPadding} grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-start gap-11`}
		>
			<div className="flex flex-col gap-4">
				<p className={`${eyebrowClass} ${green}`}>Transparent pricing</p>
				<h2 className={h2Class}>
					How your price
					<br />
					<span className={green}>is set.</span>
				</h2>
				<p className="m-0 text-lg leading-normal text-[#4A5480]">
					The more paid meters in a group, the closer everyone gets to the full
					wholesale price.
				</p>
				<div className="rounded-[14px] border border-[rgba(19,36,126,0.12)] bg-white px-[18px] py-4 font-jetbrains text-sm leading-[1.8]">
					Group progress = paid meters ÷ 1,000 (max 100%)
					<br />
					Discount = progress × (100–999 price − wholesale price)
					<br />
					Your price = 100–999 price − discount
				</div>
			</div>

			<div className="flex flex-col gap-3">
				<table className="w-full border-separate border-spacing-0 overflow-hidden rounded-[22px] border border-[rgba(19,36,126,0.12)] bg-white">
					<thead>
						<tr className="text-xs tracking-widest text-[#4A5480]">
							{["METERS IN GROUP", "SINGLE-PHASE", "THREE-PHASE"].map((h) => (
								<th key={h} scope="col" className={cn(cell, rule, "font-bold")}>
									{h}
								</th>
							))}
						</tr>
					</thead>
					<tbody className="font-jetbrains text-base font-medium">
						{TABLE_TIERS.map((n) => {
							const full = n === GROUP_TARGET;
							const row = cn(cell, full ? "bg-haiven-blue text-white" : rule);
							return (
								<tr key={n}>
									<th scope="row" className={cn(row, "font-jakarta font-extrabold")}>
										{n.toLocaleString("en-NG")}
									</th>
									<td className={row}>{fmt(groupPrice(prices, "single", n))}</td>
									<td className={row}>{fmt(groupPrice(prices, "three", n))}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<p className={finePrint}>
					<PricesAsAt asAt={asAt} /> Assumes the paid quantity is reached and
					reconciled. Final prices are subject to supplier and procurement
					confirmation.
				</p>
			</div>
		</div>
	</section>
);

export default PriceCalculation;
