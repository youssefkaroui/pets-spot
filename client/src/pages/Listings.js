import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import {
  Grid,
  GridItem,
  Stack,
  Checkbox,
  Text,
  Image,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  CheckboxGroup,
} from "@chakra-ui/react";

import { FaHeartCirclePlus } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";

import { SEARCH_PETS } from "../utils/queries";
import { FOLLOW_PET } from "../utils/mutations";

import Auth from "../utils/auth";

const Listings = () => {
  const [getSearch, { data }] = useLazyQuery(SEARCH_PETS);

  const [formData, setFormData] = useState({});
  useEffect(() => {
    getSearch({
      variables: {
        searchInput: { ...formData },
      },
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    getSearch({
      variables: {
        searchInput: { ...formData },
      },
    });
  };
  const petsData = data;
  // PetCard Component
  const PetCard = ({ petsData }) => {
    const [selectedPet, setSelectedPet] = useState(null);
    const { data } = useQuery(SEARCH_PETS);
    const petData = petsData?.search || [];
    const [followPet] = useMutation(FOLLOW_PET);

    const [interests, setInterests] = useState(
      Array(petData.length).fill(false)
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

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handlePetProfile = (pet) => {
      setSelectedPet(pet);
      onOpen(); // Open the modal
    };

    const handleButtonClick = (index) => {
      handleInterestChange(index);
      followPet({ variables: { petId: petData[index]._id } });
    };

    const PetDetailModal = ({ isOpen, onClose, pet }) => {
      if (!pet) {
        return null;
      }

      return (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontSize="40px">{pet.name}</ModalHeader>
            {/* <ModalCloseButton /> */}
            {/* Uncomment above if we want to show a clickable Close Button */}
            <ModalBody>
              <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Image src={pet.image} alt={pet.name} />
                <Text>
                  <strong>Species: </strong> {pet.species}
                </Text>
                <Text>
                  <strong>Breed: </strong>
                  {pet.breed}
                </Text>
                <Text>
                  <strong>Age: </strong> {pet.age}
                </Text>
                <Text>
                  <strong>Sex:</strong> {pet.sex}
                </Text>
                <Text>
                  <strong>Temperament: </strong> {pet.temperament}
                </Text>
                <Text>
                  <strong>Child Friendly: </strong>
                  {pet.childFriendly ? "Yes" : "No"}
                </Text>
                <Text>
                  <strong>Vaccinated: </strong>
                  {pet.medicalHistory.vaccinated ? "Yes" : "No"}
                </Text>
                <Text>
                  <strong>Spayed/Neutered:</strong>{" "}
                  {pet.medicalHistory.spayedNeutered ? "Yes" : "No"}
                </Text>
                <Text>
                  <strong>Allergies: </strong>
                  {pet.medicalHistory.allergies}
                </Text>
                <Text>
                  <strong>Description:</strong> {pet.description}
                </Text>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      );
    };
    return (
      <>
        {petData &&
          petData.map((pet, index) => (
            <GridItem
              border="solid 3px"
              borderRadius="10px"
              rowSpan="1"
              colSpan={{ base: 5, md: 4, lg: 2, xl: 1 }}
              textAlign="center"
              key={pet._id}
            >
              <Text fontSize="3xl">{pet.name}</Text>
              <Flex justifyContent="center">
                <Image 
                  src={pet.image}
                  // maxHeight= {{base: "400px", md: "300px", lg: "300px", xl: "200px" }}
                  height = "300px"
                  width = "300px"
                  objectFit={"cover"}
                ></Image>
              </Flex>
              <Text fontSize="2xl">Age: {pet.age}</Text>
              <Text fontSize="2xl">Sex: {pet.sex}</Text>
              <Text fontSize="2xl">Species {pet.species}</Text>
              {Auth.loggedIn() ? (
                <>
                  <Flex justifyContent="center">
                    <Button m="3px" onClick={() => handlePetProfile(pet)}>
                      Read More
                    </Button>

                    <Button
                      key={pet._id}
                      onClick={() => handleButtonClick(index)}
                      m="3px"
                    >
                      {showInterest(index)}
                    </Button>
                  </Flex>
                </>
              ) : (
                ""
              )}
            </GridItem>
          ))}
        <PetDetailModal isOpen={isOpen} onClose={onClose} pet={selectedPet} />
      </>
    );
  };

  // SearchBar Component
  const SearchBar = () => {
    return (
      <>
        <GridItem
          as="aside"
          colSpan={{ base: 5, md: 1, lg: 1, xl: 1 }}
          rowSpan={{ base: 5 }}
          bg="primary.main"
          minHeight={{ lg: "100vh" }}
          p={{ base: "20px", lg: "30px" }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
        >
          <h1 className="searchHeader">Search for a Pet</h1>
          <CheckboxGroup
            name="species"
            onChange={(e) => {
              const speciesData = e.toString();
              formData.species === e
                ? setFormData((current) => {
                    const { species, ...rest } = current;
                    return rest;
                  })
                : setFormData({
                    ...formData,
                    species: speciesData,
                  });
            }}
          >
            <Stack spacing={4} direction="row">
              <Checkbox value="Dog">Dog</Checkbox>

              <Checkbox value="Cat">Cat</Checkbox>
            </Stack>
          </CheckboxGroup>
          <Stack className="childFriendly" spacing={4} direction="row">
            <Checkbox
              value="childFriendly"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  childFriendly: e.target.checked,
                });
              }}
            >
              Child Friendly
            </Checkbox>
          </Stack>

          <p className="searchOptionHeader">Sex</p>
          <Stack
            spacing={4}
            direction="row"
            onChange={(e) => {
              formData.sex === e.target.value
                ? setFormData((current) => {
                    const { sex, ...rest } = current;
                    return rest;
                  })
                : setFormData({
                    ...formData,
                    sex: e.target.value,
                  });
            }}
          >
            <Checkbox value="Male">Male</Checkbox>
            <Checkbox value="Female">Female</Checkbox>
          </Stack>

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
        <PetCard petsData={petsData} />
      </Grid>
    </>
  );
};

export default Listings;
