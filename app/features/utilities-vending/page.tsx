import Description from "@/app/components/Features/Description";
import Devices from "@/app/components/Features/Devices";
import FeatureGrid from "@/app/components/Features/FeatureGrid";
import Hero from "@/app/components/Features/Hero";
import Faq from "@/app/components/landing/Faq";

const images = [
	"/images/home_screen.webp",
	"/images/vend_2.webp",
	"/images/vend_3.webp",
	"/images/vend_4.webp",
];

const page = () => {
	return (
		<div>
			<section className="mb-[84.15px]">
				<Hero
					CTA="Request a Demo"
					CTALink="/"
					title="UTILITY VENDING "
					text="Allow residents to easily purchase and monitor electrical units for uninterrupted service."
				/>
			</section>
			<Devices
				sectionClassName="bg-[#68C2CA]"
				sectionTitle="Seamless Meter-Based Utility Payments"
				device_1="/images/utility_1.webp"
				device_2="/images/utility_2.webp"
				label_1="Vend Power Icon"
				label_2="Input Field"
				type="utility"
				line="/images/utility_dashed_line.svg"
			/>

			<div className="">
				<Description
					description_1="Enjoy seamless utility vending with smart prepaid metering for electricity, water, and gas anytime, without delays. Track usage in real time, get instant top-up confirmations, and manage payments securely from the app. Stay connected with 24/7 access and clean energy monitoring."
					title_1="Overview"
					title_2="Key Functionalities:"
					description_2={[
						"Instant Meter Recharge",
						"One-Time Meter Linking",
						"Real-Time Vending Confirmation",
						"Secure Wallet Payments",
						"24/7 Access",
					]}
				/>
			</div>

			<FeatureGrid images={images} sectionClassName="bg-[#0086CF]" />

			<Faq variant="light" />
		</div>
	);
};

export default page;
