'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PopupSection() {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsOpen(true);
		}, 10000);

		return () => clearTimeout(timer);
	}, []);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-[11000] flex items-end justify-center bg-black/65 p-3 xs:p-4 backdrop-blur-sm md:items-center">
			<div className="relative w-full max-w-xl overflow-hidden border border-red-500/35 bg-[#070709] p-4 xs:p-5 sm:p-6 md:p-8 text-white shadow-[0_20px_80px_rgba(0,0,0,0.55)]">
				<div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />

				<button
					type="button"
					onClick={() => setIsOpen(false)}
					className="absolute right-2.5 xs:right-3 top-2.5 xs:top-3 inline-flex h-7 w-7 xs:h-8 xs:w-8 items-center justify-center border border-white/20 text-xs xs:text-sm text-zinc-300 transition hover:border-white/40 hover:text-white"
					aria-label="Close popup"
				>
					&times;
				</button>

				<p className="mb-2.5 xs:mb-3 text-[8px] xs:text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.25em] xs:tracking-[0.35em] text-red-400 pr-8">
					Quick Discovery
				</p>
				<h3 className="font-display text-xl xs:text-2xl font-black uppercase leading-tight text-white md:text-3xl">
					You Might Be Missing The Interesting Part Here
				</h3>
				<p className="mt-3 xs:mt-4 max-w-lg text-xs xs:text-sm leading-5 xs:leading-6 text-zinc-300 md:text-base">
					Explore the Solar System to get an immersive 3D experience.
				</p>

				<div className="mt-4 xs:mt-5 sm:mt-6 flex flex-col gap-2.5 xs:gap-3">
					<Link
						href="/solar-system"
						className="inline-flex items-center justify-center border border-[#ff1111] bg-[#ff1111] px-4 xs:px-6 py-2.5 xs:py-3 text-[10px] xs:text-xs font-bold uppercase tracking-[0.15em] xs:tracking-[0.18em] text-white transition hover:bg-red-500"
					>
						Explore Solar System
					</Link>
					<button
						type="button"
						onClick={() => setIsOpen(false)}
						className="inline-flex items-center justify-center border border-white/25 px-4 xs:px-6 py-2.5 xs:py-3 text-[10px] xs:text-xs font-bold uppercase tracking-[0.15em] xs:tracking-[0.18em] text-zinc-200 transition hover:border-white/50"
					>
						Maybe Later
					</button>
				</div>
			</div>
		</div>
	);
}
