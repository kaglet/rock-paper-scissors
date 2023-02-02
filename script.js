let playerWinCount = 0, computerWinCount = 0;

function getRandomInt(min, max) {
    let randomNumber = Math.floor(Math.random() * (max - min) + min);
    return randomNumber;
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

    // if player and computer play the same then output draw
    if (playerSelection === computerSelection) {
        return `Draw! Both played ${playerSelection}`;
    }

    // cover player win cases
    if ((playerSelection === "rock" && computerSelection === "scissors")
        || (playerSelection === "scissors" && computerSelection === "paper")
        || (playerSelection === "paper" && computerSelection === "rock")) {
        playerWinCount++;
        return `You win! ${playerSelection} beats ${computerSelection}.`;
    }

    // cover player loss cases
    if ((playerSelection === "paper" && computerSelection === "scissors")
        || (playerSelection === "rock" && computerSelection === "paper")
        || (playerSelection === "scissors" && computerSelection === "rock")) {
        computerWinCount++;
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
    let playerSelection = e.target.innerText;
    let computerSelection = getComputerChoice();

    const roundResultsDiv = document.createElement('div');
    roundResultsDiv.textContent = playRound(playerSelection, computerSelection);
    const body = document.querySelector('body');
    body.appendChild(roundResultsDiv);

    if (playerWinCount === 5 || computerWinCount === 5) {
        const gameResultsDiv = document.createElement('div');
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

        body.appendChild(gameResultsDiv);
        // Optionally add classes or attributes to change how it is styled dynamically.

        // Add try again button to maybe refresh the page or clear all the divs and reenable event listeners or just toggle a playable class.
        // Or just disable buttons.
    }
}

const playButtons = document.querySelectorAll('button.play-option');

//onClick play a round with parameters of playerSelection and computerSelection
playButtons.forEach(button => {
    button.addEventListener('click', beginGame);
});



/* There is no on form load function so I'm not sure when these functions kick in or how long they are active.
If it is for the entire duration of the page, what does that mean? */


