const faqItems = [
	{
		question: "What services does ZGenLabs provide?",
		answer:
			"We support end-to-end delivery across product design, full-stack engineering, AI automation, cloud infrastructure, and growth-focused web experiences.",
	},
	{
		question: "What is your typical project timeline?",
		answer:
			"A focused MVP usually takes 4 to 8 weeks depending on feature depth. Larger platforms are typically delivered in phased milestones over multiple sprints.",
	},
	{
		question: "How do you estimate pricing?",
		answer:
			"We estimate pricing based on scope complexity, timeline, integrations, and team size. After discovery, we share a transparent proposal with deliverables and milestone costs.",
	},
	{
		question: "Can you work with our in-house team?",
		answer:
			"Yes. We can run as an embedded pod alongside your internal team, contribute to your workflows, and align with your existing tools, standards, and release process.",
	},
	{
		question: "Do you provide post-launch support?",
		answer:
			"Absolutely. We offer post-launch support for stability, performance tuning, feature iterations, and long-term maintenance plans based on your product goals.",
	},
	{
		question: "How do we get started?",
		answer:
			"Start through the contact page with your goals, timeline, and budget range. We respond within 24 hours and schedule a discovery call to define the next steps.",
	},
];

export default function FaqPage() {
	return (
		<main className="relative min-h-screen overflow-hidden bg-[#060606] pt-28">
			<div
				className="pointer-events-none absolute inset-0 opacity-40"
				style={{
					backgroundImage:
						"radial-gradient(circle at 10% 16%, rgba(255, 20, 20, 0.23), transparent 34%), radial-gradient(circle at 86% 24%, rgba(168, 19, 19, 0.2), transparent 40%), radial-gradient(circle at 52% 78%, rgba(120, 10, 10, 0.2), transparent 52%)",
				}}
			/>

			<div
				className="pointer-events-none absolute inset-0 opacity-[0.07]"
				style={{
					backgroundImage:
						"url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"160\" height=\"160\" viewBox=\"0 0 160 160\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"2\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"160\" height=\"160\" filter=\"url(%23noise)\"/%3E%3C/svg%3E')",
				}}
			/>

			<section className="relative mx-auto w-full max-w-7xl px-6 pb-20 lg:px-10">
				<div className="max-w-4xl">
					<p className="inline-flex rounded-full border border-red-600/35 bg-red-900/10 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-red-400">
						Support Answers
					</p>
					<h1 className="mt-6 font-display text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl md:text-7xl">
						Frequently Asked <span className="block text-[#ff1010]">Questions</span>
					</h1>
					<p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
						Quick answers about process, timelines, pricing, and collaboration.
						 If your question is not listed, reach out and we will help directly.
					</p>
				</div>

				<div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
					<div className="space-y-4">
						{faqItems.map((item, index) => (
							<details
								key={item.question}
								className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm"
								open={index === 0}
							>
								<summary className="cursor-pointer list-none pr-8 text-sm font-semibold uppercase tracking-[0.12em] text-zinc-100 marker:hidden">
									{item.question}
									<span className="float-right text-red-400 transition group-open:rotate-45">
										+
									</span>
								</summary>
								<p className="mt-4 text-sm leading-relaxed text-zinc-300">
									{item.answer}
								</p>
							</details>
						))}
					</div>

					<aside className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#180808] to-[#0d0d0d] p-6">
						<p className="text-[10px] font-bold uppercase tracking-[0.24em] text-red-300">
							Need Faster Clarification?
						</p>
						<p className="mt-4 text-sm leading-relaxed text-zinc-300">
							For project-specific guidance, send your goals and constraints through
							 our contact form and our team will respond within one business day.
						</p>
						<a
							href="/contact"
							className="mt-6 inline-flex min-w-[180px] items-center justify-center border border-[#ff1010] bg-[#ff1010] px-7 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-red-500"
						>
							Contact Team
						</a>

						<div className="mt-8 border-t border-white/10 pt-5 text-xs uppercase tracking-[0.2em] text-zinc-500">
							Response Window: Within 24 hours
						</div>
					</aside>
				</div>
			</section>
		</main>
	);
}
