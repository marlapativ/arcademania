import {
  Center,
  Flex,
  Stack,
  HStack,
  Image,
  Box,
  Text,
  VStack,
  Button,
  useColorModeValue,
  useToken,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import type React from "react";
import { Autoplay, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import games from "lib/components/games";
import type { GameInfoComponentProps } from "lib/types/components/common";

import styles from "./styles/DashboardCarousel.module.scss";

const CarouselGameSlide: React.FC<GameInfoComponentProps> = ({ game }) => {
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

const DashboardCarousel: React.FC = () => {
  const bg = useToken("colors", useColorModeValue("white", "gray.800"));
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop
      centeredSlides
      autoplay={{
        delay: 2500,
        disableOnInteraction: true,
      }}
      pagination={{
        clickable: true,
      }}
      navigation
      modules={[Pagination, Navigation, Autoplay]}
      className={styles.mySwiper}
    >
      {Object.entries(games).map(([id, game]) => {
        return (
          <SwiperSlide
            className={styles.swiperSlide}
            style={{ backgroundColor: bg }}
            key={id}
          >
            <CarouselGameSlide game={game} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default DashboardCarousel;
