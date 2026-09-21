"use client";

import { useEffect, useRef } from "react";
import { timelineRows } from "../data";

const RunsTimeline = () => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const els = Array.from(
			containerRef.current?.querySelectorAll<HTMLElement>("[data-reveal]") ?? [],
		);
		const reduce = window.matchMedia?.(
			"(prefers-reduced-motion: reduce)",
		).matches;

		const show = (el: HTMLElement) => {
			el.style.opacity = "1";
			el.style.transform = "none";
		};

		if (reduce || !("IntersectionObserver" in window)) {
			els.forEach(show);
			return;
		}

		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						show(e.target as HTMLElement);
						io.unobserve(e.target);
					}
				});
			},
			{ rootMargin: "0px 0px -12% 0px" },
		);

		els.forEach((el) => io.observe(el));
		return () => io.disconnect();
	}, []);

	return (
		<div
			ref={containerRef}
			className="grid grid-cols-1 gap-x-12 border-b border-[#E8EBF5] sm:grid-cols-2 lg:grid-cols-3"
		>
			{timelineRows.map((row, i) => (
				<div
					key={row.time}
					data-reveal
					style={{
						opacity: 0,
						transform: "translateY(14px)",
						transition: `opacity .6s ease ${i % 2 ? ".06s" : "0s"}, transform .6s ease ${
							i % 2 ? ".06s" : "0s"
						}`,
					}}
					className="grid grid-cols-[64px_1fr] gap-5 border-t border-[#E8EBF5] py-[26px]"
				>
					<span className="pt-[3px] text-[13.5px] font-semibold text-[#00A344] tabular-nums">
						{row.time}
					</span>
					<span>
						<span className="mb-1.5 block font-alan text-[18px] font-semibold text-[#16234A]">
							{row.title}
						</span>
						<span className="block text-[15px] leading-[1.55] text-[#6B7A9E]">
							{row.description}
						</span>
					</span>
				</div>
			))}
		</div>
	);
};

export default RunsTimeline;
