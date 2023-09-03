let playerScore = 0, computerScore = 0;
const playButtons = document.querySelectorAll('button.play-option.player');

let modal = document.querySelector(".modal");
let trigger = document.querySelector(".example");
let closeButton = document.querySelector(".close-button");

function toggleModal() {
  modal.classList.toggle("show-modal");
}
function windowOnClick(event) {
  if(event.target === modal) {
    toggleModal();
  }
}
trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

// this will show dialogue box instead
function printGameResults() {
    const gameResultsSection = document.querySelector('section.game-result');

    if (playerScore > computerScore) {
        gameResultsSection.textContent = "Congrats! You're a winner, for once :).";
    }
    else {
        gameResultsSection.textContent = "You lose! Not a good look :o.";
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

// My priority is to keep the main flow of the round to this function, true to its name of course. 
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
    // TO DO: Add period where user can't spam click either maybe via disabling although new click is fine, spam is processed (we'll test)
    // TO DO: Add delay for effects before winner is determined

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
                example();

                // Reset win counts for next round
                playerScore = 0;
                computerScore = 0;
                updateScores();
            }
        }, delayInMs);
    } 
}

playButtons.forEach(button => {
    button.addEventListener('click', playRound);
});

// add css style
// how does it respond to button click vs icon click to prevent styling


// on click of button it does this stuff without styling icon
// either only click if target is an icon, so print e both times to see if different
// add listeners for icons not buttons since that's what I am using now

// I think leave it to be more general like the computer buttons