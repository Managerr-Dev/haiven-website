const chip = "rounded-xl bg-[#1A2A85] px-4 py-2.5";

/** Why a group purchase works: together, buyers reach the wholesale quantity. */
const ThousandBand = () => (
	<section className="overflow-hidden bg-[#0D1A5E] text-white">
		<div className="mx-auto flex max-w-[1200px] flex-col items-center gap-7 px-6 py-[clamp(56px,8vw,96px)] text-center">
			<span
				aria-hidden="true"
				className="text-[clamp(120px,24vw,300px)] leading-[0.8] font-extrabold tracking-[-0.06em] text-accent-green"
			>
				1,000
			</span>
			<h2 className="m-0 text-[clamp(30px,4.6vw,54px)] leading-[1.05] font-extrabold tracking-[-0.045em] text-balance">
				No one needs 1,000 meters.
				<br />
				<span className="text-accent-green">Together, we have them.</span>
			</h2>
			<div className="flex flex-wrap items-center justify-center gap-3 font-jetbrains text-[clamp(16px,2vw,22px)] font-bold">
				<span className={chip}>You: 20</span>
				<span className="text-[#C9D0F0]">+</span>
				<span className={chip}>Other buyers: 980</span>
				<span className="text-[#C9D0F0]">=</span>
				<span className="rounded-xl bg-accent-green px-4 py-2.5 text-haiven-blue">
					1,000 at wholesale
				</span>
			</div>
			<p className="m-0 max-w-[56ch] text-[17px] leading-[1.55] text-[#C9D0F0]">
				Suppliers keep the wholesale price for 1,000-meter orders. A group
				purchase combines your order with other buyers’ so everyone gets there.
			</p>
		</div>
	</section>
);

export default ThousandBand;
