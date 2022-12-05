import {
  Grid,
  GridItem,
  Flex,
  Text,
  Box,
  Image,
  Center,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Button,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import type { SliderGameProps } from "../../../types/components/common";
import games from "lib/components/games";

const SliderGame: React.FC<SliderGameProps> = ({
  id,
  maxH,
  maxW,
  popoverPlacement,
}) => {
  const game = games[id];
  const router = useRouter();
  return (
    <Popover trigger="hover" placement={popoverPlacement}>
      <PopoverTrigger>
        <Center borderRadius="xl">
          <Image maxH={maxH} w={maxW} alt={game.name} src={game.altImage} />
        </Center>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <Text as="b" fontSize="2xl">
            {game.name}
          </Text>
        </PopoverHeader>
        <PopoverBody>
          <Stack>
            <VStack>
              <Text>{game.description}</Text>
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
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const DashboardSlider: React.FC = () => {
  return (
    <Box>
      <Flex>
        <Text textAlign="left" fontSize="xl">
          Featured Games :
        </Text>
      </Flex>
      <Grid my={2} h="38vh" w="80vw" templateColumns="repeat(4, 1fr)" gap={4}>
        <GridItem colSpan={1}>
          <SliderGame id={1} maxH="38vh" maxW="full" popoverPlacement="right" />
        </GridItem>
        <GridItem colSpan={2}>
          <SliderGame id={3} maxH="38vh" maxW="full" popoverPlacement="top" />
        </GridItem>
        <GridItem colSpan={1}>
          <SliderGame id={5} maxH="38vh" maxW="full" popoverPlacement="left" />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default DashboardSlider;
