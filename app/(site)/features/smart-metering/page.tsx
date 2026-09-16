import ActiveCard from "@/app/components/landing/ActiveCard";
import Faq from "@/app/components/landing/Faq";
import SectionBadge from "@/app/components/landing/SectionBadge";
import Image from "next/image";

const cardItems = [
	{
		title: "Prepaid & Postpaid Support",
		description:
			"Supports both prepaid top-ups and postpaid billing models based on community preference.",
	},
	{
		title: "Remote Access & Monitoring",
		description:
			"Residents and estate managers can view usage stats and trends directly from their mobile app or dashboard",
	},
	{
		title: "Tamper Alerts & System Integrity Checks",
		description:
			"Built-in security features detect and report meter tampering or faults, protecting both residents and the management.",
	},
	{
		title: "Usage-Based Billing",
		description:
			"Automatically calculates bills based on actual consumption, ensuring fair and accurate charges.",
	},
	{
		title: "Real-Time Consumption Tracking",
		description:
			"Monitor electricity, water, and gas usage live from each residential unit for full transparency.",
	},
	{
		title: "One-Time Meter Linking",
		description:
			"Residents only need to add their meter details once for seamless future transactions.",
	},
];

const Metering = () => {
	return (
		<div className="bg-white">
			<section className="mb-[84.15px]">
				<div className="bg-white relative  font-sans">
					<div className="relative max-w-[1071px] mx-auto gap-[27.99px] pt-[167px] bg-white flex flex-col items-center text-center px-4 md:px-6">
						<Image
							src="/images/haiven-leaf.svg"
							alt="decorative leaf"
							width={126.8}
							height={108.85}
							className="absolute top-20 left-20"
							preload={false}
						/>

						<Image
							src="/images/haiven-leaf.svg"
							alt="decorative leaf"
							width={126.8}
							height={108.85}
							className="absolute top-30 right-0"
							preload={false}
						/>
						<Image
							src="/images/haiven-leaf.svg"
							alt="decorative leaf"
							width={126.8}
							height={108.85}
							className="absolute left-[40%] top-1/2 -translate-y-1/2"
							preload={false}
						/>
						<Image
							src="/images/haiven-leaf.svg"
							alt="decorative leaf"
							width={126.8}
							height={108.85}
							className="absolute top-1/2  left-0"
							preload={false}
						/>
						<Image
							src="/images/haiven-leaf.svg"
							alt="decorative leaf"
							width={126.8}
							height={108.85}
							className="absolute top-1/2  right-0"
							preload={false}
						/>
						<SectionBadge text="Features" />

						<h1 className="font-bold text-4xl lg:text-[40.72px] max-w-[80%] leading-[100%] align-middle uppercase text-haiven-blue">
							SMART Metering
						</h1>

						<p className="font-regular text-base xl:text-xl text-center leading-[150%] mb-[32.78px]">
							Smarter Energy, Water, and Gas Tracking for Every Home{" "}
						</p>

						<ActiveCard
							accentColor="bg-[#373938]"
							description="Our smart metering system empowers residential communities with real-time monitoring and transparent control over energy, water, and gas usage."
							image="/images/smart_meter.webp"
							mainbgcolor="bg-[#3739384D]"
							title="Metering"
							index={0}
							isTransitioning={false}
						/>
					</div>
				</div>
			</section>

			{/*  */}

			<section className="mb-[94.44px] px-4 md:px-6">
				<div className="max-w-[952.38px] mx-auto">
					<h2 className="font-bold text-4xl lg:text-[40.63px] leading-[100%] text-start uppercase text-[#211C14] mb-[16.08px]">
						Haiven smart Metering
					</h2>
					<p className="font-regular text-base lg:[16.93px] text-start leading-[150%] text-[#1D2C4D] mb-5">
						Haiven&apos;s smart metering system brings real-time transparency
						and accuracy to utility usage, whether it&apos;s electricity or
						water. By monitoring consumption at the individual unit level,
						residents only pay for what they use, ensuring fairness, minimizing
						waste, and improving estate-wide accountability.
					</p>

					<p className="font-regular text-base lg:[16.93px] text-start leading-[150%] mb-[32.78px] text-[#1D2C4D]">
						Our solution also supports Power-as-a-Service projects in
						partnership with leading technical providers, giving homes and
						businesses uninterrupted access to clean, sustainable energy without
						noise or disruption.
					</p>

					{/* grid */}

					<div className="mt-[67.72px] grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-[67.72px]">
						{cardItems.map((item, index) => (
							<Card key={index} {...item} />
						))}
					</div>
				</div>
            </section>
            
            <Faq variant="dark" />
		</div>
	);
};

function Card({ title, description }: { title: string; description: string }) {
	return (
		<div
			className="p-[13.54px] bg-white"
			style={{
				border: "0.42px solid transparent",
				backgroundImage:
					"linear-gradient(white, white), linear-gradient(180deg, #FFFFFF 0%, #373938 100%)",
				backgroundOrigin: "border-box",
				backgroundClip: "padding-box, border-box",
				borderRadius: "10.16px",
			}}
		>
			<div className="rounded-full bg-[#373938] size-[47.41px] flex items-center justify-center mb-[20.32px]">
				<Image
					src="/images/meter-card.svg"
					alt="meter-card"
					width={20.32}
					height={20.32}
				/>
			</div>
			<h3 className="font-regular text-[20.32px] leading-[28.44px] text-black mb-[10.16px]">
				{title}
			</h3>
			<p className="font-regular text-[13.54px] leading-[20.32px] text-[#373737]">
				{description}
			</p>
		</div>
	);
}

export default Metering;
