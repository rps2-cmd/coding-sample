import {
  fetchRandomChoice,
  playRound,
  getHistory,
  clearHistory,
  getStats,
} from "../services/services.js";
import { CHOICES } from "../utils/constants.js";

// GET /api/choices - Get all available choices
const getChoices = (req, res) => {
  const choices = CHOICES;
  res.json(choices);
};

// GET /api/choice - Get random computer choice
const getRandomChoice = async (req, res) => {
  try {
    const choice = await fetchRandomChoice();
    res.json(choice);
  } catch (error) {
    console.error("Error getting random choice:", error);
    res.status(500).json({ error: "Failed to get random choice" });
  }
};

// POST /api/play - Play a round
const playGameRound = async (req, res) => {
  try {
    const { player } = req.body || {};
    const playerFromQuery = req.query.player;
    
    // Use query or body parameter
    const selectedPlayer = player || playerFromQuery;

    if (!selectedPlayer) {
      return res.status(400).json({
        error: "Invalid player choice. Please provide player in request body or query string.",
      });
    }

    const result = await playRound(selectedPlayer);
    res.json(result);
  } catch (error) {
    console.error("Error playing round:", error);
    res.status(500).json({ error: "Failed to play round" });
  }
};

const getGameHistory = async (req, res) => {
  try {
    const history = getHistory();
    res.json(history);
  } catch (error) {
    console.error("Error getting game history:", error);
    res.status(500).json({ error: "Failed to get game history" });
  }
};

const clearGameHistory = async (req, res) => {
  try {
    const result = clearHistory();
    res.json(result);
  } catch (error) {
    console.error("Error clearing game history:", error);
    res.status(500).json({ error: "Failed to clear game history" });
  }
};

const getGameStats = async (req, res) => {
  try {
    const stats = getStats();
    res.json(stats);
  } catch (error) {
    console.error("Error getting game stats:", error);
    res.status(500).json({ error: "Failed to get game stats" });
  }
};

export {
  getChoices,
  getRandomChoice,
  playGameRound,
  getGameHistory,
  clearGameHistory,
  getGameStats,
};
