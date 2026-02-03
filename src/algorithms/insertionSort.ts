import { COLORS } from "../constants";
import type { ArrayElement, SortingStep } from "../types";

export const insertionSort = (arr: ArrayElement[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  const workingArray = arr.map(el => ({ ...el }));

  steps.push(workingArray.map(el => ({ ...el, color: COLORS.UNSORTED })));

  const n = workingArray.length;
  for (let i = 1; i < n; i++) {
    const key = workingArray[i];
    let j = i - 1;
    let selectedIdx = i;

    //highlight key
    steps.push(workingArray.map((el, idx) => ({
      ...el,
      color: idx === i ? COLORS.SELECTED : COLORS.UNSORTED
    })))

    //comparing
    while (j >= 0 && key.value < workingArray[j].value) {
      //highlight comparing
      steps.push(workingArray.map((el, idx) => ({
        ...el,
        color: idx < selectedIdx ? COLORS.SORTED :
          idx === selectedIdx ? COLORS.SELECTED :
            idx === j ? COLORS.COMPARING : COLORS.UNSORTED,
      })));

      //shifting
      workingArray[j + 1] = workingArray[j];
      steps.push(workingArray.map((el, idx) => ({
        ...el,
        color: idx < selectedIdx ? COLORS.SORTED :
          idx === selectedIdx ? COLORS.SELECTED : COLORS.UNSORTED,
      })));


      selectedIdx = j;
      j--;
    }

    workingArray[j + 1] = key;
    steps.push(workingArray.map((el, idx) => ({
      ...el,
      color: idx <= i ? COLORS.SORTED : COLORS.UNSORTED,
    })));

  }

  // final sorted step
  steps.push(workingArray.map(el => ({
    ...el,
    color: COLORS.SORTED,
  })))
  return steps;
};
