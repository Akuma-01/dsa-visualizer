import { COLORS } from "../constants";
import type { ArrayElement, SortingStep } from "../types";
import { makeStep } from "./stepBuilder";

function swap(workingArray: ArrayElement[], i: number, j: number) {
	const temp = workingArray[i];
	workingArray[i] = workingArray[j];
	workingArray[j] = temp;
}

const partition = (
	workingArray: ArrayElement[],
	low: number,
	high: number,
	steps: SortingStep[],
	counters: { comparisons: number; swaps: number }
): number => {
	const pivot = workingArray[high].value;

	steps.push(makeStep(workingArray,
		idx => idx >= low && idx <= high ? COLORS.SELECTED : COLORS.UNSORTED,
		undefined, 1, "PARTITION_RANGE",
		`Partitioning subarray [${low}..${high}].`,
		counters.comparisons, counters.swaps
	));

	steps.push(makeStep(workingArray,
		idx => idx === high ? COLORS.PIVOT : COLORS.UNSORTED,
		undefined, 2, "PIVOT",
		`Pivot selected: ${pivot} at index ${high}.`,
		counters.comparisons, counters.swaps
	));

	let i = low - 1;

	for (let j = low; j < high; j++) {
		counters.comparisons++;
		const curr = workingArray[j].value;

		steps.push(makeStep(workingArray,
			idx =>
				idx === j ? COLORS.COMPARING :
					idx === high ? COLORS.PIVOT : COLORS.UNSORTED,
			undefined, 5, "COMPARE",
			`Comparing ${curr} with pivot ${pivot} — ${curr < pivot ? `${curr} < pivot, will swap to left side.` : `${curr} >= pivot, stays right.`}`,
			counters.comparisons, counters.swaps
		));

		if (workingArray[j].value < pivot) {
			i++;
			counters.swaps++;

			steps.push(makeStep(workingArray,
				idx =>
					idx === i || idx === j ? COLORS.SWAPPING :
						idx === high ? COLORS.PIVOT : COLORS.UNSORTED,
				undefined, 6, "SWAP",
				`Swapping ${workingArray[i].value} (i=${i}) and ${workingArray[j].value} (j=${j}).`,
				counters.comparisons, counters.swaps
			));

			swap(workingArray, i, j);

			steps.push(makeStep(workingArray,
				idx => idx === high ? COLORS.PIVOT : COLORS.UNSORTED,
				undefined, 6, "SWAP_DONE",
				`Swap done — elements smaller than pivot gathered on the left.`,
				counters.comparisons, counters.swaps
			));
		} else {
			steps.push(makeStep(workingArray,
				idx =>
					idx === j ? COLORS.SELECTED :
						idx === high ? COLORS.PIVOT : COLORS.UNSORTED,
				undefined, 5, "SKIP",
				`${curr} >= pivot ${pivot} — no swap needed.`,
				counters.comparisons, counters.swaps
			));
		}
	}

	counters.swaps++;
	steps.push(makeStep(workingArray,
		idx => idx === i + 1 || idx === high ? COLORS.SWAPPING : COLORS.UNSORTED,
		undefined, 7, "PIVOT_SWAP",
		`Placing pivot ${pivot} into its final position at index ${i + 1}.`,
		counters.comparisons, counters.swaps
	));

	swap(workingArray, i + 1, high);

	steps.push(makeStep(workingArray,
		idx => idx === i + 1 ? COLORS.SORTED : COLORS.UNSORTED,
		undefined, 7, "PIVOT_PLACED",
		`Pivot ${pivot} is now at index ${i + 1} — its final sorted position.`,
		counters.comparisons, counters.swaps
	));

	return i + 1;
};

const sort = (
	workingArray: ArrayElement[],
	low: number,
	high: number,
	steps: SortingStep[],
	counters: { comparisons: number; swaps: number }
): void => {
	if (low < high) {
		const pi = partition(workingArray, low, high, steps, counters);
		sort(workingArray, low, pi - 1, steps, counters);
		sort(workingArray, pi + 1, high, steps, counters);
	}
};

export const quickSort = (arr: ArrayElement[]): SortingStep[] => {
	const steps: SortingStep[] = [];
	const workingArray = arr.map(el => ({ ...el }));
	const counters = { comparisons: 0, swaps: 0 };

	steps.push(makeStep(workingArray, () => COLORS.UNSORTED, undefined, undefined, "START",
		"Starting Quick Sort — selecting pivots to partition the array.", 0, 0));

	sort(workingArray, 0, arr.length - 1, steps, counters);

	steps.push(makeStep(workingArray, () => COLORS.SORTED, undefined, undefined, "DONE",
		`Sorted! Total: ${counters.comparisons} comparisons, ${counters.swaps} swaps.`,
		counters.comparisons, counters.swaps));

	return steps;
};
