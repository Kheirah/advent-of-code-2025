const fs = require("node:fs");

const input = fs.readFileSync("07_input.txt", "utf8");
const array = input.split("\n");
const manifold = array.map((line) => line.split(""));

const startsAt = array[0].indexOf("S");
let splits = 0;
traverse(1, startsAt);

function traverse(row, col) {
	if (row === undefined || col === undefined) {
		return;
	}
	if (row === manifold.length) {
		return;
	}
	if (manifold[row][col] === "|") {
		return;
	}
	if (manifold[row][col] === "^") {
		if (manifold[row][col - 1] === "." || manifold[row][col + 1] === ".") {
			splits++;
		}
		traverse(row, col - 1);
		traverse(row, col + 1);
	}
	if (manifold[row][col] === ".") {
		manifold[row][col] = "|";
		traverse(row + 1, col);
	}
}

console.log(splits);

/* 1675 is correct */
