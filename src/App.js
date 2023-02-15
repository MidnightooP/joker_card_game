import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Progress } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";

import React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Stack,
  Image,
  Button,
} from "@chakra-ui/react";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = importAll(
  require.context("./cardfixed", false, /\.(png|jpe?g|svg)$/)
);

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Image src={images["2_of_clubs.svg"]} />
      </Box>
    </ChakraProvider>
  );
}

export default App;
