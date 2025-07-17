import axios from "axios";
import { getChoiceById, mapRandomToChoice, getWinner } from "../utils/utils.js";

// Memory storage for game history
let history = [];
const MAX_HISTORY = 10;

// Third-party endpoint that returns a random number between 1 and 100.
const fetchRandomChoice = async () => {
  try {
    const response = await axios.get(process.env.RANDOM_SERVICE_URL, {
      timeout: 5000,
    });

    const randomNumber = response.data.random_number;

    if (!randomNumber || randomNumber < 1 || randomNumber > 100) {
      throw new Error("Invalid random number from external service");
    }

    // Map 1-100 to choice ID (1-5)
    const choiceId = mapRandomToChoice(randomNumber);
    const choice = getChoiceById(choiceId);

    console.log(`External service: ${choice.id} → ${choice.name}`);

    return {
      id: choice.id,
      name: choice.name,
    };
  } catch (error) {
    console.error("External random service failed:", error.message);

    // Fallback
    const fallbackId = Math.floor(Math.random() * 5) + 1;
    const choice = getChoiceById(fallbackId);

    console.log("Using fallback random choice:", choice.name);
    return {
      id: choice.id,
      name: choice.name,
    };
  }
};

const playRound = async (playerChoiceId) => {
  try {
    const playerChoice = getChoiceById(playerChoiceId);
    const computerChoice = await fetchRandomChoice();
    const gameResult = getWinner(playerChoiceId, computerChoice.id);

    const roundResult = {
      results: gameResult.result, // 'win', 'lose', 'tie'
      player: playerChoiceId,
      computer: computerChoice.id,
      timestamp: new Date().toISOString(),
      action: gameResult.action, // 'crushes', 'covers', etc.
      playerChoice: playerChoice.name,
      computerChoice: computerChoice.name,
    };

    addToHistory(roundResult);

    // Log the game result
    console.log(
      `Game: ${playerChoice.name} vs ${computerChoice.name} → ${gameResult.result}`
    );

    return roundResult;
  } catch (error) {
    console.error("Error in playRound:", error);
    throw new Error("Failed to play round");
  }
};

const addToHistory = (roundResult) => {
  history.unshift(roundResult);
  if (history.length > MAX_HISTORY) {
    history.pop();
  }
};

const getHistory = () => {
  return history.slice();
};

const clearHistory = () => {
  history = [];
  console.log("Game history cleared");
  return {
    message: "Game history cleared",
    timestamp: new Date().toISOString(),
  };
};

// Bonus: Game statistics - calculates total games, wins, losses, ties, win rate, choice frequency, and last played time
const getStats = () => {
  const total = history.length;

  const wins = history.filter((game) => game.results === "win").length;
  const losses = history.filter((game) => game.results === "lose").length;
  const ties = history.filter((game) => game.results === "tie").length;

  const choiceFrequency = history.reduce((acc, game) => {
    acc[game.playerChoice] = (acc[game.playerChoice] || 0) + 1;
    return acc;
  }, {});

  const winRate = total > 0 ? parseFloat(((wins / total) * 100).toFixed(1)) : 0;

  const lastPlayed = history.length > 0 ? history[0].timestamp : null;

  return {
    total,
    wins,
    losses,
    ties,
    winRate,
    choiceFrequency,
    lastPlayed,
  };
};

export { fetchRandomChoice, playRound, getHistory, clearHistory, getStats };
