import Image from "next/image";
import SectionBadge from "../landing/SectionBadge";

const list = [
	"/images/grid-1.webp",
	"/images/grid-2.webp",
	"/images/grid-3.webp",
	"/images/grid-4.webp",
	"/images/grid-5.webp",
	"/images/grid-6.webp",
];

const Hero = () => {
	return (
		<div className="bg-white relative px-4 min-h-screen xl:min-h-[978px] pt-[167px] font-sans pb-[146px]">
			<div className="max-w-[1071px] mx-auto gap-[27.99px] bg-white flex flex-col items-center text-center">
				<SectionBadge text="IOT Solutions" />

				<h1 className="font-bold text-[40.72px] max-w-[80%] leading-[100%] align-middle uppercase text-haiven-blue">
					Transforming Industries with{" "}
					<span className="text-accent-green">IOT Innovations</span>
				</h1>

				<p className="font-regular text-xl text-center leading-[150%] mb-[67.47px]">
					Our IoT-driven solutions deliver real-time monitoring across energy,
					fuel, fleet, and critical infrastructure. With smart sensors, cloud
					dashboards, and AI insights, we empower businesses and communities to
					cut costs, improve safety, and optimize performance.
				</p>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
					{list.map((item, index) => (
						<div key={index} className="">
							<Image
								src={item}
								alt="grid images"
								width={341}
								height={240}
								className="h-full"
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Hero;
