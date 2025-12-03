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
	position = (position + pair) % 100;
	if (position < 0) position += 100;

	if (position === 0) {
		secret++;
	}
}

console.log(secret);

/* 1141 is correct */
