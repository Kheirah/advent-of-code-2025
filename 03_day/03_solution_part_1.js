const fs = require("node:fs");

const input = fs.readFileSync("03_example.txt", "utf8");
const array = input.split("\n");
const joltages = array.map((line) => line.split("").map(Number));

const output = [];

for (const joltage of joltages) {
	const current = [
		{ index: 0, value: 0 },
		{ index: 0, value: 0 },
	];

	for (let i = 0; i < joltage.length - 1; i++) {
		if (joltage[i] > current[0].value) {
			current[0] = { index: i + 1, value: joltage[i] };
		}
	}

	for (let i = current[0].index; i < joltage.length; i++) {
		if (joltage[i] > current[1].value) {
			current[1] = { index: i, value: joltage[i] };
		}
	}

	const maxJoltage = Number.parseInt(`${current[0].value}${current[1].value}`);
	output.push(maxJoltage);
}

console.log(output.reduce((acc, curr) => acc + curr, 0));

/* 17430 is correct*/
