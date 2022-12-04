import type { GameInfoCollection } from "lib/types/components/common";

import Game2048 from "./2048/Game2048";
import CarGame from "./carcrash/CarGame";
import Connect4 from "./connect4/Connect4";
import Minesweeper from "./minesweeper/Minesweeper";
import SnakeGame from "./snakegame/SnakeGame";

const games: GameInfoCollection = {
  1: {
    id: 1,
    name: "Minesweeper",
    component: <Minesweeper rows={10} columns={10} bombs={10} />,
  },
  2: {
    id: 2,
    name: "Snake Game",
    component: <SnakeGame />,
  },
  3: {
    id: 3,
    name: "Car Game",
    component: <CarGame />,
  },
  4: {
    id: 4,
    name: "Connect4",
    component: <Connect4 />,
  },
  5: {
    id: 4,
    name: "2048",
    component: <Game2048 rows={4} columns={4} />,
  },
};

export default games;
