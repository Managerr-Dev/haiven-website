import { fmt, PRICES } from "../data";
import { ctaClass, mono } from "./styles";

/** Bottom call-to-action bar, shown on narrow screens only. */
const StickyCta = () => (
	<div className="min-[820px]:hidden">
		{/* Spacer so the bar never covers the end of the footer. */}
		<div className="h-20 bg-[#0D1A5E]" />
		<div className="fixed inset-x-0 bottom-0 z-60 flex items-center gap-3 border-t border-[#2B3C94] bg-[#0D1A5E] px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))]">
			<div className="flex flex-1 flex-col leading-[1.2] text-white">
				<span className="text-xs font-semibold text-[#C9D0F0]">As low as</span>
				<span className={`${mono} text-[17px] font-bold`}>
					{fmt(PRICES.single[2])}
					<span className="text-xs text-[#C9D0F0]"> /meter</span>
				</span>
			</div>
			<a href="#register" className={`${ctaClass} px-[22px] py-[13px] text-base`}>
				Register free →
			</a>
		</div>
	</div>
);

export default StickyCta;
