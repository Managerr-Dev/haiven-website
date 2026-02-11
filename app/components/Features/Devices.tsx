import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface Props {
	sectionClassName?: string;
	sectionTitle: string;
	label_1: string;
	label_2: string;
	device_1: string;
	device_2: string;
	type: "bills" | "access" | "utility" | "facility";
	line: string;
}

const lines_position = {
	bills: "top-10 -right-14  h-[450px]",
	access: "top-28 -right-24 h-[550px]",
	utility: "top-20 -right-[98px]  h-[450px]",
	facility: "top-10 -right-20 h-[680px]",
};

const deviceWidth = {
	bills: 320,
	access: 280,
	utility: 280,
	facility: 680,
};

const label_1_position = {
	bills: "top-24 -right-52",
	access: "top-34 -right-52",
	utility: "top-28 -right-[250px]",
	facility: "top-38 -right-52",
};

const Devices = ({
	sectionClassName,
	sectionTitle,
	device_1,
	device_2,
	label_1,
	label_2,
	type,
	line,
}: Props) => {
	return (
		<section className="px-4 md:px-6 ">
			<div
				className={cn(
					"bg-[#0086CF] flex flex-col py-[69px] max-w-[1103.17px] mx-auto xl:pl-[80.78px] min-h-[1203.31px] rounded-3xl xl:rounded-[84.15px]",
					sectionClassName,
				)}
			>
				<h2 className="text-center font-sans font-extrabold leading-[38px] xl:leading-[42.07px] text-4xl xl:text-[40.39px] text-white mb-[73.96px]">
					{sectionTitle}
				</h2>

				<div className="flex md:flex-row  flex-col flex-1 gap-12">
					<div className="relative">
						<Image
							src={device_1}
							alt="device 1"
							width={353.4}
							height={727.61}
							className="rounded-[60px]"
						/>
						<Image
							src={line}
							alt="decorative"
							width={deviceWidth[type]} //access 280, bills 320,
							height={400}
							className={cn("absolute hidden xl:block", lines_position[type])}
						/>
						<span
							className={cn(
								"absolute hidden xl:block max-w-[150.2px]",
								label_1_position[type],
							)}
						>
							<span className="font-semibold text-[20.2px] leading-[26.09px] text-[#FF9E00]">
								{label_1}
							</span>
						</span>
					</div>
					<div className="xl:self-end relative">
						<Image
							src={device_2}
							alt="device 2"
							width={353.4}
							height={727.61}
							className="rounded-[60px]"
						/>
						<Image
							src={"/images/dashed-border.svg"}
							alt="decorative"
							width={100}
							height={50}
							className="hidden xl:block absolute top-1/2 -right-14 -translate-y-1/2 h-[450px]"
						/>
						<div className="hidden xl:block absolute top-1/2 -translate-y-1/2 -right-48 max-w-[150.2px]">
							<span className="font-semibold text-[20.2px] leading-[26.09px] text-[#FF9E00]">
								{label_2}
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Devices;
