import { COLORS } from '../constants';
import type { ArrayElement, SortingStep } from '../types';
import { makeStep } from "./stepBuilder";

export const bubbleSort = (arr: ArrayElement[]): SortingStep[] => {
	const steps: SortingStep[] = [];
	const workingArray = arr.map(el => ({ ...el }));
	let comparisons = 0;
	let swaps = 0;

	steps.push(makeStep(workingArray, () => COLORS.UNSORTED, undefined, undefined, "START",
		"Starting Bubble Sort — scanning for adjacent pairs to swap.", comparisons, swaps));

	const n = workingArray.length;
	for (let i = 0; i < n - 1; i++) {
		for (let j = 0; j < n - i - 1; j++) {
			comparisons++;
			const a = workingArray[j].value;
			const b = workingArray[j + 1].value;

			steps.push(
				makeStep(workingArray, idx =>
					idx === j || idx === j + 1 ? COLORS.COMPARING :
						idx >= n - i ? COLORS.SORTED : COLORS.UNSORTED,
					undefined, 3, "COMPARE",
					`Comparing ${a} and ${b} — ${a > b ? "out of order, will swap." : "already in order, no swap."}`,
					comparisons, swaps
				)
			);

			if (workingArray[j].value > workingArray[j + 1].value) {
				[workingArray[j], workingArray[j + 1]] = [workingArray[j + 1], workingArray[j]];
				swaps++;

				steps.push(
					makeStep(workingArray, idx =>
						idx === j || idx === j + 1 ? COLORS.SWAPPING :
							idx >= n - i ? COLORS.SORTED : COLORS.UNSORTED,
						undefined, 4, "SWAP",
						`Swapped ${b} and ${a} — ${b} moved left.`,
						comparisons, swaps
					)
				);
			}
		}

		steps.push(
			makeStep(workingArray, idx =>
				idx >= n - i - 1 ? COLORS.SORTED : COLORS.UNSORTED,
				undefined, undefined, "PASS_DONE",
				`Pass ${i + 1} complete — ${workingArray[n - i - 1].value} is now in its final position.`,
				comparisons, swaps
			)
		);
	}

	steps.push(makeStep(workingArray, () => COLORS.SORTED, undefined, undefined, "DONE",
		`Sorted! Total: ${comparisons} comparisons, ${swaps} swaps.`, comparisons, swaps));
	return steps;
};
