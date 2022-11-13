import { Box, Center, Heading } from "@chakra-ui/react";

import type { GameInfo } from "lib/types/components/common";

const GameFooter: React.FC<GameInfo> = ({ name }) => {
  return (
    <Box
      w="full"
      bg="green.400"
      color="white"
      rounded="xl"
      boxShadow="0 5px 20px 0px rgb(72 187 120 / 43%)"
      _focus={{
        bg: "green.500",
      }}
    >
      <Center>
        <Heading size="xl">{name}</Heading>
      </Center>
    </Box>
  );
};

export default GameFooter;
