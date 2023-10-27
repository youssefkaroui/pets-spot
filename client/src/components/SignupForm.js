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

const SignUpform = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef()
  const finalRef = React.useRef()

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Button ml={4} ref={finalRef}>

      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Button colorScheme='blue' mr={3}>Login</Button>
            <Button colorScheme='blue' mr={3}> Signup</Button>

          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>User mane</FormLabel>
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
        </ModalBody>
      </ModalContent>
    </Modal>
    </>
  );
};
export default SignUpform;