import { Box, Grid, GridItem, Show } from "@chakra-ui/react";

import type {
  GameInfoCollection,
  GameInfoProps,
} from "../../types/components/common";
import { Minesweeper, SnakeGame, CarGame, Connect4, TicTacToe, TypingSpeed, MemoryGame } from "../games";

import GameBody from "./gameBody/GameBody";
import GameFooter from "./gameFooter/GameFooter";
import Leaderboard from "./leaderboard/Leaderboard";

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
    id: 5,
    name: "Tic Tac Toe",
    component: <TicTacToe />,
  },
  6: {
    id: 6,
    name: "Typing Speed",
    component: <TypingSpeed />,
  },
  7: {
    id: 7,
    name: "Memory Game",
    component: <MemoryGame />,
  },
};

const GameDashboard: React.FC<GameInfoProps> = ({ id }) => {
  const game = games[id];
  return (
    <Box p={2}>
      <Grid
        templateAreas={`"main leaderboard"
                  "footer leaderboard"`}
        gridTemplateRows={{
          base: "1fr",
          md: "1fr",
        }}
        gridTemplateColumns={{
          base: "100%",
          md: "2.4fr 1fr",
        }}
        gap="2"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem px={1} area="main">
          <GameBody>{game?.component}</GameBody>
        </GridItem>
        <GridItem px={1} area="footer">
          <GameFooter id={game?.id} name={game?.name} />
        </GridItem>
        <Show above="md">
          <GridItem px={1} area="leaderboard">
            <Leaderboard id={id} />
          </GridItem>
        </Show>
      </Grid>
    </Box>
  );
};

export default GameDashboard;
