import { Box, Center, GridItem } from "@chakra-ui/react";

import type { _2048TileData } from "lib/types/components/games/2048.types";

// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
const Cell2048: React.FC<_2048TileData> = ({ value }) => {
  return (
    <Box
      transitionProperty="left top transform"
      transitionDuration="250ms 250ms 10ms"
      transform="scale(1)"
    >
      <GridItem>
        <Center
          color="#766d64"
          h="100px"
          w="100px"
          bg={value > 0 ? "#eee4da" : "#cbc0b4"}
          fontSize="45px"
          borderRadius="4px"
        >
          {value > 0 && value}
        </Center>
      </GridItem>
    </Box>
  );
};

export default Cell2048;
