'use client';

export default function Loader() {
	return (
		<div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#080808]">
			<div className="relative h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48">
				{/* Outer Glow */}
				<div className="absolute inset-[-30%] animate-pulse rounded-full bg-red-600/25 blur-3xl" />
				
				{/* Rotating Logo Container */}
				<div className="relative h-full w-full animate-[spin_3s_linear_infinite]">
					<img
						src="/logo/logo-without-bg.png"
						alt="ZGenLabs Loading"
						className="h-full w-full object-contain"
					/>
				</div>
				
				{/* Loading Text */}
				<div className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap">
					<p className="text-[12px] font-bold uppercase tracking-[0.6em] text-red-500/80 animate-pulse">
						Initializing...
					</p>
				</div>
			</div>
		</div>
	);
}
