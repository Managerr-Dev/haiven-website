import Image from "next/image";

const linkClass = "text-[#E8EBF5] transition-colors hover:text-[#00C853]";

const CaretakerFooter = () => {
	return (
		<footer className="bg-[#13214F] text-[#B9C4DF]">
			<div className="mx-auto max-w-[1180px] px-6 pt-16 pb-12">
				<div className="grid grid-cols-1 items-start gap-10 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
					<div>
						<Image
							src="/images/caretaker/caretaker-logo-light.svg"
							alt="Caretaker by Haiven"
							width={117}
							height={26}
							className="mb-[18px] h-[26px] w-auto"
						/>
						<p className="text-[14.5px] leading-[1.7] text-[#8FA0C6]">
							Block 10, Plot 2 &amp; 3 Admiralty Way,
							<br />
							Lekki Phase 1, Lagos
						</p>
					</div>
					<div className="flex flex-col gap-2.5 text-[14.5px]">
						<a href="https://haiven.net/caretaker" className={linkClass}>
							haiven.net/caretaker
						</a>
						<a href="mailto:info@haiven.net" className={linkClass}>
							info@haiven.net
						</a>
						<a
							href="tel:+2349122284189"
							className={`${linkClass} tabular-nums`}
						>
							+234 912 228 4189
						</a>
					</div>
					<div className="flex flex-col gap-2.5 text-[14.5px]">
						<a href="https://instagram.com" className={linkClass}>
							Instagram
						</a>
						<a href="https://linkedin.com" className={linkClass}>
							LinkedIn
						</a>
					</div>
				</div>
				<p className="mt-12 border-t border-[#23305F] pt-6 text-[14.5px] text-[#8FA0C6]">
					Facility manager? The Haiven Partner Program places certified
					Caretakers across your portfolio.{" "}
					<a href="mailto:partners@haiven.net" className={linkClass}>
						partners@haiven.net
					</a>
				</p>
			</div>
		</footer>
	);
};

export default CaretakerFooter;
