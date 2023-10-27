import React, { useState } from "react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

const SignUp = () => {
  <FormControl>
    <FormLabel htmlFor="email">Email address</FormLabel>
    <Input id="email" type="email" />
    <FormHelperText>We'll never share your email.</FormHelperText>
  </FormControl>;
};

const Login = () => {
  <FormControl>
    <FormLabel htmlFor="email">Email address</FormLabel>
    <Input id="email" type="email" />
    <FormHelperText>We'll never share your email.</FormHelperText>
  </FormControl>;
};

const SignUpTest = () => {
  // const [login, setLogin] = useState("true");
  return (
    <>
      <Login />
      <SignUp />
    </>
  );
};

export default SignUpTest;
