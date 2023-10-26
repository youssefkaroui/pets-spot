import React from "react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

const SignUpTest = () => {
  return (
    <FormControl>
      <FormLabel htmlFor="email">Email address</FormLabel>
      <Input id="email" type="email" />
      <FormHelperText>We'll never share your email.</FormHelperText>
    </FormControl>
  );
};

export default SignUpTest;