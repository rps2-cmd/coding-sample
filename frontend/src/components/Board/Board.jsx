import { Box, HStack, VStack, Text, Badge } from "@chakra-ui/react";

const Board = ({ stats }) => {

  if (!stats || stats.total === 0) {
    return (
      <Box
        bg="white"
        p={4}
        borderRadius="l"
        border="1px solid"
        borderColor="gray.200"
        textAlign="center"
        maxW="400px"
        mx="auto"
      >
        <Text fontSize="sm" color="gray.500">
          No games played yet
        </Text>
      </Box>
    );
  }

  return (
    <Box
      bg="white"
      p={4}
      borderRadius="l"
      border="1px solid"
      borderColor="gray.200"
      maxW="400px"
      mx="auto"
    >
      <VStack spacing={4}>
        <Text fontSize="lg" fontWeight="bold">
          Current Score
        </Text>
        
        <HStack spacing={8} justify="center">
          <VStack>
            <Text fontSize="sm" color="gray.600">
              You
            </Text>
            <Badge colorScheme="green" fontSize="xl" px={4} py={2}>
              {stats.wins}
            </Badge>
          </VStack>
          
          <VStack>
            <Text fontSize="2xl" fontWeight="bold" color="gray.400">
              :
            </Text>
          </VStack>
          
          <VStack>
            <Text fontSize="sm" color="gray.600">
              Computer
            </Text>
            <Badge colorScheme="red" fontSize="xl" px={4} py={2}>
              {stats.losses}
            </Badge>
          </VStack>
        </HStack>
        
        {stats.ties > 0 && (
          <HStack spacing={2}>
            <Text fontSize="sm" color="gray.600">
              Ties:
            </Text>
            <Badge colorScheme="yellow" size="sm">
              {stats.ties}
            </Badge>
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

export default Board;