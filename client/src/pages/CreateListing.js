import React, { useState } from "react";
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Radio,
    RadioGroup,
    Button,
    Checkbox,
    HStack,
}  
from "@chakra-ui/react";

const CreateListing = () => {
    const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    age: "",
    sex: "",
    image: "",
    breed: "",
    temperament: "",
    childFriendly: false,
    description: "",
    active: false,
    medicalHistory: {
      allergies: [],
      vaccinated: false,
      spayedNeutered: false,
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "imageFile") {
        setImageFile(e.target.files[0]);
    }
    
    else if (name === "allergies") {
      setFormData({
        ...formData,
        medicalHistory: {
          ...formData.medicalHistory,
          allergies: formData.medicalHistory.allergies.concat(value),
        },
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server using GraphQL mutation
    console.log(formData);
    console.log("Image File:", imageFile);
  };

  return (
    <Box p={4}>
    <form onSubmit={handleSubmit}>
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
  <FormLabel>Age</FormLabel>
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
  <Input
    type="text"
    name="sex"
    placeholder="Male/Female"
    value={formData.sex}
    onChange={handleChange}
  />
</FormControl>

<FormControl mb={4}>
  <FormLabel>Upload Image: (Click on choose file to select upload an image)</FormLabel>
  <Input
    type="file"
    name="imageFile"
    accept="image/*"
    onChange={handleChange}
  />
</FormControl>

{/* To show the image in the form */}
{imageFile && (
  <img
    src={URL.createObjectURL(imageFile)}
    alt="Selected Image"
    style={{ maxWidth: "100px" }}
  />
)}

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
        <Textarea
          name="temperament"
          placeholder="Provide details on your pet's tempermant. Eg: Calm, Hyper, High Energy, Loving, Fiendly"
          value={formData.temperament}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Child-Friendly</FormLabel>
        <RadioGroup name="childFriendly" value={formData.childFriendly} onChange={handleChange}>
          <Radio value="yes">Yes</Radio>
          <Radio value="no">No</Radio>
        </RadioGroup>
      </FormControl>
      
      <FormControl mb={4}>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            placeholder="Provide a details on your pet. Some things to include: Brief history on your pet, your pet's activity level,
            likes/dislikes, gets along with other pets?, reason for giving pet up for adoption, any fears/trauma?, any other important information the new owner should know"
            value={formData.description}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel style={{ fontWeight: "bold" }}>Medical History: </FormLabel>
          <FormControl>
            <FormLabel>Allergies</FormLabel>
            <Input
              type="text"
              name="allergies"
              placeholder="What is your pet allergic to?"
              value={formData.medicalHistory.allergies.join(", ")}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb={4}>
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
          </FormControl>
        </FormControl>
      <Button type="submit" colorScheme="blue">
        Create
      </Button>
    </form>
  </Box>
);
};

export default CreateListing;