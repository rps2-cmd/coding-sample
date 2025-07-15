import { useState, useEffect } from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Alert,
} from "@chakra-ui/react";
import { getChoices, playRound } from "./services/api.js";
import {
  Result,
  ChoiceButton,
  GameRules,
  Stats,
  Board,
  LoadingLarge,
  LoadingSmall,
} from "./components";
import { RESULT_OPTIONS } from "./constants/constants";
import { useStats } from "./hooks/useStats";

function App() {
  const [choices, setChoices] = useState([]);
  const [gameResult, setGameResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingChoices, setIsLoadingChoices] = useState(true);
  const [error, setError] = useState(null);
  
  const { stats, loadStats } = useStats();

  // Load choices on mount
  useEffect(() => {
    loadChoices();
  }, []);

  const loadChoices = async () => {
    try {
      setIsLoadingChoices(true);
      setError(null);
      const choicesData = await getChoices();
      setChoices(choicesData);
    } catch (err) {
      console.log(`Error loading choices: ${err.message}`);
      setError("Failed to load game choices. Please refresh the page.");
    } finally {
      setIsLoadingChoices(false);
    }
  };

  const playGame = async (selectedChoice) => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await playRound(selectedChoice.id);

      setGameResult({
        playerChoice: selectedChoice,
        computerChoice: choices.find((c) => c.id === result.computer),
        message: RESULT_OPTIONS[result.result] || RESULT_OPTIONS.tie,
      });
      
      loadStats();
    } catch (err) {
      console.log(`Error playing game: ${err.message}`);

      setError("Failed to play round. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetGame = () => {
    setGameResult(null);
    setError(null);
  };

  // Loading state
  if (isLoadingChoices) {
    return (
      <Container maxW="container.lg" py={8}>
        <LoadingLarge />
      </Container>
    );
  }

  return (
    <Box bg="gray.50" minH="100vh">
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8}>
          <HStack justify="space-between" w="full">
            <Box>
              <Heading size="2xl" mb={2}>
                Rock Paper Scissors Lizard Spock
              </Heading>
              <Text fontSize="lg" color="gray.600">
                The ultimate game of chance and strategy
              </Text>
            </Box>
            <Button
              onClick={() => setError("Test error message")}
              colorScheme="red"
              size="sm"
            >
              Test Error
            </Button>
          </HStack>
          {error && (
            <Alert.Root status="error" borderRadius="sm">
              {error}
              <Button ml="auto" size="sm" onClick={loadChoices}>
                Retry
              </Button>
            </Alert.Root>
          )}
          <VStack spacing={6} w="full">
            <Board stats={stats} />
            <HStack spacing={8} align="start" w="full" wrap="wrap">
              <Box
                flex="1"
                bg="white"
                p={8}
                borderRadius="l"
                border="1px solid"
                borderColor="gray.200"
              >
                {!gameResult ? (
                  <VStack spacing={6}>
                    <Text fontSize="xl" fontWeight="semibold" textAlign="center">
                      Choose your weapon:
                    </Text>

                    <HStack wrap="wrap" gap={4} w="full" maxW="600px">
                      {choices.map((choice) => (
                        <ChoiceButton
                          key={choice.id}
                          choice={choice}
                          onClick={playGame}
                          isDisabled={isLoading}
                          size="lg"
                        />
                      ))}
                    </HStack>
                    {isLoading && <LoadingSmall />}
                  </VStack>
                ) : (
                  <VStack spacing={6}>
                    <Result result={gameResult} />
                    <Button onClick={resetGame} size="lg">
                      Play Again
                    </Button>
                  </VStack>
                )}
              </Box>
              <Stats stats={stats} loadStats={loadStats} />
            </HStack>
          </VStack>
          <GameRules />
        </VStack>
      </Container>
    </Box>
  );
}

export default App;
