const fs = require("node:fs");

const input = fs.readFileSync("04_input.txt", "utf8");
const array = input.split("\n");
const grid = array.map((line) => line.split(""));

let accessible = 0;

for (let i = 0; i < grid.length; i++) {
	for (let j = 0; j < grid[i].length; j++) {
		if (grid[i][j] === "@") {
			accessible += checkNeighbors(i, j);
		}
	}
}

function checkNeighbors(row, col) {
	let paperRolls = 0;
	if (grid[row - 1]?.[col - 1] === "@") {
		paperRolls++;
	}
	if (grid[row - 1]?.[col] === "@") {
		paperRolls++;
	}
	if (grid[row - 1]?.[col + 1] === "@") {
		paperRolls++;
	}
	if (grid[row]?.[col - 1] === "@") {
		paperRolls++;
	}
	if (grid[row]?.[col + 1] === "@") {
		paperRolls++;
	}
	if (grid[row + 1]?.[col - 1] === "@") {
		paperRolls++;
	}
	if (grid[row + 1]?.[col] === "@") {
		paperRolls++;
	}
	if (grid[row + 1]?.[col + 1] === "@") {
		paperRolls++;
	}
	return paperRolls < 4 ? 1 : 0;
}

console.log(accessible);

/* 1419 is correct */
