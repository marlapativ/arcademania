import {
  Box,
  Center,
  Heading,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import type { LeaderboardItemProps } from "lib/types/components/Leaderboard/leaderboard";

import LeaderboardItemContainer from "./LeaderboardItem/LeaderboardItem";

const elements: LeaderboardItemProps[] = [
  {
    id: 1,
    name: "Teja",
    score: 3400,
  },
  {
    id: 2,
    name: "Sai",
    score: 2400,
  },
  {
    id: 1,
    name: "Vello",
    score: 1400,
  },
  {
    id: 1,
    name: "Vello",
    score: 1400,
  },
  {
    id: 1,
    name: "Vello",
    score: 1400,
  },
  {
    id: 1,
    name: "Vello",
    score: 1400,
  },
  {
    id: 1,
    name: "Vello",
    score: 1400,
  },
  {
    id: 1,
    name: "Vello",
    score: 1400,
  },
];

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardItemProps[]>([]);
  useEffect(() => {
    // TODO: Implement Fetch
    setLeaderboard(elements);
  }, []);

  return (
    <Center p={2}>
      <Box
        maxW="445px"
        maxH="80vh"
        w="full"
        bg={useColorModeValue("gray.300", "gray.500")}
        boxShadow="2xl"
        rounded="md"
        p={4}
        overflow="hidden"
      >
        <Stack>
          <Heading
            color={useColorModeValue("blue.900", "white")}
            textTransform="uppercase"
            fontWeight={800}
            letterSpacing={1.1}
            fontSize="xl"
            fontFamily="body"
            p={2}
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
