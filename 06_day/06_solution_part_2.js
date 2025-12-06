const fs = require("node:fs");

const input = fs.readFileSync("06_input.txt", "utf8");
const array = input.split("\n");

const results = [];
const size = array.length - 1;
let operation = array.at(-1)[0];

const firstLine = array[0];
const problemSet = [];

for (let i = 0; i < firstLine.length; i++) {
	let number = "";
	let emptyCount = 0;
	for (let j = 0; j < size; j++) {
		const current = array[j][i].trim();
		number += current;
		if (!current) emptyCount++;
	}
	if (number) {
		problemSet.push(Number.parseInt(number));
	}
	if (emptyCount === size || i === firstLine.length - 1) {
		results.push(calculate(problemSet, operation));
		operation = array.at(-1)[i + 1];
		problemSet.length = 0;
	}
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

/* 9876636978528 is correct */
