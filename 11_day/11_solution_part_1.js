import fs from "node:fs";

const input = fs.readFileSync("11_input.txt", "utf8");
const array = input.split("\n");
const paths = array
	.map((line) => {
		const [from, to] = line.split(": ");
		const toArray = to.split(" ");
		return [from, toArray];
	})
	.reduce((acc, curr) => {
		acc[curr[0]] = curr[1];
		return acc;
	}, {});

const distinctRoutesToOut = new Set();
traverse("you", "");

function traverse(current, totalPath) {
	if (paths[current].includes("out")) {
		distinctRoutesToOut.add(`${totalPath}-${current}-out`);
		return;
	}

	for (const path of paths[current]) {
		traverse(path, `${totalPath}-${current}`);
	}
	return;
}

console.log(distinctRoutesToOut.size);

/* 428 is correct */
