import Image from "next/image";
import { partners } from "@/data/partnerUtils";

export default function OurClientsSection() {
	const loopedPartners = [...partners, ...partners];

	return (
		<section className="relative overflow-hidden bg-black py-10 md:py-12">
			<div className="mx-auto mb-6 text-center">
				<p className="text-[9px] font-semibold uppercase tracking-[0.55em] text-zinc-500">
					Trusted by global leaders
				</p>
			</div>

			<div className="relative mx-auto max-w-full overflow-hidden">
				<div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
				<div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />

				<div className="animate-infinite-scroll flex items-center gap-14 whitespace-nowrap px-2">
					{loopedPartners.map((partner, index) => (
						<div
							key={`${partner.id}-${index}`}
							className="flex h-16 shrink-0 items-center justify-center opacity-70 transition-opacity duration-300 hover:opacity-100 md:h-20"
						>
							<Image
								src={partner.logo}
								alt={partner.name}
								width={partner.width}
								height={partner.height}
								className="h-auto max-h-10 w-auto object-contain md:max-h-12"
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
