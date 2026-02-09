import { COLORS } from "../constants";
import type { ArrayElement, SortingStep } from "../types";
import { makeStep } from "./stepBuilder";


function swap(workingArray: ArrayElement[], i: number, j: number) {
	const temp = workingArray[i];
	workingArray[i] = workingArray[j];
	workingArray[j] = temp;
};

const partition = (workingArray: ArrayElement[], low: number, high: number, steps: SortingStep[]): number => {
	steps.push(makeStep(
		workingArray,
		idx => idx >= low && idx <= high ? COLORS.SELECTED : COLORS.UNSORTED,
		undefined,
		1 // partition start
	));

	const pivot = workingArray[high].value;
	//highlighing pivot
	steps.push(makeStep(workingArray, idx =>
		idx === high ? COLORS.PIVOT : COLORS.UNSORTED,
		undefined,
		2
	))

	let i = low - 1;
	for (let j = low; j < high; j++) {
		//highlighting comparison of pivot and curr
		steps.push(makeStep(workingArray, idx =>
			idx === j ? COLORS.COMPARING :
				idx === high ? COLORS.PIVOT :
					COLORS.UNSORTED,
			undefined,
			5
		));

		if (workingArray[j].value < pivot) {
			i++;
			//swapping
			steps.push(makeStep(workingArray, idx =>
				idx === i || idx === j ? COLORS.SWAPPING :
					idx === high ? COLORS.PIVOT : COLORS.UNSORTED,
				undefined, 6
			))

			swap(workingArray, i, j);

			// post-swap frame
			steps.push(makeStep(workingArray, idx =>
				idx === high ? COLORS.PIVOT : COLORS.UNSORTED,
				undefined, 6
			))
		} else {
			steps.push(makeStep(workingArray, idx =>
				idx === j ? COLORS.SELECTED :
					idx === high ? COLORS.PIVOT :
						COLORS.UNSORTED,
				undefined,
				5
			));
		}
	}

	steps.push(makeStep(workingArray, idx =>
		idx === i + 1 || idx === high ? COLORS.SWAPPING : COLORS.UNSORTED,
		undefined, 7
	))

	swap(workingArray, i + 1, high)
	//pivot sorted
	steps.push(makeStep(workingArray, idx =>
		idx === i + 1 ? COLORS.SORTED : COLORS.UNSORTED,
		undefined, 7
	))
	return i + 1;
}

const sort = (workingArray: ArrayElement[], low: number, high: number, steps: SortingStep[]): void => {
	if (low < high) {
		const pi = partition(workingArray, low, high, steps);


		sort(workingArray, low, pi - 1, steps);
		sort(workingArray, pi + 1, high, steps);
	}
}

export const quickSort = (arr: ArrayElement[]): SortingStep[] => {
	const steps: SortingStep[] = [];
	const workingArray: ArrayElement[] = arr.map(el => ({ ...el }))
	steps.push(makeStep(workingArray, () => COLORS.UNSORTED));


	const n = arr.length;
	sort(workingArray, 0, n - 1, steps);

	steps.push(makeStep(workingArray, () => COLORS.SORTED));

	return steps;
}
