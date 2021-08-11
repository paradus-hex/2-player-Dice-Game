'use strict';
//Setting shorter variables for easier use
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //works the same but for id only
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');

//Setting initial values
//you have to declare variables outside the function to use it outside the function
let currentScore, activePlayer, gameStatusPlay, score;
//init function stands for initialization
//converted this function at end while refactoring.has two uses:1)when game is first opened it sets the initals values,2)resets the game(new game button)
const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  gameStatusPlay = true;

  score0El.textContent = 0;
  score1El.textContent = 0;

  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  diceEl.classList.add('hidden');

  player0El.classList.add('player--active'); //don't worry about superimposing
  player1El.classList.remove('player--active'); //don't worry about superimposing
  player0El.classList.remove('player--winner'); //don't worry about superimposing
  player1El.classList.remove('player--winner'); //don't worry about superimposing

  // if (!gameStatusPlay) {
  //   console.log(activePlayer);
  //   document
  //     .querySelector(`.player--${activePlayer}`)//this is unnceassary as javascript doesnot superimpose existing things.i.e won't remove player--winner even if there's nothing to remove
  //     .classList.remove('player--winner');
  //   gameStatusPlay = true;
  // }
};
init(); //have to call call the function for the first initialization!

//Hiding the dice in initial stage
diceEl.classList.add('hidden');

//refactored code for switching players and losing current score
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//function for dice roll
btnRoll.addEventListener('click', function () {
  if (gameStatusPlay) {
    //Random dice roll generator
    const diceRollValue = Math.trunc(Math.random() * 6) + 1;
    //Dice image
    diceEl.src = `dice-${diceRollValue}.png`;
    //Dice image display
    diceEl.classList.remove('hidden');
    //Check if dice roll is 1
    if (diceRollValue !== 1) {
      //Adding the dice score
      currentScore += diceRollValue;
      //Displaying current score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch player lose current score
      switchPlayer();
    }
  }
});

//for holding the score
btnHold.addEventListener('click', function () {
  //check to see if game is still on or has ended.if ended no buttons will work until reset
  if (gameStatusPlay) {
    //add current score to total score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    //check to see if current score is enough to win. if it's not it will go to else
    if (score[activePlayer] >= 50) {
      gameStatusPlay = false;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active'); //this ensures so that player active and player winner doesn't stay at the same time. But the game works fine without it.

      diceEl.classList.add('hidden');
    } else {
      //score was not enough so players switched.while transferring current score to active players total score
      switchPlayer();
    }
  }
});
//resets the game using init function
btnNew.addEventListener('click', init);
