import React from "react";
import { Link, Box, Image } from "@chakra-ui/react";
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
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        bgColor="#34656D"
        h={100}
        w="100%"
      >
        <Box display="flex" p="10px">
          <Image
            mr="10px"
            boxSize={80}
            objectFit="cover"
            borderRadius={300}
            src="https://media.istockphoto.com/id/649091176/photo/puppy-and-kitten-closeup-over-white.jpg?s=612x612&w=0&k=20&c=WI6HA8rhU7bRZvNVlBOgjmCkKQr2SYRmqTcl3x6IeAY="
            alt="cat-and-dog"
          />
          <h1>Pet Spot</h1>
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
