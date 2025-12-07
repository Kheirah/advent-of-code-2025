const fs = require("node:fs");

const input = fs.readFileSync("07_input.txt", "utf8");
const array = input.split("\n");
const manifold = array.map((line) => line.split(""));

const startsAt = array[0].indexOf("S");
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
		traverse(row, col - 1);
		traverse(row, col + 1);
	}
	if (manifold[row][col] === ".") {
		manifold[row][col] = "|";
		traverse(row + 1, col);
	}
}

const timelineStructure = new Array(manifold.length)
	.fill(0)
	.map(() => new Array(manifold[0].length).fill(0));
const totalTimelines = followBeams(1, startsAt);

function followBeams(row, col) {
	if (row === undefined || col === undefined) {
		return 0;
	}
	if (row === manifold.length - 1) {
		return 1;
	}
	if (manifold[row][col] === "|") {
		if (timelineStructure[row][col] !== 0) {
			return timelineStructure[row][col];
		}
		const timelines = followBeams(row + 1, col);
		timelineStructure[row][col] = timelines;
		return timelines;
	}
	if (manifold[row][col] === "^") {
		const left = followBeams(row, col - 1);
		const right = followBeams(row, col + 1);
		const sum = left + right;
		timelineStructure[row][col] = sum;
		return sum;
	}
}

console.log(totalTimelines);

/* 187987920774390 is correct */
