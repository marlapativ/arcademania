import { Box, Flex, Grid, useColorModeValue } from "@chakra-ui/react";
import _, { repeat } from "lodash";
import { useState } from "react";

import GameStatusMessage from "../gameMessage/GameStatusMessage";
import { saveScore } from "lib/services/leaderboard-service";
import { getUser } from "lib/services/user-service";
import type {
  MinesweeperGameProps,
  MinesweeperCoordindate,
  MinesweeperCellData,
} from "lib/types/components/games/minesweeper.types";

import MinesweeperCell from "./minesweeperCell/MinesweeperCell";

const GAME_ID = 1;

const neighbours: MinesweeperCoordindate[] = [
  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
];

const setBombsRandomly = (
  game: MinesweeperCellData[][],
  bombs: number
): void => {
  const rows = game.length;
  const columns = game[0].length;
  const max = rows * columns;
  const numbers = new Set();
  while (bombs > 0) {
    const index = _.random(max - 1, false);
    if (!numbers.has(index)) {
      const row = Math.floor(index / columns);
      const col = index % columns;
      game[row][col] = {
        visible: false,
        value: -1,
      };
      bombs -= 1;
      numbers.add(index);
    }
  }
};

const createGame = (
  rows: number,
  columns: number,
  bombs: number
): MinesweeperCellData[][] => {
  const game: MinesweeperCellData[][] = new Array(rows);
  for (let i = 0; i < rows; i += 1) {
    game[i] = new Array(columns);
    for (let j = 0; j < columns; j += 1) {
      game[i][j] = {
        visible: true,
        value: 0,
      };
    }
  }

  setBombsRandomly(game, bombs);

  game.forEach((row, rowIndex) =>
    row.forEach((cell, colIndex) => {
      if (cell.value === -1) return;
      let bombsCount = 0;
      neighbours.forEach(({ x, y }) => {
        const r = x + rowIndex;
        const c = y + colIndex;
        if (r in game && c in game[r] && game[r][c].value === -1) {
          bombsCount += 1;
        }
      });
      game[rowIndex][colIndex] = {
        visible: false,
        value: bombsCount,
      };
    })
  );
  return game;
};

const Minesweeper: React.FC<MinesweeperGameProps> = ({
  rows,
  columns,
  bombs,
}) => {
  const [game, setGame] = useState(createGame(rows, columns, bombs));
  const [score, setScore] = useState(0);
  const [showGameMessage, setShowGameMessage] = useState(false);
  const [win, setWin] = useState(false);

  const updateGame = () => {
    setGame(_.cloneDeep(game));
  };

  const showAll = () => {
    game.forEach((row) =>
      row.forEach((column) => {
        column.visible = true;
      })
    );
    updateGame();
  };

  const countVisible = () => {
    return game.reduce(
      (prev, row) =>
        prev +
        row.reduce((colPrev, column) => colPrev + (column.visible ? 1 : 0), 0),
      0
    );
  };

  const saveGameScores = async (gameScore: number) => {
    await saveScore(GAME_ID, getUser().id, gameScore);
  };

  const endGame = (didWin?: boolean) => {
    const gameScore = countVisible() + (didWin ? bombs : 0);
    setScore(gameScore);
    setWin(didWin ?? false);
    showAll();
    setShowGameMessage(true);
    saveGameScores(gameScore);
  };

  const checkIfWon = () => {
    const maxVisibleCells = rows * columns - bombs;
    const visibleCells = countVisible();

    if (visibleCells === maxVisibleCells) {
      endGame(true);
    }
  };

  const playAgain = () => {
    setGame(createGame(rows, columns, bombs));
    setScore(0);
    setShowGameMessage(false);
    setWin(false);
  };

  const unhideCellAndNeighbours = (
    coordinate: MinesweeperCoordindate,
    showNeighbours: boolean
  ) => {
    game[coordinate.x][coordinate.y] = {
      value: game[coordinate.x][coordinate.y].value,
      visible: true,
    };

    if (showNeighbours) {
      neighbours.forEach((i) => {
        const r = i.x + coordinate.x;
        const c = i.y + coordinate.y;
        if (r in game && c in game[r] && !game[r][c].visible) {
          const neighbourValue = game[r][c].value;
          game[r][c] = {
            visible: true,
            value: neighbourValue,
          };
          if (neighbourValue === 0) {
            unhideCellAndNeighbours({ x: r, y: c }, true);
          }
        }
      });
    }
    updateGame();
  };

  const unhideCell = (coordinate: MinesweeperCoordindate, value: number) => {
    unhideCellAndNeighbours(coordinate, value === 0);
    checkIfWon();
  };

  return (
    <Flex>
      <Box
        bg={useColorModeValue("gray.100", "white")}
        color="white"
        borderRadius="lg"
        rounded="xl"
        boxShadow="0 5px 20px 0px rgb(72 187 120 / 43%)"
        m={{ sm: 2, md: 8, lg: 2 }}
      >
        <div style={{ position: "relative" }}>
          <GameStatusMessage
            show={showGameMessage}
            win={win}
            playAgain={playAgain}
            score={score}
          />

          <Grid
            gridTemplateRows={repeat("1fr ", rows)}
            gridTemplateColumns={repeat("1fr ", columns)}
            m={2}
            filter="var(--chakra-backdrop-blur)"
            backdropBlur={showGameMessage ? "sm" : undefined}
            transition="450ms filter linear"
          >
            {game.map((eachRow, rowIndex) =>
              eachRow.map((eachColumn, columnIndex) => {
                const key = rowIndex * columns + columnIndex;
                const coordinate: MinesweeperCoordindate = {
                  x: rowIndex,
                  y: columnIndex,
                };
                const data = game[rowIndex][columnIndex];
                return (
                  <MinesweeperCell
                    key={key}
                    coordinate={coordinate}
                    unhide={unhideCell}
                    endGame={endGame}
                    show={data.visible}
                    value={data.value}
                  />
                );
              })
            )}
          </Grid>
        </div>
      </Box>
    </Flex>
  );
};

export default Minesweeper;
