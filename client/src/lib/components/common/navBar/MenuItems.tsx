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
import Link from "next/link";
import type React from "react";
import { FiChevronDown } from "react-icons/fi";

import SignInDrawer from "../../auth/SignIn";
import SignupDrawer from "../../auth/Signup";
import { signOut } from "lib/services/auth-service";
import { getAuthState } from "lib/store/slices/authSlice";
import { useSelector } from "lib/store/store";
import type { AuthProps } from "lib/types/components/auth.types";
import { getSessionStorageToken } from "lib/utils/tokenUtils";

const LoggedInMenu = () => {
  const token = getSessionStorageToken();
  return (
    <Flex alignItems="center" zIndex={1001}>
      <Menu>
        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
          <HStack>
            <Avatar size="sm" src="/images/profile.png" />
            <VStack
              display={{ base: "none", md: "flex" }}
              alignItems="flex-start"
              spacing="1px"
              ml="2"
            >
              <Text fontSize="sm">Justina Clark</Text>
            </VStack>
            <Box display={{ base: "none", md: "flex" }}>
              <FiChevronDown />
            </Box>
          </HStack>
        </MenuButton>
        <MenuList
          bg={useColorModeValue("white", "gray.900")}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          zIndex={1000}
        >
          <MenuItem>
            <Link href="http://localhost:3000/profile/myProfile">Profile</Link>
          </MenuItem>
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
  const { token } = useSelector(getAuthState);
  if (token && token !== "") return <LoggedInMenu />;
  return <SignInMenu />;
};

export default MenuItems;
