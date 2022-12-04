/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-continue */
import type { SwipedGridData } from "lib/types/components/games/2048.types";
import type { UnaryFunction } from "lib/types/components/games/games.common";

export const isExist = (game: number[][], element: number): boolean => {
  for (let r = 0; r < game.length; r += 1) {
    for (let c = 0; c < game[r].length; c += 1) {
      if (game[r][c] === element) return true;
    }
  }
  return false;
};

export const swipeLeft: UnaryFunction<number[][], SwipedGridData> = (
  data: number[][]
) => {
  const clonedData: number[][] = structuredClone(data);
  let score = 0;

  for (let i = 0; i < clonedData.length; i += 1) {
    const currentRow = clonedData[i];
    let slow = 0;
    let fast = 1;

    while (slow < clonedData.length) {
      if (fast === clonedData.length) {
        fast = slow + 1;
        slow += 1;
        continue;
      }
      if (currentRow[slow] === 0 && currentRow[fast] === 0) {
        fast += 1;
      } else if (currentRow[slow] === 0 && currentRow[fast] !== 0) {
        currentRow[slow] = currentRow[fast];
        currentRow[fast] = 0;
        fast += 1;
      } else if (currentRow[slow] !== 0 && currentRow[fast] === 0) {
        fast += 1;
      } else if (currentRow[slow] !== 0 && currentRow[fast] !== 0) {
        if (currentRow[slow] === currentRow[fast]) {
          currentRow[slow] += currentRow[fast];
          score += currentRow[slow];
          currentRow[fast] = 0;
          fast = slow + 1;
          slow += 1;
        } else {
          slow += 1;
          fast = slow + 1;
        }
      }
    }
  }

  return {
    swipedScore: score,
    swipedGrid: clonedData,
  };
};

export const swipeRight: UnaryFunction<number[][], SwipedGridData> = (
  data: number[][]
) => {
  let score = 0;
  const clonedData = structuredClone(data);

  for (let i = clonedData.length - 1; i >= 0; i -= 1) {
    const currentRow = clonedData[i];
    let slow = currentRow.length - 1;
    let fast = slow - 1;

    while (slow > 0) {
      if (fast === -1) {
        fast = slow - 1;
        slow -= 1;
        continue;
      }
      if (currentRow[slow] === 0 && currentRow[fast] === 0) {
        fast -= 1;
      } else if (currentRow[slow] === 0 && currentRow[fast] !== 0) {
        currentRow[slow] = currentRow[fast];
        currentRow[fast] = 0;
        fast -= 1;
      } else if (currentRow[slow] !== 0 && currentRow[fast] === 0) {
        fast -= 1;
      } else if (currentRow[slow] !== 0 && currentRow[fast] !== 0) {
        if (currentRow[slow] === currentRow[fast]) {
          currentRow[slow] += currentRow[fast];
          score += currentRow[slow];
          currentRow[fast] = 0;
          fast = slow - 1;
          slow -= 1;
        } else {
          slow -= 1;
          fast = slow - 1;
        }
      }
    }
  }

  return {
    swipedScore: score,
    swipedGrid: clonedData,
  };
};
export const swipeUp: UnaryFunction<number[][], SwipedGridData> = (
  data: number[][]
) => {
  const clonedData = [...data];
  let score = 0;
  for (let i = 0; i < clonedData.length; i += 1) {
    let slow = 0;
    let fast = 1;
    while (slow < clonedData.length) {
      if (fast === clonedData.length) {
        fast = slow + 1;
        slow += 1;
        continue;
      }
      if (clonedData[slow][i] === 0 && clonedData[fast][i] === 0) {
        fast += 1;
      } else if (clonedData[slow][i] === 0 && clonedData[fast][i] !== 0) {
        clonedData[slow][i] = clonedData[fast][i];
        clonedData[fast][i] = 0;
        fast += 1;
      } else if (clonedData[slow][i] !== 0 && clonedData[fast][i] === 0) {
        fast += 1;
      } else if (clonedData[slow][i] !== 0 && clonedData[fast][i] !== 0) {
        if (clonedData[slow][i] === clonedData[fast][i]) {
          clonedData[slow][i] += clonedData[fast][i];
          score += clonedData[slow][i];
          clonedData[fast][i] = 0;
          fast = slow + 1;
          slow += 1;
        } else {
          slow += 1;
          fast = slow + 1;
        }
      }
    }
  }

  return {
    swipedScore: score,
    swipedGrid: clonedData,
  };
};
export const swipeDown: UnaryFunction<number[][], SwipedGridData> = (
  data: number[][]
) => {
  let score = 0;
  const clonedData = [...data];

  for (let i = clonedData.length - 1; i >= 0; i -= 1) {
    let slow = clonedData.length - 1;
    let fast = slow - 1;
    while (slow > 0) {
      if (fast === -1) {
        fast = slow - 1;
        slow -= 1;
        continue;
      }
      if (clonedData[slow][i] === 0 && clonedData[fast][i] === 0) {
        fast -= 1;
      } else if (clonedData[slow][i] === 0 && clonedData[fast][i] !== 0) {
        clonedData[slow][i] = clonedData[fast][i];
        clonedData[fast][i] = 0;
        fast -= 1;
      } else if (clonedData[slow][i] !== 0 && clonedData[fast][i] === 0) {
        fast -= 1;
      } else if (clonedData[slow][i] !== 0 && clonedData[fast][i] !== 0) {
        if (clonedData[slow][i] === clonedData[fast][i]) {
          clonedData[slow][i] += clonedData[fast][i];
          score += clonedData[slow][i];
          clonedData[fast][i] = 0;
          fast = slow - 1;
          slow -= 1;
        } else {
          slow -= 1;
          fast = slow - 1;
        }
      }
    }
  }

  return {
    swipedScore: score,
    swipedGrid: clonedData,
  };
};
