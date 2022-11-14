import React, { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import {
  FiEye,
  FiEyeOff
} from 'react-icons/fi';
import { Formik, Field } from "formik";
import { MdVpnKey } from "react-icons/md";

const SignInDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [input, setInput] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const handleClick = () => setShowPassword(!showPassword)
  let isError = false;

  const login = (values: any) => {
    onClose();
  }
  const showErrorMessage = (e:any) => {
    setInput(e.target.value)
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
       Sign In
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Login
          </DrawerHeader>

          <DrawerBody>
          <Formik
          initialValues={{
            email: "",
            password: "",
            rememberMe: false
          }}
          onSubmit={(values) => {
            login(values);
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl isInvalid={!!errors.email && touched.email}>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    variant="filled"
                  />
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup size='md'>
                <InputLeftAddon
              backgroundColor="white"
              color="gray.500"
              children={<Box as={MdVpnKey} />}
            />
                   <Field
                    as={Input}
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    variant="filled"
                    validate={(value: string | any[]) => {
                      let error;

                      if (value.length < 5) {
                        error = "Password must contain at least 6 characters";
                      }

                      return error;
                    }}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                      {showPassword ? <FiEyeOff/> : <FiEye/>}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                 
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <Button type="submit" colorScheme="blue" width="full">
                  Login
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );

};

export default SignInDrawer;
