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

import { Card } from './Card';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './reducers/game';

function App() {
  const count = useSelector(state => state.game.value);
  const dispatch = useDispatch();

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Card w={70} color={'clubs'} num={3} />
        <Card w={70} color={'hearts'} num={2} />

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
