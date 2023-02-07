let playerWinCount = 0, computerWinCount = 0;

function printResults() {
    const gameResultsDiv = document.querySelector('div.game-result');
    const body = document.querySelector('body');

    if (playerWinCount > computerWinCount) {
        gameResultsDiv.textContent = "Congrats! You're a winner, for once :).";
    }
    else {
        gameResultsDiv.textContent = "You lose. Not a good look :o.";
    }
}

function enableIcons() {
    const playButtons = document.querySelectorAll('button');

    playButtons.forEach(button => {
        button.addEventListener('click', playGame);
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

function disableIcons() {
    const playButtons = document.querySelectorAll('button');

    playButtons.forEach(button => {
        button.removeEventListener('click', playGame);
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
        enableIcons();
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

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

    // if player and computer play the same then output draw
    if (playerSelection === computerSelection) {
        return `Draw! Both played ${playerSelection}.`;
    }

    let playerWins = (playerSelection === "rock" && computerSelection === "scissors")
        || (playerSelection === "scissors" && computerSelection === "paper")
        || (playerSelection === "paper" && computerSelection === "rock");

    // cover player win cases
    if (playerWins) {
        playerWinCount++;
        showScores();
        playerSelection = playerSelection.replace(playerSelection[0], playerSelection[0].toUpperCase());
        return `You win! ${playerSelection} beats ${computerSelection}.`;
    }

    let playerLoses = (playerSelection === "paper" && computerSelection === "scissors")
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

function isBorderTransition(e) {
    return e.propertyName === 'transition';
}

function disablePlayerOptionEventListeners() {

}

function enablePlayerOptionEventListeners() {
    const playButtons = document.querySelectorAll('button.play-option.player');

    playButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // button.classList.toggle('clicked');
            playGame(e);
        });
        button.addEventListener('mouseover', () => button.classList.toggle('hoveredOn'));
        // Add this or else it will keep toggling hoveredOn class in inconsistent ways to the eye, but consistent to the code
        button.addEventListener('mouseout', () => button.classList.toggle('hoveredOn'));
    });
}

function telegraphComputerSelection(computerSelection) {
    /* Round is played strictly after computer has finished making selection. */
    /* Clicked events are strictly removed once a round result is up. */
    let buttonSelected = document.querySelector(`button.computer.${computerSelection}`);
    buttonSelected.classList.toggle('hoveredOn');
    // At the end of the transition add the glow, disable player EventListeners, play a round, transition out then remove the glow
    // Make sure the code executes at the end of a specific transition not any transition.
    buttonSelected.addEventListener('transitionend', (e) => {
        if (isBorderTransition(e) === true) {
            // Add the sustained glow
            buttonSelected.classList.toggle('clicked');

            disablePlayerOptionEventListeners();

            buttonSelected.classList.remove('hoveredOn')
        }
    });
}

function playGame(e) {
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

    telegraphComputerSelection(computerSelection);

    /*const roundResultsDiv = document.querySelector('div.round-result');
    roundResultsDiv.textContent = playRound(playerSelection, computerSelection);
    const body = document.querySelector('body');

    if (playerWinCount === 5 || computerWinCount === 5) {
        printResults();

        // Reset win counts
        playerWinCount = 0;
        computerWinCount = 0;

        addPlayAgainOption();
        disableIcons();
    }*/
}

enablePlayerOptionEventListeners();

const playButtons = document.querySelectorAll('button.play-option.player');

playButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // button.classList.toggle('clicked');
        playGame(e);
    });
    button.addEventListener('mouseover', () => button.classList.toggle('hoveredOn'));
    // Add this or else it will keep toggling hoveredOn class in inconsistent ways to the eye, but consistent to the code
    button.addEventListener('mouseout', () => button.classList.toggle('hoveredOn'));
});



/* There is no on form load function so I'm not sure when these functions kick in or how long they are active.
If it is for the entire duration of the page, what does that mean? */

/* TO-DO:
    On click use target's attribute to tell if its scissor, rock, or paper.

    Update scores with each round. ✔
    Display round counter. 
    When game is done grey the icons out and disable clicking ability. ✔
    Retry resets scores, returns color and functionality. Need to code to restart the stack frame somehow. Not keep going. ✔ 
    Update win and lose comments. ✔

    Add animation to game description.
    Add play again option with a retry or reload icon. ✔
        - Do not allow play again to shift other content up.
    Add glow on hover and enlarge animation when clicked.
    Add glow around winner icon if they win.
    On hover over retry icon, change mouse cursor type to the hand, and enlarge play again on hover. 
    On hover over buttons, change mouse cursor type to hand to indicate clickable element.
    Add glow animation on computer choice.
    Add cute, small sound bites, to selection, maybe loss and win.
    Computer enlarges first, then glows with selected option.
    Don't allow clicking of buttons while game is in session, use add or remove button eventListeners.

    Watch video about bubbling and propagation for onClick() event.

    Refactor code for ease of future management.
*/

/* ISSUES:
The div as auto-sized to fit to content. 

*/

