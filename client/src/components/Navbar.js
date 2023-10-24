import React from "react";
import { Link, Box, Text, Flex } from "@chakra-ui/react";
// import { Link } from 'react-router-dom';
// import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
// import SignUpForm from './SignupForm';
// import LoginForm from './LoginForm';

// import Auth from '../utils/auth';

const Navbar = () => {
  // set modal display state
  // const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="right" bgColor='#34656D' h={100} w='100%'>
        <Link className="nav-link" href="/">Home</Link>
        <Link className="nav-link" href="/listings">Listings</Link>
        <Link className="nav-link" href="/dashboard">Dashboard</Link>
        <Link className="nav-link" href="/create">Create Listing</Link>
        <Link className="nav-link" href="/login">Login / Signup</Link>
      </Box>
    </>
  );
};

export default Navbar;
