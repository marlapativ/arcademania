import { Box, Flex } from "@chakra-ui/react";
import NavBar from "../components/common/NavBar/NavBar";
import LeftPane from "../components/common/leftPane/LeftPane"
import SideBar from "../components/common/leftPane/LeftBar"

import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header>
      <NavBar />
    </header>
  );
};

export default Header;
