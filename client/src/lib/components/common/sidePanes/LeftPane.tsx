import {
  Divider,
  Flex,
  IconButton,
  Button,
  Icon,
  Text,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaRandom } from "react-icons/fa";
import { FiMenu, FiHome, FiStar } from "react-icons/fi";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";

import type { GameInfo, NavItemProps } from "../../../types/components/common";
import { getGameInfo } from "lib/components/games";
import { getFavourites } from "lib/store/slices/favouritesSlice";
import { useSelector } from "lib/store/store";

import { NavItemMenu } from "./NavItem";

type GameNavbarProps = NavItemProps & {
  games: GameInfo[];
};

const NavItem: React.FC<NavItemProps> = ({
  navSize,
  active,
  title,
  icon,
  onClick,
}) => {
  return (
    <Flex
      mt={5}
      flexDir="column"
      w="100%"
      alignItems={navSize === "small" ? "center" : "flex-start"}
      title={title}
    >
      <Button
        variant="ghost"
        size="lg"
        h="100%"
        w="100%"
        backgroundColor={active ? "AEC8CA" : "none"}
        p={navSize === "small" ? "23px" : "5px"}
        borderRadius={8}
        _hover={{ textDecor: "none", background: "#AEC8CA" }}
        onClick={onClick}
        title={title}
      >
        <Flex>
          <Icon
            as={icon}
            fontSize="xl"
            color={active ? "#82AAAD" : "gray.500"}
          />
          <Text
            ml={5}
            display={navSize === "small" ? "none" : "flex"}
            transition="0.5s ease-out"
          >
            {title}
          </Text>
        </Flex>
      </Button>
    </Flex>
  );
};

const FavouriteGames: React.FC<GameNavbarProps> = ({
  games,
  active,
  navSize,
  icon,
}) => {
  const router = useRouter();
  const allGames = getGameInfo();
  const randomGame = allGames[Math.floor(Math.random() * allGames.length)];
  return games.length === 0 ? (
    <>
      {active ? null : (
        <>
          <Text mt={2} textAlign="center">
            No Favourites yet!
          </Text>
          <Divider mt="28" display={navSize === "small" ? "none" : "flex"} />
          <Text as="u" textAlign="center">
            Play a Random game meanwhile!
          </Text>
        </>
      )}
      <NavItem
        key={randomGame.id}
        active={active}
        icon={FaRandom}
        title={randomGame.name}
        navSize={navSize}
        onClick={() => {
          router.push({
            pathname: `/game/[gameid]`,
            query: { gameid: randomGame.id },
          });
        }}
      />
    </>
  ) : (
    <>
      {games.map((game) => (
        <NavItem
          key={game.id}
          active={active}
          icon={game.icon || icon}
          title={game.name}
          navSize={navSize}
          onClick={() => {
            router.push({
              pathname: `/game/[gameid]`,
              query: { gameid: game.id },
            });
          }}
        />
      ))}
    </>
  );
};

const Favourites: React.FC<{ games: GameInfo[] }> = ({ games }) => {
  const router = useRouter();
  const clickHandler = (gameId: number) => {
    router.push({
      pathname: `/game/[gameid]`,
      query: { gameid: gameId },
    });
  };
  return games.length === 0 ? (
    <div />
  ) : (
    <MenuList>
      {games.map((game) => (
        <MenuItem
          justifyContent="center"
          key={game.id}
          onClick={() => {
            clickHandler(game.id);
          }}
        >
          {game.name}
        </MenuItem>
      ))}
    </MenuList>
  );
};

const LeftPane = () => {
  const router = useRouter();
  const [navSize, changeNavSize] = useState("small");
  const [isOpen, setOpenState] = useState(true);
  const { favourites } = useSelector(getFavourites);
  const games = getGameInfo(favourites.map((e) => e.gameId).slice(0, 4));

  return (
    <Flex
      pos="sticky"
      margin-top="2.5"
      boxShadow="0 5px 20px 0px rgb(72 187 120 / 43%)"
      h="100%"
      w={navSize === "small" ? "75px" : "200px"}
      flexDir="column"
      justifyContent="space-between"
      display="inline-block"
      transition="0.1s ease-out"
    >
      <Flex
        p="5%"
        pos="sticky"
        margin-top="2.5"
        boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.1)"
        h="full"
        w={navSize === "small" ? "75px" : "200px"}
        flexDir="column"
        align-items={navSize === "small" ? "center" : "flex-start"}
        as="nav"
      >
        <IconButton
          background="none"
          mt={5}
          _hover={{ background: "none" }}
          aria-label=""
          icon={<FiMenu />}
          onClick={() => {
            if (navSize === "small") {
              changeNavSize("large");
              setOpenState(false);
            } else {
              changeNavSize("small");
              setOpenState(true);
            }
          }}
        />

        <NavItem
          navSize={navSize}
          active={isOpen}
          icon={FiHome}
          title="Dashboard"
          onClick={() => {
            router.push(`/`);
          }}
        />
        <NavItemMenu
          navSize={navSize}
          title="Favourites"
          icon={FiStar}
          active={isOpen}
        >
          <Favourites games={games} />
        </NavItemMenu>
        <Divider display={navSize === "small" ? "none" : "flex"} />
        <FavouriteGames
          games={games}
          navSize={navSize}
          active={isOpen}
          icon={GiPerspectiveDiceSixFacesRandom}
          title="Favourite Games"
        />
      </Flex>
    </Flex>
  );
};

export default LeftPane;
