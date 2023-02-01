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
    if ((playerSelection === "paper" && computerSelection === "scissor")
        || (playerSelection === "rock" && computerSelection === "paper")
        || (playerSelection === "scissor" && computerSelection === "rock")) {
        computerWinCount++;
        return `You lose! ${computerSelection} beats ${playerSelection}.`;
    }
}

function game() {
    const playButtons = document.querySelectorAll('button.play-option');

     // Get computer's random choice from a pool of 3
    let getComputerChoice = function () {
        let numInRange = getRandomInt(1, 4);

        switch (numInRange) {
            case 1: return "rock";
            case 2: return "scissors";
            case 3: return "paper";
        }
    };

    let computerSelection = getComputerChoice();  

    //onClick play a round with parameters of playerSelection and computerSelection
    playButtons.forEach(button => button.addEventListener('click', (e) => {
        let playerSelection = e.target.value;
        return console.log(playRound(playerSelection, computerSelection)) } )
    );
}

do {
    game();
    console.log(playerWinCount);
    console.log(computerWinCount);
    playerWinCount++;
} while (playerWinCount < 5 && computerWinCount < 5);

if (playerWinCount === computerWinCount) {
    console.log("Draw! Your skill has been matched.");
}
else if (playerWinCount > computerWinCount) {
    console.log("Congrats! You're better than a bot.")
}
else {
    console.log("You lose. Not a good look.")
}




