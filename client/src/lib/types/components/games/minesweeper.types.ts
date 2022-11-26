import type { Coordinate } from "./games.common";

export interface MinesweeperGameProps {
  rows: number;
  columns: number;
  bombs: number;
}

export interface MinesweeperCellData {
  visible: boolean;
  value: number;
}

export enum MinesweeperGameStatus {
  WIN,
  LOS,
}

export interface MinesweeperCellProps {
  value: number;
  show: boolean;
  coordinate: Coordinate;
  unhide: (coordinate: Coordinate, value: number) => void;
  endGame: () => void;
}