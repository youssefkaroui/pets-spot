import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";

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
          templateColumns="repeat(3, 1fr)"
          gap={6}
          mb="3"
          className="profileBlock"
          textAlign="center"
          fontWeight="medium"
          margin="3"
        >
          {petsForAdoption.map((pet) => (
            <GridItem key={pet._id} w="100%" h="500" bg="gray.300">
              Pet Info
              <div className="card mb-3">
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
