import Image from "next/image";
import Link from "next/link";
import { FiStar } from "react-icons/fi";
import MenuItems from "./MenuItems";
import {
  Box,
  Button,
  Flex,
  Text,
  HStack,
  IconButton,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box>
      <Flex
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

          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<FiStar />}
          />
          <MenuItems isAuth={false} />
        </HStack>
      </Flex>
    </Box>
  );
};

export default NavBar;