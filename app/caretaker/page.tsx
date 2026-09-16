import AudienceSelector from "./components/AudienceSelector";
import Hero from "./components/Hero";
import PlansSection from "./components/PlansSection";
import ProductSection from "./components/ProductSection";
import RunsSection from "./components/RunsSection";
import { SignupProvider } from "./components/signup-context";
import SignupSection from "./components/SignupSection";

export default function CaretakerPage() {
	return (
		<SignupProvider>
			<Hero />
			<AudienceSelector />
			<RunsSection />
			<ProductSection />
			<PlansSection />
			<SignupSection />
		</SignupProvider>
	);
}
