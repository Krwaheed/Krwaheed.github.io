const playerChoices = document.querySelectorAll('.choice');
const computerImage = document.getElementById('computerImage');
const gameResult = document.getElementById('gameResult');
const wins = document.getElementById('wins');
const losses = document.getElementById('losses');
const ties = document.getElementById('ties');

let winCount = 0;
let lossCount = 0;
let tieCount = 0;

playerChoices.forEach(choice => {
    choice.addEventListener('click', function() {
        const playerChoice = this.getAttribute('data-choice');
        highlightChoice(this);
        shuffleComputerChoice();
        setTimeout(() => {
            const computerChoice = getComputerChoice();
            updateComputerChoice(computerChoice);
            const result = determineWinner(playerChoice, computerChoice);
            updateScore(result);
            displayResult(result, playerChoice, computerChoice);
        }, 3000);
    });
});

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
}

function shuffleComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    let count = 0;
    const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * 3);
        computerImage.src = `images/${choices[randomIndex]}.PNG`;
        count++;
        if (count > 5) {
            clearInterval(interval);

            const finalChoice = getComputerChoice();
            updateComputerChoice(finalChoice);
        }
    }, 500);
}

function updateComputerChoice(choice) {
    const imageName = choice.toLowerCase();
    computerImage.src = `images/${imageName}.PNG`;
}

function highlightChoice(selectedChoice) {
    playerChoices.forEach(choice => {
        choice.classList.remove('selected');
    });
    selectedChoice.classList.add('selected');
}

function determineWinner(player, computer) {
    if (player === computer) return 'tie';
    if ((player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')) {
        return 'win';
    }
    return 'lose';
}

function displayResult(result, player, computer) {
    gameResult.textContent = result === 'tie' ? 'It\'s a tie!' :
        result === 'win' ? `You win! ${player} beats ${computer}.` : `You lose! ${computer} beats ${player}.`;
}

function updateScore(result) {
    if (result === 'win') {
        wins.textContent = ++winCount;
    } else if (result === 'lose') {
        losses.textContent = ++lossCount;
    } else {
        ties.textContent = ++tieCount;
    }
}

function resetGame() {
    winCount = 0;
    lossCount = 0;
    tieCount = 0;
    wins.textContent = winCount;
    losses.textContent = lossCount;
    ties.textContent = tieCount;
    gameResult.textContent = 'Choose your move!';
    computerImage.src = 'images/question-mark.PNG';
}
