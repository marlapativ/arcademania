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

import type {
  GameHeaderProps,
  GameInfoComponent,
} from "../../../types/components/common";
import PopOver from "lib/components/common/popover/PopOver";
import * as favouritesService from "lib/services/favourites-service";
import { setFavourite } from "lib/store/slices/favouritesSlice";
import { useDispatch } from "lib/store/store";

const GameHeader: React.FC<GameHeaderProps> = ({
  gameInfo,
  helpContent,
  isFavourite,
}) => {
  const dispatch = useDispatch();
  const addFavourite = (game: GameInfoComponent) => {
    if (!game) return;
    favouritesService
      .setFavourite(game.id, !isFavourite)
      .then(() =>
        dispatch(setFavourite({ id: game.id, isFavourite: !isFavourite }))
      );
  };

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
            mx={5}
            size="lg"
            title="Add to Favourites"
            aria-label="Add to Favourites"
            icon={isFavourite ? <FiStar /> : <FaStar />}
            float="right"
            onClick={() => {
              addFavourite(gameInfo);
            }}
          />
        </HStack>
      </HStack>
    </Stack>
  );
};

export default GameHeader;
