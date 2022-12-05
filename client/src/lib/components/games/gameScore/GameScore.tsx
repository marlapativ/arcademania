/* eslint-disable react-hooks/rules-of-hooks */
import { Heading, Stack, VStack, useColorModeValue, HStack,Text } from "@chakra-ui/react";

import type { ScoreProps } from "lib/types/components/games/games.common";

const GameScore: React.FC<ScoreProps> = ({ score, show }) => {
  if (!show) return null;
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      mt={2}
      rounded="xl"
      width="full"
    >
      <HStack
        m={1}
        p={1}
        bg="green.400"
        color="white"
        rounded="xl"
        boxShadow="0 5px 20px 0px rgb(72 187 120 / 43%)"
      >
        <Heading size="md">Score: {score}</Heading>
        <Text>Header</Text>
      </HStack>

    </Stack>
  );
};

export default GameScore;
