import React from "react";
import { Flex, Image, Button, Text } from "@chakra-ui/react";

function Home() {
  return (
    <>
      <Flex
        flexDirection={{ base: "column", lg: "row" }}
        alignItems="center"
        justifyContent="space-evenly"
        bgColor="primary.main"
      >
        <Flex
          flexDirection="column"
          color="#34656D"
          p="20px"
          textAlign="center"
          alignItems="center"
        >
          <Text fontSize={30} fontStyle="italic" fontWeight={600} m={4}>
            Bring home the pet you have always wanted. <br></br>Give them the
            family they have always wanted.
          </Text>

          <Button
            borderRadius={10}
            size="lg"
            fontSize={20}
            fontWeight={900}
            bgColor="#F4F4F4"
            color="#34656D"
            p="10px 20px"
            w="50%"
            _hover={{
              bgColor: "#34656D",
              color: "white",
            }}
          >
            Adopt Today!
          </Button>
        </Flex>
        <Flex>
          <Box color="#34656D" p="20px" textAlign="center">
            <h2>
              Bring home the pet you have always wanted. Give them the family
              they have always wanted.
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
                  color: "white",
                }}
              >
                Adopt Today!
              </Button>
            </Box>
          </Box>
          <Box>
            <Image
              src="https://media.istockphoto.com/id/464856694/photo/cat-and-happy-dog-together.jpg?s=612x612&w=0&k=20&c=1VLRIwO1B45Xr3HaZ0HDNgTivuwIBdZvCsGXk01nfv4="
              alt="cat-and-dog"
            />
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export default Home;
