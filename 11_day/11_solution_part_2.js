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

const visited = new Map();
const count = traverse("svr", false, false);

function traverse(current, hasDac, hasFft) {
	const key = `${current}-${hasDac}-${hasFft}`;
	if (visited.has(key)) {
		return visited.get(key);
	}

	const hasDacNow = hasDac || current === "dac";
	const hasFftNow = hasFft || current === "fft";

	if (paths[current].includes("out")) {
		if (hasDacNow && hasFftNow) {
			return 1;
		}
		return 0;
	}
	let validOuts = 0;
	for (const path of paths[current]) {
		validOuts += traverse(path, hasDacNow, hasFftNow);
	}
	visited.set(key, validOuts);
	return validOuts;
}

console.log(count);

/* 331468292364745 is correct */
