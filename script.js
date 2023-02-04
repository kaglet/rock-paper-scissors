let playerWinCount = 0, computerWinCount = 0;

function getRandomInt(min, max) {
    let randomNumber = Math.floor(Math.random() * (max - min) + min);
    return randomNumber;
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();
    const computerScoreDiv = document.querySelector('.score.computer');
    const playerScoreDiv = document.querySelector('.score.player');

    // if player and computer play the same then output draw
    if (playerSelection === computerSelection) {
        return `Draw! Both played ${playerSelection}`;
    }

    // cover player win cases
    if ((playerSelection === "rock" && computerSelection === "scissors")
        || (playerSelection === "scissors" && computerSelection === "paper")
        || (playerSelection === "paper" && computerSelection === "rock")) {
        playerWinCount++;
        playerScoreDiv.textContent = `Score: ${playerWinCount}`; 
        playerSelection = playerSelection.replace(playerSelection[0], playerSelection[0].toUpperCase());
        return `You win! ${playerSelection} beats ${computerSelection}.`;
    }

    // cover player loss cases
    if ((playerSelection === "paper" && computerSelection === "scissors")
        || (playerSelection === "rock" && computerSelection === "paper")
        || (playerSelection === "scissors" && computerSelection === "rock")) {
        computerWinCount++;
        computerScoreDiv.textContent = `Score: ${computerWinCount}`; 
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

function beginGame(e) {
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
    console.log(playerSelection);
    console.log(e);

    let computerSelection = getComputerChoice();

    const roundResultsDiv = document.querySelector('div.round-result');
    roundResultsDiv.textContent = playRound(playerSelection, computerSelection);
    const body = document.querySelector('body');
    // body.appendChild(roundResultsDiv);

    if (playerWinCount === 5 || computerWinCount === 5) {
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

        // Reset win counts
        playerWinCount = 0;
        computerWinCount = 0;

        // body.appendChild(gameResultsDiv);
        // Optionally add classes or attributes to change how it is styled dynamically.

        // Add try again button to maybe refresh the page or clear all the divs and reenable event listeners or just toggle a playable class.
        // Or just disable buttons.
    }
}

const playButtons = document.querySelectorAll('button.play-option.player');

//onClick play a round with parameters of playerSelection and computerSelection
playButtons.forEach(button => {
    button.addEventListener('click', beginGame);
});



/* There is no on form load function so I'm not sure when these functions kick in or how long they are active.
If it is for the entire duration of the page, what does that mean? */

/* TO-DO:
    On click use target's attribute to tell if its scissor, rock, or paper.

    Update scores with each round. ✔
    Display round counter. 
    When game is done grey the icons out and disable clicking ability.
    Retry resets scores and returns color.
    Update win and lose comments.

    Add animation to game description.
    Add rolling in animation to game choices.
    Add play again option with a retry or reload icon.
    Add glow on hover and enlarge animation when clicked.
    Add glow around winner icon if they win.
*/

