import { fmtK, type Prices } from "../data";

/** Bottom call-to-action, shown on narrow screens only. */
const StickyCta = ({ prices }: { prices: Prices }) => (
	<div className="min-[900px]:hidden">
		{/* Spacer so the button never covers the end of the footer. */}
		<div className="h-[84px] bg-[#0D1A5E]" />
		<div className="fixed inset-x-3 bottom-[calc(12px+env(safe-area-inset-bottom))] z-60">
			<a
				href="#register"
				className="flex justify-center rounded-full bg-accent-green px-5 py-4 text-[17px] font-extrabold text-haiven-blue no-underline shadow-[0_12px_30px_rgba(0,0,0,0.3)]"
			>
				Register free · wholesale from {fmtK(prices.single[2])}
			</a>
		</div>
	</div>
);

export default StickyCta;
