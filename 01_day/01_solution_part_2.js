const fs = require("node:fs");

const input = fs.readFileSync("01_input.txt", "utf8");
const array = input.split("\n");
const pairs = array.map((line) => {
	const rotation = line[0];
	const distance = Number.parseInt(line.slice(1));
	return rotation === "R" ? distance : -distance;
});
let position = 50;
let secret = 0;

for (const pair of pairs) {
	const dist = Math.abs(pair);

	// full rotations
	secret += Math.floor(dist / 100);

	// remaining partial rotation
	const remainder = dist % 100;

	if (pair > 0) {
		if (position + remainder >= 100) {
			secret++;
		}
	} else {
		// edge case: check that we didn't start at 0
		if (position > 0 && remainder >= position) {
			secret++;
		}
	}

	position = (position + pair) % 100;
	if (position < 0) position += 100;
}

console.log(secret);

/* 6357 is too low */
/* 6612 is too low */
/* 7073 is too high */
/* 6634 is correct */
