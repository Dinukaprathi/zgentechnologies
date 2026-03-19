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
		<div className="fixed inset-0 z-[11000] flex items-end justify-center bg-black/65 p-4 backdrop-blur-sm md:items-center">
			<div className="relative w-full max-w-xl overflow-hidden border border-red-500/35 bg-[#070709] p-6 text-white shadow-[0_20px_80px_rgba(0,0,0,0.55)] md:p-8">
				<div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />

				<button
					type="button"
					onClick={() => setIsOpen(false)}
					className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center border border-white/20 text-sm text-zinc-300 transition hover:border-white/40 hover:text-white"
					aria-label="Close popup"
				>
					x
				</button>

				<p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-red-400">
					Quick Discovery
				</p>
				<h3 className="font-display text-2xl font-black uppercase leading-tight text-white md:text-3xl">
					You Might Be Missing The Interesting Part Here
				</h3>
				<p className="mt-4 max-w-lg text-sm leading-6 text-zinc-300 md:text-base">
					Explore the Solar System to get an immersive 3D experience.
				</p>

				<div className="mt-6 flex flex-col gap-3 sm:flex-row">
					<Link
						href="/solar-system"
						className="inline-flex items-center justify-center border border-[#ff1111] bg-[#ff1111] px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-red-500"
					>
						Explore Solar System
					</Link>
					<button
						type="button"
						onClick={() => setIsOpen(false)}
						className="inline-flex items-center justify-center border border-white/25 px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-zinc-200 transition hover:border-white/50"
					>
						Maybe Later
					</button>
				</div>
			</div>
		</div>
	);
}
