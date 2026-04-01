import { COLORS } from "../constants";
import type { ArrayElement, SortingStep } from "../types";
import { makeStep } from "./stepBuilder";

export const insertionSort = (arr: ArrayElement[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  const workingArray = arr.map(el => ({ ...el }));
  let comparisons = 0;
  let swaps = 0;

  steps.push(makeStep(workingArray, () => COLORS.UNSORTED, undefined, undefined, "START",
    "Starting Insertion Sort — building a sorted prefix one element at a time.", comparisons, swaps));

  const n = workingArray.length;

  for (let i = 1; i < n; i++) {
    const key = workingArray[i];
    let j = i - 1;
    let floatingIdx = i;

    steps.push(
      makeStep(workingArray, idx => idx === floatingIdx ? COLORS.SELECTED : COLORS.UNSORTED,
        undefined, 2, "SELECT_KEY",
        `Picking key = ${key.value} at index ${i} to insert into sorted prefix.`,
        comparisons, swaps)
    );

    while (j >= 0 && key.value < workingArray[j].value) {
      comparisons++;
      const compared = workingArray[j].value;

      steps.push(
        makeStep(workingArray,
          idx =>
            idx < floatingIdx ? COLORS.SORTED :
              idx === floatingIdx ? COLORS.SELECTED :
                idx === j ? COLORS.COMPARING : COLORS.UNSORTED,
          undefined, 4, "COMPARE",
          `Comparing key ${key.value} < ${compared} — shifting ${compared} right.`,
          comparisons, swaps)
      );

      workingArray[j + 1] = workingArray[j];
      swaps++;

      steps.push(
        makeStep(workingArray,
          idx =>
            idx < floatingIdx ? COLORS.SORTED :
              idx === floatingIdx ? COLORS.SELECTED :
                idx === j + 1 ? COLORS.SWAPPING : COLORS.UNSORTED,
          undefined, 5, "SHIFT",
          `Shifted ${compared} from index ${j} to index ${j + 1}.`,
          comparisons, swaps)
      );

      floatingIdx = j;
      j--;

      steps.push(
        makeStep(workingArray,
          idx => idx === floatingIdx ? COLORS.SELECTED : COLORS.UNSORTED,
          undefined, 6, "DECREMENT_J",
          `Moving left — checking next element in sorted prefix.`,
          comparisons, swaps)
      );
    }

    if (j >= 0) comparisons++; // the failing while condition

    workingArray[j + 1] = key;

    steps.push(
      makeStep(workingArray,
        idx => idx <= i ? COLORS.SORTED : COLORS.UNSORTED,
        undefined, 7, "INSERT",
        `Inserted ${key.value} at index ${j + 1}. Sorted prefix now has ${i + 1} elements.`,
        comparisons, swaps)
    );
  }

  steps.push(makeStep(workingArray, () => COLORS.SORTED, undefined, undefined, "DONE",
    `Sorted! Total: ${comparisons} comparisons, ${swaps} shifts.`, comparisons, swaps));

  return steps;
};
