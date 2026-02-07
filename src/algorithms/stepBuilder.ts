import type { ArrayElement, AuxState, SortingStep } from "../types";

export function makeStep(
	array: ArrayElement[],
	getColor: (idx: number) => string,
	aux?: AuxState
): SortingStep {
	return {
		main: array.map((el, idx) => ({
			...el,
			color: getColor(idx),
		})),
		aux,
	};
}
