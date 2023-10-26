import { extendTheme } from "@chakra-ui/react";

const colors = {
  primary: {
    header: "#34656D",
    main: "#6DECB9",
    links: "#F4F4F4",
    hover: "#334443",
    paws: "#2CC4CB",
  }
};

const customTheme = extendTheme({ colors });

export default customTheme;