import fs from "node:fs";

const input = fs.readFileSync("08_input.txt", "utf8");
const array = input.split("\n");
const junctionBoxes = array.map((line) => line.split(",").map(Number));

const distances = [];

for (let i = 0; i < junctionBoxes.length - 1; i++) {
	for (let j = i + 1; j < junctionBoxes.length; j++) {
		const xDistance = Math.abs(junctionBoxes[i][0] - junctionBoxes[j][0]) ** 2;
		const yDistance = Math.abs(junctionBoxes[i][1] - junctionBoxes[j][1]) ** 2;
		const zDistance = Math.abs(junctionBoxes[i][2] - junctionBoxes[j][2]) ** 2;
		const distance = Math.sqrt(xDistance + yDistance + zDistance);
		const junction = { j1: junctionBoxes[i], j2: junctionBoxes[j], distance };
		distances.push(junction);
	}
}

const sortedDistances = distances
	.slice()
	.sort((a, b) => a.distance - b.distance);

const size = sortedDistances.slice(0, 1000).length;
const groups = [];
let groupName = 0;

for (let i = 0; i < size; i++) {
	const j1 = sortedDistances[i].j1;
	const j2 = sortedDistances[i].j2;
	const { exists: isJ1InGroup, index: j1Index } = isInGroup(groups, j1);
	const { exists: isJ2InGroup, index: j2Index } = isInGroup(groups, j2);
	if (!isJ1InGroup && !isJ2InGroup) {
		groups.push({ name: `group-${groupName++}`, junctions: [j1, j2] });
	} else {
		if (isJ1InGroup && !isJ2InGroup) {
			groups[j1Index].junctions.push(j2);
		}
		if (isJ2InGroup && !isJ1InGroup) {
			groups[j2Index].junctions.push(j1);
		}
		if (isJ1InGroup && isJ2InGroup) {
			if (j1Index !== j2Index) {
				groups[j1Index].junctions.push(...groups[j2Index].junctions);
				groups.splice(j2Index, 1);
			}
		}
	}
}

function isInGroup(g, [x, y, z]) {
	for (let i = 0; i < g.length; i++) {
		const { junctions } = g[i];
		for (let j = 0; j < junctions.length; j++) {
			const [jx, jy, jz] = junctions[j];
			if (x === jx && y === jy && z === jz) {
				return { exists: true, index: i };
			}
		}
	}
	return { exists: false, index: undefined };
}

console.log(
	groups
		.sort((a, b) => b.junctions.length - a.junctions.length)
		.slice(0, 3)
		.map((g) => g.junctions.length)
		.reduce((acc, curr) => acc * curr, 1),
);

/* 57970 is correct */
