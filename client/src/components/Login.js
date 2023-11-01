
import React, { useState} from 'react';
import { useNavigate } from "react-router-dom";
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
  useToast
} from "@chakra-ui/react";
import { DefaultContext } from "react-icons/lib";

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";


function LoginForm  () {
  const toast = useToast()
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef()
  const finalRef = React.useRef()

  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Login Submission...")
    const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });
      setTimeout(() => {
        console.log("Delayed for 1 second.");
      }, 10000);
      Auth.login(data.login.token);
      toast({
        title: "Welcome Back!",
        description: "Check out our Listings page for all the animals looking for a new home!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/dashboard")
    } catch (err) {
      console.error(err);
      toast({
        title: `${err}`,
        description: "Please try again",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    // setUserFormData({
    //   username: "",
    //   email: "",
    //   password: "",
    // });
  };

  return (
    <>
            <FormControl >
              <FormLabel>Email address</FormLabel>
              <Input 
              type = "email" 
              // ref={initialRef} 
              placeholder='Email address' 
              name='email'
              onChange={handleInputChange}
             value={userFormData.email}
             required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel> Password</FormLabel>
              <Input 
              type="password" 
              placeholder='Password' 
              name='password'
             onChange={handleInputChange}
             value={userFormData.password}
             required
              />
            </FormControl>
            
            <ModalFooter>
            <Button type="submit" onClick={handleFormSubmit} colorScheme='green' mr={3}>
              Submit
            </Button>
            
          </ModalFooter>
          
      
    </>
  );
};
export default LoginForm;