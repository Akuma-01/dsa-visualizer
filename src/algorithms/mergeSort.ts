import { COLORS } from "../constants";
import type { ArrayElement, SortingStep } from "../types";
import { makeStep } from "./stepBuilder";

const merge = (
	arr: ArrayElement[],
	left: number,
	mid: number,
	right: number,
	steps: SortingStep[],
	counters: { comparisons: number; swaps: number }
) => {
	const L = arr.slice(left, mid + 1);
	const R = arr.slice(mid + 1, right + 1);

	let i = 0, j = 0, k = left;

	while (i < L.length && j < R.length) {
		counters.comparisons++;
		const lv = L[i].value, rv = R[j].value;

		steps.push(makeStep(arr,
			idx =>
				idx < left || idx > right ? COLORS.UNSORTED :
					idx === left + i || idx === mid + 1 + j ? COLORS.COMPARING :
						idx === k ? COLORS.WRITING :
							idx >= left && idx < k ? COLORS.MERGED : COLORS.SELECTED,
			{ left: L.map(x => ({ ...x })), right: R.map(x => ({ ...x })), leftActive: i, rightActive: j, writeIndex: k },
			7, "COMPARE",
			`Comparing left[${i}]=${lv} and right[${j}]=${rv} — writing ${Math.min(lv, rv)} to position ${k}.`,
			counters.comparisons, counters.swaps
		));

		if (L[i].value <= R[j].value) {
			arr[k++] = { ...L[i++] };
		} else {
			arr[k++] = { ...R[j++] };
		}

		steps.push(makeStep(arr,
			idx =>
				idx < left || idx > right ? COLORS.UNSORTED :
					idx >= left && idx < k ? COLORS.MERGED : COLORS.SELECTED,
			undefined, 7, "WRITE",
			`Wrote value to position ${k - 1}.`,
			counters.comparisons, counters.swaps
		));
	}

	while (i < L.length) {
		arr[k++] = { ...L[i++] };
		steps.push(makeStep(arr,
			idx =>
				idx < left || idx > right ? COLORS.UNSORTED :
					idx >= left && idx < k ? COLORS.MERGED : COLORS.SELECTED,
			undefined, 7, "WRITE",
			`Copying remaining left element to position ${k - 1}.`,
			counters.comparisons, counters.swaps
		));
	}

	while (j < R.length) {
		arr[k++] = { ...R[j++] };
		steps.push(makeStep(arr,
			idx =>
				idx < left || idx > right ? COLORS.UNSORTED :
					idx >= left && idx < k ? COLORS.MERGED : COLORS.SELECTED,
			undefined, 7, "WRITE",
			`Copying remaining right element to position ${k - 1}.`,
			counters.comparisons, counters.swaps
		));
	}

	steps.push(makeStep(arr,
		idx => idx < left || idx > right ? COLORS.UNSORTED : COLORS.MERGED,
		undefined, 7, "MERGE_DONE",
		`Merged subarray [${left}..${right}] — ${right - left + 1} elements now sorted.`,
		counters.comparisons, counters.swaps
	));
};

const usingMergeSort = (
	arr: ArrayElement[],
	left: number,
	right: number,
	steps: SortingStep[],
	counters: { comparisons: number; swaps: number }
) => {
	if (left >= right) return;
	const mid = Math.floor(left + (right - left) / 2);

	steps.push(makeStep(arr,
		idx => idx >= left && idx <= right ? COLORS.SELECTED : COLORS.UNSORTED,
		undefined, 5, "SPLIT_LEFT",
		`Splitting [${left}..${right}] — recursing into left half [${left}..${mid}].`,
		counters.comparisons, counters.swaps
	));

	usingMergeSort(arr, left, mid, steps, counters);

	steps.push(makeStep(arr,
		idx => idx >= left && idx <= right ? COLORS.SELECTED : COLORS.UNSORTED,
		undefined, 6, "SPLIT_RIGHT",
		`Left half sorted — recursing into right half [${mid + 1}..${right}].`,
		counters.comparisons, counters.swaps
	));

	usingMergeSort(arr, mid + 1, right, steps, counters);

	merge(arr, left, mid, right, steps, counters);
};

export const mergeSort = (arr: ArrayElement[]): SortingStep[] => {
	const steps: SortingStep[] = [];
	const workingArray = arr.map(el => ({ ...el }));
	const counters = { comparisons: 0, swaps: 0 };

	steps.push(makeStep(workingArray, () => COLORS.UNSORTED, undefined, undefined, "START",
		"Starting Merge Sort — recursively dividing the array into halves.", 0, 0));

	usingMergeSort(workingArray, 0, arr.length - 1, steps, counters);

	steps.push(makeStep(workingArray, () => COLORS.SORTED, undefined, undefined, "DONE",
		`Sorted! Total: ${counters.comparisons} comparisons.`, counters.comparisons, counters.swaps));

	return steps;
};
