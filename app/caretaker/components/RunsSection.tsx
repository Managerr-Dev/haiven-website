import Image from "next/image";
import BecomeCaretakerButton from "./BecomeCaretakerButton";
import RunsTimeline from "./RunsTimeline";

const RunsSection = () => {
	return (
		<section
			id="runs"
			className="scroll-mt-24 border-y border-[#E8EBF5] bg-white"
		>
			<div className="mx-auto max-w-[1180px] px-6 pt-16 md:pt-[88px]">
				<h2 className="mb-4 font-alan text-[clamp(28px,3.2vw,40px)] leading-[1.12] font-semibold tracking-[-0.015em] text-[#16234A]">
					What Caretaker helps you run, every day
				</h2>
				<p className="mb-12 max-w-[56em] text-[17px] leading-[1.6] text-pretty text-[#6B7A9E]">
					Caretaker turns everyday property activity into visible workflows. From
					complaints to collections, from access to repairs, everything is
					recorded as it happens &mdash; so nothing depends on memory or scattered
					phone calls.
				</p>
			</div>

			<div className="relative mx-auto mb-16 max-w-[1440px] pl-6 md:mb-[72px]">
				<div className="relative aspect-[3/2] overflow-hidden rounded-l-[20px] bg-[#E8EBF5]">
					<Image
						src="/images/caretaker/runs.webp"
						alt="A caretaker in navy on site outside a Lagos apartment block, logging a completed check on her phone"
						fill
						sizes="(max-width: 1440px) 100vw, 1440px"
						className="object-cover"
					/>
					<div className="absolute bottom-4 left-4 flex items-baseline gap-3 rounded-[12px] bg-white/95 px-4 py-3 backdrop-blur-[6px] sm:bottom-7 sm:left-7">
						<span className="text-[13px] font-semibold text-[#00A344] tabular-nums">
							06:40
						</span>
						<span className="text-[14px] text-[#16234A]">
							Water tank checked{" "}
							<span className="text-[#6B7A9E]">&middot; Block B</span>
						</span>
					</div>
				</div>
			</div>

			<div className="mx-auto max-w-[1180px] px-6 pb-16 md:pb-[88px]">
				<RunsTimeline />

				<div className="mt-16 grid grid-cols-1 items-start gap-12 md:mt-[72px] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-14">
					<p className="font-alan text-[clamp(22px,2.4vw,30px)] leading-[1.35] font-medium tracking-[-0.01em] text-pretty text-[#16234A]">
						The system keeps the record. The Caretaker extends it on the ground.
						Every job recorded makes the system better at running the next one.
					</p>

					<aside className="rounded-[20px] bg-[#13214F] p-8 text-white">
						<p className="mb-3.5 text-[11px] font-semibold tracking-[0.11em] text-[#00C853] uppercase">
							For caretakers
						</p>
						<h3 className="mb-3.5 font-alan text-[24px] leading-[1.2] font-semibold text-white">
							Become a Certified Caretaker
						</h3>
						<p className="mb-6 text-[15px] leading-[1.6] text-[#B9C4DF]">
							Help run properties with structure, visibility and accountability.
							Get trained on the Caretaker system, become certified, and position
							yourself for placements across the Haiven network.
						</p>
						<BecomeCaretakerButton />
						<p className="mt-4 text-[13.5px] text-[#8FA0C6]">
							Cohorts are small and selection is competitive.
						</p>
					</aside>
				</div>
			</div>
		</section>
	);
};

export default RunsSection;
