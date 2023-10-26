import React from "react";
import { Link, Box, Text, Stack, HStack, VStack } from "@chakra-ui/react";
// import { Link } from 'react-router-dom';
// import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
// import SignUpForm from './SignupForm';
// import LoginForm from './LoginForm';

// import Auth from '../utils/auth';
import Logo from "./navbarComponents/Logo";

const Navbar = () => {
  // set modal display state
  // const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Box
        display="flex"
        flexWrap={true}
        alignItems="center"
        justifyContent="space-between"
        bgColor="#34656D"
        h={100}
        w="100%"
      >
        <Box display="flex" p="10px" alignItems="center">
          <Logo />
          <Text fontSize={30} fontWeight={900}>Pet Spot</Text>
        </Box>
        <Box>
          <Link className="nav-link" href="/">
            Home
          </Link>
          {/* <Link className="nav-link" href="/listings">Listings</Link> */}
          <Link className="nav-link" href="/dashboard">
            Dashboard
          </Link>
          <Link className="nav-link" href="/create">
            Create Listing
          </Link>
          <Link className="nav-link" href="/login">
            Login / Signup
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
