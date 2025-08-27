//  Random number creation (1 - 100)
let randomNumber = parseInt(Math.random() * 100 + 1)
// select html element 
const input = document.querySelector('#guessField')
const submit = document.querySelector('#submit')
const guesses = document.querySelector('.guesses')
const remianGuess = document.querySelector('.lastResult')
const lowOrHi = document.querySelector('.lowOrHi')
const gameTracker = document.querySelector('.resultParas')
//new element for game replay
const button = document.createElement('button')
// creating game variable
let allGuesses = []
let numOfGuesses = 1;
let playGame = true;

// logic 
if(playGame){
   submit.addEventListener('click', function(e){
    e.preventDefault()
    const guess = parseInt(input.value)
    console.log(guess)
    validateGuess(guess)
   })
}
//validate ftn (input validation)
function validateGuess(guess){
    if(isNaN(guess)){
        alert ('Please enter a valid number')
    }else if(guess<1){
        alert ('Please enter a valid number')
    }else if(guess>100){
        alert ('Please enter a valid number')
    } else {
        allGuesses.push(guess)
        if(numOfGuesses === 10){
            updateGuess(guess);
            displayMessage(`Game over , Try again! . Random number was ${randomNumber} `)
            endGame();
        }else {
            checkGuess(guess)
            updateGuess(guess) 
        }
    }
}
//check ftn (check user input and compare)
function checkGuess(guess){
    if (guess === randomNumber){
        displayMessage('Congratulation! You guessed it right')
        endGame()
    }else if (guess < randomNumber){
        displayMessage('Your enter number is too low')
        // updateGuess(guess)
    }else if(guess>randomNumber){
        displayMessage('Your enter number is too high')
        // updateGuess(guess)
    }
}
//update ftn (update the ui )
function updateGuess(guess){
    input.value = '';
    guesses.innerHTML += `${guess}, `
    numOfGuesses++;
    remianGuess.innerHTML = `${11 - numOfGuesses}`
}
//display ftn (display result by dom)
function displayMessage(message){
    lowOrHi.innerHTML = `<h2> ${message} </h2>`;
}
//end game ftn
function endGame(){
    input.value = '';
    input.setAttribute('disabled','')
    button.setAttribute("id", "gamebtn");
    button.textContent = "Play Again";
    gameTracker.appendChild(button)
    playGame = false
    startAgain()
}
//start again ftn
function startAgain(){
    const starter = document.querySelector('#gamebtn')
    starter.addEventListener('click', function(e){
        randomNumber = parseInt(Math.random() * 100 + 1)
        input.value = ''
        allGuesses = []
        numOfGuesses = 1
        guesses.innerHTML = ''
        remianGuess.innerHTML = `${11 - numOfGuesses}`
        input.removeAttribute('disabled')
        gameTracker.removeChild(button)
        playGame = true
    })

}




