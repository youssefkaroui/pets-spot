import React from "react";
import { VStack, Text } from "@chakra-ui/react";
const Success = () => {
  return (
    <VStack p={3} m={4} justifyContent="center">
      <h1>Payment Successful</h1>
      <Text>
        Your generous donation will help us keep our servers running
        and help pets find new homes
      </Text>
    </VStack>
  );
};

export default Success;
