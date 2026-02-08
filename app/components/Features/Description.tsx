import { Check } from "lucide-react";
import React from "react";

interface Props {
	title_1: string;
	description_1: string;
	title_2: string;
	description_2: string[];
}

const Description = ({
	title_1,
	description_1,
	title_2,
	description_2,
}: Props) => {
	return (
		<section className="xl:px-[96.77px] xl:py-[132.95px] bg-white">
			<div className="max-w-[1091.81px] mx-auto font-sans">
				<div className="flex items-center gap-4 justify-between mb-[81.3px]">
					<p className="basis-2/6 font-semibold text-[26.93px] leading-[26.23px] text-haiven-blue">
						{title_1}
					</p>
					<p className="basis-4/6 font-medium text-[20.2px] leading[26.09px] text-[#3B3C3D]">
						{description_1}
					</p>
				</div>

				<div className="flex items-center gap-[29.45px]">
					<p className="basis-2/6 font-semibold text-[26.93px] leading-[26.23px] text-haiven-blue">
						{title_2}
					</p>
					<ul className="basis-4/6">
						{description_2.map((item, index) => (
							<li className="flex gap-3 items-center" key={index}>
								<div className="size-[17px] rounded-full bg-accent-green flex items-center justify-center">
									<Check size={7.29} color="#fff" />
								</div>
								<span className="font-medium text-[20.2px] leading[26.09px] text-[#3B3C3D]">
									{item}
								</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default Description;
