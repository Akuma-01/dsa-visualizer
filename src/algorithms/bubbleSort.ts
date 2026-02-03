import { COLORS } from '../constants';
import type { ArrayElement, SortingStep } from '../types';

export const bubbleSort = (arr: ArrayElement[]): SortingStep[] => {
	const steps: SortingStep[] = [];
	const workingArray = arr.map(el => ({ ...el }));

	steps.push(workingArray.map(el => ({ ...el, color: COLORS.UNSORTED })));

	const n = workingArray.length;
	for (let i = 0; i < n - 1; i++) {
		for (let j = 0; j < n - i - 1; j++) {
			// Highlight elements being compared
			const compareStep = workingArray.map((el, idx) => ({
				...el,
				color: idx === j || idx === j + 1 ? COLORS.COMPARING :
					idx >= n - i ? COLORS.SORTED : COLORS.UNSORTED
			}));
			steps.push(compareStep);

			// Compare and swap if needed
			if (workingArray[j].value > workingArray[j + 1].value) {
				[workingArray[j], workingArray[j + 1]] = [workingArray[j + 1], workingArray[j]];

				// Show swap
				const swapStep = workingArray.map((el, idx) => ({
					...el,
					color: idx === j || idx === j + 1 ? COLORS.SWAPPING :
						idx >= n - i ? COLORS.SORTED : COLORS.UNSORTED
				}));
				steps.push(swapStep);
			}
		}

		// Mark last element as sorted
		const sortedStep = workingArray.map((el, idx) => ({
			...el,
			color: idx >= n - i - 1 ? COLORS.SORTED : COLORS.UNSORTED
		}));
		steps.push(sortedStep);
	}

	steps.push(workingArray.map(el => ({ ...el, color: COLORS.SORTED })));
	return steps;
};
