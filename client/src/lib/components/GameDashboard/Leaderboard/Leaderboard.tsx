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
    icon: "https://s.gravatar.com/avatar/0fd4415ee5dca68c65ee8171cbeb4d24?s=80",
  },
  {
    id: 2,
    name: "Sai",
    score: 2400,
  },
  {
    id: 3,
    name: "Veronica",
    score: 1400,
    icon: "https://i.pravatar.cc/200",
  },
  {
    id: 4,
    name: "Vello",
    score: 1400,
    icon: "https://i.pravatar.cc/300",
  },
  {
    id: 5,
    name: "Vello",
    score: 1400,
    icon: "https://i.pravatar.cc/400",
  },
  {
    id: 6,
    name: "Vello",
    score: 1400,
  },
  {
    id: 7,
    name: "Vello",
    score: 1400,
  },
  {
    id: 8,
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
    <Center p={1}>
      <Box
        maxW="445px"
        maxH="80vh"
        w="full"
        bg={useColorModeValue("gray.300", "gray.500")}
        boxShadow="2xl"
        rounded="md"
        p={{ base: "2", sm: "2", md: "4" }}
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
