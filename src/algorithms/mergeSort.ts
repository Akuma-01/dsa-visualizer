import { COLORS } from "../constants";
import type { ArrayElement, SortingStep } from "../types";
import { makeStep } from "./stepBuilder";

const merge = (
	arr: ArrayElement[],
	left: number,
	mid: number,
	right: number,
	steps: SortingStep[]
) => {

	const L = arr.slice(left, mid + 1);
	const R = arr.slice(mid + 1, right + 1);

	let i = 0;
	let j = 0;
	let k = left;

	while (i < L.length && j < R.length) {

		// compare from buffers
		steps.push(makeStep(
			arr,
			idx =>
				idx < left || idx > right ? COLORS.UNSORTED :
					idx === left + i || idx === mid + 1 + j ? COLORS.COMPARING :
						idx === k ? COLORS.WRITING :
							idx >= left && idx < k ? COLORS.MERGED :
								COLORS.SELECTED,
			{
				left: L.map(x => ({ ...x })),
				right: R.map(x => ({ ...x })),
				leftActive: i,
				rightActive: j,
				writeIndex: k,
			},
			7,
			"COMPARE"
		));

		if (L[i].value <= R[j].value) {
			arr[k++] = { ...L[i++] };
		} else {
			arr[k++] = { ...R[j++] };
		}

		// ⭐ write to main array
		steps.push(makeStep(
			arr,
			idx =>
				idx < left || idx > right ? COLORS.UNSORTED :
					idx >= left && idx < k ? COLORS.MERGED :
						COLORS.SELECTED,
			undefined,
			7,
			"WRITE"
		));
	}


	while (i < L.length) {
		arr[k++] = { ...L[i++] };

		steps.push(makeStep(
			arr,
			idx =>
				idx < left || idx > right ? COLORS.UNSORTED :
					idx >= left && idx < k ? COLORS.MERGED :
						COLORS.SELECTED,
			undefined,
			7,
			"WRITE"
		));
	}


	while (j < R.length) {
		arr[k++] = { ...R[j++] };

		steps.push(makeStep(
			arr,
			idx =>
				idx < left || idx > right ? COLORS.UNSORTED :
					idx >= left && idx < k ? COLORS.MERGED :
						COLORS.SELECTED,
			undefined,
			7,
			"WRITE"
		));
	}

	//  merge segment completed
	steps.push(makeStep(
		arr,
		idx =>
			idx < left || idx > right ? COLORS.UNSORTED : COLORS.MERGED,
		undefined,
		7,
		"MERGE_DONE"
	));
};

const usingMergeSort = (
	arr: ArrayElement[],
	left: number,
	right: number,
	steps: SortingStep[]
) => {
	if (left >= right) return;

	const mid = Math.floor(left + (right - left) / 2);

	steps.push(makeStep(
		arr,
		idx =>
			idx >= left && idx <= right
				? COLORS.SELECTED
				: COLORS.UNSORTED,
		undefined,
		5,
		"SPLIT_LEFT"
	));

	usingMergeSort(arr, left, mid, steps);

	steps.push(makeStep(
		arr,
		idx =>
			idx >= left && idx <= right
				? COLORS.SELECTED
				: COLORS.UNSORTED,
		undefined,
		6,
		"SPLIT_RIGHT"
	));

	usingMergeSort(arr, mid + 1, right, steps);

	merge(arr, left, mid, right, steps);
};

export const mergeSort = (arr: ArrayElement[]): SortingStep[] => {
	const steps: SortingStep[] = [];
	const workingArray = arr.map(el => ({ ...el }));

	steps.push(makeStep(
		workingArray,
		() => COLORS.UNSORTED,
		undefined,
		undefined,
		"START"
	));

	usingMergeSort(workingArray, 0, arr.length - 1, steps);

	steps.push(makeStep(
		workingArray,
		() => COLORS.SORTED,
		undefined,
		undefined,
		"DONE"
	));

	return steps;
};
