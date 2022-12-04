export type Player = "red" | "yellow";
export type Disk = undefined | Player;
export type Board = Disk[][];

export type Action =
  | {
      type: "turn";
      payload: number;
    }
  | {
      type: "reset";
      payload: Player;
    };

export interface Connect4Props {
  play: boolean;
  gameOver: boolean;
  count: number;
  score: number;
  rows: number;
  columns: number;
  dropAnimationRate: number;
  winAnimationRate: number;
}

export interface Connect4GameColumnProps {
  column: Disk[];
  onClick: () => void;
}

export interface State {
  currentPlayer: Player;
  winner: Player | null;
  board: Board;
}
