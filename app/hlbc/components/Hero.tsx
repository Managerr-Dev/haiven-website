import Image from "next/image";
import { container, ctaClass } from "./styles";

const promises = [
	"Free, non-binding registration",
	"Nothing to pay until your pool closes",
	"Transfer or refund if a pool falls short",
];

const Hero = () => (
	<section id="top" className="overflow-hidden bg-haiven-blue text-white">
		<div
			className={`${container} grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-[clamp(40px,5vw,64px)] pt-[clamp(40px,7vw,88px)] pb-[clamp(56px,8vw,96px)]`}
		>
			<div className="flex flex-col gap-6">
				<p className="m-0 text-[13px] leading-[1.6] font-bold tracking-[0.16em] text-accent-green uppercase">
					Haiven Leverage Buying Club · Smart Meters. Smarter Prices.
				</p>
				<h1 className="m-0 text-[clamp(48px,8.4vw,96px)] leading-[0.94] font-extrabold tracking-[-0.045em]">
					Don’t buy
					<br />
					meters <span className="text-accent-green">alone.</span>
				</h1>
				<p className="m-0 max-w-[30ch] text-[clamp(19px,2.2vw,24px)] leading-[1.4] font-medium text-pretty text-[#C9D0F0]">
					Join the pool and pay as low as the{" "}
					<strong className="font-bold text-white">1,000-meter price</strong>,
					even if you only need one meter.
				</p>
				<div className="mt-1 flex flex-wrap gap-3">
					<a href="#register" className={`${ctaClass} px-7 py-4 text-lg`}>
						Register free <span aria-hidden="true">→</span>
					</a>
					<a
						href="#saving"
						className="flex items-center rounded-full border-[1.5px] border-[#4A5BAE] px-[26px] py-[15px] text-lg font-bold text-white no-underline transition-colors hover:border-white"
					>
						See your saving
					</a>
				</div>
				<ul className="m-0 mt-2 flex list-none flex-col gap-3 p-0">
					{promises.map((p) => (
						<li
							key={p}
							className="flex items-center gap-3 text-[17px] font-semibold"
						>
							<span aria-hidden="true" className="font-extrabold text-accent-green">
								✓
							</span>
							{p}
						</li>
					))}
				</ul>
			</div>

			<div className="flex justify-center">
				<div className="relative w-full max-w-[500px] -rotate-3">
					<Image
						src="/images/hlbc/meter.png"
						alt="Haiven STE18 single-phase GPRS smart meter, display reading 95000"
						width={680}
						height={720}
						priority
						sizes="(max-width: 560px) 90vw, 500px"
						className="block h-auto w-full"
					/>
					<div className="absolute top-[70%] -left-[6%] flex aspect-square w-[36%] -rotate-6 flex-col items-center justify-center rounded-full bg-accent-green text-haiven-blue shadow-[0_18px_40px_rgba(5,12,50,0.45)]">
						<span className="text-[clamp(11px,1.6vw,15px)] font-bold tracking-[0.12em]">
							AS LOW AS
						</span>
						<span className="text-[clamp(30px,5vw,50px)] leading-none font-extrabold tracking-[-0.04em]">
							₦95k
						</span>
						<span className="text-[clamp(11px,1.5vw,14px)] font-semibold">
							per meter + VAT
						</span>
					</div>
				</div>
			</div>
		</div>
	</section>
);

export default Hero;
