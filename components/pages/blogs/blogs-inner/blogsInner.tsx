import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { BlogPost } from "@/data/blogData";

interface BlogsInnerProps {
	post: BlogPost;
}

export default function BlogsInner({ post }: BlogsInnerProps) {
	const excerptParagraphs = post.excerpt
		.split(/\n\s*/)
		.map((paragraph) => paragraph.trim())
		.filter(Boolean);

	return (
		<section className="min-h-screen bg-[#050507] pt-28 pb-20 md:pt-32 md:pb-24">
			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
				<Link
					href="/blog"
					className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300 transition-colors hover:border-[#ff1111]/60 hover:text-white"
				>
					<FaArrowLeft className="text-[10px]" aria-hidden="true" />
					<span>Back</span>
				</Link>

				<h1 className="mb-8 text-3xl font-extrabold leading-tight text-white md:text-5xl">
					{post.title}
				</h1>

				<article className="overflow-hidden rounded-2xl border border-white/10 bg-[#111113]">
					<div className="relative aspect-[16/9] w-full">
						<Image
							src={post.image || "/blog/placeholder.jpg"}
							alt={post.title}
							fill
							className="object-cover"
							priority
						/>
					</div>

					<div className="space-y-8 p-6 md:p-10">
						<div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em]">
							<span className="rounded-full border border-[#ff1111]/60 bg-[#ff1111]/10 px-3 py-1 text-[#ff1111]">
								{post.category}
							</span>
							<span className="text-zinc-400">{post.date}</span>
							<span className="text-zinc-500">{post.readTime}</span>
						</div>

						<div className="space-y-4">
							{excerptParagraphs.map((paragraph, index) => (
								<p
									key={`${post.id}-excerpt-${index}`}
									className="text-base leading-relaxed text-zinc-300 md:text-lg"
								>
									{paragraph}
								</p>
							))}
						</div>

						<div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
							<div className="rounded-xl border border-white/10 bg-black/30 p-5">
								<h2 className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-white">
									Key Highlights
								</h2>
								<ul className="space-y-3">
									{post.features.map((feature) => (
										<li
											key={feature}
											className="flex items-start gap-3 text-sm text-zinc-300 md:text-base"
										>
											<span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#ff1111]" />
											<span>{feature}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</article>
			</div>
		</section>
	);
}
