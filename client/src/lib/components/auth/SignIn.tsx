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
import { Formik, Field } from "formik";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdVpnKey } from "react-icons/md";

// import messages from "../common/toastMessages/Messages.json";
// import ToastMessage from "../common/toastMessages/ToastMessage";
import { getAccessToken } from "lib/services/auth-service";

const SignInDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);
  const login = async (values: JSON) => {
    const accessTokenObj = await getAccessToken(values);
    if (accessTokenObj.status === 200) {
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
                      <FormLabel htmlFor="username">UserName</FormLabel>
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
                          } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                              value
                            )
                          ) {
                            error = "Invalid username address";
                          }
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SignInDrawer;
