import {
  Box,
  Center,
  Text,
  Stack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { RiTrophyFill } from "react-icons/ri";

import GameAvatar from "../../../User/GameAvatar/GameAvatar";
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
        <Stack py={4} direction="row" justifyContent="space-between">
          <Stack direction="row" align="center">
            <GameAvatar id={id} name={name} icon={icon} />
            <Text fontWeight={600}>{name}</Text>
          </Stack>
          <Stack direction="row" spacing={2} fontSize="2xl" alignItems="center">
            {index === 0 ? (
              <Icon alignItems="center">
                <RiTrophyFill color="#ffab20" />
              </Icon>
            ) : null}
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
          icon={e.icon}
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
