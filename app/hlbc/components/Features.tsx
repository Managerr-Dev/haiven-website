import { FEATURES } from "../data";
import { container, eyebrowClass, h2Class, mono, sectionPadding } from "./styles";

const Features = () => (
	<section className="bg-[#0D1A5E] text-white">
		<div className={`${container} ${sectionPadding} flex flex-col gap-9`}>
			<div className="flex flex-col gap-3.5">
				<p className={`${eyebrowClass} text-accent-green`}>The meter</p>
				<h2 className={h2Class}>
					Smart meters.
					<br />
					<span className="text-accent-green">Smarter prices.</span>
				</h2>
			</div>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-px overflow-hidden rounded-2xl border border-[#2B3C94] bg-[#2B3C94]">
				{FEATURES.map(([title, body], i) => (
					<div key={title} className="flex flex-col gap-2 bg-[#0D1A5E] px-6 py-7">
						<span className={`${mono} text-sm font-bold text-accent-green`}>
							{String(i + 1).padStart(2, "0")}
						</span>
						<h3 className="m-0 text-xl font-extrabold tracking-[-0.02em]">
							{title}
						</h3>
						<p className="m-0 text-base leading-[1.5] text-[#C9D0F0]">{body}</p>
					</div>
				))}
			</div>
			<p className="m-0 max-w-[820px] text-sm leading-[1.55] text-[#C9D0F0]">
				Available functions depend on meter configuration, the vending or
				management platform in use and GPRS coverage at the site. Haiven
				confirms the specification for your pool before you pay.
			</p>
		</div>
	</section>
);

export default Features;
