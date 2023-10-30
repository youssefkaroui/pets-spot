import React, { useState } from "react";
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
  IconButton,
  Icon,
  Flex,
} from "@chakra-ui/react";

import { FaHeartCirclePlus } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";

const Listings = () => {
  //THIS GRABS THE SLIDER'S VALUE FROM THE AGE SELECTOR
  const [sliderValue, setSliderValue] = useState(1);
  const [showTooltip, setShowTooltip] = useState(false);
  //THIS GRABS THE DATA FROM OTHER FIELDS
  const [dogCheck, setDogCheck] = useState(false);
  const [catCheck, setCatCheck] = useState(false);
  // console.log(setDogCheck);

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

    return (
      <>
        <GridItem
          border="solid 3px"
          borderRadius="10px"
          rowSpan="1"
          colSpan={{ base: 5, lg: 2, xl: 1 }}
          textAlign="center"
        >
          <Text fontSize="3xl">Name</Text>
          <Image src="https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"></Image>
          <Text fontSize="3xl">Age:</Text>
          <Text fontSize="3xl">Sex:</Text>
          <Flex justifyContent="center">
            <Button m="3px">
              <h2>Read More</h2>
            </Button>
            <Button onClick={handleInterestChange} m="3px">
              {showInterest()}
            </Button>
          </Flex>
        </GridItem>
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
        </GridItem>

        {/* Below are all the pet Card examples:  */}
        <PetCard />
        <PetCard />
        <PetCard />
        <PetCard />
        
      </Grid>
    </>
  );
};

export default Listings;
