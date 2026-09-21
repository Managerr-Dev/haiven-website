import Image from "next/image";
import { valueProps } from "../data";

const ProductSection = () => {
	return (
		<section
			id="product"
			className="mx-auto max-w-[1180px] scroll-mt-24 px-6 py-16 md:py-[88px]"
		>
			<h2 className="mb-4 font-alan text-[clamp(28px,3.2vw,40px)] leading-[1.12] font-semibold tracking-[-0.015em] text-[#16234A]">
				Everything that matters, on the record
			</h2>
			<p className="mb-12 text-[17px] leading-[1.6] text-[#6B7A9E]">
				One shared operating layer for owners, managers and residents.
			</p>

			<div className="relative mb-16 lg:mb-[120px]">
				<figure className="m-0">
					<div className="overflow-hidden rounded-[16px] border border-[#E8EBF5] bg-white shadow-[0_24px_60px_rgba(27,46,107,0.12)]">
						<div className="flex items-center gap-[7px] border-b border-[#E8EBF5] bg-[#F3F5FB] px-4 py-3">
							<span className="block h-2.5 w-2.5 rounded-full bg-[#D7DDEE]" />
							<span className="block h-2.5 w-2.5 rounded-full bg-[#D7DDEE]" />
							<span className="block h-2.5 w-2.5 rounded-full bg-[#D7DDEE]" />
						</div>
						<Image
							src="/images/caretaker/dashboard-owner.png"
							alt="Owner dashboard for a single property showing revenue, occupied units, active tenants, open requests, pending payments and collection rate"
							width={1512}
							height={1010}
							className="h-auto w-full"
						/>
					</div>
					<figcaption className="mt-4 max-w-[34em] text-[14px] text-[#6B7A9E]">
						Owner dashboard &mdash; occupancy, collections against invoiced, open
						issues and today&rsquo;s activity on one property.
					</figcaption>
				</figure>

				<figure className="mt-8 m-0 lg:absolute lg:-right-6 lg:-bottom-[90px] lg:mt-0 lg:w-[min(46%,470px)]">
					<div className="overflow-hidden rounded-[16px] border border-[#E8EBF5] bg-white shadow-[0_28px_64px_rgba(27,46,107,0.2)]">
						<Image
							src="/images/caretaker/work-order.png"
							alt="A single work order: electrical request at Lekki 31 Pearl Nuga, tenant, scheduled date and time, status in progress, booking ID 4561"
							width={964}
							height={830}
							className="h-auto w-full"
						/>
					</div>
					<figcaption className="mt-3.5 text-[14px] text-[#6B7A9E]">
						One work order, from logged to signed off &mdash; the whole job, with
						its evidence attached.
					</figcaption>
				</figure>
			</div>

			<div className="mt-10 grid grid-cols-1 items-end gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
				<figure className="m-0">
					<div className="overflow-hidden rounded-[16px] border border-[#E8EBF5] bg-white shadow-[0_16px_40px_rgba(27,46,107,0.1)]">
						<Image
							src="/images/caretaker/collections.png"
							alt="Collections view showing total collected, pending and overdue payments with a rent collection history table by unit"
							width={1512}
							height={1010}
							className="h-auto w-full"
						/>
					</div>
					<figcaption className="mt-3.5 text-[14px] text-[#6B7A9E]">
						Collections &mdash; invoiced, paid and overdue, by unit, with running
						totals.
					</figcaption>
				</figure>

				<figure className="m-0 justify-self-center">
					<div className="w-[280px] overflow-hidden rounded-[32px] border-[9px] border-[#16234A] bg-[#F5F6FA] shadow-[0_22px_50px_rgba(27,46,107,0.18)]">
						<div className="border-b border-[#EFEFEF] bg-white px-[18px] pt-4 pb-3">
							<p className="text-[15px] font-semibold text-[#16234A]">Bills</p>
						</div>
						<div className="flex flex-col gap-3.5 p-4">
							<div className="rounded-[18px] bg-[#13214F] p-5">
								<p className="mb-2 text-[10px] font-semibold tracking-[0.14em] text-[#8FA0C6] uppercase">
									Rent outstanding
								</p>
								<p className="font-alan text-[30px] font-bold tracking-[-0.01em] text-white tabular-nums">
									&#8358;185,000
								</p>
								<p className="mt-1.5 text-[12px] text-[#8FA0C6]">
									Overdue &middot; Due 28th June 2026
								</p>
								<span className="mt-4 inline-block rounded-[12px] bg-[#00C853] px-[18px] py-[9px] text-[13px] font-semibold text-[#0B2E1B]">
									Pay now
								</span>
							</div>
							<div className="flex justify-between gap-2.5 rounded-[14px] bg-[#FFF8EC] p-3.5">
								<span>
									<span className="block text-[13px] font-semibold text-[#16234A]">
										Service Charge (Jun)
									</span>
									<span className="mt-0.5 block text-[11.5px] text-[#E2A000]">
										Overdue &middot; Due 5th June 2026
									</span>
								</span>
								<span className="text-right">
									<span className="block text-[13px] font-semibold text-[#16234A] tabular-nums">
										&#8358;15,000
									</span>
									<span className="mt-0.5 block text-[11.5px] font-semibold text-[#00A344]">
										Pay now
									</span>
								</span>
							</div>
							<div className="flex justify-between gap-2.5 rounded-[14px] border border-[#F0F2F8] bg-white p-3.5">
								<span>
									<span className="block text-[13px] font-semibold text-[#16234A]">
										Electricity
									</span>
									<span className="mt-0.5 block text-[11.5px] text-[#6B7A9E]">
										Meter 04522198103
									</span>
								</span>
								<span className="text-right">
									<span className="block text-[11.5px] text-[#6B7A9E]">
										Prepaid
									</span>
									<span className="mt-0.5 block text-[11.5px] font-semibold text-[#00A344]">
										Top up
									</span>
								</span>
							</div>
						</div>
					</div>
					<figcaption className="mt-3.5 text-center text-[14px] text-[#6B7A9E]">
						Resident app &mdash; what is due, and paying it.
					</figcaption>
				</figure>
			</div>

			<div className="mt-16 grid grid-cols-1 gap-7 border-t border-[#E8EBF5] pt-9 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(230px,1fr))] md:mt-[72px]">
				{valueProps.map((prop) => (
					<p
						key={prop}
						className="font-alan text-[17px] leading-[1.45] text-[#16234A]"
					>
						{prop}
					</p>
				))}
			</div>
			<p className="mt-7 text-[15px] text-[#6B7A9E]">
				Residents pay bills, invite guests, report faults and receive notices
				from their phone.
			</p>
		</section>
	);
};

export default ProductSection;
