import { HStack, Box } from '@chakra-ui/react';
import { Card } from './Card';

export function Player({ count, name }) {
  return (
    <Box>
      <HStack>
        <HStack spacing="-37px">
          {Array(count)
            .fill(0)
            .map(x => (
              <Card w={'40px'} />
            ))}
        </HStack>
        <Box>{name}</Box>
      </HStack>
    </Box>
  );
}
