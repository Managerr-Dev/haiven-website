import { fmt, LADDERS } from "../data";
import { container, h2Class, mono, sectionPadding } from "./styles";

const tierLabel = "text-xs font-bold tracking-[0.14em]";

const Pools = () => (
	<section className="bg-white">
		<div className={`${container} ${sectionPadding} flex flex-col gap-8`}>
			<div className="flex flex-col gap-3.5">
				<h2 className={h2Class}>
					Two meters.
					<br />
					<span className="text-[#00873A]">Two pools.</span>
				</h2>
				<p className="m-0 text-[19px] font-medium text-[#4A5584]">
					Pick yours. Each meter type runs its own pool.
				</p>
			</div>

			{LADDERS.map((m) => (
				<div
					key={m.type}
					className="flex flex-col gap-5 rounded-[20px] bg-[#F5F7FA] p-[clamp(20px,3vw,32px)]"
				>
					<div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
						<div className="flex flex-col gap-1">
							<h3 className="m-0 text-[clamp(22px,2.8vw,30px)] font-extrabold tracking-[-0.025em]">
								{m.name}
							</h3>
							<span className="font-medium text-[#4A5584]">{m.use}</span>
						</div>
						<div className="flex flex-col items-end text-[#00873A]">
							<span className="text-[13px] font-bold tracking-[0.06em]">
								SAVE UP TO
							</span>
							<span className={`${mono} text-[26px] font-bold`}>
								{fmt(m.save)}
							</span>
						</div>
					</div>
					<div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-2.5">
						<div className="flex flex-col gap-1 rounded-xl bg-white px-[18px] py-3.5">
							<span className={`${tierLabel} text-[#4A5584]`}>1–99 METERS</span>
							<span className={`${mono} text-2xl font-bold`}>{fmt(m.t1)}</span>
						</div>
						<div className="flex flex-col gap-1 rounded-xl bg-white px-[18px] py-3.5">
							<span className={`${tierLabel} text-[#4A5584]`}>100–999</span>
							<span className={`${mono} text-2xl font-bold`}>{fmt(m.t2)}</span>
						</div>
						<div className="flex flex-col gap-1 rounded-xl bg-accent-green px-[18px] py-3.5">
							<span className={tierLabel}>1,000+ TARGET</span>
							<span className={`${mono} text-[28px] font-bold`}>{fmt(m.t3)}</span>
						</div>
					</div>
				</div>
			))}

			<div className="flex items-start gap-4 rounded-2xl border-[1.5px] border-dashed border-[#C3CAE0] px-6 py-5">
				<span aria-hidden="true" className="text-[26px] leading-none font-medium">
					+
				</span>
				<p className="m-0 text-[17px] leading-[1.5] font-medium">
					<strong className="font-extrabold">
						Meter boxes and circuit breakers
					</strong>{" "}
					are optional, quoted on request and kept outside the pool.
				</p>
			</div>
			<p className="m-0 text-sm leading-[1.55] text-[#4A5584]">
				Per meter, excl. VAT. 1,000+ is the full wholesale target; pools of
				300–999 paid meters get proportionate discounts.
			</p>
		</div>
	</section>
);

export default Pools;
