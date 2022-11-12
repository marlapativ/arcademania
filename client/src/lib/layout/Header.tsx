import { Box, Flex } from "@chakra-ui/react";
import NavBar from "../components/common/NavBar/NavBar";
import LeftPane from "../components/common/leftPane/LeftPane"

import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header>
      <NavBar />
      <LeftPane children={undefined}/>
    </header>
  );
};

export default Header;
