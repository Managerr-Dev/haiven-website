import { STEPS } from "../data";
import ShieldCheck from "./ShieldCheck";
import { container, h2Class, mono, sectionPadding } from "./styles";

const Steps = () => (
	<section id="how" className="scroll-mt-[60px] bg-haiven-blue text-white">
		<div className={`${container} ${sectionPadding} flex flex-col gap-10`}>
			<h2 className={h2Class}>
				How the <span className="text-accent-green">pool</span> works.
			</h2>
			<ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-x-12 p-0">
				{STEPS.map(([title, body], i) => (
					<li
						key={title}
						className="grid grid-cols-[64px_1fr] gap-2 border-t border-[#2B3C94] py-6"
					>
						<span
							className={`${mono} text-[32px] leading-[1.1] font-bold text-accent-green`}
						>
							{String(i + 1).padStart(2, "0")}
						</span>
						<div className="flex flex-col gap-1.5">
							<h3 className="m-0 text-[23px] font-extrabold tracking-[-0.02em]">
								{title}
							</h3>
							<p className="m-0 text-base leading-[1.5] text-pretty text-[#C9D0F0]">
								{body}
							</p>
						</div>
					</li>
				))}
			</ol>
			<div className="flex items-start gap-4 rounded-2xl border-[1.5px] border-accent-green bg-[#16307F] px-6 py-5">
				<ShieldCheck size={28} color="#1ED760" className="flex-none" />
				<p className="m-0 text-[17px] leading-[1.5] font-semibold">
					Pool short of 300 paid meters?{" "}
					<span className="text-accent-green">
						Transfer to the next pool or request a refund.
					</span>{" "}
					Approved refunds are paid within 7 business days.
				</p>
			</div>
		</div>
	</section>
);

export default Steps;
