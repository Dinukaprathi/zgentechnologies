'use client';

export default function Loader() {
	return (
		<div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#080808]">
			<div className="relative flex flex-col items-center">
				<div className="relative h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48">
					{/* Outer Glow */}
					<div className="absolute inset-[-30%] animate-pulse rounded-full bg-red-600/25 blur-3xl" />
					
					{/* Rotating Logo with ease-in-out reverse animation */}
					<div className="relative h-full w-full animate-rotation-back">
						<img
							src="/logo/logo-without-bg.png"
							alt="ZGenLabs Loading"
							className="h-full w-full object-contain"
						/>
					</div>
				</div>

				{/* Loading Text */}
				<div className="mt-16 whitespace-nowrap">
					<p className="text-[12px] font-bold uppercase tracking-[0.6em] text-red-500/80 animate-pulse">
						Initializing...
					</p>
				</div>
			</div>

			<style jsx global>{`
				@keyframes rotationBack {
					0% {
						transform: rotate(0deg);
					}
					100% {
						transform: rotate(-360deg);
					}
				}
				.animate-rotation-back {
					animation: rotationBack 1s ease-in-out infinite reverse;
				}
			`}</style>
		</div>
	);
}
