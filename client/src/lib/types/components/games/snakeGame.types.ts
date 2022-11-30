export interface FoodProps {
  coordinates: number[];
}

export interface SnakeProps {
  SnakeCoordinates: number[][];
}

export interface SnakeGameProps {
  food: number[];
  speed: number;
  pause: boolean;
  play: boolean;
  gameOver: string;
  direction: string;
  snakeDots: number[][];
}
