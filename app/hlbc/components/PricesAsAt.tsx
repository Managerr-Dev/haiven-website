import { fmtDate } from "../data";

/**
 * "Prices as at 17 Nov 2026, excl. VAT and courier. Live prices may change."
 * Without a date (API unreachable) the date part is left out.
 */
const PricesAsAt = ({ asAt }: { asAt: string | null }) => (
	<>
		{asAt ? `Prices as at ${fmtDate(asAt)}, excl.` : "Prices excl."} VAT and courier.
		Live prices may change.
	</>
);

export default PricesAsAt;
