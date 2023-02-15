import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Progress } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';

import React from 'react';
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
} from '@chakra-ui/react';

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react';

import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './reducers/game';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}

const images = importAll(
  require.context('./cardfixed', false, /\.(png|jpe?g|svg)$/)
);

// I am a comment qweqwe
function App() {
  const count = useSelector(state => state.game.value);
  const dispatch = useDispatch();

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Image src={images['2_of_clubs.svg']} />
        {count}
        <Button
          onClick={() => {
            dispatch(increment());
          }}
        >
          Increment
        </Button>
        <Button
          onClick={() => {
            dispatch(decrement());
          }}
        >
          Decrement
        </Button>
      </Box>
    </ChakraProvider>
  );
}

export default App;
