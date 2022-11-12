import { Box, Grid, GridItem } from "@chakra-ui/react";

import type { GameInfoProps } from "../../types/components/common";
import { Minesweeper } from "../Game";
import Leaderboard from "../Leaderboard/Leaderboard";

const Game: React.FC<GameInfoProps> = ({ id }) => {
  return (
    <div>
      {id === "1" ? <Minesweeper rows={8} columns={8} bombs={10} /> : null}
    </div>
  );
};

const GameDashboard: React.FC<GameInfoProps> = ({ id }) => {
  return (
    <Box m={2}>
      <Grid
        templateAreas={`"header leaderboard"
                  "main leaderboard"`}
        gridTemplateRows={{
          base: "10%",
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
        <GridItem pl="2" bg="orange.300" area="header">
          Header
        </GridItem>
        <GridItem pl="2" bg="green.300" area="main">
          <Game id={id} />
        </GridItem>
        <GridItem area="leaderboard" display={{ base: "none", md: "block" }}>
          <Leaderboard />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default GameDashboard;
