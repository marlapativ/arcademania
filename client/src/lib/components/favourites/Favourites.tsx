import { Stack, HStack, Text, VStack, Button, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaRandom } from "react-icons/fa";

import { getGameInfo } from "../games";
import { getFavourites } from "lib/store/slices/favouritesSlice";
import { getUserPreferences } from "lib/store/slices/userPreferencesSlice";
import { useSelector } from "lib/store/store";
import type { GameInfo } from "lib/types/components/common";

import FavouriteCard from "./favouriteCard/FavouriteCard";

/**
 * Favourites Page Component.
 * @returns Favourites
 */
const Favourites: React.FC = () => {
  const router = useRouter();
  const { favourites } = useSelector(getFavourites);
  const { recentlyPlayed } = useSelector(getUserPreferences);
  const favGames = getGameInfo(favourites.map((e) => e.gameId).slice(0, 4));
  const gameInfo = getGameInfo();
  const recentlyPlayedGames = recentlyPlayed
    .map((e) => {
      const g = gameInfo.filter((game) => e === game.id);
      return g.length > 0 ? g[0] : (null as unknown as GameInfo);
    })
    .filter((e) => e != null)
    .slice(0, 4);

  return (
    <Stack p={10} justifyContent="center">
      {favGames.length === 0 ? (
        <VStack mt={2}>
          <Text textAlign="center" fontSize="5xl">
            Uh Oh!
          </Text>
          <Text textAlign="center" fontSize="3xl">
            You don&apos;t have any favourites yet!
          </Text>
          <Button
            size="lg"
            color="white"
            bg="blue.400"
            _hover={{
              bg: "blue.300",
            }}
            my="10"
            onClick={() => {
              const randomInt = Math.floor(Math.random() * gameInfo.length + 1);
              router.push({
                pathname: `/game/[gameid]`,
                query: { gameid: randomInt },
              });
            }}
          >
            <Icon color="white" as={FaRandom} fontSize="xl" />
            <Text pl={3}>Play a random game!</Text>
          </Button>
        </VStack>
      ) : (
        <>
          <Text fontSize="3xl">Your Favourites</Text>
          <HStack py={10} gap={5} justifyContent="center">
            {favGames.map((game) => (
              <FavouriteCard game={game} key={game.id} />
            ))}
          </HStack>
        </>
      )}
      {recentlyPlayedGames.length > 0 ? (
        <>
          <Text fontSize="3xl">Recently Played</Text>
          <HStack pt={10} gap={5} justifyContent="center">
            {recentlyPlayedGames.map((game) => (
              <FavouriteCard game={game} key={game.id} />
            ))}
          </HStack>
        </>
      ) : null}
    </Stack>
  );
};

export default Favourites;
