'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';

const contactCards = [
	{
		title: "Headquarters",
		value: "58/1/C Wikramaarachchi road,Yakkala, Sri Lanka",
	},
	{
		title: "Email Channel",
		value: "hello@zgenlabs.tech",
	},
	{
		title: "Phone Line",
		value: "+94 77 247 1142",
	},
];

const inquiryTopics = [
	"Product Engineering",
	"AI Automation",
	"Cloud & DevOps",
	"Web site/system Development",
	"Partnership",
];

const budgetTypes = [
	"Below $1K",
	"$1K - $5K",
	"$5K - $15K",
	"$15K - $50K"
];

export default function ContactUs() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		topic: '',
		budget: '',
		message: ''
	});
	const [isLoading, setIsLoading] = useState(false);
	const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
	const [statusMessage, setStatusMessage] = useState('');

	// Initialize EmailJS on component mount
	if (typeof globalThis.window !== 'undefined') {
		emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '');
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		// Validate form
		if (!formData.name || !formData.email || !formData.topic || !formData.budget || !formData.message) {
			setStatus('error');
			setStatusMessage('Please fill in all fields');
			return;
		}

		setIsLoading(true);
		setStatus('idle');

		try {
			const templateParams = {
				to_email: process.env.NEXT_PUBLIC_EMAILJS_TO_EMAIL || 'hello@zgenlabs.tech',
				from_name: formData.name,
				from_email: formData.email,
				topic: formData.topic,
				budget: formData.budget,
				message: formData.message,
				reply_to: formData.email
			};

			await emailjs.send(
				process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
				process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
				templateParams
			);

			setStatus('success');
			setStatusMessage('Thank you! We\'ll get back to you within 24 hours.');
			setFormData({ name: '', email: '', topic: '', budget: '', message: '' });
		} catch (error) {
			console.error('EmailJS error:', error);
			setStatus('error');
			setStatusMessage('Failed to send message. Please try again later.');
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<main className="relative min-h-screen overflow-hidden bg-[#060606] pt-28">
			<div
				className="pointer-events-none absolute inset-0 opacity-40"
				style={{
					backgroundImage:
						"radial-gradient(circle at 12% 18%, rgba(255, 20, 20, 0.25), transparent 34%), radial-gradient(circle at 82% 22%, rgba(168, 19, 19, 0.2), transparent 38%), radial-gradient(circle at 50% 75%, rgba(120, 10, 10, 0.2), transparent 52%)",
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
						Contact ZGenLabs
					</p>
					<h1 className="mt-6 font-display text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl md:text-7xl">
						Let&apos;s Build{" "}
						<span className="block text-[#ff1010]">The Future Together</span>
					</h1>
					<p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
						Share your challenge, idea, or roadmap and our team will connect
						with a practical strategy for design, engineering, and deployment.
					</p>
				</div>

				<div className="mt-12 grid gap-5 md:grid-cols-3">
					{contactCards.map((card) => (
						<div
							key={card.title}
							className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5 backdrop-blur-sm"
						>
							<p className="text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-500">
								{card.title}
							</p>
							<p className="mt-3 text-sm leading-relaxed text-zinc-200">
								{card.value}
							</p>
						</div>
					))}
				</div>

				<div className="mt-10 grid gap-8 rounded-3xl border border-white/10 bg-[#0a0a0a]/90 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.45)] lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
					<form className="space-y-5" onSubmit={handleSubmit}>
						<div className="grid gap-5 sm:grid-cols-2">
							<label className="block">
								<span className="text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-500">
									Full Name
								</span>
								<input
									type="text"
									name="name"
									value={formData.name}
									onChange={handleChange}
									placeholder="Jane Doe"
									className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-red-500/70"
									required
								/>
							</label>

							<label className="block">
								<span className="text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-500">
									Work Email
								</span>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									placeholder="you@company.com"
									className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-red-500/70"
									required
								/>
							</label>
						</div>

						<div className="grid gap-5 sm:grid-cols-2">
							<label className="block">
								<span className="text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-500">
									Topic
								</span>
								<select
									name="topic"
									value={formData.topic}
									onChange={handleChange}
									className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-red-500/70"
									required
								>
									<option value="" disabled>
										Select inquiry type
									</option>
									{inquiryTopics.map((topic) => (
										<option key={topic} value={topic}>
											{topic}
										</option>
									))}
								</select>
							</label>

							<label className="block">
								<span className="text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-500">
									Budget Type
								</span>
								<select
									name="budget"
									value={formData.budget}
									onChange={handleChange}
									className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-red-500/70"
									required
								>
									<option value="" disabled>
										Select budget range
									</option>
									{budgetTypes.map((budget) => (
										<option key={budget} value={budget}>
											{budget}
										</option>
									))}
								</select>
							</label>
						</div>

						<label className="block">
							<span className="text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-500">
								Project Brief
							</span>
							<textarea
								name="message"
								value={formData.message}
								onChange={handleChange}
								rows={6}
								placeholder="Tell us about your goals, scope, and timeline."
								className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-red-500/70"
								required
							/>
						</label>

						{status !== 'idle' && (
							<div className={`rounded-lg px-4 py-3 text-sm ${
								status === 'success' 
									? 'bg-green-900/30 border border-green-500/50 text-green-300'
									: 'bg-red-900/30 border border-red-500/50 text-red-300'
							}`}>
								{statusMessage}
							</div>
						)}

						<button
							type="submit"
							disabled={isLoading}
							className="inline-flex min-w-[190px] items-center justify-center border border-[#ff1010] bg-[#ff1010] px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isLoading ? 'Sending...' : 'Send Request'}
						</button>
					</form>

					<aside className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#180808] to-[#0d0d0d] p-6">
						<p className="text-[10px] font-bold uppercase tracking-[0.24em] text-red-300">
							Why Teams Choose Us
						</p>
						<ul className="mt-5 space-y-4 text-sm leading-relaxed text-zinc-300">
							<li>Senior cross-functional team across product, AI, and cloud.</li>
							<li>Rapid proof-of-concept cycles with measurable milestones.</li>
							<li>Transparent communication and delivery governance.</li>
							<li>Security-first engineering for enterprise reliability.</li>
						</ul>

						<div className="mt-8 border-t border-white/10 pt-5 text-xs uppercase tracking-[0.2em] text-zinc-500">
							Typical Response Time: Within 24 hours
						</div>
					</aside>
				</div>
			</section>
		</main>
	);
}
