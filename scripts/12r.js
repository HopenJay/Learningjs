let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();

// if(!score) {
    //     score = {
        //         wins: 0,
//         losses: 0,
//         ties: 0
//     };
// }

// console.log();

let intervalId;
let isAutoPlaying = false;

// const autoPlay = () => {
    
// } ;
function autoPlay() {
    if(!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}

// Call this when the page reloads or after resetting
function resetAutoPlay() {
    if (intervalId) {
        clearInterval(intervalId);
    }
    isAutoPlaying = false
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('paper');
});

document.querySelector('.js-scissor-button').addEventListener('click', () => {
    playGame('scissors');
});

document.querySelector('.js-reset-button').addEventListener('click', confirmation)

function confirmation() {
    const confirm = document.querySelector('.js-confirm');
    confirm.innerHTML = `Are you sure you want to reset the score?. <button class = "js-sure  rex"> Yes </button> 
    <button class = "js-notSure"> No </button>`;
    const sure = document.querySelector('.js-sure');
    const notSure = document.querySelector('.js-notSure');

 
        sure.addEventListener('click', () => {
        if (sure) {
            score.wins = 0;
            score.losses = 0;
            score.ties = 0;
            localStorage.removeItem('score');
            resetAutoPlay(); // Stop any ongoing auto play 
            updateScoreElement();  
            confirm.classList.add('disapper')
        }
            
        });

        notSure.addEventListener('click', () => {
            if(notSure) {
                confirm.classList.add('disapper');
            }
        })
        confirm.classList.remove('disapper');
        


// notSure.textContent = 'ok';
}

document.querySelector('.js-auto-play-button').addEventListener('click', () => {
    if(document.querySelector('.js-auto-play-button').innerText === 'Auto Play') {
        document.querySelector('.js-auto-play-button').innerText = 'Stop Playing';
    } else if(document.querySelector('.js-auto-play-button').innerText === 'Stop Playing') {
        document.querySelector('.js-auto-play-button').innerText = 'Auto Play';
    }
    autoPlay();
});

document.body.addEventListener('keydown', (event) => {
    if(event.key === 'r') {
        playGame('rock');
    } else if(event.key === 'p') {
        playGame('paper');
    } else if(event.key === 's') {
        playGame('scissors');
    } else if(event.key === 'a') {
        if(document.querySelector('.js-auto-play-button').innerText === 'Auto Play') {
            document.querySelector('.js-auto-play-button').innerText = 'Stop Playing';
        } else if(document.querySelector('.js-auto-play-button').innerText === 'Stop Playing') {
            document.querySelector('.js-auto-play-button').innerText = 'Auto Play';
        }
        autoPlay();
    } else if(event.key === 'Backspace') {
            score.wins = 0;
            score.losses = 0;
            score.ties = 0;
            localStorage.removeItem('score');
            resetAutoPlay(); // Stop any ongoing auto play 
            updateScoreElement();
    }
});

function playGame(playerMove) {
    const computerMove = pickComputerMove();
    

// console.log(computerMove);

let result = '';

if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
        result = 'You lose.';
    } else if (computerMove === 'paper') {
        result = 'You win.';
    } else if (computerMove === 'scissors') {
        result = 'Tie.';
    }

} else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
        result = 'You win.';
    } else if (computerMove === 'paper') {
        result = 'Tie.';
    } else if (computerMove === 'scissors') {
        result = 'You lose.';
    }
     
}else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
        result = 'Tie.';
    } else if (computerMove === 'paper') {
        result = 'You lose.';
    } else if (computerMove === 'scissors') {
        result = 'You win.';
    }
    
}

if (result === 'You win.') {
    score.wins += 1;
} else if (result === 'You lose.') {
    score.losses += 1;
}else if ( result === 'Tie.') {
    score.ties += 1
}

localStorage.setItem('score', JSON.stringify(score));

document.querySelector('.js-result').innerHTML = result;
document.querySelector('.js-moves').innerHTML =         
`You
<img src="${playerMove}-emoji.png" alt="" class="move-icon">
<img src="${computerMove}-emoji.png" alt="" class="move-icon">
Computer`;

// alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}\n Wins : ${score.wins}, Losses : ${score.losses}, Ties : ${score.ties}`);
updateScoreElement()
}

function updateScoreElement() {
document.querySelector('.js-score').innerHTML = `Wins : ${score.wins}, Losses : ${score.losses}, Ties : ${score.ties}`;
}

function pickComputerMove() {
const randomNumber = Math.random();

let computerMove = '';

if(randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'rock';
} else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper';
} else if (randomNumber >= 2/3 && randomNumber < 1) {
    computerMove = 'scissors';
    }

    return computerMove;
}