
import React, { useState} from 'react';
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
import { DefaultContext } from "react-icons/lib";

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";


function LoginForm  () {
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

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input ref={initialRef} placeholder='Email address' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel> Password</FormLabel>
              <Input type="password" placeholder='Password' />
            </FormControl>
            
            <ModalFooter>
            <Button colorScheme='green' mr={3}>
              Submit
            </Button>
            
          </ModalFooter>
          
      
    </>
  );
};
export default LoginForm;