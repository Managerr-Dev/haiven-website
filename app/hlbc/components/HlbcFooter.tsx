import Image from "next/image";
import Link from "next/link";
import { fmtDate } from "../data";
import { ctaClass } from "./styles";

const HlbcFooter = ({ asAt }: { asAt: string | null }) => (
	<footer className="bg-[#0D1A5E] text-[#C9D0F0]">
		<div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-6 pt-14 pb-12">
			<div className="flex flex-wrap items-center justify-between gap-5">
				<Link href="/" aria-label="Haiven home page" className="flex">
					<Image
						src="/images/haiven-logo-light.png"
						alt="Haiven"
						width={1025}
						height={280}
						className="block h-[42px] w-auto"
					/>
				</Link>
				<a href="#register" className={`${ctaClass} px-6 py-[13px] text-base`}>
					Register free <span aria-hidden="true">→</span>
				</a>
			</div>
			<p className="m-0 text-lg font-bold tracking-[-0.01em] text-white">
				Group purchase. Wholesale price. Cost savings.
			</p>
			<p className="m-0 text-[15px]">
				Haiven Smart Systems Limited, Lagos ·{" "}
				<a href="mailto:info@haiven.net" className="font-semibold text-accent-green">
					info@haiven.net
				</a>
			</p>
			<p className="m-0 max-w-[900px] border-t border-[#2B3C94] pt-6 text-[13px] leading-[1.7]">
				{asAt ? `Prices as at ${fmtDate(asAt)}, excl.` : "Prices excl."} VAT and
				courier. Live prices may change. HLBC terms apply. Final group pricing is
				set by cleared and reconciled paid quantities and remains subject to
				supplier and procurement confirmation. Single-phase and three-phase
				meters have separate group purchases. A minimum of 300 paid meters is
				required for a group to proceed. Orders above 1,000 meters are handled as
				special orders, outside the group. Meter boxes and circuit breakers are
				optional and quoted separately on request. All orders are delivered by
				courier at the customer’s expense; courier charges are quoted separately
				and paid before dispatch. The estimated shipping and clearing period is
				10 weeks from supplier order confirmation. Haiven app management features
				are free for property owners and managers; a 1% vending fee applies to
				electricity bought through the app. Meter capabilities depend on the
				exact model, firmware, configuration, network availability, platform
				integration and activation.
			</p>
		</div>
	</footer>
);

export default HlbcFooter;
