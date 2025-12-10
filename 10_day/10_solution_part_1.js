import fs from "node:fs";

const input = fs.readFileSync("10_input.txt", "utf8");
const array = input.split("\n");
const machines = array.map((line) => line.split(" "));

const lights = machines.map((machine) => {
	const lightString = machine[0];
	return lightString
		.slice(1, -1)
		.split("")
		.map((char) => (char === "." ? 0 : 1));
});
const buttons = machines.map((machine) =>
	machine
		.filter((_, i, arr) => i !== 0 && i !== arr.length - 1)
		.map((button) => {
			return button
				.slice(1, -1)
				.split(",")
				.map((num) => parseInt(num, 10));
		}),
);

function toggleLights(currentState, buttonIndices) {
	const newState = [...currentState];
	for (const index of buttonIndices) {
		newState[index] = newState[index] ^ 1;
	}
	return newState;
}

function stateToString(state) {
	return state.join(",");
}

function findMinimumButtons(targetState, availableButtons) {
	const initialState = new Array(targetState.length).fill(0);
	const targetString = stateToString(targetState);

	if (targetString === stateToString(initialState)) {
		return 0;
	}

	const queue = [[initialState, 0]]; // [state, buttonCount]
	const visited = new Set([stateToString(initialState)]);

	while (queue.length > 0) {
		const [currentState, buttonCount] = queue.shift();

		for (let i = 0; i < availableButtons.length; i++) {
			const newState = toggleLights(currentState, availableButtons[i]);
			const newStateString = stateToString(newState);

			if (newStateString === targetString) {
				return buttonCount + 1;
			}

			if (!visited.has(newStateString)) {
				visited.add(newStateString);
				queue.push([newState, buttonCount + 1]);
			}
		}
	}

	return -1;
}

let total = 0;
for (let i = 0; i < lights.length; i++) {
	const minButtons = findMinimumButtons(lights[i], buttons[i]);
	total += minButtons;
}

console.log(total);

/* 375 is correct */
