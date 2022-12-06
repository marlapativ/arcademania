import type { GameInfoCollection } from "lib/types/components/common";

import Game2048 from "./2048/Game2048";
import CarGame from "./carcrash/CarGame";
import Connect4 from "./connect4/Connect4";
import Hangman from "./hangman/Hangman";
// import MemoryGame from "./memorygame/src/MemoryGame";
import Minesweeper from "./minesweeper/Minesweeper";
import SnakeGame from "./snakegame/SnakeGame";
import TicTacToe from "./tictactoe/TicTacToe";
import TypingSpeed from "./typingspeed/src/typingspeed";

const games: GameInfoCollection = {
  1: {
    id: 1,
    name: "2048",
    component: <Game2048 rows={4} columns={4} gameId={1} />,
    image: "images/2048.png",
    altImage: "images/2048.png",
    description:
      "Slide the numbered tiles on a grid to combine them to create a tile with the number 2048 to win the game!",
    helpContent:
      "Slide the numbered tiles on a grid to combine them to create a tile with the number 2048 to win the game!",
  },
  2: {
    id: 2,
    name: "Snake Game",
    component: <SnakeGame />,
    image: "images/Snake_Game.png",
    altImage: "images/Snake_Game.png",
    description:
      "Use keyboard arrows to move the snake to eat the frog within the boundaries to win the maximum score!",
    helpContent:
      "Use keyboard arrows to move the snake to eat the frog within the boundaries to win the maximum score!",
  },
  3: {
    id: 3,
    name: "Car Game",
    component: <CarGame />,
    image: "images/carGame.png",
    altImage: "images/race-car.gif",
    description:
      "Use left and right arrow buttons to escape the red car from blue car to win the game!",
    helpContent:
      "Use left and right arrow buttons to escape the red car from blue car to win the game!",
  },
  4: {
    id: 4,
    name: "Connect4",
    component: <Connect4 />,
    image: "images/Connect4.png",
    altImage: "images/Connect4.png",
    description:
      "This is a multi player game, click on the row to insert respective disks into the columns, connect any 4 dots and win the game",
    helpContent:
      "This is a multi player game, click on the row to insert respective disks into the columns, connect any 4 dots and win the game",
  },
  5: {
    id: 5,
    name: "Minesweeper",
    component: <Minesweeper rows={10} columns={10} bombs={10} gameId={5} />,
    image: "images/Minesweeper.png",
    altImage: "images/Minesweeper.png",
    description:
      "Classic implementation of the Minesweeper game in Javascript with flag the cell feature.",
    helpContent: "",
  },
  6: {
    id: 6,
    name: "Tic Tac Toe",
    component: <TicTacToe />,
    helpContent: "",
  },
  7: {
    id: 7,
    name: "Typing Speed",
    component: <TypingSpeed />,
    helpContent: "",
  },
  // 8: {
  //   id: 8,
  //   name: "Memory Game",
  //   component: <MemoryGame />,
  //   helpContent: "",
  // },
  9: {
    id: 9,
    name: "Hangman",
    component: <Hangman />,
    helpContent: "",
  },
};

export default games;
