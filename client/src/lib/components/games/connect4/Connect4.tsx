/* eslint-disable no-plusplus */
import { Container } from "@chakra-ui/react";
import { useReducer } from "react";

import type {
  Board,
  Player,
  Action,
  State,
} from "lib/types/components/games/connect4.types";

import Cell from "./Cell";
import Column from "./Column";
import connect4Styles from "./styles/connect4.module.scss";
import WinnerModal from "./WinnerModal";

const generateBoard = (): Board =>
  Array(7)
    .fill(undefined)
    .map(() => Array(6).fill(undefined));

const generateNewBoard = (
  board: Board,
  playedColumn: number,
  currentPlayer: Player
): Board => {
  return board.map((column, i) => {
    if (i === playedColumn) {
      const newColumn = [...column];
      for (let index = newColumn.length - 1; index >= 0; index--) {
        if (newColumn[index] === undefined) {
          newColumn[index] = currentPlayer;
          break;
        }
      }
      return newColumn;
    }
    return column;
  });
};

const checkVertical = (gameBoard: Board, player: Player) => {
  for (let j = 0; j < 7; j++) {
    const column = gameBoard[j];
    for (let i = 0; i < 3; i++) {
      if (
        column[i] === player &&
        column[i + 1] === player &&
        column[i + 2] === player &&
        column[i + 3] === player
      ) {
        return true;
      }
    }
  }
  return false;
};

const checkHorizontal = (gameBoard: Board, player: Player) => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 7; j++) {
      if (
        gameBoard[i][j] === player &&
        gameBoard[i + 1][j] === player &&
        gameBoard[i + 2][j] === player &&
        gameBoard[i + 3][j] === player
      ) {
        return true;
      }
    }
  }
  return false;
};

const checkDiagonallyUp = (gameBoard: Board, player: Player) => {
  for (let i = 0; i < 4; i++) {
    for (let j = 5; j > 2; j--) {
      if (
        gameBoard[i][j] === player &&
        gameBoard[i + 1][j - 1] === player &&
        gameBoard[i + 2][j - 2] === player &&
        gameBoard[i + 3][j - 3] === player
      ) {
        return true;
      }
    }
  }
  return false;
};

const checkDiagonallyDown = (gameBoard: Board, player: Player) => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      if (
        gameBoard[i][j] === player &&
        gameBoard[i + 1][j + 1] === player &&
        gameBoard[i + 2][j + 2] === player &&
        gameBoard[i + 3][j + 3] === player
      ) {
        return true;
      }
    }
  }
  return false;
};

const isWinner = (board: Board, player: Player) => {
  let result = false;
  result = checkVertical(board, player);
  result = checkHorizontal(board, player);
  result = checkDiagonallyUp(board, player);
  result = checkDiagonallyDown(board, player);
  return result;
};

const initState = (player: Player): State => {
  return {
    currentPlayer: player,
    winner: null,
    board: generateBoard(),
  };
};
const play = (state: State, action: Action): State => {
  if (action.type === "turn") {
    const column = state.board[action.payload];
    if (!column.some((cell) => cell === undefined)) {
      return state;
    }
    const newBoard = generateNewBoard(
      state.board,
      action.payload,
      state.currentPlayer
    );
    const currentPlayerWins = isWinner(newBoard, state.currentPlayer);
    if (currentPlayerWins) {
      return {
        ...state,
        winner: state.currentPlayer,
        board: newBoard,
      };
    }
    return {
      ...state,
      currentPlayer: state.currentPlayer === "red" ? "yellow" : "red",
      board: newBoard,
    };
  }
  return state;
};

const Connect4 = () => {
  const [state, dispatch] = useReducer(play, "red", initState);

  return (
    <Container className={connect4Styles.App}>
      {state.winner && (
        <WinnerModal winner={state.winner} clickFunction={initState} />
      )}
      <Container className={connect4Styles.Turn}>
        <Container className={connect4Styles.TurnText}>Player turn:</Container>
        <Cell Disk={state.currentPlayer} size={5} />
      </Container>
      <Container className={connect4Styles.Board}>
        {state.board.map((column, i) => (
          <Column
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            column={column}
            onClick={() => dispatch({ type: "turn", payload: i })}
          />
        ))}
      </Container>
    </Container>
  );
};
export default Connect4;
