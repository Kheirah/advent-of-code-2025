const fs = require("node:fs");

const input = fs.readFileSync("05_input.txt", "utf8");
const array = input.split("\n");
const freshAndAvailableIds = array.map((line) => {
	if (line.length === 0) return;
	if (line.includes("-")) {
		return line.split("-").map(Number);
	}
	return Number.parseInt(line);
});

const freshIdRanges = [];
const availableIds = [];

for (let i = 0; i < freshAndAvailableIds.length; i++) {
	if (freshAndAvailableIds[i] === undefined) continue;
	if (Array.isArray(freshAndAvailableIds[i])) {
		freshIdRanges.push(freshAndAvailableIds[i]);
	}
	if (typeof freshAndAvailableIds[i] === "number") {
		availableIds.push(freshAndAvailableIds[i]);
	}
}

let freshIngredients = 0;

for (const id of availableIds) {
	for (let i = 0; i < freshIdRanges.length; i++) {
		if (freshIdRanges[i][0] <= id && freshIdRanges[i][1] >= id) {
			freshIngredients++;
			break;
		}
	}
}

console.log(freshIngredients);

/* 733 is correct */
