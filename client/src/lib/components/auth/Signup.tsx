import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FiEye,
  FiEyeOff
} from 'react-icons/fi';
import React from "react";

const SignupDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPassword, setShowPassword] = React.useState(false)
  const handleClick = () => setShowPassword(!showPassword)

  const createUser = () => {
    
    onClose();
  }

  return (
    <>
      <Button variant='outline'
        display={{ base: 'none', md: 'inline-flex' }} color={'white'} bg={'blue.400'}
        _hover={{
          bg: 'blue.300',
        }}
        onClick={onOpen}
        >
       Sign Up
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Create a new account
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
             
              <Flex>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Input
                  id="firstName"
                  placeholder="Please enter first name"
                  required
                />
             
                <FormLabel htmlFor="LastName">Last Name</FormLabel>
                <Input
                  id="lastName"
                  placeholder="Please enter last name"
                  required
                />
              </Flex>
              <Box>
                <FormLabel htmlFor="email">Email</FormLabel>
                <InputGroup>
                <Input
                  id="email"
                  placeholder="Please enter email"
                  required
                />
                </InputGroup>
              </Box>
              <Box>
                <FormLabel htmlFor="username">UserName</FormLabel>
                <Input
                  id="username"
                  placeholder="Please enter user name"
                  required
                />
              </Box>
              
              <Box>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup size='md'>
                  <Input
                    pr='4.5rem'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter password'
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                      {showPassword ? <FiEyeOff/> : <FiEye/>}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
              <Box>
                <FormLabel htmlFor="confirm_password">Confirm Password</FormLabel>
                <InputGroup size='md'>
                  <Input
                    pr='4.5rem'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter password'
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                      {showPassword ? <FiEyeOff/> : <FiEye/>}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={createUser}>Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );

};

export default SignupDrawer;
