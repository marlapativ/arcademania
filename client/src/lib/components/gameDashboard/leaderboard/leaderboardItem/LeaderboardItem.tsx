import {
  Box,
  Center,
  Text,
  Stack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { RiTrophyFill } from "react-icons/ri";

import GameAvatar from "../../../user/gameAvatar/GameAvatar";
import type {
  LeaderboardItemContainerProps,
  LeaderboardItemData,
} from "lib/types/components/leaderboard/leaderboard.types";
import { numberWithCommas } from "lib/utils/numberUtils";

const LeaderboardItem: React.FC<LeaderboardItemData> = ({
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
        px={3}
        overflow="hidden"
      >
        <Stack py={2} direction="row" justifyContent="space-between">
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
            <Text color="pink.500">{numberWithCommas(score)}</Text>
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
      {users.map((e: LeaderboardItemData, i: number) => (
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
