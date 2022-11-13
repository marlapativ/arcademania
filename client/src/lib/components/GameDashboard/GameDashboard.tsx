import { Box, Grid, GridItem } from "@chakra-ui/react";

import type {
  GameInfoCollection,
  GameInfoProps,
} from "../../types/components/common";
import { Minesweeper, SnakeGame, CarGame } from "../Games";

import GameBody from "./GameBody/GameBody";
import GameFooter from "./GameFooter/GameFooter";
import Leaderboard from "./Leaderboard/Leaderboard";

const games: GameInfoCollection = {
  1: {
    id: 1,
    name: "Minesweeper",
    component: <Minesweeper rows={8} columns={8} bombs={10} />,
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
};

const GameDashboard: React.FC<GameInfoProps> = ({ id }) => {
  const game = games[id];
  return (
    <Box m={1}>
      <Grid
        templateAreas={`"main leaderboard"
                  "footer leaderboard"`}
        gridTemplateRows={{
          base: "1fr",
          md: "1fr",
        }}
        gridTemplateColumns={{
          base: "100%",
          md: "2fr 1fr",
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
        <GridItem
          area="leaderboard"
          display={{ base: "none", sm: "none", md: "block" }}
        >
          <Leaderboard />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default GameDashboard;
