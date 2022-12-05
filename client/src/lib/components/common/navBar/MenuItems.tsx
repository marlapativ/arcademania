import {
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  Menu,
  useColorModeValue,
  Text,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import type React from "react";
import { FiChevronDown } from "react-icons/fi";

import SignInDrawer from "../../auth/SignIn";
import SignupDrawer from "../../auth/Signup";
import { signOut } from "lib/services/auth-service";
import type { AuthProps } from "lib/types/components/auth.types";

const LoggedInMenu = () => {
  const token = "";
  return (
    <Flex alignItems="center">
      <Menu>
        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
          <HStack>
            <Avatar
              size="sm"
              src="https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
            />
            <VStack
              display={{ base: "none", md: "flex" }}
              alignItems="flex-start"
              spacing="1px"
              ml="2"
            >
              <Text fontSize="sm">Justina Clark</Text>
              <Text fontSize="xs" color="gray.600">
                Admin
              </Text>
            </VStack>
            <Box display={{ base: "none", md: "flex" }}>
              <FiChevronDown />
            </Box>
          </HStack>
        </MenuButton>
        <MenuList
          bg={useColorModeValue("white", "gray.900")}
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem>Favourites</MenuItem>
          <MenuDivider />
          <MenuItem onClick={() => signOut(token)}>Sign out</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

const SignInMenu = () => {
  return (
    <HStack
      flex={{ base: 1, md: 0 }}
      justify="flex-end"
      direction="row"
      spacing={4}
    >
      <Stack
        flex={{ base: 1, md: 0 }}
        justify="flex-end"
        direction="row"
        spacing={4}
      >
        <SignupDrawer />
        <SignInDrawer />
      </Stack>
    </HStack>
  );
};

const MenuItems: React.FC<AuthProps> = () => {
  const { data: session } = useSession();
  if (session) return <LoggedInMenu />;
  return <SignInMenu />;
};

export default MenuItems;
