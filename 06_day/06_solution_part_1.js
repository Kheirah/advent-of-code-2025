const fs = require("node:fs");

const input = fs.readFileSync("06_example.txt", "utf8");
const array = input.split("\n");
const lines = array.map((line) => line.split(" ").filter(Boolean));

const results = [];

for (let col = 0; col < lines[0]?.length; col++) {
	const operation = lines.at(-1)[col];
	const numbers = [];
	for (let row = 0; row < lines.length - 1; row++) {
		numbers.push(Number.parseInt(lines[row][col]));
	}
	results.push(calculate(numbers, operation));
}

function calculate(array, symbol) {
	if (symbol === "+") {
		return array.reduce((acc, curr) => acc + curr, 0);
	}
	if (symbol === "*") {
		return array.reduce((acc, curr) => acc * curr, 1);
	}
}

console.log(results.reduce((acc, curr) => acc + curr, 0));

/* 5322004718681 is correct */
