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

const SignUpForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef()
  const finalRef = React.useRef()

  return (
    <>
      
            <FormControl>
              <FormLabel>User name</FormLabel>
              <Input ref={initialRef} placeholder='User name' />
            </FormControl>
            <FormControl mt={4}>
            <FormLabel>Email address</FormLabel>
            <Input ref={initialRef} placeholder='Email address' />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel> Password</FormLabel>
            <Input placeholder='Password' />
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