export interface Partner {
	id: string;
	name: string;
	logo: string;
	width: number;
	height: number;
}

export const partners: Partner[] = [
	{
		id: "cabeska",
		name: "Cabeska Group",
		logo: "/partners/cabeska.webp",
		width: 320,
		height: 68,
	},
	{
		id: "ceylanray",
		name: "Ceylanray Travels",
		logo: "/partners/ceylanray.webp",
		width: 180,
		height: 78,
	},
	{
		id: "shako",
		name: "Shako",
		logo: "/partners/shako.png",
		width: 230,
		height: 74,
	},
	{
		id: "vebula",
		name: "Vebula",
		logo: "/partners/vebula.svg",
		width: 180,
		height: 54,
	},
  {
		id: "Salford",
		name: "Salford",
		logo: "/partners/salford.png",
		width: 520,
		height: 130,
	},
];
