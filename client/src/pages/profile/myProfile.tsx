/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdVpnKey } from "react-icons/md";

import { updateUser } from "lib/services/auth-service";

const MyProfile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handlePassClick = () => setShowConfirmPassword(!showConfirmPassword);
  let password = "";
  const userId = 0;
  type FormValues = {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    confirmpassword: string;
  };
  const setPassword = (value: string) => {
    password = value;
  };
  const updateProfile = (values: JSON) => {
    updateUser(userId, values);
  };

  const validateEmail = (value: string) => {
    let error;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  };

  const getUserDetails = (): FormValues => {
    return {
      firstname: "abc",
      lastname: "",
      email: "",
      username: "",
      password: "",
      confirmpassword: "",
    };
  };

  const validatePassword = (value: string) => {
    let error;
    if (value.length < 5) error = "Password must contain at least 6 characters";
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
  const userDetails = getUserDetails();
  return (
    <Container ml={5} mt={5} float="right">
      <Formik
        initialValues={userDetails}
        onSubmit={(values) => {
          updateProfile(JSON.parse(JSON.stringify(values)));
        }}
      >
        {({ handleSubmit }) => (
          <form id="profile-form" onSubmit={handleSubmit}>
            <Stack spacing="24px">
              <FormControl>
                <Flex>
                  <Field name="firstName">
                    {({ field }: any) => (
                      <FormControl mr={3} mb={3}>
                        <FormLabel htmlFor="firstName" pl={1}>
                          First Name
                        </FormLabel>
                        <Input
                          {...field}
                          id="firstName"
                          placeholder="First name"
                          value={userDetails.firstname}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="lastName">
                    {({ field, form }: any) => (
                      <FormControl>
                        <FormLabel htmlFor="LastName" pl={1}>
                          Last Name
                        </FormLabel>
                        <Input
                          {...field}
                          id="lastName"
                          placeholder="Last name"
                          value={userDetails.lastname}
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
                        mb={3}
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <InputGroup>
                          <Input
                            {...field}
                            id="email"
                            placeholder="Please enter email"
                            type="email"
                            value={userDetails.email}
                          />
                        </InputGroup>
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>
                <Box>
                  <FormControl mb={3}>
                    <FormLabel htmlFor="username">UserName</FormLabel>
                    <Input
                      id="username"
                      placeholder="Please enter user name"
                      value={userDetails.username}
                      disabled
                    />
                  </FormControl>
                </Box>

                <Box>
                  <Field name="password" validate={validatePassword}>
                    {({ field, form }: any) => (
                      <FormControl
                        mb={3}
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
                            value={userDetails.password}
                            placeholder="Enter password"
                          />
                          <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleClick}>
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
                        mb={3}
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
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm password"
                            value={userDetails.confirmpassword}
                          />
                          <InputRightElement width="4.5rem">
                            <Button
                              h="1.75rem"
                              size="sm"
                              onClick={handlePassClick}
                            >
                              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
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
            <Button mt={5} colorScheme="blue" float="right" type="submit">
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default MyProfile;
