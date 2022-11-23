import {
  Box,
  Center,
  Heading,
  Spinner,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { getLeaderboard } from "lib/services/leaderboard-service";
import type { GameInfoProps } from "lib/types/components/common";
import type {
  LeaderboardItemContainerProps,
  LeaderboardItemData,
} from "lib/types/components/leaderboard/leaderboard.types";

import LeaderboardItemContainer from "./leaderboardItem/LeaderboardItem";

const LeaderboardElement: React.FC<LeaderboardItemContainerProps> = ({
  users,
}) => {
  return (
    <Center>
      <Box
        maxW="445px"
        maxH="88vh"
        w="full"
        bg={useColorModeValue("gray.300", "gray.800")}
        rounded="md"
        p={{ base: "1", sm: "1", md: "2" }}
        overflow="scroll"
        boxShadow="0 5px 20px 0px rgb(72 187 120 / 43%)"
      >
        <Stack>
          <Heading
            color={useColorModeValue("blue.900", "white")}
            textTransform="uppercase"
            fontWeight={800}
            letterSpacing={1.1}
            fontSize="xl"
            fontFamily="body"
            p={{ base: "1", sm: "1", md: "2" }}
          >
            Top Players
          </Heading>
          <LeaderboardItemContainer users={users} />
        </Stack>
      </Box>
    </Center>
  );
};

const Loader: React.FC = () => {
  return (
    <Center alignItems="center" my="20" py="20">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Center>
  );
};

const Leaderboard: React.FC<GameInfoProps> = ({ id }) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardItemData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLeaderboard(id).then((data) => {
      setLeaderboard(data);
      setIsLoading(false);
    });
  }, [id]);

  return isLoading ? <Loader /> : <LeaderboardElement users={leaderboard} />;
};

export default Leaderboard;
