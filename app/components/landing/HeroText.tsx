"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const WORDS = ["Estate", "Community", "Commercial Center"];

export default function HeroHeading() {
	const [index, setIndex] = useState(0);

	// Find longest word to reserve width
	const longestWord = useMemo(() => {
		return WORDS.reduce((a, b) => (b.length > a.length ? b : a), WORDS[0]);
	}, []);

	// Rotate words
	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prev) => (prev + 1) % WORDS.length);
		}, 2500);

		return () => clearInterval(interval);
	}, []);

	return (
		<h1 className="font-bold text-3xl lg:text-5xl text-white uppercase leading-[35px] lg:leading-[60px]">
			Manage Every Aspect of Your {/* Rotating Slot */}
			<span className="relative inline-block align-baseline text-accent-green">
				{/* Invisible width reserver */}
				<span className="invisible whitespace-nowrap">{longestWord}</span>

				{/* Animated rotating text */}
				<span className="absolute left-0 top-0 whitespace-nowrap">
					<AnimatePresence mode="wait">
						<motion.span
							key={WORDS[index]}
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -8 }}
							transition={{ duration: 0.35, ease: "easeOut" }}
						>
							{WORDS[index]}
						</motion.span>
					</AnimatePresence>
				</span>
			</span>{" "}
			from <span className="text-accent-green">One Place</span>
		</h1>
	);
}
