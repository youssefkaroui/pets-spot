import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";

const Profile = ({ name, email, address, petsForAdoption }) => {
  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
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
          {address?.line_one}, {address?.line_two}
        </p>
        <p className="dash-info">
          {address?.city}, {address?.state} {address?.zipcode}
        </p>
      </GridItem>
    </Grid>
  );
};

export default Profile;
