import Image from "next/image";
import Link from "next/link";

const HlbcFooter = () => (
	<footer className="bg-[#0D1A5E] text-[#C9D0F0]">
		<div className="mx-auto flex max-w-[1160px] flex-col gap-7 px-5 pt-14 pb-12">
			<div className="flex flex-wrap items-center justify-between gap-5">
				<Link href="/" aria-label="Haiven home page" className="flex">
					<Image
						src="/images/haiven-logo-light.png"
						alt="Haiven"
						width={1025}
						height={280}
						className="block h-9 w-auto"
					/>
				</Link>
				<span className="text-[15px] font-semibold text-white">
					Collective Buying. Wholesale Advantage.
				</span>
			</div>
			<div className="flex flex-col gap-1.5 text-[15px]">
				<span className="font-bold text-white">
					Haiven Smart Systems Limited · Lagos, Nigeria
				</span>
				<a
					href="mailto:info@haiven.net"
					className="w-fit font-semibold text-accent-green hover:underline"
				>
					info@haiven.net
				</a>
			</div>
			<p className="m-0 max-w-[900px] border-t border-[#2B3C94] pt-6 text-[13px] leading-[1.7]">
				All prices are per meter and exclude VAT and courier charges.
				Registration is free and non-binding. Pools go ahead at 300 paid
				meters; only cleared payments count toward pool thresholds. Pool prices
				shown are illustrative; the final price is confirmed by Haiven after
				provisional closure and is subject to supplier confirmation. If a pool
				falls short, you may transfer to the next pool or request a refund;
				approved refunds are paid within 7 business days. Shipping is estimated
				at 10 weeks from supplier order confirmation and is not a guaranteed
				delivery date. Meter boxes and circuit breakers are optional, quoted on
				request and not included in the meter price. No product substitution
				without your approval. HLBC Customer Terms and Conditions apply.
			</p>
		</div>
	</footer>
);

export default HlbcFooter;
