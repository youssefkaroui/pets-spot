import React from "react";

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

function LoginForm  () {

  const initialRef = React.useRef()
  const finalRef = React.useRef()

  return (
    <>
    

      
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input ref={initialRef} placeholder='Email address' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel> Password</FormLabel>
              <Input placeholder='Password' />
            </FormControl>
          
      
    </>
  );
};
export default LoginForm;