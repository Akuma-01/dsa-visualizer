import { COLORS } from "../constants";
import type { ArrayElement, SortingStep } from "../types";
import { makeStep } from "./stepBuilder";


export const insertionSort = (arr: ArrayElement[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  const workingArray = arr.map(el => ({ ...el }));

  steps.push(makeStep(workingArray, () => COLORS.UNSORTED));

  const n = workingArray.length;
  for (let i = 1; i < n; i++) {
    const key = workingArray[i];
    let j = i - 1;
    let floatingIdx = i;

    //highlight key
    steps.push(
      makeStep(workingArray, idx =>
        idx === floatingIdx ? COLORS.SELECTED : COLORS.UNSORTED,
        undefined,
        2
      )
    );

    //comparing
    while (j >= 0 && key.value < workingArray[j].value) {
      //highlight comparing
      steps.push(
        makeStep(workingArray, idx =>
          idx < floatingIdx ? COLORS.SORTED :
            idx === floatingIdx ? COLORS.SELECTED :
              idx === j ? COLORS.COMPARING : COLORS.UNSORTED,
          undefined,
          4
        )
      );


      //shifting
      workingArray[j + 1] = workingArray[j];
      steps.push(
        makeStep(workingArray, idx =>
          idx < floatingIdx ? COLORS.SORTED :
            idx === floatingIdx ? COLORS.SELECTED :
              idx === j + 1 ? COLORS.SWAPPING :
                COLORS.UNSORTED,

          undefined,
          5
        )
      );

      floatingIdx = j;
      j--;
    }

    workingArray[j + 1] = key;
    steps.push(
      makeStep(workingArray, idx =>
        idx <= i ? COLORS.SORTED : COLORS.UNSORTED,
        undefined,
        7
      )
    );
  }

  // final sorted step
  steps.push(makeStep(workingArray, () => COLORS.SORTED));

  return steps;
};
