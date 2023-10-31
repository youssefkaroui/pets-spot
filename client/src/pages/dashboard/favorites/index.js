import React from "react";
import { Link } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";

const SavedPetList = ({ petsFollowed }) => {
  if (!petsFollowed.length) {
    return <h3>No Saved Pets Yet!</h3>;
  }

  return (
    <div>
      {petsFollowed.length === 0 ? (
        <Grid
          templateColumns="repeat(1, 1fr)"
          gap={6}
          mb="3"
          className="profileBlock"
          textAlign="center"
          fontWeight="medium"
          margin="3"
        >
          <GridItem w="100%" h="500" bg="gray.300">
            <p>No pets favorited.</p>
          </GridItem>
        </Grid>
      ) : (
        <Grid
          templateColumns="repeat(3, 1fr)"
          gap={6}
          mb="3"
          className="profileBlock"
          textAlign="center"
          fontWeight="medium"
          margin="3"
        >
          {petsFollowed.map((pet) => (
            <GridItem key={pet._id} w="100%" h="500" bg="gray.300">
              Pet Info
              <div className="card mb-3">
                <h2>Name: {pet.name}</h2>
                <h2>Species: {pet.species}</h2>
                <h2>Breed: {pet.breed}</h2>
              </div>
            </GridItem>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default SavedPetList;
