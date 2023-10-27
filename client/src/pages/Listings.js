import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";

const Listings = () => {
  return (
    <>
      <Grid templateColumns='repeat(5, 1fr)' gap={6}>
        <GridItem
          as="aside"
          colSpan={{ base: 2, lg: 2, xl: 1 }}
          bg="primary.main"
          minHeight="100vh"
          p = {{ base: "20px", lg: "30px" }}
        >

        </GridItem>
      </Grid>
    </>
  );
};

export default Listings;
