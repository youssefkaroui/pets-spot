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
        <p className="dash-info">{name}</p>
        <p className="dash-info">{email}</p>
      </GridItem>
      <GridItem w="100%" h="500" bg="gray.300">
        Address
        <p className="dash-info">
          {address.line_one}, {address.line_two}
        </p>
        <p className="dash-info">
          {address.city}, {address.state} {address.zipcode}
        </p>
      </GridItem>
      <GridItem w="100%" h="500" bg="gray.300">
        Pet Info
        {petsForAdoption.map((pet) => (
          <div key={pet._id} className="card mb-3">
            <p className="dash-info">{pet.name}</p>
          </div>
        ))}
      </GridItem>
    </Grid>
  );
};

export default Profile;
