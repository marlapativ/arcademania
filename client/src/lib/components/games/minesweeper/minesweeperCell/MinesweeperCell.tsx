import {
  GridItem,
  IconButton,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { BsFillFlagFill } from "react-icons/bs";

import type { Flag } from "lib/types/components/games/games.common";
import type { MinesweeperCellProps } from "lib/types/components/games/minesweeper.types";

const FlaggedCell: React.FC<Flag> = ({ flag }) => {
  return flag ? (
    <IconButton
      as={BsFillFlagFill}
      alignItems="center"
      color="red"
      m="0.5"
      aria-label="Not a button"
      rounded="10%"
      colorScheme="teal"
      cursor="auto"
      size={{ base: "sm", sm: "sm", md: "md", lg: "md" }}
      className="pad-x-2-override"
    />
  ) : (
    <IconButton
      m="0.5"
      rounded="10%"
      colorScheme="teal"
      aria-label="Button"
      size={{ base: "sm", sm: "sm", md: "md", lg: "md" }}
    />
  );
};

const MinesweeperCell: React.FC<MinesweeperCellProps> = ({
  value,
  endGame,
  unhide,
  show,
  coordinate,
}) => {
  const [isHidden, setIsHidden] = useState(true);
  const [flag, setFlag] = useState(false);

  const cellClick = () => {
    if (flag) return;
    if (value === -1) {
      endGame();
    } else {
      unhide(coordinate, value);
    }
  };

  useEffect(() => {
    setIsHidden(!show);
    setFlag(false);
  }, [show]);

  const flagCell = (ev: React.MouseEvent) => {
    ev.preventDefault();
    if (!isHidden) return;
    setFlag(!flag);
  };

  return (
    <GridItem onClick={cellClick} onContextMenu={(e) => flagCell(e)}>
      {isHidden ? (
        <FlaggedCell flag={flag} />
      ) : (
        <IconButton
          m="0.5"
          rounded="10%"
          aria-label="Button"
          size={{ base: "sm", sm: "sm", md: "md", lg: "md" }}
          cursor="auto"
          fontSize="sm"
        >
          {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
          <Center color={useColorModeValue("gray.900", "white")}>
            {isHidden || (value > 0 && value)}
          </Center>
        </IconButton>
      )}
    </GridItem>
  );
};

export default MinesweeperCell;
