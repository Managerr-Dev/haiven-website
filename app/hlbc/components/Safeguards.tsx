import { SAFEGUARDS } from "../data";
import ShieldCheck from "./ShieldCheck";
import { container, h2Class, sectionPadding } from "./styles";

const Safeguards = () => (
	<section className="bg-white">
		<div className={`${container} ${sectionPadding} flex flex-col gap-9`}>
			<h2 className={h2Class}>
				Your money,
				<br />
				<span className="text-[#00873A]">protected.</span>
			</h2>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
				{SAFEGUARDS.map(([title, body]) => (
					<div
						key={title}
						className="flex flex-col gap-2.5 rounded-2xl bg-[#F5F7FA] p-6"
					>
						<ShieldCheck color="#00873A" strokeWidth={2.2} />
						<h3 className="m-0 text-xl font-extrabold tracking-[-0.02em]">
							{title}
						</h3>
						<p className="m-0 text-base leading-[1.5] text-[#3A4573]">{body}</p>
					</div>
				))}
			</div>
		</div>
	</section>
);

export default Safeguards;
