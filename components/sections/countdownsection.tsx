"use client";

import { useEffect, useRef, useState } from "react";
import { CountdownStat } from "@/data/countdownUtils";

interface CountdownSectionProps {
	stats: CountdownStat[];
}

export default function CountdownSection({
	stats,
}: Readonly<CountdownSectionProps>) {
	const sectionRef = useRef<HTMLElement | null>(null);
	const [isInView, setIsInView] = useState(false);
	const [counts, setCounts] = useState<number[]>(() => stats.map(() => 0));

	useEffect(() => {
		const node = sectionRef.current;
		if (!node) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsInView(entry.isIntersecting);
				if (!entry.isIntersecting) {
					setCounts(stats.map(() => 0));
				}
			},
			{ threshold: 0.35 }
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, [stats]);

	useEffect(() => {
		if (!isInView) return;

		const duration = 1200;
		const start = performance.now();
		let rafId = 0;

		const tick = (now: number) => {
			const progress = Math.min((now - start) / duration, 1);
			setCounts(stats.map((item) => Math.floor(item.target * progress)));

			if (progress < 1) {
				rafId = requestAnimationFrame(tick);
			}
		};

		rafId = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(rafId);
	}, [isInView, stats]);

	return (
		<section ref={sectionRef} className="bg-[#070707] py-16 md:py-20">
			<div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-6 md:grid-cols-4 md:px-10">
				{stats.map((item, index) => (
					<div key={item.label} className="text-center">
						<p className="font-display text-6xl font-black leading-none text-zinc-200 md:text-7xl">
							{counts[index]}
							{item.suffix}
						</p>
						<p className="mt-3 text-[9px] font-bold uppercase tracking-[0.45em] text-[#ff1111] md:text-[10px]">
							{item.label}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}
