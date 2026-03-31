export const contactCards = [
	{
		title: 'Headquarters',
		value: '58/1/C Wikramaarachchi road,Yakkala, Sri Lanka',
	},
	{
		title: 'Email Channel',
		value: 'info@zgenlabs.com',
	},
	{
		title: 'Phone Line',
		value: '+94 77 247 1142',
	},
] as const;

export const inquiryTopics = [
	'Product Engineering',
	'AI Automation',
	'Cloud & DevOps',
	'Web site/system Development',
	'Partnership',
];

export const budgetTypes = [
	'Below $1K',
	'$1K - $5K',
	'$5K - $15K',
	'$15K - $50K',
];

export const emailJsConfig = {
	publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
	serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
	templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
	toEmail: process.env.NEXT_PUBLIC_EMAILJS_TO_EMAIL || '',
} as const;
