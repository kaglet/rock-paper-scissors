let playerWinCount = 0, computerWinCount = 0;

function getRandomInt(min, max) {
    let randomNumber = Math.floor(Math.random() * (max - min) + min);
    return randomNumber;
}

function playRound(playerSelection, computerSelection) {
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
    if ((playerSelection === "paper" && computerSelection === "scissor")
        || (playerSelection === "rock" && computerSelection === "paper")
        || (playerSelection === "scissor" && computerSelection === "rock")) {
        computerWinCount++;
        return `You lose! ${computerSelection} beats ${playerSelection}.`;
    }
}

function game() {
    const playButtons = document.querySelectorAll('button.play-option');

    playButtons.forEach(button => button.addEventListener('click', playRound));

    // Get computer's random choice from a pool of 3
    let getComputerChoice = function () {
        let numInRange = getRandomInt(1, 4);

        switch (numInRange) {
            case 1: return "rock";
            case 2: return "scissors";
            case 3: return "paper";
            // default: return "Error!";
        }
    };

    let computerSelection = getComputerChoice();
    // Play a round
    playRound(playerSelection, computerSelection);

    if (playerWinCount === computerWinCount) {
        console.log("Draw! You have been matched.");
    }
    else if (playerWinCount > computerWinCount) {
        console.log("Congrats! You're better than a bot.")
    }
    else {
        console.log("You lose. Not a good look man.")
    }
}

// Code starts below...




