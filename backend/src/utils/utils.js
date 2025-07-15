import { CHOICE_ACTIONS, CHOICES } from "./constants.js";

function getChoiceById(id) {
  return CHOICES.find((choice) => choice.id === parseInt(id));
}

function getWinner(playerChoiceId, computerChoiceId) {
  const playerId = parseInt(playerChoiceId);
  const computerId = parseInt(computerChoiceId);
  
  if (playerId === computerId)
    return { result: "tie", action: null };

  const playerWins = CHOICE_ACTIONS[playerId]?.[computerId];
  const action = playerWins
    ? CHOICE_ACTIONS[playerId]?.[computerId]
    : CHOICE_ACTIONS[computerId]?.[playerId];
  return {
    result: playerWins ? "win" : "lose",
    action: action || "beats",
  };
}

function mapRandomToChoice(randomNumber) {
  // map 1-100 to choice IDs 1-5
  return Math.floor((randomNumber - 1) / 20) + 1;
}

export { getChoiceById, getWinner, mapRandomToChoice };
