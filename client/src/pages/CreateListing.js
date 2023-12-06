import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Button,
  HStack,
  useToast,
} from "@chakra-ui/react";
import convertToBase64 from "../utils/imgto64";
import { useMutation } from "@apollo/client";
import { ADD_PET } from "../utils/mutations";
import S3Upload from "../utils/S3Upload"
const CreateListing = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [addPet, { error }] = useMutation(ADD_PET);
  const [allergiesList, setAllergiesList] = useState("");
  //Note to team: medicalHistory.allergies are added in the handlePetCreate
  const [imageFile, setImageFile] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    age: 0,
    sex: "",
    breed: "",
    temperament: "",
    childFriendly: false,
    description: "",
    medicalHistory: {
      vaccinated: false,
      spayedNeutered: false,
    },
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (name === "age") {
      //converts age value to a Number because input defaults to string
      let numValue = +value;
      setFormData({
        ...formData,
        [name]: numValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handlePetCreate = async (e) => {
    e.preventDefault();
    // Split allergiesList into array and assign to new field allergies
    let newAllergies = allergiesList.split(/[ ,]+/);
    formData.medicalHistory.allergies = newAllergies;

    const petImage = `https://practice-bucket-12-4-2023.s3.amazonaws.com/${imageFile.name}`
    try {
      S3Upload(imageFile)
      formData.image = petImage
    } catch (error) {
      console.log(error)
    }
    
    
    //pass formData to addPet mutation
    const { data } = await addPet({
      variables: { pet: formData },
    });
    toast({
      title: "Pet listing created.",
      description:
        "We've created your pet listing for you. Check out your pet in the 'Listed Pets' section of your dashboard",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    navigate("/dashboard");
  };
  const handleFileUpload = async (e) => {
    //convert file to base64 then add to state
    const file = e.target.files[0];
    // const base64 = await convertToBase64(file);
    const newImage = new FileReader()
    newImage.onload = (event) => {
      document.getElementById("petImage").src = event.target.result
    }
    newImage.readAsDataURL(file)
    setImageFile(file)
  };
  // console.log(formData.image);
  return (
    <Box p={8}>
      <form onSubmit={handlePetCreate}>
        <FormControl mb={4}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            placeholder="Your Pet's Name"
            value={formData.name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Species</FormLabel>
          <Input
            type="text"
            name="species"
            placeholder="Dog/Cat"
            value={formData.species}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Age (In human years)</FormLabel>
          <Input
            type="number"
            name="age"
            placeholder="Your Pet's Age"
            value={formData.age}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Sex</FormLabel>
          {/* <Input
            type="text"
            name="sex"
            placeholder="Male/Female"
            value={formData.sex}
            onChange={handleChange}
          /> */}
          <RadioGroup
            name="sex"
            onChange={(value) => {
              const label = document.querySelector(
                "label[for='childFriendly']"
              );
              const labelText = label.textContent;
              console.log("Form Label Text:", labelText);
              console.log("Selected Value:", value);
              let petSex;
              //if value of radio-button is yes, set isFriendly to true

              setFormData({
                ...formData,
                sex: value,
              });
            }}
          >
            <HStack spacing="24px">
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>
            Upload Image: (Click on choose file to select upload an image)
            <img src="" id="petImage" alt="selected" />
          </FormLabel>
          <Input
            type="file"
            name="imageFile"
            accept="image/*"
            onChange={handleFileUpload}
          />
        </FormControl>

        {/* To show the image in the form */}
        {/* {imageFile && (
  <img
    src={URL.createObjectURL(imageFile)}
    alt="Selected"
    style={{ maxWidth: "100px" }}
  />
)} */}

        <FormControl mb={4}>
          <FormLabel>Breed</FormLabel>
          <Input
            type="text"
            name="breed"
            placeholder="Eg: Doberman"
            value={formData.breed}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Temperament</FormLabel>
          <Input
            type="text"
            name="temperament"
            placeholder="Provide details on your pet's tempermant. Eg: Calm, Hyper, High Energy, Loving, Fiendly"
            value={formData.temperament}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel htmlFor="childFriendly">Child-Friendly</FormLabel>
          <RadioGroup
            name="childFriendly"
            // value={formData.childFriendly}

            onChange={(value) => {
              const label = document.querySelector(
                "label[for='childFriendly']"
              );
              const labelText = label.textContent;
              console.log("Form Label Text:", labelText);
              console.log("Selected Value:", value);
              let isFriendly;
              //if value of radio-button is yes, set isFriendly to true
              value === "yes" ? (isFriendly = true) : (isFriendly = false);
              setFormData({
                ...formData,
                childFriendly: isFriendly,
              });
            }}
          >
            <HStack spacing="24px">
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Description</FormLabel>
          <Input
            type="text"
            name="description"
            placeholder="Provide a details on your pet. Some things to include: Brief history, activity level,
            likes/dislikes, gets along with other pets?, reason for giving pet up for adoption, any fears/trauma?, any other important information the new owner should know"
            value={formData.description}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel
            style={{ fontWeight: "bold", textDecoration: "underline" }}
          >
            Medical History:{" "}
          </FormLabel>
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Allergies</FormLabel>
          <Input
            type="text"
            name="allergies"
            placeholder="What is your pet allergic to?"
            value={formData.allergies}
            onChange={(e) => {
              //sets state of allergies
              setAllergiesList(e.target.value);
            }}
          />
        </FormControl>

        {/* <FormControl mt={4}mb={4}>
            <FormLabel>Fully Vaccinated</FormLabel>
            <RadioGroup
              name="vaccinated"
              value={formData.medicalHistory.vaccinated}
              onChange={handleChange}
            >
              <HStack spacing="24px">
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Spayed Neutered</FormLabel>
            <RadioGroup
              name="spayedNeutered"
              value={formData.medicalHistory.spayedNeutered}
              onChange={handleChange}
            >
              <HStack spacing="24px">
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </HStack>
            </RadioGroup>
          </FormControl> */}

        <FormControl mt={4} mb={4}>
          <FormLabel htmlFor="vaccinated">Fully Vaccinated</FormLabel>
          <RadioGroup
            name="vaccinated"
            // value={formData.vaccinated}
            onChange={(value) => {
              const label = document.querySelector("label[for='vaccinated']");
              const labelText = label.textContent;
              console.log("Form Label Text:", labelText);
              console.log("Selected Value:", value);
              let isVaccinated;
              //if value of radio-button is yes, set isVaccinated to true

              value === "yes" ? (isVaccinated = true) : (isVaccinated = false);
              //setting state for a nested object is slightly different from normal
              //a bit more verbose
              setFormData({
                ...formData,
                medicalHistory: {
                  ...formData.medicalHistory,
                  vaccinated: isVaccinated,
                },
              });
            }}
          >
            <HStack spacing="24px">
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>

        <FormControl mb={4}>
          <FormLabel htmlFor="spayedNeutered">Spayed Neutered</FormLabel>
          <RadioGroup
            name="spayedNeutered"
            value={formData.spayedNeutered}
            onChange={(value) => {
              const label = document.querySelector(
                "label[for='spayedNeutered']"
              );
              const labelText = label.textContent;
              console.log("Form Label Text:", labelText);
              console.log("Selected Value:", value);
              let isSpayed;
              //if value of radio-button is yes, set isSpayed to true

              value === "yes" ? (isSpayed = true) : (isSpayed = false);
              //setting state for a nested object is slightly different from normal
              //a bit more verbose
              setFormData({
                ...formData,
                medicalHistory: {
                  ...formData.medicalHistory,
                  spayedNeutered: isSpayed,
                },
              });
            }}
          >
            <HStack spacing="24px">
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <Button
          type="submit"
          colorScheme="blue"
          // onClick={() => {
          //   toast({
          //     title: "Pet listing created.",
          //     description: "We've created your pet listing for you. Check out your pet in the 'Listed Pets' section of your dashboard",
          //     status: "success",
          //     duration: 5000,
          //     isClosable: true,
          //   });
          // }}
        >
          Create
        </Button>
      </form>
    </Box>
  );
};

export default CreateListing;
