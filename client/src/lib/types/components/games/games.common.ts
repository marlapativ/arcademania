export type GameEntity = {
  gameId: number;
};

export interface Coordinate {
  x: number;
  y: number;
}

export interface Flag {
  flag: boolean;
}

export interface Score {
  score: number;
}

export type ScoreProps = Score & {
  show: boolean;
};

export interface Matrix {
  rows: number;
  columns: number;
}

export type UnaryFunction<T, R> = (value: T) => R;
