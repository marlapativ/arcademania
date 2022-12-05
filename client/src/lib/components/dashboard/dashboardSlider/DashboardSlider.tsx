import { Grid, GridItem, Flex, Text, Box } from "@chakra-ui/react";

import games from "lib/components/games";
import type { GameInfoComponentProps } from "lib/types/components/common";

const DashboardSlider: React.FC = () => {
  return (
    <Box>
      <Flex>
        <Text textAlign="left" fontSize="xl">
          {" "}
          Games you might like:{" "}
        </Text>
      </Flex>
      <Grid
        my={2}
        h="40vh"
        w="80vw"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(4, 1fr)"
        gap={4}
      >
        <GridItem rowSpan={2} colSpan={1} bg="tomato" />
        <GridItem colSpan={1} bg="papayawhip" />
        <GridItem colSpan={1} bg="papayawhip" />
        <GridItem colSpan={1} bg="papayawhip" />
        <GridItem colSpan={3} bg="tomato" />
      </Grid>
    </Box>
  );
};

export default DashboardSlider;
