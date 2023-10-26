import React from "react";
import { Link, Flex, Text } from "@chakra-ui/react";
// import SignUpForm from './SignupForm';
// import LoginForm from './LoginForm';

// import Auth from '../utils/auth';
import Logo from "./navbarComponents/Logo";

const Navbar = () => {
  // set modal display state
  // const [showModal, setShowModal] = useState(false);
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
          <Text fontSize={30} fontWeight={900} color="primary.main">Pet Spot</Text>
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
          <Link className="nav-link" color="primary.main" href="/login">
            Login / Signup
          </Link>
        </Flex>
      </Flex>
    </>
  );
};

export default Navbar;
