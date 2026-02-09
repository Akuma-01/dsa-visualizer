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
	steps: SortingStep[]
): number => {

	// partition window highlight
	steps.push(makeStep(
		workingArray,
		idx => idx >= low && idx <= high ? COLORS.SELECTED : COLORS.UNSORTED,
		undefined,
		1,
		"PARTITION_RANGE"
	));

	const pivot = workingArray[high].value;

	// pivot select
	steps.push(makeStep(
		workingArray,
		idx => idx === high ? COLORS.PIVOT : COLORS.UNSORTED,
		undefined,
		2,
		"PIVOT"
	));

	let i = low - 1;

	for (let j = low; j < high; j++) {

		//  compare with pivot
		steps.push(makeStep(
			workingArray,
			idx =>
				idx === j ? COLORS.COMPARING :
					idx === high ? COLORS.PIVOT :
						COLORS.UNSORTED,
			undefined,
			5,
			"COMPARE"
		));

		if (workingArray[j].value < pivot) {
			i++;

			// swap inside partition
			steps.push(makeStep(
				workingArray,
				idx =>
					idx === i || idx === j ? COLORS.SWAPPING :
						idx === high ? COLORS.PIVOT :
							COLORS.UNSORTED,
				undefined,
				6,
				"SWAP"
			));

			swap(workingArray, i, j);

			// post swap frame
			steps.push(makeStep(
				workingArray,
				idx => idx === high ? COLORS.PIVOT : COLORS.UNSORTED,
				undefined,
				6,
				"SWAP_DONE"
			));

		} else {

			// no-swap branch visual
			steps.push(makeStep(
				workingArray,
				idx =>
					idx === j ? COLORS.SELECTED :
						idx === high ? COLORS.PIVOT :
							COLORS.UNSORTED,
				undefined,
				5,
				"SKIP"
			));
		}
	}

	//  final pivot swap
	steps.push(makeStep(
		workingArray,
		idx =>
			idx === i + 1 || idx === high ? COLORS.SWAPPING : COLORS.UNSORTED,
		undefined,
		7,
		"PIVOT_SWAP"
	));

	swap(workingArray, i + 1, high);

	// pivot placed
	steps.push(makeStep(
		workingArray,
		idx => idx === i + 1 ? COLORS.SORTED : COLORS.UNSORTED,
		undefined,
		7,
		"PIVOT_PLACED"
	));

	return i + 1;
};

const sort = (
	workingArray: ArrayElement[],
	low: number,
	high: number,
	steps: SortingStep[]
): void => {

	if (low < high) {
		const pi = partition(workingArray, low, high, steps);

		sort(workingArray, low, pi - 1, steps);
		sort(workingArray, pi + 1, high, steps);
	}
};

export const quickSort = (arr: ArrayElement[]): SortingStep[] => {
	const steps: SortingStep[] = [];
	const workingArray = arr.map(el => ({ ...el }));

	// ⭐ start frame
	steps.push(makeStep(
		workingArray,
		() => COLORS.UNSORTED,
		undefined,
		undefined,
		"START" // ⭐ ADDED
	));

	sort(workingArray, 0, arr.length - 1, steps);

	// ⭐ final sorted frame
	steps.push(makeStep(
		workingArray,
		() => COLORS.SORTED,
		undefined,
		undefined,
		"DONE" // ⭐ ADDED
	));

	return steps;
};
