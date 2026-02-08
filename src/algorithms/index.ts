import type { Algorithm } from "../types";

import { bubbleSort } from "./bubbleSort";
import { insertionSort } from "./insertionSort";
import { mergeSort } from "./mergeSort";

export const algorithms: Algorithm[] = [
	{
		name: "bubble",
		displayName: "Bubble Sort",
		description:
			"Repeatedly compares adjacent elements and swaps them if they are out of order.",
		timeComplexity: {
			best: "O(n)",
			average: "O(n²)",
			worst: "O(n²)",
		},
		spaceComplexity: "O(1)",
		code: `// bubble sort pseudocode
			for i from 0 to n-1:
				for j from 0 to n-i-1:
					if A[j] > A[j+1]:
						swap`,
		sortFunction: bubbleSort,
	},

	{
		name: "insertion",
		displayName: "Insertion Sort",
		description:
			"Builds a sorted prefix by inserting each element into its correct position.",
		timeComplexity: {
			best: "O(n)",
			average: "O(n²)",
			worst: "O(n²)",
		},
		spaceComplexity: "O(1)",
		code: `// insertion sort pseudocode
		for i from 1 to n:
			key = A[i]
			shift larger elements right`,
		sortFunction: insertionSort,
	},

	{
		name: "merge",
		displayName: "Merge Sort",
		description:
			"Divides array into halves, sorts recursively, then merges.",
		timeComplexity: {
			average: "O(n log n)",
			worst: "O(n log n)",
		},
		spaceComplexity: "O(n)",
		code: `// merge sort pseudocode
		split → recurse → merge`,
		sortFunction: mergeSort,
	},
];

export function getAlgorithmByName(name: string) {
	return algorithms.find(a => a.name === name);
}

export function getDefaultAlgorithm() {
	return algorithms[0];
}

export * from "./bubbleSort";
export * from "./insertionSort";

