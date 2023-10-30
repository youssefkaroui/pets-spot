import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Grid, GridItem } from "@chakra-ui/react";

import { ADD_PET } from "../../../utils/mutations";
//IDK IF I NEED QUERY_ME
// import { QUERY_MY_PETS, QUERY_ME } from "../../../utils/queries";
//UNCOMMENT THIS OUT UNTIL BACKEND IS WORKING
// import Auth from "../../../utils/auth";

const PetList = ({ petsForAdoption }) => {
  //UNCOMMENT THIS WHEN THE BACKEND WORKS MORE
  // const pets = data.pets;
  console.log(`petsForAdoption length: ${petsForAdoption.length}`);
  return (
    <div>
      {petsForAdoption.length === 0 ? (
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
            <p>No pets up for adoption.</p>
          </GridItem>
        </Grid>
      ) : (
        <Grid
          templateColumns="repeat(${petsForAdoption.length}, 1fr)"
          gap={6}
          mb="3"
          className="profileBlock"
          textAlign="center"
          fontWeight="medium"
          margin="3"
        >
          {petsForAdoption.map((pet) => (
            <GridItem w="100%" h="500" bg="gray.300">
              Pet Info
              <div key={pet._id} className="card mb-3">
                <h2>{pet.name}</h2>
              </div>
            </GridItem>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default PetList;
