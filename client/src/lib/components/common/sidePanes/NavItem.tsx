import {
  Flex,
  Menu,
  Link,
  MenuButton,
  MenuList,
  Icon,
  Text,
} from "@chakra-ui/react";
import type React from "react";

import type { NavItemProps } from "../../../types/components/common";

const NavItem: React.FC<NavItemProps> = ({ navSize, title, icon, active }) => {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize === "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <Link
          backgroundColor={active ? "AEC8CA" : "none"}
          p={navSize === "small" ? "23px" : "5px"}
          borderRadius={8}
          _hover={{ textDecor: "none", background: "#AEC8CA" }}
          w="100%"
        >
          <MenuButton w="100%">
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
          </MenuButton>
          <MenuList />
        </Link>
      </Menu>
    </Flex>
  );
};

export default NavItem;
