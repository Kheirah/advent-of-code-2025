const fs = require("node:fs");

const input = fs.readFileSync("04_input.txt", "utf8");
const array = input.split("\n");
const grid = array.map((line) => line.split(""));

let accessible = 0;
let didRemovePaperRolls = false;

do {
	didRemovePaperRolls = false;
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (grid[i][j] === "@") {
				const canRemovePaperRoll = checkNeighbors(i, j);
				accessible += canRemovePaperRoll ? 1 : 0;
				if (canRemovePaperRoll) {
					removePaperRoll(i, j);
				}
			}
		}
	}
} while (didRemovePaperRolls);

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
	return paperRolls < 4;
}

function removePaperRoll(row, col) {
	grid[row][col] = "X";
	didRemovePaperRolls = true;
}

console.log(accessible);

/* 8739 is correct */
