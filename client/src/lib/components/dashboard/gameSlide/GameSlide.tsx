import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Stack,
  VStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import type { GameInfoComponentProps } from "lib/types/components/common";

const GameSlide: React.FC<GameInfoComponentProps> = ({ game }) => {
  const router = useRouter();
  return (
    <Box>
      <Center>
        <Stack w="75%">
          <HStack>
            <Image alt={game.name} src={game.image} h="30vh" />
            <VStack>
              <Flex>
                <Text as="b" fontSize="4xl">
                  {game.name}
                </Text>
              </Flex>
              <Flex>
                <Text>{game.description}</Text>
              </Flex>
              <Button
                color="white"
                bg="blue.400"
                _hover={{
                  bg: "blue.300",
                }}
                onClick={() => {
                  router.push(`game/${game.id}`);
                }}
              >
                Play Now!
              </Button>
            </VStack>
          </HStack>
        </Stack>
      </Center>
    </Box>
  );
};

export default GameSlide;
