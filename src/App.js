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
import { selectToggle, combineSelected } from './reducers/game';
import { GameStack } from './GameStack';
import { Player } from './Player';

import { new_game, join_game, start_game, play_combo } from './reducers/game';
function App() {
  const player = useSelector(state => state.game.player);
  const combinations = useSelector(state => state.game.combinations);
  const others = useSelector(state => state.game.others);
  const gamestack = useSelector(state => state.game.gamestack);

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
          <HStack mt="1">
            <Box color="pink.200"> Jocker</Box>
            <Button
              onClick={() => {
                let name = prompt('Please enter your name');

                dispatch(new_game(name));
              }}
            >
              New Game
            </Button>
            <Button
              onClick={() => {
                let game_id = Number(prompt('Please enter your game id'));
                let name = prompt('Please enter your name');

                dispatch(join_game(game_id, name));
              }}
            >
              Join Game
            </Button>
            <Button
              onClick={() => {
                dispatch(start_game());
              }}
            >
              Start Game
            </Button>
            <Button
              onClick={() => {
                dispatch(play_combo());
              }}
            >
              Play Combo
            </Button>
          </HStack>
        </GridItem>
        <GridItem pl="2" bg="green.500" area={'nav'} pt="20px">
          <VStack spacing="-65px">
            {player.cards.map((card, idx) => (
              <Card
                key={idx}
                color={card.color}
                num={card.num}
                selected={card.selected}
                idx={idx}
                onClick={() => dispatch(selectToggle({ idx }))}
              />
            ))}
          </VStack>
        </GridItem>
        <GridItem pl="2" bg="green.300" area={'main'} pt="20px">
          <Stack spacing="20px">
            {combinations.map((combo, idx) => (
              <HStack
                spacing="-50px"
                key={idx}
                onClick={() => {
                  dispatch(combineSelected({ comboIdx: idx }));
                }}
              >
                {combo.map((card, idx) => (
                  <Card key={idx} color={card.color} num={card.num} />
                ))}
              </HStack>
            ))}
          </Stack>
        </GridItem>
        <GridItem pl="2" bg="green.500" area={'players'} pt="20px" pb="20px">
          <Stack>
            {others.map((p, idx) => (
              <Player key={idx} name={p.name} count={p.count} />
            ))}
          </Stack>
        </GridItem>
        <GridItem pl="2" bg="greeb.500" area={'gamestack'}>
          <GameStack visible={gamestack.visible} />
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
