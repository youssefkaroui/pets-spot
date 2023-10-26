import React from "react";
import { Image } from "@chakra-ui/react";

const Logo = () => {
  return (
    <Image
      mr="10px"
      boxSize="80px"
      objectFit="cover"
      borderRadius={300}
      src="https://media.istockphoto.com/id/649091176/photo/puppy-and-kitten-closeup-over-white.jpg?s=612x612&w=0&k=20&c=WI6HA8rhU7bRZvNVlBOgjmCkKQr2SYRmqTcl3x6IeAY="
      alt="cat-and-dog"
    />
  );
};

export default Logo;
