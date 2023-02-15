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

export function GameStack({ visible }) {
  return (
    <HStack spacing="20px" p="4">
      <Card color={visible.color} num={visible.num} />
      <HStack spacing="-65px">
        <Card />
        <Card />
        <Card />
      </HStack>
    </HStack>
  );
}
