import { COLORS } from '../constants';
import type { ArrayElement, SortingStep } from '../types';
import { makeStep } from "./stepBuilder";


export const bubbleSort = (arr: ArrayElement[]): SortingStep[] => {
	const steps: SortingStep[] = [];
	const workingArray = arr.map(el => ({ ...el }));

	steps.push(makeStep(workingArray, () => COLORS.UNSORTED));

	const n = workingArray.length;
	for (let i = 0; i < n - 1; i++) {
		for (let j = 0; j < n - i - 1; j++) {
			// Highlight elements being compared
			steps.push(
				makeStep(workingArray, idx =>
					idx === j || idx === j + 1 ? COLORS.COMPARING :
						idx >= n - i ? COLORS.SORTED : COLORS.UNSORTED,
					undefined,
					3
				)
			);

			// Compare and swap if needed
			if (workingArray[j].value > workingArray[j + 1].value) {
				[workingArray[j], workingArray[j + 1]] = [workingArray[j + 1], workingArray[j]];

				// Show swap
				steps.push(
					makeStep(workingArray, idx =>
						idx === j || idx === j + 1 ? COLORS.SWAPPING :
							idx >= n - i ? COLORS.SORTED : COLORS.UNSORTED,
						undefined,
						4
					)
				);
			}
		}

		// Mark last element as sorted
		steps.push(
			makeStep(workingArray, idx =>
				idx >= n - i - 1 ? COLORS.SORTED : COLORS.UNSORTED
			)
		);
	}

	steps.push(makeStep(workingArray, () => COLORS.SORTED));
	return steps;
};
