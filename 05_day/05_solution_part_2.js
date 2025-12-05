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

for (let i = 0; i < freshAndAvailableIds.length; i++) {
	if (freshAndAvailableIds[i] === undefined) break;
	if (Array.isArray(freshAndAvailableIds[i])) {
		freshIdRanges.push(freshAndAvailableIds[i]);
	}
}

const sorted = freshIdRanges.slice().sort((a, b) => a[0] - b[0]);

mergeRanges(sorted);

let allFreshIds = 0;
for (const range of sorted) {
	if (range === undefined) {
		continue;
	}
	allFreshIds += range[1] - range[0] + 1;
}

function mergeRanges(sortedFreshIdRanges) {
	for (let i = 0; i < sortedFreshIdRanges.length; i++) {
		if (sortedFreshIdRanges[i] === undefined) continue;

		if (sortedFreshIdRanges[i + 1] === undefined) continue;
		const [otherStart, otherEnd] = sortedFreshIdRanges[i + 1];

		if (sortedFreshIdRanges[i][1] >= otherStart) {
			const newStart = Math.min(sortedFreshIdRanges[i][0], otherStart);
			const newEnd = Math.max(sortedFreshIdRanges[i][1], otherEnd);
			sortedFreshIdRanges[i + 1] = [newStart, newEnd];
			sortedFreshIdRanges[i] = undefined;
		}
	}
}

console.log(allFreshIds);

/* 346108529271387 is too high */
/* 345821388687084 is correct */
