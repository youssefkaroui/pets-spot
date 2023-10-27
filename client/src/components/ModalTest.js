import React, { useState } from "react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

const SignUpTest = () => {
  // const [login, setLogin] = useState("true");
  return (
    <>
      <FormControl>
        <FormLabel htmlFor="email">Email address</FormLabel>
        <Input id="email" type="email" />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
    </>
  );
};

export default SignUpTest;
