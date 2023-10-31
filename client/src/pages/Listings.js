import React, { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import {
  Grid,
  GridItem,
  Stack,
  Checkbox,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
  Text,
  Image,
  Button,
  Flex,
} from "@chakra-ui/react";

import { FaHeartCirclePlus } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";

import { SEARCH_PETS } from "../utils/queries";

import sampleData from "./sampleData.json";

const Listings = () => {
  //THIS GRABS THE SLIDER'S VALUE FROM THE AGE SELECTOR
  const [sliderValue, setSliderValue] = useState(1);
  const [showTooltip, setShowTooltip] = useState(false);
  //THIS GRABS THE DATA FROM OTHER FIELDS
  const [dogCheck, setDogCheck] = useState(false);
  const [catCheck, setCatCheck] = useState(false);

  const PetCard = () => {
    const [interest, setInterest] = useState(false);
    const showInterest = () => {
      if (interest === false) {
        return <FaHeartCirclePlus fontSize="40px" />;
      } else {
        return <FaHeart fontSize="40px" color="red" />;
      }
    };

    const handleInterestChange = () => {
      setInterest(!interest);
    };

    const { loading, error, data } = useQuery(SEARCH_PETS);

    if (loading) {
      console.log("This is loading");
    }

    if (error) {
      console.error(error);
    }

    const petsData = data?.search || sampleData.search;

    console.log(petsData);

    return (
      <>
        {petsData &&
          petsData.map((pet) => (
            <GridItem
              border="solid 3px"
              borderRadius="10px"
              rowSpan="1"
              colSpan={{ base: 5, lg: 2, xl: 1 }}
              textAlign="center"
            >
              <Text fontSize="3xl">Name: {pet.name}</Text>
              <Flex justifyContent="center">
                <Image src="../assets/cats/catthedog.jpg"></Image>
              </Flex>
              <Text fontSize="3xl">Age: {pet.age}</Text>
              <Text fontSize="3xl">Sex: {pet.sex}</Text>
              <Flex justifyContent="center">
                <Button m="3px">
                  <h2>Read More</h2>
                </Button>
                <Button onClick={handleInterestChange} m="3px">
                  {showInterest()}
                </Button>
              </Flex>
            </GridItem>
          ))}
      </>
    );
  };

  return (
    <>
      <Grid
        templateColumns="repeat(5, 1fr)"
        columnGap={6}
        rowGap={6}
        templateRows="repeat(3,1fr)"
        m="10px"
      >
        <GridItem
          as="aside"
          colSpan={{ base: 5, lg: 2, xl: 1 }}
          rowSpan={{ base: 3 }}
          bg="primary.main"
          minHeight={{ lg: "100vh" }}
          p={{ base: "20px", lg: "30px" }}
        >
          <h1 className="searchHeader">Search for a Pet</h1>
          <Stack spacing={4} direction="row">
            <Checkbox value="dog" onChange={(e) => setDogCheck(true)}>
              Dog
            </Checkbox>
            {/* //<Checkbox value="cat" onChange={(e) => setCatCheck(true)}>
            //  Cat
            //</Checkbox> */}
          </Stack>
          <Stack className="childFriendly" spacing={4} direction="row">
            <Checkbox value="childFriendly">Child Friendly</Checkbox>
          </Stack>
          <Stack className="spayed" spacing={4} direction="row">
            <Checkbox value="spayNeuter">Spayed/Neutered</Checkbox>
          </Stack>
          <p className="searchOptionHeader">Sex</p>
          <Stack spacing={4} direction="row">
            <Checkbox value="male">Male</Checkbox>
            <Checkbox value="female">Female</Checkbox>
          </Stack>
          <p className="searchOptionHeader">Age</p>
          <Slider
            id="slider"
            defaultValue={1}
            min={1}
            max={15}
            colorScheme="teal"
            onChange={(v) => setSliderValue(v)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <SliderMark value={5} mt="1.5" ml="-1" fontSize="sm">
              5
            </SliderMark>
            <SliderMark value={10} mt="1.5" ml="-2" fontSize="sm">
              10
            </SliderMark>

            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="teal.500"
              color="white"
              placement="top"
              isOpen={showTooltip}
              label={`${sliderValue}`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
          <Button mt="30px" pr="30px" pl="30px">
            Search!
          </Button>
        </GridItem>

        {/* Below are all the pet Card examples:  */}
        <PetCard />
      </Grid>
    </>
  );
};

export default Listings;
