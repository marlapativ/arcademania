import {
  Box,
  Center,
  Text,
  Stack,
  Avatar,
  Icon,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { RiTrophyFill } from "react-icons/ri";

import type {
  LeaderboardItemContainerProps,
  LeaderboardItemProps,
} from "lib/types/components/Leaderboard/leaderboard";

const LeaderboardItem: React.FC<LeaderboardItemProps> = ({
  id,
  icon,
  index,
  name,
  score,
}) => {
  return (
    <Center p={1}>
      <Text
        fontWeight={600}
        px="2"
        color={useColorModeValue("blue.900", "white")}
      >
        {(index ?? 0) + 1}
      </Text>
      <Box
        maxW="450px"
        w="full"
        bg="white"
        boxShadow="2xl"
        rounded="full"
        px={6}
        overflow="hidden"
      >
        <VisuallyHidden>{id}</VisuallyHidden>
        <Stack py={4} direction="row" justifyContent="space-between">
          <Stack direction="row" align="center">
            <Avatar name={name} src={icon} />
            <Text fontWeight={600}>{name}</Text>
          </Stack>
          <Stack direction="row" spacing={2} fontSize="2xl" alignItems="center">
            <Icon alignItems="center">
              <RiTrophyFill color="#ffab20" />
            </Icon>
            <Text color="pink.500">{score}</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

const LeaderboardItemContainer: React.FC<LeaderboardItemContainerProps> = ({
  users,
}) => {
  return (
    <>
      {users.map((e: LeaderboardItemProps, i: number) => (
        <LeaderboardItem
          icon=""
          id={e.id}
          index={i}
          name={e.name}
          score={e.score}
          key={e.id}
        />
      ))}
    </>
  );
};

export default LeaderboardItemContainer;
