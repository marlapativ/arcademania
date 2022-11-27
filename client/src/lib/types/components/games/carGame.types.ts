import { AnyFunction } from "@chakra-ui/utils";
export interface blueCar {
  show: boolean;
  blueCarLeft: number;
  setBlueCarLeft: AnyFunction;
  count: number;
  setCount: AnyFunction;
}

export interface carGameProps {
  play: boolean;
  gameOver: boolean;
  count: number;
  score: number;
  redCarLeft: number;
  blueCarLeft: number;
  blueCarTop: number;
  intervalId: ReturnType<typeof setTimeout>;
}
