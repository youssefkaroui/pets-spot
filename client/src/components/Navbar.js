import React, { useState } from "react";
import { Link, Flex, Text } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";


import Auth from "../utils/auth";

//import SignUpTest from "./ModalTest";
import SignUpForm from './Signup';
import LoginForm from './Login';



// import Auth from '../utils/auth';
import Logo from "./navbarComponents/Logo";
import { LayoutGroupContext } from "framer-motion";

const Navbar = () => {
  const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();
  const { isOpen: isOpenSignup, onOpen: onOpenSignup, onClose: onCloseSignup } = useDisclosure();
  
  const handleLogout = () => {
    Auth.logout();
  }

  return (
    <>
      <Flex
        flexDirection={{ base: "column", lg: "row" }}
        flexWrap={true}
        alignItems="center"
        justifyContent="space-between"
        bgColor="primary.header"
        w="100%"
      >
        <Flex display="flex" p="10px" alignItems="center">
          <Logo />
          <Text fontSize={30} fontWeight={900} color="primary.main">
            Pet Spot
          </Text>
        </Flex>
        <Flex flexDirection={{ base: "column", lg: "row" }} textAlign="center">
          <Link className="nav-link" color="primary.main" href="/">
            Home
          </Link>
          <Link className="nav-link" color="primary.main" href="/listings">Listings</Link>
          {Auth.loggedIn() ? (
            <Link className="nav-link" color="primary.main" href="/dashboard">
              Dashboard
            </Link>
          ) : (
            ""
          )}
          <Link to="/create" className="nav-link" color="primary.main" href="/create">
            Create Listing
          </Link>

          {Auth.loggedIn() ? (
            <Link className="nav-link" color="primary.main" onClick={handleLogout}>
              Logout
            </Link>
          ) : (
            <>
          <Link onClick={onOpenSignup} className="nav-link" color="primary.main">
            Signup
          </Link>
          <Link onClick={onOpenLogin} className="nav-link" color="primary.main">
            Login
          </Link>
 
          <Modal isOpen={isOpenLogin} onClose={onCloseLogin}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <ModalCloseButton />
              </ModalHeader>
              <ModalBody>
                <LoginForm />
              </ModalBody>
              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
          <Modal isOpen={isOpenSignup} onClose={onCloseSignup}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <ModalCloseButton />
              </ModalHeader>
              <ModalBody>
                <SignUpForm />
              </ModalBody>
              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
            </>
          )}
        
        </Flex>
      </Flex>
    </>
  );
};

export default Navbar;
