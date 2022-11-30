import type { AnyFunction } from "@chakra-ui/utils";

export interface BlueCar {
  show: boolean;
  blueCarLeft: number;
  setBlueCarLeft: AnyFunction;
  count: number;
  setCount: AnyFunction;
}

export interface CarGameProps {
  play: boolean;
  gameOver: boolean;
  count: number;
  score: number;
  redCarLeft: number;
  blueCarLeft: number;
  intervalId: ReturnType<typeof setTimeout>;
}

export interface ResultCardProps {
  score: number;
  buttonAction: AnyFunction;
}
