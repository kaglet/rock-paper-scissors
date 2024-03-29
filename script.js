let playerScore = 0, computerScore = 0;
const playButtons = document.querySelectorAll('button.play-option.player');

let modal = document.querySelector(".modal");
let closeButton = document.querySelector(".close-button");

function toggleModal() {
    let message = (playerScore > computerScore) ? "won! 😊" : "lost! 😓"; 
    let span = document.querySelector("h2 > span + span");
    span.style.color = (playerScore > computerScore) ? "#D62246" : "#7F95D1";
    // this is to show scores only once when toggleModal is called twice during open and close of modal
    // the above results in this message being shown twice
    if (!(playerScore==0 || computerScore==0)) {
        span.textContent = message;
        modal.classList.toggle("show-modal");
    }
}

// this will show dialogue box instead with retry icon used
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
}

function updateScores() {
    const computerScoreSection = document.querySelector('.score.computer');
    const playerScoreSection = document.querySelector('.score.player');

    computerScoreSection.textContent = `Score: ${computerScore}`;
    playerScoreSection.textContent = `Score: ${playerScore}`;
}

function determineWinner(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

    playerWins = (playerSelection === "rock" && computerSelection === "scissors")
        || (playerSelection === "scissors" && computerSelection === "paper")
        || (playerSelection === "paper" && computerSelection === "rock");

    if (playerWins) {
        playerScore++;
    }

    playerLoses = (playerSelection === "paper" && computerSelection === "scissors")
        || (playerSelection === "rock" && computerSelection === "paper")
        || (playerSelection === "scissors" && computerSelection === "rock");

    if (playerLoses) {
        computerScore++;
    }
}

function getRandomInt(min, max) {
    let randomNumber = Math.floor(Math.random() * (max - min) + min);
    return randomNumber;
}

function getComputerChoice() {
    let numInRange = getRandomInt(1, 4);

    switch (numInRange) {
        case 1: return "rock";
        case 2: return "scissors";
        case 3: return "paper";
    }
};

function playRound(e) {
    // Disallow user selection while round is being played.
    playButtons.forEach(button => {
        button.removeEventListener('click', playRound);
    });

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

    // Telegraph computer move
    const chosenComputerButton = document.querySelector(`button.computer.${computerSelection} > i`);;

    if (!(playerScore === 5 || computerScore === 5)){
        // Add active class
        // Now both player and computer are active
        chosenComputerButton.classList.add('active');
        e.target.classList.add('active');

        // Add hover class
        // Ensure both are in hover state
        chosenComputerButton.classList.add('hover');
        e.target.classList.add('hover');
        let delayInMs = 700;
        setTimeout(()=>{
            determineWinner(playerSelection, computerSelection);
            updateScores();
            // remove player and computer effects at same time when round is over
            chosenComputerButton.classList.remove('hover');
            chosenComputerButton.classList.remove('active');
            e.target.classList.remove('active');
            e.target.classList.remove('hover');
            playButtons.forEach(button => {
                button.addEventListener('click', playRound);
            });

            // Check immediately after score was last updated
            if (playerScore === 5 || computerScore === 5) {
                // showEndGameDialog 
                toggleModal();
            }
        }, delayInMs);
    } 
}

playButtons.forEach(button => {
    button.addEventListener('click', playRound);
});

closeButton.addEventListener("click", () => {
    // Reset win counts for next round
    toggleModal();
    playerScore = 0;
    computerScore = 0;
    updateScores();
});