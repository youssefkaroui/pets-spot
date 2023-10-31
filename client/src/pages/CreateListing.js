// import React, { useState } from "react";
// import {
//     Box,
//     FormControl,
//     FormLabel,
//     Input,
//     Textarea,
//     Radio,
//     RadioGroup,
//     Button,
//     HStack,
//     Stack,
// }  
// from "@chakra-ui/react";
// import "../index.css";
// import { useMutation } from '@apollo/client';
// import { ADD_PET } from '../utils/mutations';

// const CreateListing = () => {
//     const [imageFile, setImageFile] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     species: "",
//     age: "",
//     sex: "",
//     image: "",
//     breed: "",
//     temperament: "",
//      childFriendly: null,
//     description: "",
//     active: false,
//     medicalHistory: {
//       allergies: [],
//       vaccinated: null,
//       spayedNeutered: null,
//     },
//   });
//   const [addPet] = useMutation(ADD_PET);

//   const handlePetCreate = async (e) => {
//       e.preventDefault();

//       // Create a new pet object from the pet form data
//       const newPet = { ...formData };

//       // Send the pet data to the server using the mutation
//       try {
//           const { data } = await addPet({
//               variables: {
//                   petData: newPet,
//               },
//           });

//           // Handle the response as needed
//           console.log('New Pet Added:', data.addPet);
//       } catch (error) {
//           // Handle any errors
//           console.error('Error adding pet:', error);
//       }

//       // Clear the pet form
//       setFormData({
//           name: "",
//           species: "",
//           // ... clear other fields ...
//       });
//   };

// //   const handleChange = (e, inputValue) => {
// //     const { name, value } = e.target;
// //     setFormData({
// //         ...formData,
// //         [name]: inputValue,
// //     });
// // };
// const handleChange = (e) => {
//     const { name, value, type } = e.target;
//     if (type === "radio") {
//         // Handle radio buttons
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     } else {
//         // Handle other input fields
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     }
// };
// const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Data:", formData); // Log the entire form data
//    // console.log("Child-Friendly Value:", formData.childFriendly); // Log the childFriendly value
// };

//   return (
//     <Box p={8}>
//     <form onSubmit={handleSubmit}>
//     <FormControl mb={4}>
//   <FormLabel>Name</FormLabel>
//     <Input
//       type="text"
//       name="name"
//       placeholder="Your Pet's Name"
//       value={formData.name}
//       onChange={handleChange}
//     />
// </FormControl>

// <FormControl mb={4}>
//   <FormLabel>Species</FormLabel>
//   <Input
//     type="text"
//     name="species"
//     placeholder="Dog/Cat"
//     value={formData.species}
//     onChange={handleChange}
//   />
// </FormControl>

// <FormControl mb={4}>
//   <FormLabel>Age</FormLabel>
//   <Input
//     type="number"
//     name="age"
//     placeholder="Your Pet's Age"
//     value={formData.age}
//     onChange={handleChange}
//   />
// </FormControl>

// <FormControl mb={4}>
//   <FormLabel>Sex</FormLabel>
//   <Input
//     type="text"
//     name="sex"
//     placeholder="Male/Female"
//     value={formData.sex}
//     onChange={handleChange}
//   />
// </FormControl>

// <FormControl mb={4}>
//   <FormLabel >Upload Image: (Click on choose file to select upload an image)</FormLabel>
//   <Input 
//     type="file"
//     name="imageFile"
//     accept="image/*"
//     onChange={handleChange}
//   />
// </FormControl>

// {/* To show the image in the form */}
// {imageFile && (
//   <img
//     src={URL.createObjectURL(imageFile)}
//     alt="Selected Image"
//     style={{ maxWidth: "100px" }}
//   />
// )}

// <FormControl mb={4}>
//         <FormLabel>Breed</FormLabel>
//         <Input
//           type="text"
//           name="breed"
//           placeholder="Eg: Doberman"
//           value={formData.breed}
//           onChange={handleChange}
//         />
// </FormControl>

//       <FormControl mb={4}>
//         <FormLabel>Temperament</FormLabel>
//         <Input
//             type="text"
//           name="temperament"
//           placeholder="Provide details on your pet's tempermant. Eg: Calm, Hyper, High Energy, Loving, Fiendly"
//           value={formData.temperament}
//           onChange={handleChange}
//         />
//       </FormControl>

//       <FormControl mb={4}>
//     <FormLabel htmlFor="childFriendly">Child-Friendly</FormLabel>
//     <RadioGroup
//         name="childFriendly"
//         value={formData.childFriendly}
//         onChange={(value) => {
//             const label = document.querySelector("label[for='childFriendly']");
//             const labelText = label.textContent;
//             console.log("Form Label Text:", labelText);
//             console.log("Selected Value:", value);
//             setFormData({
//                 ...formData,
//                 childFriendly: value,
//             });
//         }}
//     >
//         <HStack spacing="24px">
//             <Radio value="yes">Yes</Radio>
//             <Radio value="no">No</Radio>
//         </HStack>
//         </RadioGroup>
//       </FormControl>
      
//       <FormControl mb={4}>
//           <FormLabel>Description</FormLabel>
//           <Input
//             type="text"
//             name="description"
//             placeholder="Provide a details on your pet. Some things to include: Brief history, activity level,
//             likes/dislikes, gets along with other pets?, reason for giving pet up for adoption, any fears/trauma?, any other important information the new owner should know"
//             value={formData.description}
//             onChange={handleChange}
//           />
//         </FormControl>

//         <FormControl mb={4}>
//           <FormLabel style={{ fontWeight: "bold", textDecoration: "underline"}}>Medical History: </FormLabel>
//         </FormControl>

//         <FormControl mb={4}>
//             <FormLabel>Allergies</FormLabel>
//             <Input
//               type="text"
//               name="allergies"
//               placeholder="What is your pet allergic to?"
//               value={formData.allergies}
//               onChange={handleChange}
//             />
//           </FormControl>

//           {/* <FormControl mt={4}mb={4}>
//             <FormLabel>Fully Vaccinated</FormLabel>
//             <RadioGroup
//               name="vaccinated"
//               value={formData.medicalHistory.vaccinated}
//               onChange={handleChange}
//             >
//               <HStack spacing="24px">
//                 <Radio value="yes">Yes</Radio>
//                 <Radio value="no">No</Radio>
//               </HStack>
//             </RadioGroup>
//           </FormControl>

//           <FormControl mb={4}>
//             <FormLabel>Spayed Neutered</FormLabel>
//             <RadioGroup
//               name="spayedNeutered"
//               value={formData.medicalHistory.spayedNeutered}
//               onChange={handleChange}
//             >
//               <HStack spacing="24px">
//                 <Radio value="yes">Yes</Radio>
//                 <Radio value="no">No</Radio>
//               </HStack>
//             </RadioGroup>
//           </FormControl> */}

// <FormControl mt={4} mb={4}>
//                     <FormLabel htmlFor="vaccinated">Fully Vaccinated</FormLabel>
//                     <RadioGroup
//                         name="vaccinated"
//                         value={formData.vaccinated}
//                         onChange={(value) => {
//                             const label = document.querySelector("label[for='vaccinated']");
//                             const labelText = label.textContent;
//                             console.log("Form Label Text:", labelText);
//                             console.log("Selected Value:", value);
//                             setFormData({
//                                 ...formData,
//                                 vaccinated: value,
//                             });
//                         }}
//                     >
//                         <HStack spacing="24px">
//                             <Radio value="yes">Yes</Radio>
//                             <Radio value="no">No</Radio>
//                         </HStack>
//                     </RadioGroup>
//                 </FormControl>

//                 <FormControl mb={4}>
//                     <FormLabel htmlFor="spayedNeutered">Spayed Neutered</FormLabel>
//                     <RadioGroup
//                         name="spayedNeutered"
//                         value={formData.spayedNeutered}
//                         onChange={(value) => {
//                             const label = document.querySelector("label[for='spayedNeutered']");
//                             const labelText = label.textContent;
//                             console.log("Form Label Text:", labelText);
//                             console.log("Selected Value:", value);
//                             setFormData({
//                                 ...formData,
//                                 spayedNeutered: value,
//                             });
//                         }}
//                     >
//                         <HStack spacing="24px">
//                             <Radio value="yes">Yes</Radio>
//                             <Radio value="no">No</Radio>
//                         </HStack>
//                     </RadioGroup>
//                 </FormControl>

//       <Button type="submit" colorScheme="blue">
//         Create
//       </Button>
//     </form>
//   </Box>
// );
// };

// export default CreateListing;

import React, { useState } from "react";
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Radio,
    RadioGroup,
    Button,
    HStack,
} from "@chakra-ui/react";

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
        childFriendly: null,
        description: "",
        medicalHistory: {
            allergies: [],
            vaccinated: null,
            spayedNeutered: null,
        },
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (type === "radio") {
            setFormData({
                ...formData,
                [name]: value,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handlePetCreate = (e) => {
        e.preventDefault();
        // Add your code to handle pet creation here
        console.log(formData);
        setFormData({
            name: "",
            species: "",
            age: "",
            sex: "",
            image: "",
            breed: "",
            temperament: "",
            childFriendly: null,
            description: "",
            medicalHistory: {
                allergies: [],
                vaccinated: null,
                spayedNeutered: null,
            },
        });
    };

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
  <FormLabel >Upload Image: (Click on choose file to select upload an image)</FormLabel>
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
        value={formData.childFriendly}
        onChange={(value) => {
            const label = document.querySelector("label[for='childFriendly']");
            const labelText = label.textContent;
            console.log("Form Label Text:", labelText);
            console.log("Selected Value:", value);
            setFormData({
                ...formData,
                childFriendly: value,
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
          <FormLabel style={{ fontWeight: "bold", textDecoration: "underline"}}>Medical History: </FormLabel>
        </FormControl>

        <FormControl mb={4}>
            <FormLabel>Allergies</FormLabel>
            <Input
              type="text"
              name="allergies"
              placeholder="What is your pet allergic to?"
              value={formData.allergies}
              onChange={handleChange}
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
                        value={formData.vaccinated}
                        onChange={(value) => {
                            const label = document.querySelector("label[for='vaccinated']");
                            const labelText = label.textContent;
                            console.log("Form Label Text:", labelText);
                            console.log("Selected Value:", value);
                            setFormData({
                                ...formData,
                                vaccinated: value,
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
                            const label = document.querySelector("label[for='spayedNeutered']");
                            const labelText = label.textContent;
                            console.log("Form Label Text:", labelText);
                            console.log("Selected Value:", value);
                            setFormData({
                                ...formData,
                                spayedNeutered: value,
                            });
                        }}
                    >
                        <HStack spacing="24px">
                            <Radio value="yes">Yes</Radio>
                            <Radio value="no">No</Radio>
                        </HStack>
                    </RadioGroup>
                </FormControl>
                <Button type="submit" colorScheme="blue">
                    Create
                </Button>
            </form>
        </Box>
    );
};

export default CreateListing;
