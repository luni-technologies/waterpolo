export interface scoreData {
	value: number
	weight: number
}

export function calculateScore(
	data: scoreData[],
	a: number = 0.7,
	b: number = 10,
	c: number = 0.2
) {
	let graph = (x: number) => -b * Math.pow(0.5, a * x + c) + b
	let score = data
		.map((entry) => entry.value * entry.weight)
		.reduce((prev, current) => prev + current)
	return graph(Math.max(0, score))
}
