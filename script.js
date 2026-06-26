const  boxes = document.querySelectorAll(".hole");

const scoreDisplay = document.querySelector("#score")
const bestScoreDisplay = document.querySelector("#best-score")

const timerDisplay = document.querySelector("#timer");

const startButton = document.querySelector('#start-btn');

const gameOverOverlay = document.querySelector('#game-over');
const finalScoreText = document.querySelector('#final-score-text');
const playAgainBtn = document.querySelector('#play-again-btn');

let score = 0;
let bestScore = 0;
let timeLeft = 20;
let activeBox = null;

let ratInterval = null;

let countdownInterval = null;


let gameRunning = false;

const startingSpeed = 1200;

const minSpeed = 400;

const speedStep = 20;

let currentSpeed = startingSpeed;


function startGame(){
    score = 0;
    timeLeft = 20;
    currentSpeed = startingSpeed;
    gameRunning = true;

    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    timerDisplay.classList.remove('urgent');

    gameOverOverlay.classList.add('hidden');

    startButton.disabled = true;

    
    boxes.forEach(box=>{
        box.classList.remove('rat');
    })
    activeBox = null;

    ratInterval = setInterval(randomRat,currentSpeed)
    countdownInterval = setInterval(countdown,1000);
}

function randomRat(){

    boxes.forEach(box=>{
        box.classList.remove('rat')
    })

    const randomIdx =  Math.floor(Math.random()*boxes.length);

    activeBox = boxes[randomIdx];
    activeBox.classList.add('rat');

    if(currentSpeed > minSpeed){
        currentSpeed -= speedStep;
        clearInterval(ratInterval);
        ratInterval = setInterval(randomRat, currentSpeed);
    }
}

boxes.forEach(box=>{
    box.addEventListener('click',()=>{
        
        if(!gameRunning) return;

        if(box === activeBox){
            score++;
            scoreDisplay.textContent = score
            box.classList.remove('rat');
            activeBox = null;

        }
    })
})

function countdown() {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    
    if(timeLeft <= 5){
        timerDisplay.classList.add('urgent');
    }

    if(timeLeft === 0){
        endGame();
    }
}

function endGame(){
    gameRunning = false;

    clearInterval(ratInterval)
    clearInterval(countdownInterval);

    boxes.forEach(box=>{
        box.classList.remove('rat');
    })

    startButton.disabled = false;

    
    if(score > bestScore){
        bestScore = score;
        bestScoreDisplay.textContent = bestScore;
    }

    
    finalScoreText.textContent = `Your score: ${score}`;
    gameOverOverlay.classList.remove('hidden');
}

startButton.addEventListener('click',startGame)
playAgainBtn.addEventListener('click', startGame)