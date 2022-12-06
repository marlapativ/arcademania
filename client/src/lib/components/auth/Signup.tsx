/* eslint-disable @typescript-eslint/no-explicit-any */
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
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { Formik, Field } from "formik";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdVpnKey } from "react-icons/md";

import { createUser } from "lib/services/auth-service";
import type { SignUpUserType } from "lib/types/components/auth.types";

const SignupDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handlePassClick = () => setShowConfirmPassword(!showConfirmPassword);
  let password = "";

  const userSignUp = (values: SignUpUserType) => {
    const jsonValues = {
      name: `${values.firstName} ${values.lastName}`,
      email: values.email,
      username: values.username,
      password: values.password,
    };
    createUser(JSON.parse(JSON.stringify(jsonValues)));
    onClose();
  };

  const setPassword = (value: string) => {
    password = value;
  };

  const validatePassword = (value: string) => {
    let error;
    if (!value) error = "Password is required";
    else if (value.length < 5)
      error = "Password must contain at least 6 characters";
    if (!error) {
      setPassword(value);
    }
    return error;
  };

  const validateConfirmPassword = (value: string) => {
    let error;
    if (!(value === password)) {
      error = "Password doesn't match with password field";
    }
    return error;
  };

  const validateUsername = (value: string) => {
    let error;
    if (!value) {
      error = "UserName is required";
    }
    return error;
  };

  const validateEmail = (value: string) => {
    let error;
    if (!value) {
      error = "email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  };

  const validateLastName = (value: string) => {
    let error;
    if (!value) {
      error = "Last Name is required";
    }
    return error;
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
        Sign Up
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Create a new account
          </DrawerHeader>
          <DrawerBody>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                username: "",
                password: "",
                confirmpassword: "",
              }}
              onSubmit={(values) => {
                userSignUp(JSON.parse(JSON.stringify(values)));
              }}
            >
              {({ handleSubmit }) => (
                <form id="signup-form" onSubmit={handleSubmit}>
                  <Stack spacing="24px">
                    <FormControl>
                      <Flex>
                        <Field name="firstName">
                          {({ field }: any) => (
                            <FormControl mr={3}>
                              <FormLabel htmlFor="firstName" pl={1}>
                                First Name
                              </FormLabel>
                              <Input
                                {...field}
                                id="firstName"
                                placeholder="First name"
                              />
                            </FormControl>
                          )}
                        </Field>
                        <Field name="lastName" validate={validateLastName}>
                          {({ field, form }: any) => (
                            <FormControl
                              isRequired
                              isInvalid={
                                form.errors.lastName && form.touched.lastName
                              }
                            >
                              <FormLabel htmlFor="LastName" pl={1}>
                                Last Name
                              </FormLabel>
                              <Input
                                {...field}
                                id="lastName"
                                placeholder="Last name"
                                required
                              />
                              <FormErrorMessage display="block">
                                {form.errors.lastName}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>
                      <Box>
                        <Field name="email" validate={validateEmail}>
                          {({ field, form }: any) => (
                            <FormControl
                              isRequired
                              isInvalid={
                                form.errors.email && form.touched.email
                              }
                            >
                              <FormLabel htmlFor="email">Email</FormLabel>
                              <InputGroup>
                                <Input
                                  {...field}
                                  id="email"
                                  placeholder="Please enter email"
                                  type="email"
                                />
                              </InputGroup>
                              <FormErrorMessage>
                                {form.errors.email}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Box>
                      <Box>
                        <Field name="username" validate={validateUsername}>
                          {({ field, form }: any) => (
                            <FormControl
                              isRequired
                              isInvalid={
                                form.errors.username && form.touched.username
                              }
                            >
                              <FormLabel htmlFor="username">UserName</FormLabel>
                              <Input
                                {...field}
                                id="username"
                                placeholder="Please enter user name"
                              />
                              <FormErrorMessage>
                                {form.errors.username}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Box>

                      <Box>
                        <Field name="password" validate={validatePassword}>
                          {({ field, form }: any) => (
                            <FormControl
                              isRequired
                              isInvalid={
                                form.errors.password && form.touched.password
                              }
                            >
                              <FormLabel htmlFor="password">Password</FormLabel>
                              <InputGroup size="md">
                                <InputLeftAddon
                                  backgroundColor="white"
                                  color="gray.500"
                                >
                                  <Box as={MdVpnKey} />
                                </InputLeftAddon>
                                <Input
                                  {...field}
                                  pr="4.5rem"
                                  id="password"
                                  type={showPassword ? "text" : "password"}
                                  placeholder="Enter password"
                                />
                                <InputRightElement width="4.5rem">
                                  <Button
                                    h="1.75rem"
                                    size="sm"
                                    onClick={handleClick}
                                  >
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                  </Button>
                                </InputRightElement>
                              </InputGroup>
                              <FormErrorMessage>
                                {form.errors.password}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Box>
                      <Box>
                        <Field
                          name="confirmpassword"
                          validate={validateConfirmPassword}
                        >
                          {({ field, form }: any) => (
                            <FormControl
                              isRequired
                              isInvalid={
                                form.errors.confirmpassword &&
                                form.touched.confirmpassword
                              }
                            >
                              <FormLabel htmlFor="confirmpassword">
                                Confirm Password
                              </FormLabel>
                              <InputGroup size="md">
                                <InputLeftAddon
                                  backgroundColor="white"
                                  color="gray.500"
                                >
                                  <Box as={MdVpnKey} />
                                </InputLeftAddon>
                                <Input
                                  {...field}
                                  pr="4.5rem"
                                  id="confirmpassword"
                                  type={
                                    showConfirmPassword ? "text" : "password"
                                  }
                                  placeholder="Confirm password"
                                />
                                <InputRightElement width="4.5rem">
                                  <Button
                                    h="1.75rem"
                                    size="sm"
                                    onClick={handlePassClick}
                                  >
                                    {showConfirmPassword ? (
                                      <FiEyeOff />
                                    ) : (
                                      <FiEye />
                                    )}
                                  </Button>
                                </InputRightElement>
                              </InputGroup>
                              <FormErrorMessage>
                                {form.errors.confirmpassword}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Box>
                    </FormControl>
                  </Stack>
                </form>
              )}
            </Formik>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" form="signup-form" colorScheme="blue">
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SignupDrawer;
