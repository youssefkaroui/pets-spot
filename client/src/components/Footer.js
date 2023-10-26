import React from "react";
import { Flex, Icon } from "@chakra-ui/react";
import { FaPaw } from "react-icons/fa"
import { IoPaw, IoPawSharp } from "react-icons/io5"

const Footer = () => {
  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="space-evenly"
        bgColor="primary.header"
        h={100}
        w="100%"
        fontSize={60}
      >
        <Icon as={IoPaw} m={20} color="primary.paws"></Icon>
        <Icon as={FaPaw} m={20} color="primary.paws"></Icon>
        <Icon as={IoPawSharp} m={20} color="primary.paws"></Icon>
      </Flex>
    </>
  );
};

export default Footer;
