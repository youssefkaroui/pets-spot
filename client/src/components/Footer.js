import React from "react";
import { Box, Icon } from "@chakra-ui/react";
import { FaPaw } from "react-icons/fa";
import { IoPaw, IoPawSharp } from "react-icons/io5";

const Footer = () => {
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
        bgColor="#34656D"
        h={100}
        w="100%"
        fontSize={60}
      >
        <Icon as={IoPaw} m={20}></Icon>
        <Icon as={FaPaw} m={20}></Icon>
        <Icon as={IoPawSharp} m={20}></Icon>
      </Box>
    </>
  );
};

export default Footer;
