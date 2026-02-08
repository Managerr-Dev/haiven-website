import Description from "@/app/components/Features/Description";
import Devices from "@/app/components/Features/Devices";
import FeatureGrid from "@/app/components/Features/FeatureGrid";
import Hero from "@/app/components/Features/Hero";
import Faq from "@/app/components/landing/Faq";

const images = [
	"/images/home_screen.webp",
	"/images/bills_payment_2.webp",
	"/images/bills_payment_3.webp",
	"/images/bills_payment_4.webp",
];

const page = () => {
	return (
		<div>
			<section className="mb-[84.15px]">
				<Hero
					CTA="Request a Demo"
					CTALink="/"
					title="Bills & Facility Management"
					text="Haiven simplifies estate living by combining smart bill payments with easy facility management. From paying dues to tracking maintenance, everything runs smoother in one place."
				/>
			</section>

			<Devices
				sectionClassName=""
				sectionTitle="Seamless Payments with Haiven Wallet"
				device_1="/images/bills_1.webp"
				device_2="/images/bills_2.webp"
				label_1="Bill Payment Category"
        label_2="Automated Bill Category Listing"
        type="bills"
        line="/images/bills_dashed_line.svg"
			/>

			<div className="">
				<Description
					description_1="Easily pay dues, utility bills, and service charges directly from our in-app wallet, securely and in seconds. Facility managers get a centralized dashboard to handle maintenance requests, track issues, and monitor assets across the property. From real-time updates to automated billing and easy reporting, Haiven helps keep operations smooth, transparent, and efficient."
					title_1="Overview"
					title_2="Key Functionalities:"
					description_2={[
						"Secure In-App Payments",
						"Centralized Bill Dashboard",
						"Automated Recurring Billing",
						"Real-Time Maintenance Tracker",
						"Smart Search & Filters",
						"Asset Monitoring",
						"Quick Access Shortcuts",
						"Recent Activity Log",
						"Issue Resolution Insights",
					]}
				/>
			</div>

			<FeatureGrid images={images} sectionClassName="bg-[#0086CF]" />

			<Faq variant="light" />
		</div>
	);
};

export default page;
