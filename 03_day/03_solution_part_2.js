const fs = require("node:fs");

const input = fs.readFileSync("03_input.txt", "utf8");
const array = input.split("\n");
const joltages = array.map((line) => line.split("").map(Number));

const MAX_BATTERIES = 12;
const megaPack = [];

for (const joltage of joltages) {
	let current = Array(MAX_BATTERIES).fill(0);

	for (let i = 0; i < joltage.length; i++) {
		const remainingBatteries = joltage.length - i;
		const startIndexOfMegaPack = Math.max(
			0,
			MAX_BATTERIES - remainingBatteries,
		);

		for (let j = startIndexOfMegaPack; j < MAX_BATTERIES; j++) {
			const isHigher = joltage[i] > current[j];

			if (isHigher) {
				current[j] = joltage[i];
				current = current.map((value, index) => (index > j ? 0 : value));
				break;
			}
		}
	}

	const maxJoltage = Number.parseInt(current.join(""));
	megaPack.push(maxJoltage);
}

console.log(megaPack.reduce((acc, curr) => acc + curr, 0));

/* 172430997555800 is too high */
/* 171975854269367 is correct */
