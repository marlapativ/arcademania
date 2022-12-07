import {
  IconButton,
  Container,
  Heading,
  Stack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { FiStar } from "react-icons/fi";

import {
  getUserPreferences,
  setUserPreferenceRecentlyPlayed,
} from "../../../store/slices/userPreferencesSlice";
import type {
  GameHeaderProps,
  GameInfoComponent,
} from "../../../types/components/common";
import PopOver from "lib/components/common/popover/PopOver";
import * as favouritesService from "lib/services/favourites-service";
import { saveUserPreferences } from "lib/services/user-preference-service";
import { getAuthState } from "lib/store/slices/authSlice";
import {
  setFavourite,
  resetFavourite,
  getFavourites,
} from "lib/store/slices/favouritesSlice";
import { useDispatch, useSelector } from "lib/store/store";
import { raiseError } from "lib/utils/toastUtils";
import { isAuthenticated } from "lib/utils/tokenUtils";

/**
 * This component creates and renders the game header with game name along with help and option to mark favourite
 * @returns GameDashboard Header Component
 */
const GameHeader: React.FC<GameHeaderProps> = ({ gameInfo, helpContent }) => {
  const { favourites } = useSelector(getFavourites);
  const authState = useSelector(getAuthState);
  const { theme, recentlyPlayed } = useSelector(getUserPreferences);

  const isFavourite = favourites.some((e) => e.gameId === gameInfo?.id);

  const dispatch = useDispatch();

  useEffect(() => {
    if (gameInfo !== null && isAuthenticated(authState)) {
      const cloned: number[] = structuredClone(recentlyPlayed || []);
      const index = cloned.indexOf(gameInfo.id);
      if (index !== -1) {
        cloned.splice(index, 1);
      }
      cloned.unshift(gameInfo.id);
      saveUserPreferences(theme, cloned).then(() => {
        dispatch(setUserPreferenceRecentlyPlayed(cloned));
      });
    }
  }, [authState, dispatch, gameInfo, gameInfo.id]);

  /**
   * This method is used to add the game to favourites
   * @param game game object with game info
   * @returns nothing from this method in case of error
   */
  const addFavourite = (game: GameInfoComponent) => {
    if (!game) return;
    if (!isAuthenticated(authState)) {
      raiseError("Login to save your favourites");
      return;
    }
    favouritesService
      .updateFavourite(game.id, !isFavourite)
      .then((favourite) => {
        dispatch(
          !isFavourite ? setFavourite(favourite) : resetFavourite(favourite)
        );
      });
  };
  // returning the JSX
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

// returning the header component
export default GameHeader;
