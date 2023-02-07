let playerWinCount = 0, computerWinCount = 0;

function printGameResults() {
    const gameResultsDiv = document.querySelector('div.game-result');
    const body = document.querySelector('body');

    if (playerWinCount === computerWinCount) {
        gameResultsDiv.textContent = "Draw! Your skill has been matched.";
    }
    else if (playerWinCount > computerWinCount) {
        gameResultsDiv.textContent = "Congrats! You're better than a bot.";
    }
    else {
        gameResultsDiv.textContent = "You lose. Not a good look.";
    }
}

function addPlayerButtonsClickListeners() {
    const playButtons = document.querySelectorAll('button.play-option.player');

    playButtons.forEach(button => {
        button.addEventListener('click', playRound);
    });
}

function addPlayerButtonsHoverListeners() {
    const playButtons = document.querySelectorAll('button.play-option.player');

    playButtons.forEach(button => {
        button.addEventListener('mouseover', button.classList.add('hover'));
        button.addEventListener('mouseout', button.classList.remove('hover'));
    });
}

function enablePlayerButtons() {
    const playButtons = document.querySelectorAll('button.player');

    playButtons.forEach(button => {
        button.addEventListener('click', playRound);
        button.classList.remove("greyed-out");
    });
}

function enablePlayerIcons() {
    const icons = document.querySelectorAll('.player i');

    icons.forEach(icon => {
        icon.classList.remove("greyed-out");
    });
}

function enablePlayerScore() {
    const scoreDivs = document.querySelectorAll('.score.player');

    scoreDivs.forEach(scoreDiv => {
        scoreDiv.classList.remove("greyed-out");
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
        button.addEventListener('click', playRound);
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
    const scoreDivs = document.querySelectorAll('.score.computer');

    scoreDivs.forEach(scoreDiv => {
        scoreDiv.classList.remove("greyed-out");
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
        button.classList.toggle("greyed-out");
    });

    const icons = document.querySelectorAll('.main-container i');

    icons.forEach(icon => {
        icon.classList.toggle("greyed-out");
    });

    const scoreDivs = document.querySelectorAll('.score');

    scoreDivs.forEach(scoreDiv => {
        scoreDiv.classList.toggle("greyed-out");
    });
}

function removePlayAgainOption(gameSessionDetails, playAgainDiv) {
    gameSessionDetails.removeChild(playAgainDiv);
}

function removeGameResultsText() {
    const roundResultsDiv = document.querySelector('div.round-result');
    roundResultsDiv.textContent = "";
}

function addPlayAgainOption() {
    const playAgainDiv = document.createElement('div');
    const retryIcon = document.createElement('i');
    const gameSessionDetails = document.querySelector('.game-session-details');

    playAgainDiv.textContent = `Play again? `;
    playAgainDiv.classList.add('play-again');

    retryIcon.classList.add('fa-solid');
    retryIcon.classList.add('fa-rotate-right');

    playAgainDiv.appendChild(retryIcon);
    gameSessionDetails.appendChild(playAgainDiv);

    retryIcon.addEventListener('click', () => {
        enablePlayerSide();
        enableComputerSide();
        removePlayAgainOption(gameSessionDetails, playAgainDiv);
        showScores();
        removeGameResultsText();
    });
}

function showScores() {
    const computerScoreDiv = document.querySelector('.score.computer');
    const playerScoreDiv = document.querySelector('.score.player');

    computerScoreDiv.textContent = `Score: ${computerWinCount}`;
    playerScoreDiv.textContent = `Score: ${playerWinCount}`;
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
    e.target.classList.add('clicked');
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

    const roundResultsDiv = document.querySelector('div.round-result');
    roundResultsDiv.textContent = determineWinner(playerSelection, computerSelection);

    if (playerWinCount === 5 || computerWinCount === 5) {
        endGame();
    }
}

addPlayerButtonsHoverListeners();
addPlayerButtonsClickListeners();




/* TO-DO:
    On click use target's attribute to tell if its scissor, rock, or paper.

    Update scores with each round. ✔
    Display round counter. 
    When game is done grey the icons out and disable clicking ability. ✔
    Retry resets scores, returns color and functionality. Need to code to restart the stack frame somehow.
    Not keep going.
    Update win and lose comments.

    Add animation to game description.
    Add rolling in animation to game choices.
    Add play again option with a retry or reload icon. ✔
        - Do not allow play again to shift other content up.
    Add glow on hover and enlarge animation when clicked.
    Add glow around winner icon if they win.
    On hover over retry icon, change mouse cursor type to the hand, and enlarge play again on hover. 

    Watch video about bubbling and propagation for onClick() event.
*/

/* ISSUES:
The div as auto-sized to fit to content. 

*/

