let playerWinCount = 0, computerWinCount = 0;

function printGameResults() {
    const gameResultsSection = document.querySelector('section.game-result');
    const body = document.querySelector('body');

    if (playerWinCount > computerWinCount) {
        gameResultsSection .textContent = "Congrats! You're a winner, for once :).";
    }
    else {
        gameResultsSection .textContent = "You lose! Not a good look :o.";
    }
}

function addPlayerButtonsClickListeners() {
    const playButtons = document.querySelectorAll('button.play-option.player');

    playButtons.forEach(button => {
        // Add clicked class before removing it
        // Note we can remove clicked class later instead of removing event to remove element effects at least
        button.addEventListener('click', button.fnAddClicked = () => button.classList.add('clicked'), false);
        button.addEventListener('click', playRound);
    });
}

function addPlayerButtonsHoverListeners() {
    const playButtons = document.querySelectorAll('button.play-option.player');

    playButtons.forEach(button => {
        // Event listeners only accept function expressions to execute or trigger later when event happens not to trigger immediately and return result
        button.addEventListener('mouseover', button.fnAddHover = () => button.classList.add('hover'), false);
        button.addEventListener('mouseout', () => button.classList.remove('hover'));
    });
}

function enablePlayerButtons() {
    const playButtons = document.querySelectorAll('button.player');

    playButtons.forEach(button => {
        button.classList.remove("greyed-out");
    });
    
    addPlayerButtonsHoverListeners();
    addPlayerButtonsClickListeners();
}

function enablePlayerIcons() {
    const icons = document.querySelectorAll('.player i');

    icons.forEach(icon => {
        icon.classList.remove("greyed-out");
    });
}

function enablePlayerScore() {
    const scoreSections = document.querySelectorAll('.score.player');

    scoreSections.forEach(scoreSection => {
        scoreSection.classList.remove("greyed-out");
    });
}

function enablePlayerSide() {
    enablePlayerButtons();
    enablePlayerIcons();
    enablePlayerScore();
}

function enableComputerButtons() {
    const playButtons = document.querySelectorAll('button.computer');

    playButtons.forEach(button => {
        button.classList.remove("greyed-out");
    });
}

function enableComputerIcons() {
    const icons = document.querySelectorAll('.computer i');

    icons.forEach(icon => {
        icon.classList.remove("greyed-out");
    });
}

function enableComputerScore() {
    const scoreSections = document.querySelectorAll('.score.computer');

    scoreSections.forEach(scoreSection => {
        scoreSection.classList.remove("greyed-out");
    });
}

function enableComputerSide() {
    enableComputerButtons();
    enableComputerIcons();
    enableComputerScore();
}

function disableIcons() {
    const playButtons = document.querySelectorAll('button');

    playButtons.forEach(button => {
        button.removeEventListener('click', playRound);
        button.removeEventListener('mouseover', button.fnAddHover, false);
        button.removeEventListener('click', button.fnAddClicked, false);
        button.classList.toggle("greyed-out");
    });

    const icons = document.querySelectorAll('.main-container i');

    icons.forEach(icon => {
        icon.classList.toggle("greyed-out");
    });

    const scoreSections = document.querySelectorAll('.score');

    scoreSections.forEach(scoreSection => {
        scoreSection.classList.toggle("greyed-out");
    });
}

function removePlayAgainOption(gameSessionDetails, playAgainSection) {
    gameSessionDetails.removeChild(playAgainSection);
}

function removeGameResultsText() {
    const roundResultsSection = document.querySelector('section.round-result');
    roundResultsSection.textContent = "";
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

addPlayerButtonsHoverListeners();
addPlayerButtonsClickListeners();




