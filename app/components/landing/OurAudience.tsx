import { Users } from "lucide-react";
import Image from "next/image";

const list = [
	{
		title: "Facility managers and Real Estate Developers",
		description:
			"Haiven provides facility managers and real estate developers with a unified dashboard to oversee multiple properties, real-time tracking of maintenance requests and resolutions, and streamlined billing with utility cost recovery, all designed to optimize operations and boost efficiency.",
		icon: <Users color="#13247E" size={16} />,
	},
	{
		title: "Residents",
		description:
			"We empower residents with secure digital access control, easy online bill payments, and full visibility into payment history. From managing family access to creating temporary guest codes, we make smarter, more convenient living a reality. ",
		icon: <Users color="#13247E" size={16} />,
	},
	{
		title: "Utility Admins",
		description:
			"Haiven empowers utility admins with smart community management tools, from digital access control and billing automation to managing resident profiles, staff roles, and alerts for efficient, secure administration.",
		icon: <Users color="#13247E" size={16} />,
	},
];
const OurAudience = () => {
	return (
		<div className="bg-haiven-blue py-[232px] px-4 xl:px-[101px] relative">
			<Image
				src="/images/our-audience.webp"
				alt="decorative leaf"
				width={479.28}
				height={330.66}
				className="absolute top-0 right-0 h-[180px] w-[200px] md:h-[230.66px] md:w-[279.28px] lg:h-[330.66px] lg:w-[479.28px] "
			/>
			<div className="py-1.5 px-2.5 flex items-center gap-[5px] bg-white rounded-[100px] w-fit mb-[33px]">
				<p className="font-medium text-xs leading-[18px] text-haiven-blue">
					Our Audience
				</p>
			</div>

			<h4 className="font-bold text-3xl lg:text-[40.72px] text-white uppercase leading-[40px] lg:leading-[60px] mb-[19px]">
				Who thrives WITH <span className="text-accent-green">HAIVEN</span>
			</h4>

			<p className="max-w-[610px] font-normal text-base lg:text-xl leading-[150%] mb-[108px] text-white">
				Haiven is crafted for communities (Gated Communities, Residential
				Estates & Condominiums, Commercial Properties, and Apartment Complexes)
				and property managers who desire a smarter, more secure, and efficient
				way to manage their living or work spaces. From residential
				neighborhoods to commercial hubs, Haiven elevates the living experience
				through innovation.{" "}
			</p>

			<div className="max-w-[948.4px] gap-[47.5px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{list.map((item, index) => (
					<AudienceCard
						title={item.title}
						description={item.description}
						icon={item.icon}
						key={index}
					/>
				))}
			</div>
		</div>
	);
};

function AudienceCard({
	title,
	description,
	icon,
}: {
	title: string;
	description: string;
	icon: React.ReactNode;
}) {
	return (
		<div className="p-[13.57px] bg-white rounded-[10.18px] border-[1.7px] border-[#999999]">
			<div className="size-[47.5px] rounded-full bg-accent-green border-[4.24px] border-[#B4F2CA] flex items-center justify-center mb-[20.36px]">
				{icon}
			</div>
			<p className="mb-[10.18px] font-regular text-[20.36px] text-black leading-[28.5px]">
				{title}
			</p>
			<p className="font-regular text-sm leading-[20.36px] text-[#373737]">
				{description}
			</p>
		</div>
	);
}

export default OurAudience;
