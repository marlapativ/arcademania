import React, { useState } from "react";
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
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FiEye,
  FiEyeOff
} from 'react-icons/fi';

const SignupDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [input, setInput] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const handleClick = () => setShowPassword(!showPassword)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const handlePassClick = () => setShowConfirmPassword(!showConfirmPassword)
  let isError = false;

  const createUser = () => {
    onClose();
  }
  const showErrorMessage = (e:any) => {
    const handleInputChange = (e:any) => setInput(e.target.value)
    isError = input === ''
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
              <FormControl isInvalid={isError} mr={3}>
                <FormLabel htmlFor="firstName" pl={1}>First Name</FormLabel>
                <Input
                  id="firstName"
                  placeholder="Please enter first name"
                  onChange={showErrorMessage}
                  
                />
             </FormControl>
             <FormControl isRequired>
                <FormLabel htmlFor="LastName" pl={1}>Last Name</FormLabel>
                <Input
                  id="lastName"
                  placeholder="Please enter last name"
                  required
                />
                </FormControl>
              </Flex>
              <Box>
              <FormControl isRequired isInvalid={isError}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <InputGroup>
                <Input
                  id="email"
                  placeholder="Please enter email"
                  type="email"
                  onChange={showErrorMessage}
                />
                </InputGroup>
                {!isError ? (
                <FormHelperText display="block">
                  Enter the email you'd like to receive the verification code.
                </FormHelperText>
                ) : (
                <FormErrorMessage display="block">Email is required.</FormErrorMessage>
                )}
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired >
                <FormLabel htmlFor="username">UserName</FormLabel>
                <Input
                  id="username"
                  placeholder="Please enter user name"
                  required
                />
                </FormControl>
              </Box>
              
              <Box>
              <FormControl isRequired>
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
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                <FormLabel htmlFor="confirm_password">Confirm Password</FormLabel>
                <InputGroup size='md'>
                  <Input
                    pr='4.5rem'
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='Enter password'
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handlePassClick}>
                      {showConfirmPassword ? <FiEyeOff/> : <FiEye/>}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                </FormControl>
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
