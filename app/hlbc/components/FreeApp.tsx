import { container, eyebrowClass, finePrint, green, h2Class, leadClass, sectionPadding } from "./styles";

const apps = [
	[
		"Meter management",
		"Register, monitor and manage every meter in your property from one place.",
	],
	[
		"Power vending app",
		"Residents buy electricity in the Haiven app, with remote loading on supported meters.",
	],
];

const FreeApp = () => (
	<section className="bg-[#E8EBF5]">
		<div className={`${container} ${sectionPadding} flex flex-col gap-8`}>
			<div className="flex flex-col gap-3.5">
				<p className={`${eyebrowClass} ${green}`}>Included with every meter</p>
				<h2 className={h2Class}>
					The Haiven app
					<br />
					is <span className={green}>free.</span>
				</h2>
				<p className={leadClass}>
					You save on the meters, and you don’t pay for the software to run them.
				</p>
			</div>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] gap-4">
				{apps.map(([title, body]) => (
					<div key={title} className="flex flex-col gap-2.5 rounded-[20px] bg-white p-[26px]">
						<span className="self-start rounded-lg bg-haiven-blue px-2.5 py-1.5 text-xs font-extrabold tracking-[0.14em] text-accent-green">
							FREE
						</span>
						<h3 className="m-0 text-[22px] font-extrabold tracking-[-0.02em]">{title}</h3>
						<p className="m-0 text-[15px] leading-[1.55] text-[#4A5480]">{body}</p>
					</div>
				))}
			</div>
			<p className={finePrint}>
				Free for property owners and managers. Residents pay a 1% fee on the
				electricity they buy through the app.
			</p>
		</div>
	</section>
);

export default FreeApp;
