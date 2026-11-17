import Calculator from "./components/Calculator";
import Faq from "./components/Faq";
import Features from "./components/Features";
import Hero from "./components/Hero";
import Pools from "./components/Pools";
import PriceCalculation from "./components/PriceCalculation";
import Register from "./components/Register";
import Safeguards from "./components/Safeguards";
import Steps from "./components/Steps";

export default function HlbcPage() {
	return (
		<>
			<Hero />
			<section className="bg-[#0D1A5E] text-white">
				<p className="mx-auto max-w-[900px] px-5 py-[clamp(48px,7vw,80px)] text-center text-[clamp(26px,3.8vw,42px)] leading-[1.2] font-bold tracking-[-0.02em] text-balance">
					Why buy more to pay less, when we can{" "}
					<span className="text-accent-green">buy together</span> to pay less?
				</p>
			</section>
			<Calculator />
			<Pools />
			<Steps />
			<PriceCalculation />
			<Safeguards />
			<Features />
			<Faq />
			<Register />
		</>
	);
}
