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

export interface MinesweeperCoordindate {
  x: number;
  y: number;
}

export interface MinesweeperCellProps {
  value: number;
  show: boolean;
  coordinate: MinesweeperCoordindate;
  unhide: (coordinate: MinesweeperCoordindate, value: number) => void;
  endGame: () => void;
}
