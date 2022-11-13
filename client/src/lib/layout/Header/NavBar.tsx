import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  return (
    <header>
      <nav>
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
            <Flex
              flex={{ base: 1 }}
              justify={{ base: "center", md: "start" }}
              alignItems="center"
            >
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={32}
                  height={24}
                />
              </Link>
              <Link href="/">
                <Heading
                  size="lg"
                  marginLeft="2"
                  textAlign={useBreakpointValue({ base: "center", md: "left" })}
                  fontFamily="heading"
                  color={useColorModeValue("gray.800", "white")}
                >
                  ArcadeMania
                </Heading>
              </Link>
            </Flex>

            <Stack
              flex={{ base: 1, md: 0 }}
              justify="flex-end"
              direction="row"
              spacing={4}
            >
              <ThemeToggle />
              <Button variant="outline" id="signin">
                Sign In
              </Button>
            </Stack>
          </Flex>
        </Box>
      </nav>
    </header>
  );
};

export default NavBar;
