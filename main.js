let randomNumber = null;
let guess = null;
let wins = 0;
let offset = 0;
let max = 100;
let min = 1;

function setRandomNumber() {
  randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(randomNumber)
}

function setOffset() {
  offset = wins * 10
}

function adjustRange() {
  min = min - offset
  max = max + offset
  $('#offset-notification').text(`You Won! New Range: ${min} - ${max}`);
}

function checkGuess() {
  $('#guess-output').text(guess);
  if (guess === randomNumber) {
    hint = 'BOOM!'
    wins++
   $('#hint').text(hint);
    $('#play-again-container').slideDown('slow')
  }
  else if (guess > randomNumber) {
    hint = 'That is too high!'
   $('#hint').text(hint);
  }
  else {
    hint = 'That is too low'
   $('#hint').text(hint);
  }
}

function checkValidGuess() {
  if (isNaN(guess) || guess < min || guess > max) {
    $('#guess-output').text('Invalid Guess');
  }
  else {
    checkGuess()
  }
}

function playAgain() {
  $('#guess-input').val('');
  $('#guess-output').text('');
  $('#lower-limit').val('');
  $('#upper-limit').val('');
  $('#hint').text('');
  setOffset()
  adjustRange()
  setRandomNumber()
  fillRange()
  $('#play-again-container').slideUp('fast')
}

function fillRange() {
  $('#lower-limit').val(min);
  $('#upper-limit').val(max);
}

$(document).ready(() => {
  fillRange()

  $('#start-game').on('click', () => {
    min = parseInt($('#lower-limit').val(), 10) || min;
    max = parseInt($('#upper-limit').val(), 10) || max;
    setRandomNumber()
    $('#start-container').slideUp('fast')
    $('#game-container').slideDown('fast')
    $('#offset-notification').text(`Range: ${min} - ${max}`);
  });

  $('#submit-guess').on('click', () => {
    guess = parseInt($('#guess-input').val(), 10);
    $('#notification-text').text("Your Last Guess Was");
    $('#guess-input').val('');
    checkValidGuess()
  });


  $('#clear-guess').on('click', () => {
    $('#guess-input').val('');
    $('#guess-output').text(`Your Last Guess: ${guess}`);
  });

  $('#play-again').on('click', () => {
    playAgain()
  });

  $('#reset').on('click', () => {
    location.reload()
  });

});
