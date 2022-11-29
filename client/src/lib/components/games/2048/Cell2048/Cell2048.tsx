import { Box } from "@chakra-ui/react";

import { Coordinate } from "../../../../types/components/games/games.common";
import type { _2048TileData } from "lib/types/components/games/2048.types";

// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
const _2048Tile: React.FC<_2048TileData> = ({ value, coordinate }) => {
  return (
    <Box
      transitionProperty="left top transform"
      transitionDuration="250ms 250ms 10ms"
      transform="scale(1)"
    >
      {value}
    </Box>
  );
};

export default _2048Tile;
