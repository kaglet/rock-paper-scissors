function getRandomInt (min, max) {
    let randomNumber = Math.floor(Math.random() * (max - min) + min);
    return randomNumber;
}

function playRound(playerSelection, computerSelection){
    // if player and computer play the same then output draw
    if(playerSelection === computerSelection) {
        console.log(`Draw! Both played ${playerSelection}`);
        return "draw";
    }
    // Cover the win and lose cases, and output winner
    // Rock beats scissors and loses to paper.
    if(playerSelection === "rock" && computerSelection === "scissors") {
        console.log(`You win! ${playerSelection} beats ${computerSelection}.`);
        return "player";
    } 
    else if(playerSelection === "rock" && computerSelection === "paper") {
        console.log(`You lose! ${computerSelection} beats ${playerSelection}.`);
        return "computer";
    }
    // Paper beats rock and loses to scissor.
    if(playerSelection === "paper" && computerSelection === "rock") {
        console.log(`You win! ${playerSelection} beats ${computerSelection}.`);
        return "player";
    } 
    else if(playerSelection === "paper" && computerSelection === "scissor") {
        console.log(`You lose! ${computerSelection} beats ${playerSelection}.`);
        return "computer";
    }
    // Scissor beats paper and loses to rock.
    if(playerSelection === "scissor" && computerSelection === "paper") {
        console.log(`You win! ${playerSelection} beats ${computerSelection}.`)
        return "player";
    } 
    else if(playerSelection === "scissor" && computerSelection === "rock") {
        console.log(`You lose! ${computerSelection} beats ${playerSelection}.`);
        return "computer";
    }
}

//initialize win counts outside for loop code block
let playerWinCount = 0, computerWinCount = 0;

// For 5 games do:
for (let gameCounter = 1; gameCounter <= 5; gameCounter++) {
    // Accept player input choice
    // Convert choice to lowercase
    let playerSelection = prompt('What is your play?', '').toLowerCase();

    // Get computer's random choice from a pool of 3
    let getComputerChoice = function(){
        let numInRange = getRandomInt(1,4);

        switch(numInRange){
            case 1: return "rock";
            case 2: return "scissors";
            case 3: return "paper";
            // default: return "Error!";
        }
    };

    let computerSelection = getComputerChoice();
    // Play a round
    let winner = playRound(playerSelection, computerSelection);

    // if player or computer wins then increase their win counter
    if (winner === "player"){
        playerWinCount++;
    }
    if (winner === "computer"){
        computerWinCount++;
    }   
}

if (playerWinCount === computerWinCount){
    console.log("Draw! You have been matched.");
}
else if (playerWinCount > computerWinCount){
    console.log("Congrats! You're better than a bot.")
}
else {
    console.log("Try again. You're bad at this.")
}


// See syntax details in instructions