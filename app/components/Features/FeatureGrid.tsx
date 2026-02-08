import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
	images: string[];
	sectionClassName: string;
}

const FeatureGrid = ({ images, sectionClassName }: Props) => {
	return (
		<section className={cn("px-[64.79px]", sectionClassName)}>
			<div className="grid md:grid-cols-3 gap-[54px] justify-center max-w-[1149.79px] mx-auto">
				<div className="flex items-center justify-center">
					<Image src={images[0]} alt="feature 1" width={400} height={300} />
				</div>
				<div className="    flex flex-col items-center justify-between gap-[54px]">
					<Image src={images[1]} alt="feature 1" width={400} height={350} />
					<Image src={images[3]} alt="feature 1" width={400} height={300} />
				</div>
				<div className="flex items-center justify-center">
					<Image src={images[2]} alt="feature 1" width={400} height={300} />
				</div>
			</div>
			{/* <div className="relative">
				{images.map((image, index) => (
					<Image
						key={index}
						src={image}
						alt={`feature ${index + 1}`}
						width={500}
						height={500}
						className={cn(
							"absolute",
							index === 0
								? "top-1/2 -translate-y-1/2 left-0"
								: index === 1
									? "top-0 left-1/2 -translate-x-1/2"
									: index === 2
										? "top-1/2 -translate-y-1/2 right-0"
										: index === 3
											? "bottom-0 left-1/2 -translate-x-1/2"
											: "",
						)}
					/>
				))}
			</div> */}
		</section>
	);
};

export default FeatureGrid;
