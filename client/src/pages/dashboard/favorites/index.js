import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { FOLLOW_PET } from "../../../utils/mutations";
import { Grid, GridItem, Text, Flex, Button, Image } from "@chakra-ui/react";

import { FaHeartCirclePlus } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";

const SavedPetList = ({ petsFollowed }) => {
  const [followPet] = useMutation(FOLLOW_PET);

  const [interests, setInterests] = useState(
    Array(petsFollowed.length).fill(true)
  );

  const handleInterestChange = (index) => {
    const newInterests = [...interests];
    newInterests[index] = !newInterests[index];
    setInterests(newInterests);
  };

  const showInterest = (index) => {
    return interests[index] ? (
      <FaHeart fontSize="40px" color="red" />
    ) : (
      <FaHeartCirclePlus fontSize="40px" />
    );
  };

  const handleButtonClick = (index) => {
    handleInterestChange(index);
    followPet({ variables: { petId: petsFollowed[index]._id } });
  };
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
            <p>No pets followed.</p>
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
          {petsFollowed.map((pet, index) => (
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
                <Button
                  key={pet._id}
                  onClick={() => handleButtonClick(index)}
                  m="3px"
                >
                  {showInterest(index)}
                </Button>
              </Flex>
            </GridItem>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default SavedPetList;
