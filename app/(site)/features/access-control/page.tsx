import Description from "@/app/components/Features/Description";
import Devices from "@/app/components/Features/Devices";
import FeatureGrid from "@/app/components/Features/FeatureGrid";
import Hero from "@/app/components/Features/Hero";
import Faq from "@/app/components/landing/Faq";

const images = [
	"/images/home_screen.webp",
	"/images/guest_2.webp",
	"/images/guest_3.webp",
	"/images/guest_4.webp",
];

const page = () => {
	return (
		<div>
			<section className="mb-[84.15px]">
				<Hero
					CTA="Request a Demo"
					CTALink="/"
					title="ACCESS CONTROL & SECURITY"
					text="Manage secure entry with smart access codes and real-time tracking of guest, staff, and resident movements."
				/>
			</section>
			<Devices
				sectionClassName="bg-[#7DC6EF]"
				sectionTitle="Smart entry management for a safer community"
				device_1="/images/access_1.webp"
				device_2="/images/access_2.webp"
				label_1="Smart Entry"
				label_2="QR Code Guest Access"
				type="access"
				line="/images/access_control_dashed_line.svg"
			/>

			<div className="">
				<Description
					description_1="Residents can generate unique QR codes for guests, allowing seamless access without the need for calls or manual approvals. Security personnel can instantly verify and grant access from their end, reducing delays and improving entry efficiency—all while keeping your community safe and controlled."
					title_1="Overview"
					title_2="Key Functionalities:"
					description_2={[
						"QR Code Guest Access",
						"Security Gate Verification",
						"Real-Time Entry Logs",
						"Access Notifications",
						"Resident & Staff ID Management",
					]}
				/>
			</div>

			<FeatureGrid images={images} sectionClassName="bg-[#0086CF]" />

			<Faq variant="light" />
		</div>
	);
};

export default page;
