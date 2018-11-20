// Sets Global Variables
let randomNumber = null;
let guess = null;
let offset = 0;
let max = 100;
let min = 1;

function setRandomNumber() {
  // calculates the random number
  randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
}

function adjustRange() {
  // Subtracts the win offset from the min and max values
  min = min - offset
  max = max + offset
  // Sends the min and max values to the page
  $('#offset-notification').text(`You Won! New Range: ${min} to ${max}`);
}

function checkGuess() {
  // sends the guess to the page
  $('#guess-output').text(guess);
  // sends the your lsat guess waas output to the page
  $('#last-guess').text("Your Last Guess Was");
  // checks if the quess and random number are equal
  if (guess === randomNumber) {
    // sets the hint
    hint = 'BOOM!'
    // calculates the new range offset
    offset = offset + 10
    // shows the play again container
    $('#play-again-container').slideDown('slow')
  }
  // checks if the guess if higher than the number
  else if (guess > randomNumber) {
    // sets the hint
    hint = 'That is too high!'
  }
  else {
    // sets the hint
    hint = 'That is too low'
  }
  // sends the hint to the view
  $('#hint').text(hint);
}

function checkValidGuess() {
  // checks to see if the guess is a number, too high or too low
  if (isNaN(guess) || guess < min || guess > max) {
    // changes the input placeholder to invalid guess
    $('#guess-input').attr('placeholder', 'Invalid Guess');
    // applies the input-fail css class
    $('.input').addClass('input-fail')
  }
  else {
    // executes the checkGuess function
    checkGuess()
  }
}
function clearFields() {
  // This clears the fields
  $('#guess-input').val('');
  // This clears the fields
  $('#guess-output').text('');
  // This clears the fields
  $('#hint').text('');
  // This clears the fields
  $('#last-guess').text('');
}

function playAgain() {
  // calls a function, see function for more detail
  clearFields()
  // calls a function, see function for more detail
  adjustRange()
  // calls a function, see function for more detail
  setRandomNumber()
  // calls a function, see function for more detail
  fillRange()
  // Hides the play again container
  $('#play-again-container').slideUp('fast')
}

function fillRange() {
  // Sets the place holder values for the range selection
  $('#lower-limit').attr('placeholder', min);
  $('#upper-limit').attr('placeholder', max);
}

$(document).ready(() => {
  // called here so it's filled in on page load
  fillRange()

  // starts the game when the start-game button is clicked
  $('#start-game').on('click', () => {

    // Takes in the user input for min/max OR uses the default value
    min = parseInt($('#lower-limit').val(), 10) || min;
    max = parseInt($('#upper-limit').val(), 10) || max;
    // Calculates a random number.
    setRandomNumber()
    //hides the start container
    $('#start-container').slideUp('fast')
    // shows the game container
    $('#game-container').slideDown('fast')
    // Shows the range
    $('#offset-notification').text(`Range: ${min} to ${max}`);
    // sets the min and max attributes for the guess box
    $('#guess-input').attr('min', min)
    $('#guess-input').attr('max', max)
  });

  // executes when submit is clicked
  $('#submit-guess').on('click', () => {
    // parses the guess
    guess = parseInt($('#guess-input').val(), 10);

    // clears the prior guess
    $('#guess-input').val('');
    //checks for a valid guess
    checkValidGuess()
  });

  // waits for the play again click
  $('#play-again').on('click', () => {
    // runs the play again method
    playAgain()
  });

  // waits for the rest
  $('#reset').on('click', () => {
    // reloads the page to reset the game.
    location.reload()
  });

});
