import { Divider, Flex, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { FiMenu, FiHome, FiClock, FiStar } from "react-icons/fi";

import NavItem from "./NavItem";

const LeftPane = () => {
  const [navSize, changeNavSize] = useState("small");
  const [isOpen, setOpenState] = useState(false);
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
        h="100%"
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
          title="Dashboard"
          icon={FiHome}
          active={isOpen}
        />
        <NavItem
          navSize={navSize}
          title="Recently Played"
          icon={FiClock}
          active={isOpen}
        />
        <Divider display={navSize === "small" ? "none" : "flex"} />
        <NavItem
          navSize={navSize}
          title="Favourites"
          icon={FiStar}
          active={isOpen}
        />
      </Flex>
    </Flex>
  );
};

export default LeftPane;
