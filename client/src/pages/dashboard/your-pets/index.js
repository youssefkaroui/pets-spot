import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_PET } from "../../../utils/mutations";
import { Link } from "react-router-dom";
import { Grid, GridItem, Image, Flex, Button, Text } from "@chakra-ui/react";

const PetList = ({ petsForAdoption }) => {

  const [removePet, {error}] = useMutation(DELETE_PET)

  //UNCOMMENT THIS WHEN THE BACKEND WORKS MORE
  // const pets = data.pets;
  console.log(`petsForAdoption length: ${petsForAdoption.length}`);
 const handleDelete = async (pet_id) => {
    // console.log(petId)
    const {data} = await removePet({
      variables: {petId: pet_id}
    })
 }

  
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
            <GridItem
            border="solid 3px"
            borderRadius="10px"
            rowSpan="1"
            colSpan={{ base: 5, lg: 2, xl: 1 }}
            textAlign="center"
          >
            <Text fontSize="3xl">Name: {pet.name}</Text>
            <Flex justifyContent="center">
              <Image src={pet.image}></Image>
            </Flex>
            <Text fontSize="3xl">Age: {pet.age}</Text>
            <Text fontSize="3xl">Sex: {pet.sex}</Text>
            <Flex justifyContent="center">
              <Button m="3px" colorScheme='red' onClick={() => handleDelete(pet._id)}>
                <h2>Kill me</h2>
              </Button>
            </Flex>
          </GridItem>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default PetList;
