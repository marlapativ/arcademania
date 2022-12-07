import { Stack, HStack, Text, VStack, Button, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaRandom } from "react-icons/fa";

import { getGameInfo } from "../games";
import { getFavourites } from "lib/store/slices/favouritesSlice";
import { useSelector } from "lib/store/store";

import FavouriteCard from "./favouriteCard/FavouriteCard";

/**
 * Favourites Page Component.
 * @returns Favourites
 */
const Favourites: React.FC = () => {
  const router = useRouter();
  const { favourites } = useSelector(getFavourites);
  const games = getGameInfo(favourites.map((e) => e.gameId).slice(0, 4));

  return (
    <Stack p={10} justifyContent="center">
      {games.length === 0 ? (
        <VStack mt={45}>
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
              const randomInt = Math.floor(Math.random() * 10);
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
          <HStack pt={10} gap={5} justifyContent="center">
            {games.map((game) => (
              <FavouriteCard game={game} key={game.id} />
            ))}
          </HStack>
        </>
      )}
    </Stack>
  );
};

export default Favourites;
