import fs from "node:fs";

const input = fs.readFileSync("09_input.txt", "utf8");
const array = input.split("\n");
const ranges = array.map((line) => line.split(",").map(Number));

let largestArea = 0;

for (let i = 0; i < ranges.length - 1; i++) {
	const [x1, y1] = ranges[i];
	for (let j = i + 1; j < ranges.length; j++) {
		const [x2, y2] = ranges[j];
		const distanceX = Math.abs(x1 - x2) + 1;
		const distanceY = Math.abs(y1 - y2) + 1;

		const area = distanceX * distanceY;
		if (area > largestArea) {
			largestArea = area;
		}
	}
}

console.log(largestArea);

/* 4745816424 is correct */
