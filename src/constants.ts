// src/constants.ts - Shared constants and configurations

// src/constants.ts - Shared constants and configurations
import type { ColorLegendItem } from './types';

// Color constants for visualization
export const COLORS = {
	UNSORTED: '#1e293b',
	COMPARING: '#ef4444',
	SWAPPING: '#f59e0b',
	SORTED: '#22c55e',
	PIVOT: '#8b5cf6',
	SELECTED: '#06b6d4',
	WRITING: "#eab308",
	MERGED: "#10b981",
} as const;

// Base color legend (common to all algorithms)
export const BASE_COLOR_LEGEND: ColorLegendItem[] = [
	{
		color: COLORS.UNSORTED,
		label: 'Unsorted',
		description: 'Elements not yet sorted',
	},
	{
		color: COLORS.COMPARING,
		label: 'Comparing',
		description: 'Elements being compared',
	},
	{
		color: COLORS.SWAPPING,
		label: 'Swapping',
		description: 'Elements being swapped',
	},
	{
		color: COLORS.SORTED,
		label: 'Sorted',
		description: 'Elements in final position',
	},
];

// Additional color legend items for specific algorithms
export const PIVOT_COLOR_LEGEND: ColorLegendItem = {
	color: COLORS.PIVOT,
	label: 'Pivot',
	description: 'Pivot element',
};

export const SELECTED_COLOR_LEGEND: ColorLegendItem = {
	color: COLORS.SELECTED,
	label: 'Selected',
	description: 'Currently selected element',
};

// Default configuration
export const DEFAULT_CONFIG = {
	MIN_ARRAY_SIZE: 5,
	MAX_ARRAY_SIZE: 50,
	DEFAULT_ARRAY_SIZE: 10,
	MIN_VALUE: 10,
	MAX_VALUE: 100,
	DEFAULT_SPEED: 100,
	MIN_SPEED: 1,
	MAX_SPEED: 100,
} as const;


export const ALGORITHM_INFO = {
	bubble: {
		name: "Bubble Sort",
		description:
			"Repeatedly compares adjacent elements and swaps them if they are in the wrong order.",
		time: {
			best: "O(n)",
			average: "O(n²)",
			worst: "O(n²)",
		},
		space: "O(1)",
		invariant:
			"After each pass, the largest unsorted element bubbles to its final position.",
	},

	insertion: {
		name: "Insertion Sort",
		description:
			"Builds a sorted prefix by inserting each element into its correct position.",
		time: {
			best: "O(n)",
			average: "O(n²)",
			worst: "O(n²)",
		},
		space: "O(1)",
		invariant:
			"At every step, the left portion of the array remains sorted.",
	},

	merge: {
		name: "Merge Sort",
		description:
			"Divides the array into halves, recursively sorts them, and merges the results.",
		time: {
			best: "O(n log n)",
			average: "O(n log n)",
			worst: "O(n log n)",
		},
		space: "O(n)",
		invariant:
			"Merging always produces a sorted subarray from two sorted halves.",
	},
};
