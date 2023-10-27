import React, { useState } from "react";
import {
  Grid,
  GridItem,
  Stack,
  Checkbox,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
} from "@chakra-ui/react";

const Listings = () => {
  //THIS GRABS THE SLIDER'S VALUE FROM THE AGE SELECTOR
  const [sliderValue, setSliderValue] = useState(1);
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <GridItem
          as="aside"
          colSpan={{ base: 2, lg: 2, xl: 1 }}
          bg="primary.main"
          minHeight="100vh"
          p={{ base: "20px", lg: "30px" }}
        >
          <h1 className="searchHeader">Search for a Pet</h1>

          <Stack spacing={4} direction="row">
            <Checkbox>Dog</Checkbox>
            <Checkbox>Cat</Checkbox>
          </Stack>
          <Stack className="childFriendly" spacing={4} direction="row">
            <Checkbox>Child Friendly</Checkbox>
          </Stack>
          <Stack className="spayed" spacing={4} direction="row">
            <Checkbox>Spayed/Neutered</Checkbox>
          </Stack>
          <p className="searchOptionHeader">Sex</p>
          <Stack spacing={4} direction="row">
            <Checkbox>Male</Checkbox>
            <Checkbox>Female</Checkbox>
          </Stack>
          <p className="searchOptionHeader">Age</p>
          <Slider
            id="slider"
            defaultValue={1}
            min={1}
            max={15}
            colorScheme="teal"
            onChange={(v) => setSliderValue(v)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <SliderMark value={5} mt="1.5" ml="-1" fontSize="sm">
              5
            </SliderMark>
            <SliderMark value={10} mt="1.5" ml="-2" fontSize="sm">
              10
            </SliderMark>

            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="teal.500"
              color="white"
              placement="top"
              isOpen={showTooltip}
              label={`${sliderValue}`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
        </GridItem>
      </Grid>
    </>
  );
};

export default Listings;
