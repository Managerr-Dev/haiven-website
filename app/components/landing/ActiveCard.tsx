import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp } from 'lucide-react';
import Image from 'next/image';


interface CardProps {
	title: string;
	description: string;
	image: string;
	mainbgcolor: string;
	accentColor: string;
	index: number;
	isTransitioning: boolean;
}

function ActiveCard({
	title,
	description,
	image,
	mainbgcolor,
	accentColor,
	index,
	isTransitioning,
}: CardProps) {
	const isEven = index % 2 === 0;

	return (
		<div
			className={cn(
				"relative rounded-[84.83px] flex flex-col md:flex-row justify-between pb-0 transition-all duration-1000  xl:w-full max-w-[1116.37px] min-h-[460px] ",
				isEven ? "md:flex-row" : "md:flex-row-reverse",
				mainbgcolor,
				isTransitioning ? "opacity-0" : "opacity-100",
			)}
		>
			<Image
				src="/images/card-curve.png"
				alt=""
				width={339.32}
				height={82.09}
				className="absolute lg:block hidden rotate-180 bottom-0 left-1/2 -translate-x-1/2 opacity-100 pointer-events-none"
			/>
			<Image
				src="/images/card-curve.png"
				alt=""
				width={339.32}
				height={82.09}
				className="absolute lg:block hidden top-0 left-1/2 -translate-x-1/2 opacity-100 pointer-events-none"
			/>

			<div
				className={cn(
					"py-[80px] flex items-center px-8 md:px-[77px] text-center md:text-left basis-full md:basis-auto z-10 transition-all duration-700 ease-in-out",
					isTransitioning
						? isEven
							? "translate-x-[50px] opacity-0"
							: "-translate-x-[50px] opacity-0"
						: "translate-x-0 opacity-100",
				)}
			>
				<div className="max-w-[423px] mx-auto md:mx-0">
					<p className="font-bold text-2xl md:text-[27.15px] mb-[15.27px] leading-[150%] text-haiven-blue">
						{title}
					</p>
					<p className="text-base md:text-[16.97px] font-normal leading-[150%] text-haiven-blue/90 font-regular">
						{description}
					</p>
				</div>
			</div>

			<div
				className={cn(
					"pb-0 w-full md:w-auto z-10 transition-all duration-700 ease-in-out",
					isTransitioning
						? isEven
							? "-translate-x-[50px] opacity-0"
							: "translate-x-[50px] opacity-0"
						: "translate-x-0 opacity-100",
				)}
			>
				<div
					className={cn(
						"flex items-center h-full justify-center py-12  px-8 md:px-[72.95px] rounded-[40px] md:rounded-[84.83px] transition-all duration-500",
						accentColor,
					)}
				>
					{image ? (
						<Image
							src={image}
							alt={title}
							width={284.08}
							height={294.65}
							className="object-contain"
						/>
					) : (
						<div className="w-[284.08px] h-[294.65px] flex items-center justify-center">
							<div className="text-white/20 text-4xl font-bold uppercase tracking-widest">
								Haiven
							</div>
						</div>
					)}
				</div>
			</div>

			<ArrowUp
				className="absolute top-3 left-1/2 -translate-x-1/2 hidden md:block"
				color="#31B3D7"
				size={11.88}
			/>
			<ArrowDown
				className="absolute bottom-3 left-1/2 -translate-x-1/2 hidden md:block"
				color="#31B3D7"
				size={11.88}
			/>
		</div>
	);
}

export default ActiveCard