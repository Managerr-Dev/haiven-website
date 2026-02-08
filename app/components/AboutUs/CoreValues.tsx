import Image from "next/image";
import SectionBadge from "../landing/SectionBadge";

const list = [
	{
		title: "Innovation",
		description:
			"At Haiven, we believe in innovation, We embrace cutting-edge technology to create smarter, more efficient  communities.",
		icon: "/images/innovation.svg",
	},
	{
		title: "Integrity",
		description:
			"At Haiven, we believe in integrity, We operate with transparency, honesty, and accountability in everything we do.",
		icon: "/images/integrity.svg",
	},
	{
		title: "Customer Obsession",
		description:
			"At Haiven, we believe in customer obsession, Our users are at the heart of every decision, feature, and improvement.",
		icon: "/images/customer-obsession.svg",
	},
	{
		title: "Collaboration",
		description:
			"At Haiven, we believe in collaboration, We grow stronger by working together—with our team, our partners, and our clients.",
		icon: "/images/collaboration.svg",
	},
];

const CoreValues = () => {
	return (
		<section className="pt-[54.22px] pb-[123.69px]">
			<div className="px-[84.72px]">
				<div className="text-center flex flex-col items-center justify-center">
					<SectionBadge text="Our Core Values" />
					<h1 className="mt-[20.33px] font-bold text-[40.67px] max-w-[80%] leading-[100%] align-middle uppercase text-haiven-blue mb-[55.63px]">
						Haiven Core Value
					</h1>
				</div>
				<div className="max-w-[1109.86px] mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[15.25px]">
					{list.map((item, index) => (
						<Card
							key={index}
							title={item.title}
							description={item.description}
							icon={item.icon}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

interface Props {
	title: string;
	description: string;
	icon: string;
}

function Card({ title, description, icon }: Props) {
	return (
		<div className="pt-[68.62px] px-[20.76px] pb-[14.71px] border-[0.68px] border-[#13247E26] rounded-[13.56px]">
			<Image src={icon} alt={title} width={40.67} height={40.67} />
			<p className="mt-[26.26px] mb-[9.28px] text-[#1B1816] font-regular font-sora-sans text-[18.64px] leading-[18.27px]">
				{title}
			</p>
			<p className="font-sora-sans font-light leading-[20.33px] text-[13.56px] text-[#3C3C43]">
				{description}
			</p>
		</div>
	);
}

export default CoreValues;
