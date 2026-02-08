import Description from "@/app/components/Features/Description";
import Devices from "@/app/components/Features/Devices";
import FeatureGrid from "@/app/components/Features/FeatureGrid";
import Hero from "@/app/components/Features/Hero";
import Faq from "@/app/components/landing/Faq";

const images = [
	"/images/home_screen.webp",
	"/images/booking_2.webp",
	"/images/booking_3.webp",
	"/images/booking_4.webp",
];

const page = () => {
	return (
		<div>
			<section className="mb-[84.15px]">
				<Hero
					CTA="Request a Demo"
					CTALink="/"
					title="FACILITY BOOKING"
					text="Book shared spaces in your community with ease, whether it’s the gym, clubhouse, or event hall."
				/>
			</section>

			<Devices
				sectionClassName="bg-[#4879C5]"
				sectionTitle="Seamless Booking for Estate Amenities"
				device_1="/images/facility_1.webp"
				device_2="/images/facility_2.webp"
				label_1="Facility Icon"
				label_2="Facility Listings"
				line="/images/facility_dashed_line.svg"
				type="facility"
			/>

			<div className="">
				<Description
					description_1=""
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
