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
  Link,
  Center,
} from "@chakra-ui/react";
import { Formik, Field } from "formik";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdVpnKey } from "react-icons/md";

import { setAxiosAuthHeader } from "lib/config/axios.config";
import { signIn } from "lib/services/auth-service";
import { setAccessToken } from "lib/store/slices/authSlice";
import { useDispatch } from "lib/store/store";
import { setSessionStorageToken } from "lib/utils/tokenUtils";
// import messages from "../common/toastMessages/Messages.json";
// import ToastMessage from "../common/toastMessages/ToastMessage";

const SignInDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);
  const login = async (values: JSON) => {
    const accessTokenObj = await signIn(values);
    if (accessTokenObj.status === 200) {
      const body = await accessTokenObj.json();
      if (body.accessToken !== null) {
        setAxiosAuthHeader(body.accessToken);
        setSessionStorageToken(body.accessToken);
        dispatch(setAccessToken({ token: body.accessToken }));
      }
      // <ToastMessage
      //   messageTitle={messages.signinSuccessTitle}
      //   messageDesc={messages.siginSuccessDesc}
      // />;
      onClose();
    }
  };

  return (
    <>
      <Button
        variant="outline"
        display={{ base: "none", md: "inline-flex" }}
        color="white"
        bg="blue.400"
        _hover={{
          bg: "blue.300",
        }}
        onClick={onOpen}
      >
        Sign In
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Login</DrawerHeader>

          <DrawerBody>
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              onSubmit={(values) => {
                login(JSON.parse(JSON.stringify(values)));
              }}
            >
              {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="flex-start">
                    <FormControl
                      isInvalid={!!errors.username && touched.username}
                    >
                      <FormLabel htmlFor="username">Username</FormLabel>
                      <Field
                        as={Input}
                        id="username"
                        name="username"
                        type="username"
                        variant="filled"
                        validate={(value: string) => {
                          let error;
                          if (!value) {
                            error = "username is required";
                          }
                          // else if (
                          //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                          //     value
                          //   )
                          // ) {
                          //   error = "Invalid username address";
                          // }
                          return error;
                        }}
                      />
                      <FormErrorMessage>{errors.username}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.password && touched.password}
                    >
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <InputGroup size="md">
                        <InputLeftAddon
                          backgroundColor="white"
                          color="gray.500"
                        >
                          <Box as={MdVpnKey} />
                        </InputLeftAddon>
                        <Field
                          as={Input}
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          variant="filled"
                          validate={(value: string) => {
                            let error;

                            if (value.length < 5) {
                              error =
                                "Password must contain at least 6 characters";
                            }

                            return error;
                          }}
                        />
                        <InputRightElement width="4.5rem">
                          <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {showPassword ? <FiEyeOff /> : <FiEye />}
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
            <Center m={3}>or</Center>
            <Center>
              <Button
                bg="blue.500"
                color="white"
                _hover={{ background: "blue.600" }}
              >
                <Link
                  _hover={{ textDecoration: "none" }}
                  href="http://localhost:8080/api/v1/auth/google"
                >
                  Signin With Google
                </Link>
              </Button>
            </Center>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SignInDrawer;
