import React from "react";
import { Box, Image, Button } from "@chakra-ui/react";

function Home() {
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
        w="100%"
        bgColor="#6DECB9"
      >
        <Box color="#34656D" p="20px" textAlign="center">
          <h2>
            Bring home the pet you have always wanted. Give them the family they
            have always wanted.
          </h2>
          <Box>
            <Button 
              borderRadius={10}
              size="lg"
              fontSize={20}
              fontWeight={900}
              bgColor="#F4F4F4"
              color="#34656D"
              p="10px 20px"
              _hover={{
                bgColor: "#34656D",
                color: "white"
              }}
            >Adopt Today!</Button>
          </Box>
        </Box>
        <Box>
          <Image
            src="https://media.istockphoto.com/id/464856694/photo/cat-and-happy-dog-together.jpg?s=612x612&w=0&k=20&c=1VLRIwO1B45Xr3HaZ0HDNgTivuwIBdZvCsGXk01nfv4="
            alt="cat-and-dog"
          />
        </Box>
      </Box>
    </>
  );
}

export default Home;
