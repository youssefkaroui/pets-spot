import React, { useState } from "react";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
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
import { FOLLOW_PET } from "../utils/mutations";

import sampleData from "./sampleData.json";

const Listings = () => {
  //THIS GRABS THE SLIDER'S VALUE FROM THE AGE SELECTOR
  const [sliderValue, setSliderValue] = useState(1);
  const [showTooltip, setShowTooltip] = useState(false);
  const [getSearch, {data}] = useLazyQuery(SEARCH_PETS)
  //THIS GRABS THE DATA FROM OTHER FIELDS
  const [searchForm, setSearchForm] = useState({});
  const [dogCheck, setDogCheck] = useState(false);
  const [catCheck, setCatCheck] = useState(false);
  // console.log(setDogCheck);
  const [formData, setFormData] = useState({
    species: "",
    childFriendly: false,
    sex: "",
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    getSearch({
      variables: {
        searchInput: {...formData}
      }
    })
  }
  console.log(data)
  console.log(formData)
  // PetCard Component
  const PetCard = () => {
    
    const { data } = useQuery(SEARCH_PETS);
    const petsData = data?.search || sampleData.search || [];
    const [followPet] = useMutation(FOLLOW_PET);

    const [interests, setInterests] = useState(
      Array(petsData.length).fill(false)
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
      handleInterestChange(index); // Call the first function
      followPet({ variables: { petId: petsData[index].id } }); // Call the second function
    };

    return (
      <>
        {petsData &&
          petsData.map((pet, index) => (
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
                <Button
                  key={pet.id}
                  onClick={() => handleButtonClick(index)}
                  m="3px"
                >
                  {showInterest(index)}
                </Button>
              </Flex>
            </GridItem>
          ))}
      </>
    );
  };

  // SearchBar Component
  const SearchBar = () => {
   
   
    
    return (
      <>
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
            <Checkbox value="dog" onChange={(e) => {
              setFormData({
                ...formData,
                species: "Dog"
              })
            }}>
              Dog
            </Checkbox>

            <Checkbox value="cat" onChange={(e) => {
              setFormData({
                ...formData,
                species: "Cat"
              })
            }}>
              Cat
            </Checkbox>
          </Stack>
          <Stack className="childFriendly" spacing={4} direction="row">
            <Checkbox value="childFriendly" onChange={(e) => {
              setFormData({
                ...formData,
                childFriendly: e.target.checked
              })
            }}>Child Friendly</Checkbox>
          </Stack>
          <Stack className="spayed" spacing={4} direction="row">
            <Checkbox value="spayNeuter">Spayed/Neutered</Checkbox>
          </Stack>
          <p className="searchOptionHeader">Sex</p>
          <Stack spacing={4} direction="row" onChange={(e) => {
              setFormData({
                ...formData,
                sex: "M"
              })
            }}>
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
          <Button mt="30px" pr="30px" pl="30px" onClick={handleSubmit}>
            Search!
          </Button>
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
        <SearchBar formData={formData} />
        <PetCard />
      </Grid>
    </>
  );
};

export default Listings;
