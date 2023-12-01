import React, { useState } from "react";
import { Link, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";

import { IoMenu, IoCloseSharp } from "react-icons/io5";

import Auth from "../utils/auth";

import SignUpForm from "./Signup";
import LoginForm from "./Login";

import Logo from "./navbarComponents/Logo";

const Navbar = () => {
  const navigate = useNavigate();
  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useDisclosure();
  const {
    isOpen: isOpenSignup,
    onOpen: onOpenSignup,
    onClose: onCloseSignup,
  } = useDisclosure();

  const [display, changeDisplay] = useState("none");
  const [hamDisplay, changeHamDisplay] = useState("flex");

  const handleLogout = () => {
    Auth.logout();
  };

  return (
    <>
      <Flex
        flexDirection={{ base: "column", lg: "row" }}
        flexWrap={true}
        alignItems="flex-end"
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

        {/* Mobile */}
        <Flex
          display={{ base: hamDisplay, sm: hamDisplay, md: "none", lg: "none" }}
          flexDirection={"column"}
          justify="flex-end"
        >
          <IconButton
            aria-label="Open Menu"
            size="lg"
            m={2}
            icon={<IoMenu />}
            // display={["flex", "flex", 'none', 'none']}
            display={{ base: "flex", sm: "flex", md: "none", lg: "none" }}
            onClick={() => {
              changeDisplay("flex");
              changeHamDisplay("none");
            }}
          />
        </Flex>

        {/* Mobile Content */}
        <Flex
          w="100vw"
          display={{ base: display, sm: display, md: "none", lg: "none" }}
          zIndex={20}
          flexDirection="column"
        >
          <Flex justify="flex-end">
            <IconButton
              mt={2}
              mr={2}
              aria-label="Close Menu"
              size="lg"
              icon={<IoCloseSharp />}
              onClick={() => {
                changeDisplay("none");
                changeHamDisplay("flex");
              }}
            />
          </Flex>

          <Flex flexDirection="column" align="center">
            <Link
              className="nav-link"
              color="primary.main"
              onClick={() => {
                changeDisplay("none");
                changeHamDisplay("flex");
                navigate("/");
              }}
            >
              Home
            </Link>
            <Link
              className="nav-link"
              color="primary.main"
              onClick={() => {
                changeDisplay("none");
                changeHamDisplay("flex");
                navigate("/listings");
              }}
            >
              Listings
            </Link>
            {Auth.loggedIn() ? (
              <>
                <Link
                  className="nav-link"
                  color="primary.main"
                  onClick={() => {
                    changeDisplay("none");
                    changeHamDisplay("flex");
                    navigate("/dashboard");
                  }}
                >
                  Dashboard
                </Link>
                <Link
                  to="/create"
                  className="nav-link"
                  color="primary.main"
                  onClick={() => {
                    changeDisplay("none");
                    changeHamDisplay("flex");
                    navigate("/create");
                  }}
                >
                  Create Listing
                </Link>
              </>
            ) : (
              ""
            )}

            {Auth.loggedIn() ? (
              <Link
                className="nav-link"
                color="primary.main"
                onClick={handleLogout}
              >
                Logout
              </Link>
            ) : (
              <>
                <Link
                  onClick={onOpenSignup}
                  className="nav-link"
                  color="primary.main"
                >
                  Signup
                </Link>
                <Link
                  onClick={onOpenLogin}
                  className="nav-link"
                  color="primary.main"
                >
                  Login
                </Link>
                
                {/* It looks like we do not need this modal code below since it's in the desktop part of the code below. 
                Probably becuase the display is none, but I think that doesn't take it out of existance? Just doesn't display. */}
{/* 
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
                </Modal> */}
              </>
            )}
          </Flex>
        </Flex>

        {/* Desktop */}
        <Flex
          display={{ base: "none", sm: "none", md: "flex", lg: "flex" }}
          textAlign="center"
        >
          <Link
            className="nav-link"
            color="primary.main"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </Link>
          <Link
            className="nav-link"
            color="primary.main"
            onClick={() => {
              navigate("/listings");
            }}
          >
            Listings
          </Link>
          {Auth.loggedIn() ? (
            <>
              <Link
                className="nav-link"
                color="primary.main"
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                Dashboard
              </Link>
              <Link
                to="/create"
                className="nav-link"
                color="primary.main"
                onClick={() => {
                  navigate("/create");
                }}
              >
                Create Listing
              </Link>
            </>
          ) : (
            ""
          )}

          {Auth.loggedIn() ? (
            <Link
              className="nav-link"
              color="primary.main"
              onClick={handleLogout}
            >
              Logout
            </Link>
          ) : (
            <>
              <Link
                onClick={onOpenSignup}
                className="nav-link"
                color="primary.main"
              >
                Signup
              </Link>
              <Link
                onClick={onOpenLogin}
                className="nav-link"
                color="primary.main"
              >
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
