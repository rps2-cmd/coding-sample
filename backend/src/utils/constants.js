// source: https://www.samkass.com/theories/RPSSL.html
export const CHOICES = [
  { id: 1, name: "rock" },
  { id: 2, name: "paper" },
  { id: 3, name: "scissors" },
  { id: 4, name: "lizard" },
  { id: 5, name: "spock" },
];

// source: https://www.samkass.com/theories/RPSSL.html
export const CHOICE_ACTIONS = {
  1: { 3: "crushes", 4: "crushes" }, // rock beats scissors, lizard
  2: { 1: "covers", 5: "disproves" }, // paper beats rock, spock
  3: { 2: "cuts", 4: "decapitates" }, // scissors beats paper, lizard
  4: { 2: "eats", 5: "poisons" }, // lizard beats paper, spock
  5: { 1: "vaporizes", 3: "smashes" }, // spock beats rock, scissors
};
