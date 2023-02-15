import { Card } from './Card';
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
  HStack,
} from '@chakra-ui/react';

export function GameStack() {
  return (
    <HStack spacing="20px" p="4">
      <Card color={'clubs'} num={'ace'} />
      <HStack spacing="-65px">
        <Card />
        <Card />
        <Card />
      </HStack>
    </HStack>
  );
}
