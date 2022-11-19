import type { Coordinate } from "./games.common";

// eslint-disable-next-line @typescript-eslint/naming-convention
export type _2048TileData = {
  id: number;
  coordinate: Coordinate;
  value: number;
  mergeWith?: number;
};
