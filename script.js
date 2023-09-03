let playerWinCount = 0, computerWinCount = 0;

// this will show dialogue box instead
function printGameResults() {
    const gameResultsSection = document.querySelector('section.game-result');
    const body = document.querySelector('body');

    if (playerWinCount > computerWinCount) {
        gameResultsSection.textContent = "Congrats! You're a winner, for once :).";
    }
    else {
        gameResultsSection.textContent = "You lose! Not a good look :o.";
    }
}

// this will simply reset scores
function resetScores() {
    
}

function addPlayAgainOption() {
    const playAgainSection = document.createElement('section');
    const retryIcon = document.createElement('i');
    const gameSessionDetails = document.querySelector('.game-session-details');

    playAgainSection.textContent = `Play again? `;
    playAgainSection.classList.add('play-again');

    retryIcon.classList.add('fa-solid');
    retryIcon.classList.add('fa-rotate-right');

    playAgainSection.appendChild(retryIcon);
    gameSessionDetails.appendChild(playAgainSection);

    retryIcon.addEventListener('click', () => {
        enablePlayerSide();
        enableComputerSide();
        removePlayAgainOption(gameSessionDetails, playAgainSection);
        showScores();
        removeGameResultsText();
    });
}

function showScores() {
    const computerScoreSection = document.querySelector('.score.computer');
    const playerScoreSection = document.querySelector('.score.player');

    computerScoreSection.textContent = `Score: ${computerWinCount}`;
    playerScoreSection.textContent = `Score: ${playerWinCount}`;
}

function getRandomInt(min, max) {
    let randomNumber = Math.floor(Math.random() * (max - min) + min);
    return randomNumber;
}

function determineWinner(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

    // if player and computer play the same then output draw
    if (playerSelection === computerSelection) {
        return `Draw! Both played ${playerSelection}`;
    }

    playerWins = (playerSelection === "rock" && computerSelection === "scissors")
        || (playerSelection === "scissors" && computerSelection === "paper")
        || (playerSelection === "paper" && computerSelection === "rock");

    // cover player win cases
    if (playerWins) {
        playerWinCount++;
        showScores();
        playerSelection = playerSelection.replace(playerSelection[0], playerSelection[0].toUpperCase());
        return `You win! ${playerSelection} beats ${computerSelection}.`;
    }

    playerLoses = (playerSelection === "paper" && computerSelection === "scissors")
        || (playerSelection === "rock" && computerSelection === "paper")
        || (playerSelection === "scissors" && computerSelection === "rock");
    // cover player loss cases
    if (playerLoses) {
        computerWinCount++;
        showScores();
        computerSelection = computerSelection.replace(computerSelection[0], computerSelection[0].toUpperCase());
        return `You lose! ${computerSelection} beats ${playerSelection}.`;
    }
}

function getComputerChoice() {
    let numInRange = getRandomInt(1, 4);

    switch (numInRange) {
        case 1: return "rock";
        case 2: return "scissors";
        case 3: return "paper";
    }
};

function endGame() {
    printGameResults();

    // Reset win counts
    playerWinCount = 0;
    computerWinCount = 0;

    addPlayAgainOption();
    disableIcons();
}

// My priority is to keep the main flow of the round to this function, true to its name of course. 
function playRound(e) {
    // Disallow user selection while round is being played.

    let playerSelection = "";
    switch (true) {
        case e.target.classList.contains("rock"):
            playerSelection = "rock";
            break;
        case e.target.classList.contains("paper"):
            playerSelection = "paper";
            break;
        case e.target.classList.contains("scissors"):
            playerSelection = "scissors";
            break;

        default:
            break;
    }

    let computerSelection = getComputerChoice();

    // Telegraph computer choice with same styles as user except automatic, in order
    // Get computer button
    const chosenComputerButton = document.querySelector(`button.computer.${computerSelection}`);;
    // Add clicked class
    chosenComputerButton.classList.add('clicked');
    // Add hover class
    chosenComputerButton.classList.add('hover');

    // Play round only after computer hover transform scale size up transition ends
    chosenComputerButton.addEventListener('transitionend', (e) => {

        const roundResultsSection = document.querySelector('section.round-result');
        roundResultsSection.textContent = determineWinner(playerSelection, computerSelection);

        // Remove all stalled effects for round, both player and computer
        chosenComputerButton.classList.remove('hover');
        chosenComputerButton.classList.remove('clicked');

        // Remove active styling classes for individual player button
        const chosenPlayerButton = document.querySelector(`button.player.${playerSelection}`);;
        chosenPlayerButton.classList.remove('clicked');

        if (playerWinCount === 5 || computerWinCount === 5) {
            endGame();
        }

    }, { once: true });
}

const playButtons = document.querySelectorAll('button.play-option.player');

playButtons.forEach(button => {
    button.addEventListener('click', playRound);
});




