import type { Coordinate, GameEntity, Matrix } from "./games.common";

export interface MinesweeperGameProps extends Matrix, GameEntity {
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
