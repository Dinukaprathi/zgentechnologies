export interface Testimonial {
	id: string;
	quote: string;
	author: string;
	position: string;
	company: string;
	initials: string;
	image?: string;
}

export const testimonialsData: Testimonial[] = [
	{
		id: '1',
		quote:
			'ZGenLabs redefined our outdated infrastructure, turning it into a cutting-edge, high-performance ecosystem in record time. Their forward-thinking vision and execution truly set them apart.',
		author: 'Kisal Wijemanna',
		position: 'Managing Director',
		company: 'Cabeska Group Pvt Ltd',
		initials: 'JD',
		image: '/testimonials/kisal-cabeska.jpeg',
	},
	{
		id: '2',
		quote:
			'Working with ZGenLabs was a game-changer for our operations at Ceylanray. They delivered a seamless, scalable digital solution that elevated our travel services and enhanced customer experience. Their innovation and reliability make them a truly valuable technology partner.',
		author: 'Lahiru Manchanayake',
		position: 'founder & CEO',
		company: 'CeylanrayTravels Pvt Ltd',
		initials: 'JD',
		image: '/testimonials/lahiru-ceylanray.jpeg',
	},
	{
		id: '3',
		quote:
			'It has been a pleasure doing business with ZGenLabs. Their delivery was smooth, and the team performed exceptionally well, exceeding our expectations at every stage.',
		author: 'Lakindu ',
		position: 'CEO',
		company: 'Vebula',
		initials: 'JD',
		image: '/testimonials/lahiru-ceylanray.jpeg',
	}
];