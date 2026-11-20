import Calculator from "./components/Calculator";
import Faq from "./components/Faq";
import Features from "./components/Features";
import FreeApp from "./components/FreeApp";
import Hero from "./components/Hero";
import LiveGroups from "./components/LiveGroups";
import Meters from "./components/Meters";
import { OrderProvider } from "./components/OrderContext";
import PriceCalculation from "./components/PriceCalculation";
import Register from "./components/Register";
import Safeguards from "./components/Safeguards";
import Steps from "./components/Steps";
import ThousandBand from "./components/ThousandBand";
import { getHlbcState } from "./lib/state";

export default async function HlbcPage() {
	const state = await getHlbcState();
	const { prices, pricesAsAt: asAt } = state;

	return (
		<OrderProvider>
			<Hero prices={prices} asAt={asAt} />
			<ThousandBand />
			<LiveGroups state={state} />
			<Calculator prices={prices} asAt={asAt} today={state.today} />
			<Meters prices={prices} asAt={asAt} />
			<FreeApp />
			<Steps />
			<PriceCalculation prices={prices} asAt={asAt} />
			<Safeguards />
			<Features />
			<Faq />
			<Register />
		</OrderProvider>
	);
}
