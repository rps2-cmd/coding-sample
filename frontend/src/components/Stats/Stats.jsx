import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Badge,
} from "@chakra-ui/react";
import { clearGameHistory } from "../../services/api";

const Stats = ({ stats, loadStats }) => {
  const clearHistory = async () => {
    try {
      await clearGameHistory();
      await loadStats(); // Refresh stats after clearing
    } catch (err) {
      console.log(`Error clearing history: ${err.message}`);
    }
  };

  return (
    <Box
      bg="white"
      p={4}
      borderRadius="l"
      border="1px solid"
      borderColor="gray.200"
      h="fit-content"
      minW="250px"
    >
      <VStack spacing={4} align="stretch">
        <Heading size="md">Game Statistics</Heading>

        <Box h="1px" bg="gray.200" />

        {!stats || stats.total === 0 ? (
          <Text fontSize="sm" color="gray.600" textAlign="center">
            No games played yet
          </Text>
        ) : (
          <>
            <VStack spacing={3} align="stretch">
              <Box>
                <Text fontSize="sm" color="gray.600">
                  Total Games
                </Text>
                <Text fontSize="lg" fontWeight="bold">
                  {stats.total}
                </Text>
              </Box>

              <HStack justify="space-between">
                <Box>
                  <Text fontSize="xs" color="green.600">
                    Wins
                  </Text>
                  <Text fontSize="md" color="green.600" fontWeight="bold">
                    {stats.wins}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="xs" color="red.600">
                    Losses
                  </Text>
                  <Text fontSize="md" color="red.600" fontWeight="bold">
                    {stats.losses}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="xs" color="gray.600">
                    Ties
                  </Text>
                  <Text fontSize="md" color="gray.600" fontWeight="bold">
                    {stats.ties}
                  </Text>
                </Box>
              </HStack>

              <Box>
                <Text fontSize="sm" color="gray.600">
                  Win Rate
                </Text>
                <Text fontSize="lg" color="green.600" fontWeight="bold">
                  {stats.winRate}%
                </Text>
              </Box>

              {stats.choiceFrequency &&
                Object.keys(stats.choiceFrequency).length > 0 && (
                  <>
                    <Box h="1px" bg="gray.200" />
                    <Box>
                      <Text fontSize="sm" fontWeight="medium" mb={2}>
                        Choice Frequency
                      </Text>
                      <VStack spacing={1} align="stretch">
                        {Object.entries(stats.choiceFrequency)
                          .sort((a, b) => b[1] - a[1])
                          .map(([choice, count]) => (
                            <HStack key={choice} justify="space-between">
                              <Text fontSize="sm" textTransform="capitalize">
                                {choice}
                              </Text>
                              <Badge colorScheme="blue" size="sm">
                                {count}
                              </Badge>
                            </HStack>
                          ))}
                      </VStack>
                    </Box>
                  </>
                )}

              {stats.lastPlayed && (
                <>
                  <Box h="1px" bg="gray.200" />
                  <Text fontSize="xs" color="gray.500">
                    Last played: {new Date(stats.lastPlayed).toLocaleString()}
                  </Text>
                </>
              )}
            </VStack>

            <Button
              size="sm"
              variant="outline"
              onClick={clearHistory}
            >
              Clear History
            </Button>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default Stats;
