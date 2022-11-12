import Link from "next/link";
import Image from 'next/image';
import { Box, Button, Flex, Text, Stack, useBreakpointValue, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <header>
      <nav>

        <Box>

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


            <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
              <Link href={"/"}>
                <Image src="/images/logo.png" alt="Logo" width={32} height={24} />
              </Link>
              <Link href={"/"}>
                <Text
                  size={'lg'}
                  marginLeft="2"
                  textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                  fontFamily={'heading'}
                  color={useColorModeValue('gray.800', 'white')}>
                  ArcadeMania
                </Text>
              </Link>
            </Flex>

            <Stack
              flex={{ base: 1, md: 0 }}
              justify={'flex-end'}
              direction={'row'}
              spacing={4}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Button variant='outline'> Sign In </Button>
              <Button
                variant='outline'
                display={{ base: 'none', md: 'inline-flex' }} color={'white'} bg={'blue.400'}
                _hover={{
                  bg: 'blue.300',
                }}>
                Sign Up
              </Button>

            </Stack>
          </Flex>
        </Box>
      </nav>
    </header>
  );
};

export default NavBar;