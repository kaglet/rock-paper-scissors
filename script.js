let playerWinCount = 0, computerWinCount = 0;

function toggleHoveredOn(button) {
    
}

function removeHoveredOn(button) {

}

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

    enablePlayerOptionEventListeners();
    playButtons.forEach(button => {
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

    disablePlayerOptionEventListeners();
    
    playButtons.forEach(button => {
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

function hasGrowthTransitioned(e) {
    return e.propertyName === 'transform';
}

function disablePlayerOptionEventListeners() {
    const playButtons = document.querySelectorAll('button.play-option.player');

    playButtons.forEach(button => {
        button.removeEventListener('click', button.fn3, false);
        button.removeEventListener('mouseover', () => button.classList.toggle('hoveredOn'));
        button.removeEventListener('mouseout', () => button.classList.remove('hoveredOn'));
    });
}

function enablePlayerOptionEventListeners() {
    const playButtons = document.querySelectorAll('button.play-option.player');

    playButtons.forEach(button => {
        button.addEventListener('click', button.fn3 = (e) => {
            initializeBeforeGame(e);
        }, false); /* This part of code runs twice or more even though none are clicked
        But I bet the code certainly claims they are clicked from previous event listener not being removed. 
        It makes sense that it could run twice but that should happen after one game is played at least
        no because the transition to grow hasn't occurred perhaps. False, because it has been clicked it has transitioned too.*/

        button.addEventListener('mouseover', button.fn1 = () => button.classList.toggle('hoveredOn'));
        
        // Add this or else it will keep toggling hoveredOn class in inconsistent ways to the eye, but consistent to the code
        button.addEventListener('mouseout', button.fn2 = () => button.classList.remove('hoveredOn'));
    });
}

function playGame(playerSelection, computerSelection) {
    const roundResultsDiv = document.querySelector('div.round-result');
    roundResultsDiv.textContent = playRound(playerSelection, computerSelection);
    const body = document.querySelector('body');

    if (playerWinCount === 5 || computerWinCount === 5) {
        printResults();

        // Reset win counts
        playerWinCount = 0;
        computerWinCount = 0;

        addPlayAgainOption();
        disableIcons();
    }
}

function telegraphComputerSelection(playerSelection, computerSelection) {
    // We play round strictly after computer has finished making and telegraphing selection. 
    
    let buttonSelected = document.querySelector(`button.computer.${computerSelection}`);
    buttonSelected.classList.toggle('hoveredOn');
    // At the end of the transition
    buttonSelected.addEventListener('transitionend', (e) => {
        // Make sure event of this button executes only after end of a specific transition not just any.
        if (hasGrowthTransitioned(e) === true) {
            // Add the sustained glow
            buttonSelected.classList.toggle('clicked');

            // Just in the rare instances that a player is playing too fast for the computer to respond with a move and its animations
            // disablePlayerOptionEventListeners();

            // Play round
            playGame(playerSelection, computerSelection);

            // Since results are displayed:
            // Remove the glow
            buttonSelected.classList.remove('clicked');

            // Remove hover on effect
            buttonSelected.classList.remove('hoveredOn');

            // Allow player to be able to choose again
            // enablePlayerOptionEventListeners();
        }
    }, {once: true});
}

function initializeBeforeGame(e) {
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

    telegraphComputerSelection(playerSelection, computerSelection);
}


enablePlayerOptionEventListeners();





/* 

There are two transitionends: One when transform effect is added, then removed.
Hence event is listened for twice. 

*/

/* 

I have fixed the above issue. 

- Only issue left is at the game end
button disabling fails, elements are still clickable and computer still
responds. 
    - Be careful removing event listeners of anonymous functions.

- Other issue is for some reason after each game, on any click,
two computer elements have event listeners triggered for hover, yet only
one is clicked. This never happens again. So I can perhaps step through code
after one game.
    - I never remove transitionend event ever
    - It does initialize game twice on button click and gets different computer responses each time.
    Ok but what prompts it to initialize game twice then do the inner function twice then the inner function twice again,
    the first time rejecting the boolean true or not even running it for some reason?
    It should at least run that event listener for transition end.

*/


/* 

There is no on form load function so I'm not sure when these functions kick in or how long they are active.
If it is for the entire duration of the page, what does that mean? 

*/

/* 

TO-DO:
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

    Read over the flow of my program and later clean it up to improve the flow.

*/

/* 

ISSUES:
The div as auto-sized to fit to content. 

*/

