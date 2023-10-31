import React from "react";
import YourPets from "../your-pets";
import Favorites from "../favorites";
import {
  Badge,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Link,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import sampleData from "../../sampleData.json";
import { Navigate, useParams } from "react-router-dom";
// import { useQuery } from "@apollo/client";

// import { QUERY_USER } from "../utils/queries";

// import Auth from "../utils/auth";

const Profile = ({ name, email, address, petsForAdoption }) => {
  console.log(name);
  console.log(email);
  console.log(address);
  // const { username: userParam } = useParams();
  // const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
  //   variables: { username: userParam },
  // });
  // const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  // if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  //   return <Navigate to="/me" />;
  // }
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  // if (!user?.username) {
  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      gap={6}
      mb="3"
      className="profileBlock"
      textAlign="center"
      fontWeight="medium"
      margin="3"
    >
      <GridItem w="100%" h="500" bg="gray.300">
        User Info
        <p>{name}</p>
        <p>{email}</p>
      </GridItem>
      <GridItem w="100%" h="500" bg="gray.300">
        Address
        <p>
          {address.line_one}, {address.line_two}
        </p>
        <p>
          {address.city}, {address.state} {address.zipcode}
        </p>
      </GridItem>
      <GridItem w="100%" h="500" bg="gray.300">
        Pet Info
        {petsForAdoption.map((pet) => (
          <div key={pet._id} className="card mb-3">
            <h2>{pet.name}</h2>
          </div>
        ))}
      </GridItem>
    </Grid>

    // <Grid
    //   templateAreas={`"header header"
    //               "nav main"
    //              `}
    //   gridTemplateRows={"50px 1fr 30px"}
    //   gridTemplateColumns={"150px 1fr"}
    //   h="200px"
    //   gap="1"
    //   color="blackAlpha.700"
    //   fontWeight="bold"
    // >
    //   <GridItem pl="2" bg="orange.300" area={"header"}>
    //     Header
    //   </GridItem>
    //   <GridItem pl="2" bg="pink.300" area={"nav"}>
    //     Nav
    //   </GridItem>
    //   <GridItem pl="2" bg="green.300" area={"main"}>
    //     Main
    //   </GridItem>
    // </Grid>
  );

  // }
  // return (
  //   <div>
  //     <div className="flex-row justify-center mb-3">
  //       <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
  //         Viewing {userParam ? `${user.username}'s` : "your"} profile.
  //       </h2>
  //       {/* {!userParam && (
  //         <div
  //           className="col-12 col-md-10 mb-3 p-3"
  //           style={{ border: '1px dotted #1a1a1a' }}
  //         >
  //           <ThoughtForm />
  //         </div>
  //       )} */}
  //     </div>
  //   </div>
  // );
};

export default Profile;
