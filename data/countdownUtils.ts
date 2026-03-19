export interface CountdownStat {
	target: number;
	suffix: string;
	label: string;
}

export const countdownStats: CountdownStat[] = [
	{ target: 5, suffix: "", label: "Projects Completed" },
	{ target: 10, suffix: "+", label: "Global Partners" },
	{ target: 1, suffix: "", label: "Excellence Awards" },
	{ target: 50, suffix: "+", label: "Technologies we use" },
];
