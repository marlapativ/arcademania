export interface MinesweeperGameProps {
  rows: number;
  columns: number;
  bombs: number;
}

export interface MinesweeperMessage {
  show: boolean;
  win: boolean;
  playAgain: () => void;
  score: number;
}

export interface MinesweeperCellData {
  hidden: boolean;
  value: MinesweeperCellValue;
}

export enum MinesweeperCellValue {
  VALID,
  BOMB,
  EMPTY,
}

export enum MinesweeperGameStatus {
  WIN,
  LOS,
}

export interface MinesweeperCoordindate {
  x: number;
  y: number;
}

export interface CellProps {
  isHidden: boolean;
  value: MinesweeperCellValue;
  coordinate: MinesweeperCoordindate;
  unhide: (coordinate: MinesweeperCoordindate) => void;
  endGame: () => void;
}
