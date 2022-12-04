import type { Coordinate, Matrix } from "./games.common";

// eslint-disable-next-line @typescript-eslint/naming-convention
export type _2048TileData = {
  coordinate: Coordinate;
  value: number;
};

export enum Direction {
  LEFT,
  RIGHT,
  UP,
  DOWN,
}

export type Game2048Props = Matrix;
