import { Box, VStack, HStack, Text, Badge } from "@chakra-ui/react";
import ResultTile from "./ResultTile.jsx";

const Result = ({ result }) => {
  if (!result) return null;
  const { playerChoice, computerChoice, message } = result;

  return (
    <Box
      p={6}
      bg={message.bg}
      border="2px solid"
      borderColor={message.borderColor}
      borderRadius="l"
      maxW="md"
      mx="auto"
    >
      <VStack spacing={4}>
        <Badge
          colorScheme={message.color}
          fontSize="lg"
          px={4}
          py={2}
          borderRadius="full"
        >
          {message.text}
        </Badge>
        <HStack spacing={8} justify="center">
          <ResultTile player="You" details={playerChoice} />
          <VStack>
            <Text fontSize="xl" fontWeight="bold" color="gray.500">
              VS
            </Text>
          </VStack>
          <ResultTile player="Computer" details={computerChoice} />
        </HStack>
      </VStack>
    </Box>
  );
};

export default Result;
