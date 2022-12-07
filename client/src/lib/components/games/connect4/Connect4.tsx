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
      for (let index = newColumn.length - 1; index >= 0; index -= 1) {
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

const checkStraightLine = (gameBoard: Board, player: Player) => {
  for (let i = 0; i < 7; i += 1) {
    for (let j = 5; j >= 2; j -= 1) {
      if (
        gameBoard[i][j] === player &&
        gameBoard[i][j - 1] === player &&
        gameBoard[i][j - 2] === player &&
        gameBoard[i][j - 3] === player
      ) {
        return true;
      }
      if (
        i < 3 &&
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

const checkDiagonally = (gameBoard: Board, player: Player) => {
  for (let i = 0; i < 4; i += 1) {
    for (let j = 5; j > 2; j -= 1) {
      if (
        gameBoard[i][j] === player &&
        gameBoard[i + 1][j - 1] === player &&
        gameBoard[i + 2][j - 2] === player &&
        gameBoard[i + 3][j - 3] === player
      ) {
        return true;
      }
    }
    for (let j = 0; j < 3; j += 1) {
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
  result = checkStraightLine(board, player);
  if (!result) result = checkDiagonally(board, player);
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
  switch (action.type) {
    case "turn": {
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
    case "reset":
      return initState(action.payload);
    default:
      throw new Error();
  }
};

const Connect4 = () => {
  const [state, dispatch] = useReducer(play, "red", initState);

  const resetGame = (player: Player) => {
    dispatch({ type: "reset", payload: player });
  };

  return (
    <Container className={connect4Styles.App}>
      {state.winner && (
        <WinnerModal winner={state.winner} clickFunction={resetGame} />
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
