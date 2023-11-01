import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { ADD_USER } from  "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";


const SignUpForm = () => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef()
  const finalRef = React.useRef()

  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '', address: { line_one: "", line_two: "", city: "", state: "", zipcode:"" } });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };
console.log(userFormData);
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { userInput: { ...userFormData } },
        
      });
      console.log(data);
      Auth.login(data.addUser.token);
      ;
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    };

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };
  return (
    <>
            <FormControl onClose={() => {
              toast({
                title: "Welcome Back!",
                description: "Check out our Listings page for all the animals looking for a new home!",
                status: "success",
                duration: 5000,
                isClosable: true,
              });
            }}>
              <FormLabel>User name</FormLabel>
              <Input 
              ref={initialRef} 
              placeholder='User name' 
              name='username'
              onChange={handleInputChange}
              value={userFormData.username}
              required
              />
            </FormControl>
            <FormControl mt={4}>
            <FormLabel>Email address</FormLabel>
            <Input 
            type = "email" 
            ref={initialRef} 
            placeholder='Email address' 
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
            />
            </FormControl>
           <FormControl  mt={4}>
            <FormLabel> Password</FormLabel>
            <Input 
            type= "password" 
            placeholder='Password' 
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
            />
           </FormControl>
           <FormControl onChange={(e) => {
              const {name, value} = e.target
              setUserFormData({...userFormData, address: {...userFormData.address, [name]: value}})
              }} mt={4}>
            <FormLabel> Address </FormLabel>
            <Input 
            type= "text" 
            placeholder='line_one' 
            name="line_one"
            value={userFormData.address.line_one}
            required
            />
            <Input 
            type= "text" 
            placeholder='line_two' 
            name="line_two"
            value={userFormData.address.line_two}
            required
            />
            <Input 
            type= "text" 
            placeholder='city' 
            name="city"
            value={userFormData.address.city}
            required
            />
            <Input 
            type= "text" 
            placeholder='state' 
            name="state"
            value={userFormData.address.state}
            required
            />
            <Input 
            type= "text" 
            placeholder='zipcode' 
            name="zipcode"
            value={userFormData.address.zipcode}
            required
            />
           </FormControl>
           <ModalFooter>
            <Button onClick={handleFormSubmit} colorScheme='green' mr={3}>
              Submit
            </Button>
           </ModalFooter>
    </>
  );
};
export default SignUpForm;