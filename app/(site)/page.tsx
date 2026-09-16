import AboutUs from "@/app/components/landing/AboutUs";
import AllInOne from "@/app/components/landing/All-In-One";
import AppPreview from "@/app/components/landing/AppPreview";
import Faq from "@/app/components/landing/Faq";
import Hero from "@/app/components/landing/Hero";
import IOT from "@/app/components/landing/IOT";
import OurAudience from "@/app/components/landing/OurAudience";
import Partners from "@/app/components/landing/Partners";
import Testimonial from "@/app/components/landing/Testimonial";

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
