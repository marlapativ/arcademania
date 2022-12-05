import {
  IconButton,
  Container,
  Heading,
  Stack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { FiStar } from "react-icons/fi";

import PopOver from "lib/components/common/popover/PopOver";
import type { GameHeaderProps } from "lib/types/components/common";

const GameHeader: React.FC<GameHeaderProps> = ({
  gameInfo,
  helpContent,
  isFavourite,
}) => {
  return (
    <Stack px={2} w="full" rounded="xl">
      <HStack justifyContent="space-between">
        <Heading size="xl" color={useColorModeValue("gray.600", "white")}>
          {gameInfo?.name}
        </Heading>
        <HStack>
          <Container float="right" ml={5} width="10%" mt={1}>
            <PopOver
              popOverHeader="Help"
              popOverCotent={helpContent}
              triggerButtonText="Help"
            />
          </Container>
          <IconButton
            ml={5}
            mr={5}
            size="lg"
            aria-label="Add to Favourites"
            icon={isFavourite ? <FiStar /> : <FaStar />}
            float="right"
          />
        </HStack>
      </HStack>
    </Stack>
  );
};

export default GameHeader;
