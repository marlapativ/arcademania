/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-bitwise */
/* eslint-disable no-continue */
/* eslint-disable react/no-array-index-key */
import { Box, Flex, Grid, useColorModeValue } from "@chakra-ui/react";
import { repeat } from "lodash";
import { useEffect, useState } from "react";

import { Direction } from "../../../types/components/games/2048.types";
import type {
  Game2048Props,
  _2048TileData,
} from "../../../types/components/games/2048.types";
import type { Coordinate } from "../../../types/components/games/games.common";
import GameStatusMessage from "../gameMessage/GameStatusMessage";
import { getLeaderboard, saveScore } from "lib/services/leaderboard-service";
import { getUser } from "lib/services/user-service";
import { setGameLeaderboard } from "lib/store/slices/leaderboardSlice";
import { useDispatch } from "lib/store/store";

import Cell2048 from "./Cell2048/Cell2048";

const GAME_ID = 4;

const getRandomValue = (): number => {
  return Math.random() > 0.5 ? 2 : 4;
};

const setRandomElement = (
  game: _2048TileData[][],
  rows: number,
  columns: number
): void => {
  const emptyCells: Coordinate[] = [];
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < columns; c += 1) {
      if (game[r][c].value === 0) {
        emptyCells.push({ x: r, y: c });
      }
    }
  }

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const { x, y } = emptyCells[randomIndex];
  game[x][y].value = getRandomValue();
};

const createGame = (rows: number, columns: number): _2048TileData[][] => {
  const game: _2048TileData[][] = new Array(rows);
  for (let i = 0; i < rows; i += 1) {
    game[i] = new Array(columns);
    for (let j = 0; j < columns; j += 1) {
      game[i][j] = {
        value: 0,
        coordinate: {
          x: i,
          y: j,
        },
      };
    }
  }
  setRandomElement(game, rows, columns);
  setRandomElement(game, rows, columns);
  return game;
};

const Game2048: React.FC<Game2048Props> = ({ rows, columns }) => {
  const dispatch = useDispatch();
  const [game, setGame] = useState(createGame(rows, columns));
  const [score, setScore] = useState(0);
  const [showGameMessage, setShowGameMessage] = useState(false);
  const [win, setWin] = useState(false);

  const KEY_DIRECTION_MAP = new Map([
    ["ArrowLeft", 0],
    ["ArrowUp", 1],
    ["ArrowRight", 2],
    ["ArrowDown", 3],
  ]);

  const playAgain = () => {
    setScore(0);
    setShowGameMessage(false);
    setWin(false);
    setGame(createGame(rows, columns));
  };

  const saveGameScores = (gameScore: number) => {
    saveScore(GAME_ID, getUser().userId, gameScore).then(() => {
      getLeaderboard(GAME_ID).then((leaderboard) =>
        dispatch(
          setGameLeaderboard({
            gameId: GAME_ID,
            data: leaderboard,
          })
        )
      );
    });
  };

  const endGame = (didWin?: boolean) => {
    setScore(0);
    setWin(didWin ?? false);
    setShowGameMessage(true);
    saveGameScores(score);
  };

  // const addScore = (newScore: number) => {
  //   setScore(score + newScore);
  // };

  const rotateLeft = (matrix: _2048TileData[][]) => {
    const res: _2048TileData[][] = [];
    for (let r = 0; r < rows; r += 1) {
      res.push([]);
      for (let c = 0; c < columns; c += 1) {
        res[r][c] = matrix[c][columns - r - 1];
      }
    }
    return res;
  };

  const addTile = (value = 0) => {
    const res: _2048TileData = {
      value,
      coordinate: {
        x: 0,
        y: 0,
      },
    };
    // this.tiles.push(res);
    return res;
  };

  const moveLeft = () => {
    let hasChanged = false;
    for (let row = 0; row < rows; row += 1) {
      const currentRow = game[row].filter((tile) => tile.value !== 0);
      const resultRow = [];
      for (let target = 0; target < rows; target += 1) {
        let targetTile = currentRow.length ? currentRow.shift()! : addTile();
        if (currentRow.length > 0 && currentRow[0].value === targetTile.value) {
          targetTile = addTile(targetTile.value);
          const { value } = currentRow.shift() || { value: 0 };
          targetTile.value += value;
        }
        resultRow[target] = targetTile;
        if (targetTile.value === 2048) {
          endGame(true);
        }
        hasChanged = hasChanged || targetTile.value !== game[row][target].value;
      }
      game[row] = resultRow;
    }
    return hasChanged;
  };

  const swipe = (direction: number | undefined) => {
    if (!direction) return;

    let clone = structuredClone(game);
    for (let i = 0; i < direction; i += 1) {
      clone = rotateLeft(clone);
    }
    const hasChanged = moveLeft();
    for (let i = direction; i < 4; i += 1) {
      clone = rotateLeft(clone);
    }
    if (hasChanged) {
      setRandomElement(clone, rows, columns);
    }

    setGame(clone);
  };

  const handleKeyPress = ({ key }: KeyboardEvent) => {
    if (!KEY_DIRECTION_MAP.has(key)) {
      return;
    }

    swipe(KEY_DIRECTION_MAP.get(key));
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

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
            filter="var(--chakra-backdrop-blur)"
            backdropBlur={showGameMessage ? "sm" : undefined}
            transition="450ms filter linear"
            bg="#bcac9f"
            gap="2"
            p="2"
            borderRadius="4px"
          >
            {game.map((eachRow, rowIndex) =>
              eachRow.map((column, columnIndex) => {
                const key = rowIndex * columns + columnIndex;
                const coordinate: Coordinate = {
                  x: rowIndex,
                  y: columnIndex,
                };
                return (
                  <Cell2048
                    value={column.value}
                    key={key}
                    coordinate={coordinate}
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

export default Game2048;
