import { Box, Text, VStack } from "@chakra-ui/react";

const GameRules = () => {
  return (
    <Box
      w="full"
      bg="white"
      p={6}
      borderRadius="l"
      border="1px solid"
      borderColor="gray.200"
    >
      <Text fontSize="lg" fontWeight="semibold" mb={3}>
        Game Rules:
      </Text>
      <VStack align="start" fontSize="sm" color="gray.600">
        <Text>• Rock crushes Scissors and Lizard</Text>
        <Text>• Paper covers Rock and disproves Spock</Text>
        <Text>• Scissors cuts Paper and decapitates Lizard</Text>
        <Text>• Lizard eats Paper and poisons Spock</Text>
        <Text>• Spock vaporizes Rock and smashes Scissors</Text>
      </VStack>
    </Box>
  );
};
export default GameRules;
