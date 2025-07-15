import { Box, Text, VStack } from "@chakra-ui/react";
import { CHOICES } from "../../constants/constants";

const ResultTile = ({ player, details }) => {
  return (
    <VStack spacing={2}>
      <Text fontSize="sm" fontWeight="semibold" color="gray.600">
        {player}
      </Text>
      <Box fontSize="4xl" p={3} bg="white" borderRadius="l" boxShadow="md">
        {CHOICES[details?.name] || CHOICES.question}
      </Box>
      <Text fontSize="sm" fontWeight="medium" textTransform="capitalize">
        {details?.name || "unknown"}
      </Text>
    </VStack>
  );
};

export default ResultTile;
