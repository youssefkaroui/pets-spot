import React from "react";
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

import SignUpForm from './Signup';
import LoginForm from './Login';

// import Auth from '../utils/auth';
import Logo from "./navbarComponents/Logo";

const Navbar = () => {
  // set modal display state
  // const [showModal, setShowModal] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          {/* <Link className="nav-link" href="/listings">Listings</Link> */}
          <Link className="nav-link" color="primary.main" href="/dashboard">
            Dashboard
          </Link>
          <Link className="nav-link" color="primary.main" href="/create">
            Create Listing
          </Link>
          <Link onClick={onOpen} className="nav-link" color="primary.main">
            Signup
          </Link>
          <Link onClick={onOpen} className="nav-link" color="primary.main">
            Login
          </Link>
 
          <Modal isOpen={isOpen} onClose={onClose}>
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
          <Modal isOpen={isOpen} onClose={onClose}>
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
        </Flex>
      </Flex>
    </>
  );
};

export default Navbar;
