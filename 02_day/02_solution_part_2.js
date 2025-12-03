const fs = require("node:fs");

const input = fs.readFileSync("02_input.txt", "utf8");
const array = input.split(",");
const ranges = array.map((line) => {
	const [start, end] = line.trim().split("-");
	return [Number.parseInt(start), Number.parseInt(end)];
});

const invalidIds = [];

for (const range of ranges) {
	const [start, end] = range;
	let running = start;
	while (running <= end) {
		if (isInvalidId(running.toString())) {
			invalidIds.push(running);
		}
		running++;
	}
}

function isInvalidId(number) {
	let pattern = "";
	let index = 0;
	for (let i = 0; i < number.length; i++) {
		if (number[i] !== pattern[index]) {
			if (number[i] === pattern[0]) {
				pattern = number.slice(0, i);
				index = 1;
			} else {
				pattern = number.slice(0, i + 1);
				index = 0;
			}
			continue;
		}
		if (number[i] === pattern[index]) {
			index = (index + 1) % pattern.length;
		}
	}
	return pattern.length < number.length && index === 0;
}

const sum = invalidIds.reduce((acc, id) => acc + id, 0);

console.log(sum);

/* 15451850241 is too low */
/* 15704845910 is correct */
