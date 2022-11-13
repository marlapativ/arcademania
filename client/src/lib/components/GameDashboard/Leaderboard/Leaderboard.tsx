import {
  Box,
  Center,
  Heading,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { getLeaderboard } from "lib/services/leaderboard-service";
import type { LeaderboardItemData } from "lib/types/components/leaderboard/leaderboard.types";

import LeaderboardItemContainer from "./leaderboardItem/LeaderboardItem";

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardItemData[]>([]);
  useEffect(() => {
    getLeaderboard().then((data) => setLeaderboard(data));
  }, []);

  return (
    <Center>
      <Box
        maxW="445px"
        maxH="88vh"
        w="full"
        bg={useColorModeValue("gray.300", "gray.500")}
        boxShadow="2xl"
        rounded="md"
        p={{ base: "2", sm: "2", md: "4" }}
        overflow="scroll"
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
          <LeaderboardItemContainer users={leaderboard} />
        </Stack>
      </Box>
    </Center>
  );
};

export default Leaderboard;
