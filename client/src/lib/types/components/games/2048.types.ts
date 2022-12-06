import type { Coordinate, GameEntity, Matrix } from "./games.common";

// eslint-disable-next-line @typescript-eslint/naming-convention
export type _2048TileData = {
  coordinate: Coordinate;
  value: number;
};

export type SwipedGridData = {
  swipedScore: number;
  swipedGrid: number[][];
};

export enum Direction {
  LEFT,
  RIGHT,
  UP,
  DOWN,
}

export type Game2048Props = Matrix & GameEntity;
