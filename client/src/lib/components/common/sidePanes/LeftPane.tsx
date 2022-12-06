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
import { FiMenu, FiHome, FiStar } from "react-icons/fi";

import { getGameInfo } from "lib/components/games";
import { getFavourites } from "lib/store/slices/favouritesSlice";
import { useSelector } from "lib/store/store";

import { NavItemMenu } from "./NavItem";

const Favourites: React.FC = () => {
  const router = useRouter();
  const { favourites } = useSelector(getFavourites);
  const games = getGameInfo(favourites.map((e) => e.gameId).slice(0, 5));
  return games.length === 0 ? (
    <div />
  ) : (
    <MenuList>
      {games.map((game) => (
        <MenuItem
          justifyContent="center"
          key={game.id}
          onClick={() => {
            router.push({
              pathname: `/game/[gameid]`,
              query: { gameid: game.id },
            });
          }}
        >
          {game.name}
        </MenuItem>
      ))}
    </MenuList>
  );
};

const LeftPane = () => {
  const [navSize, changeNavSize] = useState("small");
  const [isOpen, setOpenState] = useState(false);
  const router = useRouter();
  return (
    <Flex
      pos="sticky"
      margin-top="2.5"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.1)"
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

        <Flex
          mt={30}
          flexDir="column"
          w="100%"
          alignItems={navSize === "small" ? "center" : "flex-start"}
        >
          <Button
            variant="ghost"
            size="lg"
            h="100%"
            w="100%"
            backgroundColor={isOpen ? "AEC8CA" : "none"}
            p={navSize === "small" ? "23px" : "5px"}
            borderRadius={8}
            _hover={{ textDecor: "none", background: "#AEC8CA" }}
            onClick={() => {
              router.push(`/`);
            }}
          >
            <Flex>
              <Icon
                as={FiHome}
                fontSize="xl"
                color={isOpen ? "#82AAAD" : "gray.500"}
              />
              <Text
                ml={5}
                display={navSize === "small" ? "none" : "flex"}
                transition="0.5s ease-out"
              >
                Dashboard
              </Text>
            </Flex>
          </Button>
        </Flex>

        <NavItemMenu
          navSize={navSize}
          title="Favourites"
          icon={FiStar}
          active={isOpen}
        >
          <Favourites />
        </NavItemMenu>
        <Divider display={navSize === "small" ? "none" : "flex"} />
      </Flex>
    </Flex>
  );
};

export default LeftPane;
