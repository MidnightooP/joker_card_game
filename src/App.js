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
  theme,
  Stack,
  Image,
  Button,
  HStack,
} from '@chakra-ui/react';
import { Grid, GridItem } from '@chakra-ui/react';

import { Card } from './Card';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './reducers/game';
import { GameStack } from './GameStack';
import { Player } from './Player';
function App() {
  const count = useSelector(state => state.game.value);
  const dispatch = useDispatch();

  return (
    <ChakraProvider theme={theme}>
      <Grid
        templateAreas={`"header header header"
                  "nav main players"
                  "nav main gamestack"`}
        gridTemplateRows={'50px 1fr 200px'}
        gridTemplateColumns={'220px 1fr 220px'}
        minH="100vh"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" bg="green.900" area={'header'}>
          French Jocker
        </GridItem>
        <GridItem pl="2" bg="green.500" area={'nav'} pt="20px">
          <VStack spacing="-65px">
            <Card w={70} color={'clubs'} num={3} />
            <Card w={70} color={'hearts'} num={2} />
          </VStack>
        </GridItem>
        <GridItem pl="2" bg="green.100" area={'main'} pt="20px" pl="20px">
          <Stack spacing="20px">
            <HStack spacing="-50px">
              <Card w={70} color={'clubs'} num={3} />
              <Card w={70} color={'hearts'} num={2} />
            </HStack>
            <HStack spacing="-50px">
              <Card w={70} color={'clubs'} num={3} />
              <Card w={70} color={'hearts'} num={2} />
              <Card w={70} color={'hearts'} num={2} />
              <Card w={70} color={'hearts'} num={2} />
            </HStack>
            <HStack spacing="-50px">
              <Card w={70} color={'clubs'} num={3} />
              <Card w={70} color={'hearts'} num={2} />
              <Card w={70} color={'hearts'} num={2} />
              <Card w={70} color={'hearts'} num={2} />
            </HStack>
          </Stack>
        </GridItem>
        <GridItem pl="2" bg="green.500" area={'players'} pt="20px" pb="20px">
          <Stack>
            <Player name="John" count={3} />
            <Player name="Peter" count={10} />
            <Player name="Alice" count={13} />
            <Player name="Jesica" count={13} />
          </Stack>
        </GridItem>
        <GridItem pl="2" bg="greeb.500" area={'gamestack'}>
          <GameStack />
        </GridItem>
      </Grid>
      {/* 
      <Box textAlign="center" fontSize="xl">
        <Box mt="10" ml="10">
          <Card w={70} />
        </Box>
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
      </Box> */}
    </ChakraProvider>
  );
}

export default App;
