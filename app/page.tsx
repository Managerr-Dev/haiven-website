import AboutUs from "./components/landing/AboutUs";
import AllInOne from "./components/landing/All-In-One";
import AppPreview from "./components/landing/AppPreview";
import Faq from "./components/landing/Faq";
import Hero from "./components/landing/Hero";
import IOT from "./components/landing/IOT";
import OurAudience from "./components/landing/OurAudience";
import Partners from "./components/landing/Partners";
import Testimonial from "./components/landing/Testimonial";
import Navbar from "./components/Navbar";

export default function Home() {
	return (
		<section className="relative">
			<Hero />
			<AboutUs />
			<AllInOne />
			<OurAudience />
			<IOT />
			<Testimonial />
			<Partners />
			<Faq variant="normal" />
			<AppPreview />
		</section>
	);
}
