import { Box, Grid, GridItem, Show } from "@chakra-ui/react";

import type { GameInfoProps } from "../../types/components/common";
import games from "../games";

import GameBody from "./gameBody/GameBody";
import GameHeader from "./gameHeader/GameHeader";
import Leaderboard from "./leaderboard/Leaderboard";

const GameDashboard: React.FC<GameInfoProps> = ({ id }) => {
  const game = games[id];
  if (!game) return <div />;

  return (
    <Box p={2}>
      <Grid
        templateAreas={`
                  "header leaderboard"
                  "main leaderboard"`}
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
        <GridItem pl={2} area="header">
          <GameHeader helpContent={game?.helpContent} gameInfo={game} />
        </GridItem>
        <GridItem pl={2} area="main">
          <GameBody>{game?.component}</GameBody>
        </GridItem>
        <Show above="md">
          <GridItem pl={1} area="leaderboard">
            <Leaderboard id={id} />
          </GridItem>
        </Show>
      </Grid>
    </Box>
  );
};

export default GameDashboard;
