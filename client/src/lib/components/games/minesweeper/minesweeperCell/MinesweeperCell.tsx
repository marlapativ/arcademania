import { Box, GridItem } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import type { MinesweeperCellProps } from "lib/types/components/games/minesweeper.types";

const MinesweeperCell: React.FC<MinesweeperCellProps> = ({
  value,
  endGame,
  unhide,
  show,
  coordinate,
}) => {
  const [isHidden, setIsHidden] = useState(true);

  const cellClick = () => {
    if (value === -1) {
      endGame();
    } else {
      unhide(coordinate, value);
    }
  };

  useEffect(() => {
    setIsHidden(!show);
  }, [show]);

  return (
    <GridItem onClick={cellClick}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg={isHidden ? "red" : "white"}
        maxW={{ base: "20px", lg: "12px" }}
        maxH={{ base: "20px", lg: "12px" }}
        color="black"
        rounded="sm"
        p={{ base: "4", lg: "5" }}
        textAlign="center"
        transition="transform 250ms, background-color 700ms"
        border="1px solid black"
      >
        {isHidden || (value > 0 && value)}
      </Box>
    </GridItem>
  );
};

export default MinesweeperCell;
