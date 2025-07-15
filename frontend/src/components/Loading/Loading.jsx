import { Spinner, Text, VStack } from "@chakra-ui/react";

const LoadingSmall = () => {
  return (
    <VStack spacing={2}>
      <Spinner />
      <Text fontSize="sm" color="gray.600">
        Playing round...
      </Text>
    </VStack>
  );
};

const LoadingLarge = () => {
  return (
    <VStack spacing={8} justify="center" minH="50vh">
      <Spinner size="xl" />
      <Text>Loading game...</Text>
    </VStack>
  );
};

export { LoadingSmall, LoadingLarge };
