import type { ArrayElement, AuxState, SortingStep } from "../types";

export function makeStep(
	array: ArrayElement[],
	getColor: (idx: number) => string,
	aux?: AuxState,
	line?: number,
	operation?: string,
	description?: string,
	comparisons?: number,
	swaps?: number,
): SortingStep {
	return {
		main: array.map((el, idx) => ({
			...el,
			color: getColor(idx),
		})),
		aux,
		line,
		operation,
		description,
		comparisons,
		swaps,
	};
}
