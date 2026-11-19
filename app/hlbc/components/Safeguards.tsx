import { SAFEGUARDS } from "../data";
import ShieldCheck from "./ShieldCheck";
import { container, eyebrowClass, green, h2Class, sectionPadding } from "./styles";

const Safeguards = () => (
	<section className="bg-white">
		<div className={`${container} ${sectionPadding} flex flex-col gap-9`}>
			<div className="flex flex-col gap-3.5">
				<p className={`${eyebrowClass} ${green}`}>Payment and customer protection</p>
				<h2 className={h2Class}>
					Your money,
					<br />
					<span className={green}>protected.</span>
				</h2>
			</div>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-4">
				{SAFEGUARDS.map(([title, body]) => (
					<div key={title} className="flex flex-col gap-2.5 rounded-[18px] bg-[#F5F7FA] p-6">
						<ShieldCheck size={28} strokeWidth={2.2} color="#00873A" />
						<h3 className="m-0 text-xl font-extrabold tracking-[-0.02em]">{title}</h3>
						<p className="m-0 text-[15px] leading-[1.55] text-[#4A5480]">{body}</p>
					</div>
				))}
			</div>
		</div>
	</section>
);

export default Safeguards;
