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
} from "@chakra-ui/react";
import { ADD_USER } from  "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";


const SignUpForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef()
  const finalRef = React.useRef()

  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
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

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
        
      });
      console.log(data);
      Auth.login(data.addUser.token);
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
            <FormControl>
              <FormLabel>User name</FormLabel>
              <Input 
              ref={initialRef} 
              placeholder='User name' 
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
            onChange={handleInputChange}
            value={userFormData.email}
            required
            />
            </FormControl>

           <FormControl mt={4}>
            <FormLabel> Password</FormLabel>
            <Input 
            type= "password" 
            placeholder='Password' 
            onChange={handleInputChange}
            value={userFormData.password}
            required
            />
           </FormControl>
          
           <ModalFooter>
            <Button colorScheme='green' mr={3}>
              Submit
            </Button>
           </ModalFooter>
    </>
  );
};
export default SignUpForm;