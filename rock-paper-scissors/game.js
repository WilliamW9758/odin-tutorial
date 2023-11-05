let yourScore = 0;
let cpuScore = 0;

function getComputerChoice() {
  const choices = [];
  choices.push("rock", "paper", "scissors");
  return choices[Math.floor(Math.random() * 3)];
}

function playRound(playerSelection) {
  console.log("played");
  const computerSelection = getComputerChoice();
  let result;
  if (computerSelection === playerSelection) {
    result = 0;
  } else if (computerSelection === "rock" && playerSelection === "scissors") {
    cpuScore += 1;
  } else if (computerSelection === "scissors" && playerSelection === "paper") {
    cpuScore += 1;
  } else if (computerSelection === "paper" && playerSelection === "rock") {
    cpuScore += 1;
  } else {
    yourScore += 1;
  }
  let scoreText = document.getElementById("score-text");
  let playText = document.getElementById("play-text");
  console.log(yourScore);
  scoreText.textContent = "You " + yourScore + " : " + cpuScore + " CPU";
  playText.textContent =
    "You played " + playerSelection + " v.s. CPU's " + computerSelection;
}
