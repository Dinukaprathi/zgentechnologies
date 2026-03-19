export interface TeamMember {
	id: string;
	name: string;
	position: string;
	image: string;
}

export const teamMembers: TeamMember[] = [
	{
		id: "001",
		name: "Pasindu Palinda ",
		position: "FOUNDER",
		image: "/team/founder-palinda.jpeg",
	},
	{
		id: "002",
		name: "Sarada Rathmalgoda",
		position: "CO-FOUNDER",
		image: "/team/co-founder.jpeg",
	},
	{
		id: "003",
		name: "Dinuka Prathiraja",
		position: "CO-FOUNDER",
		image: "/team/co-founder-2.jpeg",
	},
];
