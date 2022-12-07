import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Text,
  HStack,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

import MenuItems from "./MenuItems";

/**
 * This component creates a common navbar with logo on the top left corner
 * and authmodule or user profile on the top right corner
 * @returns NavBar Component
 */
const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box pos="relative" zIndex={99}>
      <Flex
        boxShadow="0 -4px 17px 2px rgb(72 187 120 / 43%)"
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align="center"
      >
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Link href="/">
            <Image src="/images/logo.png" alt="Logo" width={32} height={24} />
          </Link>
          <Link href="/">
            <Text
              size="lg"
              marginLeft="2"
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily="heading"
              color={useColorModeValue("gray.800", "white")}
            >
              ArcadeMania
            </Text>
          </Link>
        </Flex>

        <HStack
          spacing={{ base: "0", md: "6" }}
          flex={{ base: 1, md: 0 }}
          justify="flex-end"
          direction="row"
        >
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          <MenuItems />
        </HStack>
      </Flex>
    </Box>
  );
};

export default NavBar;
