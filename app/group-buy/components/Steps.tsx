import { STEPS } from "../data";
import { container, eyebrowClass, h2Class, sectionPadding } from "./styles";

const Steps = () => (
	<section id="how" className="scroll-mt-16 bg-haiven-blue text-white">
		<div className={`${container} ${sectionPadding} flex flex-col gap-9`}>
			<div className="flex flex-col gap-3.5">
				<p className={`${eyebrowClass} text-accent-green`}>How it works</p>
				<h2 className={h2Class}>
					How the <span className="text-accent-green">group purchase</span> works.
				</h2>
			</div>
			<ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-4 p-0">
				{STEPS.map(([title, body], i) => (
					<li
						key={title}
						className="flex flex-col gap-2.5 rounded-[22px] border border-[#2B3C94] bg-[#1A2A85] p-[26px]"
					>
						<span className="font-jetbrains text-[34px] leading-none font-bold text-accent-green">
							{String(i + 1).padStart(2, "0")}
						</span>
						<h3 className="m-0 text-[22px] font-extrabold tracking-[-0.02em]">{title}</h3>
						<p className="m-0 text-base leading-[1.55] text-[#C9D0F0]">{body}</p>
					</li>
				))}
			</ol>
		</div>
	</section>
);

export default Steps;
