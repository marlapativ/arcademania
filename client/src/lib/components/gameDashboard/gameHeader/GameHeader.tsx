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
import {
  setFavourite,
  resetFavourite,
  getFavourites,
} from "lib/store/slices/favouritesSlice";
import { useDispatch, useSelector } from "lib/store/store";

const GameHeader: React.FC<GameHeaderProps> = ({ gameInfo, helpContent }) => {
  const { favourites } = useSelector(getFavourites);
  const isFavourite = favourites.some((e) => e.gameId === gameInfo?.id);

  const dispatch = useDispatch();
  const addFavourite = (game: GameInfoComponent) => {
    if (!game) return;
    favouritesService
      .updateFavourite(game.id, !isFavourite)
      .then((favourite) => {
        dispatch(
          !isFavourite ? setFavourite(favourite) : resetFavourite(favourite)
        );
      });
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
            fontSize="3xl"
            bg=""
            size="lg"
            title="Add to Favourites"
            aria-label="Add to Favourites"
            icon={
              isFavourite ? (
                <FaStar color="ffd416" />
              ) : (
                <FiStar color="a9abab" />
              )
            }
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
