import { Box, IconButton, Container } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { FiStar } from "react-icons/fi";

import PopOver from "lib/components/common/popover/PopOver";
import type { GameHeaderProps } from "lib/types/components/common";

const GameHeader: React.FC<GameHeaderProps> = ({
  children,
  helpContent,
  isFavourite,
}) => {
  return (
    <Box p={0} w="full" rounded="xl">
      <Container>{children}</Container>
      <IconButton
        ml={5}
        mr={5}
        size="lg"
        aria-label="Add to Favourites"
        icon={isFavourite ? <FiStar /> : <FaStar />}
        float="right"
      />
      <Container float="right" ml={5} width="10%" mt={1}>
        <PopOver
          popOverHeader="Help"
          popOverCotent={helpContent}
          triggerButtonText="Help"
        />
      </Container>
    </Box>
  );
};

export default GameHeader;
