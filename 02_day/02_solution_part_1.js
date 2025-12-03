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
		if (running.toString().length % 2 === 0) {
			const lefthandStart = Number.parseInt(
				running.toString().slice(0, Math.floor(running.toString().length / 2)),
			);
			const lefthandEnd = Number.parseInt(
				running.toString().slice(Math.floor(running.toString().length / 2)),
			);

			if (lefthandStart === lefthandEnd) {
				const repeated = Number.parseInt(`${lefthandStart}${lefthandStart}`);
				invalidIds.push(repeated);
			}
		}
		running++;
	}
}

const sum = invalidIds.reduce((acc, id) => acc + id, 0);

console.log(sum);

/* 1709204 is too low */
/* 5398419778 is correct */
