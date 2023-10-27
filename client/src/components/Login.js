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
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const initialRef = React.useRef()
  const finalRef = React.useRef()

  return (
    <>
    

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        
  
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input ref={initialRef} placeholder='Email address' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel> Password</FormLabel>
              <Input placeholder='Password' />
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
      
    </>
  );
};
export default LoginForm;