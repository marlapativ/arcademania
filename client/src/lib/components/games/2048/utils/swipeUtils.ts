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
  const newArray: number[][] = structuredClone(data);
  let score = 0;

  for (let i = 0; i < 4; i += 1) {
    const b = newArray[i];
    let slow = 0;
    let fast = 1;

    while (slow < 4) {
      if (fast === 4) {
        fast = slow + 1;
        slow += 1;
        continue;
      }
      if (b[slow] === 0 && b[fast] === 0) {
        fast += 1;
      } else if (b[slow] === 0 && b[fast] !== 0) {
        b[slow] = b[fast];
        b[fast] = 0;
        fast += 1;
      } else if (b[slow] !== 0 && b[fast] === 0) {
        fast += 1;
      } else if (b[slow] !== 0 && b[fast] !== 0) {
        if (b[slow] === b[fast]) {
          b[slow] += b[fast];
          score += b[slow];
          b[fast] = 0;
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
    swipedGrid: newArray,
  };
};

export const swipeRight: UnaryFunction<number[][], SwipedGridData> = (
  data: number[][]
) => {
  let score = 0;
  const newArray = structuredClone(data);

  for (let i = 3; i >= 0; i -= 1) {
    const b = newArray[i];
    let slow = b.length - 1;
    let fast = slow - 1;

    while (slow > 0) {
      if (fast === -1) {
        fast = slow - 1;
        slow -= 1;
        continue;
      }
      if (b[slow] === 0 && b[fast] === 0) {
        fast -= 1;
      } else if (b[slow] === 0 && b[fast] !== 0) {
        b[slow] = b[fast];
        b[fast] = 0;
        fast -= 1;
      } else if (b[slow] !== 0 && b[fast] === 0) {
        fast -= 1;
      } else if (b[slow] !== 0 && b[fast] !== 0) {
        if (b[slow] === b[fast]) {
          b[slow] += b[fast];
          score += b[slow];
          b[fast] = 0;
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
    swipedGrid: newArray,
  };
};
export const swipeUp: UnaryFunction<number[][], SwipedGridData> = (
  data: number[][]
) => {
  const b = [...data];
  let score = 0;
  for (let i = 0; i < 4; i += 1) {
    let slow = 0;
    let fast = 1;
    while (slow < 4) {
      if (fast === 4) {
        fast = slow + 1;
        slow += 1;
        continue;
      }
      if (b[slow][i] === 0 && b[fast][i] === 0) {
        fast += 1;
      } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
        b[slow][i] = b[fast][i];
        b[fast][i] = 0;
        fast += 1;
      } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
        fast += 1;
      } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
        if (b[slow][i] === b[fast][i]) {
          b[slow][i] += b[fast][i];
          score += b[slow][i];
          b[fast][i] = 0;
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
    swipedGrid: b,
  };
};
export const swipeDown: UnaryFunction<number[][], SwipedGridData> = (
  data: number[][]
) => {
  let score = 0;
  const b = [...data];

  for (let i = 3; i >= 0; i -= 1) {
    let slow = b.length - 1;
    let fast = slow - 1;
    while (slow > 0) {
      if (fast === -1) {
        fast = slow - 1;
        slow -= 1;
        continue;
      }
      if (b[slow][i] === 0 && b[fast][i] === 0) {
        fast -= 1;
      } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
        b[slow][i] = b[fast][i];
        b[fast][i] = 0;
        fast -= 1;
      } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
        fast -= 1;
      } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
        if (b[slow][i] === b[fast][i]) {
          b[slow][i] += b[fast][i];
          score += b[slow][i];
          b[fast][i] = 0;
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
    swipedGrid: b,
  };
};
