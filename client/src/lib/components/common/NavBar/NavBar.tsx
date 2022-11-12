import { Box, Button, Flex, Text, Stack, HStack,IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import MenuItems from "../menu/MenuItems";
import {
  FiStar
} from 'react-icons/fi';
const NavBar = () => {
  return (
          <Flex
            bg={useColorModeValue('white', 'gray.800')}
            color={useColorModeValue('gray.600', 'white')}
            minH={'60px'}
            py={{ base: 2 }}
            px={{ base: 4 }}
            borderBottom={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.900')}
            align={'center'}>
            <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiStar />}
        />
       <MenuItems isAuth={false} />
      </HStack>
          </Flex>
  );
};

export default NavBar;