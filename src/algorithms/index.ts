import type { Algorithm } from "../types";

import { bubbleSort } from "./bubbleSort";
import { insertionSort } from "./insertionSort";
import { mergeSort } from "./mergeSort";
import { quickSort } from "./quickSort";

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
		code:
			`BUBBLE SORT
for i = 0 to n-2
  for j = 0 to n-i-2
	if arr[j] > arr[j+1]
	  swap arr[j] and arr[j+1]`,
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
		code: `INSERTION SORT
for i = 1 to n-1
  key = arr[i]
  j = i - 1
  while j >= 0 AND arr[j] > key
    arr[j+1] = arr[j]
    j--
  arr[j+1] = key`,
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
		code: `MERGE SORT
mergeSort(left, right):
  if left >= right
    return
  mid = (left + right) / 2
  mergeSort(left, mid)
  mergeSort(mid+1, right)
  merge(left, mid, right)`,
		sortFunction: mergeSort,
	},
	{
		name: "quick",
		displayName: "Quick Sort",
		description:
			"Partitions around a pivot and recursively sorts left and right subarrays.",
		timeComplexity: {
			average: "O(n log n)",
			worst: "O(n²)",
		},
		spaceComplexity: "O(n)",
		code: `QUICK SORT
partition(low, high):
pivot = arr[high]
i = low - 1
for j = low to high-1
if arr[j] < pivot
swap(arr[i], arr[j])
swap(arr[i+1], arr[high])`,
		sortFunction: quickSort,
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

