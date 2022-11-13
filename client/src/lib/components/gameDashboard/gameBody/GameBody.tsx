import { Box, Container, Flex, Wrap } from "@chakra-ui/react";

import type { ReactChildrenProps } from "../../../types/globals";

const GameBody: React.FC<ReactChildrenProps> = ({ children }) => {
  return (
    <Container
      bg="#9DC4FB"
      maxW="940px"
      maxH="550px"
      mt={0}
      centerContent
      overflow="hidden"
      rounded="xl"
      boxShadow="0 5px 20px 0px rgb(72 187 120 / 43%)"
    >
      <Flex>
        <Box
          bg="#02054B"
          color="white"
          borderRadius="lg"
          rounded="xl"
          boxShadow="0 5px 20px 0px rgb(72 187 120 / 43%)"
          m={{ sm: 2, md: 8, lg: 6 }}
        >
          <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>{children}</Wrap>
        </Box>
      </Flex>
    </Container>
  );
};

export default GameBody;
