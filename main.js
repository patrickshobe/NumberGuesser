let randomNumber = null;
let guess = null;
let offset = 0;
let max = 100;
let min = 1;

function setRandomNumber() {
  randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
}

function adjustRange() {
  min = min - offset
  max = max + offset
  $('#offset-notification').text(`You Won! New Range: ${min} to ${max}`);
}

function checkGuess() {
  $('#guess-output').text(guess);
  $('#last-guess').text("Your Last Guess Was");
  if (guess === randomNumber) {
    hint = 'BOOM!'
    offset = offset + 10
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
    $('#guess-input').attr('placeholder', 'Invalid Guess');
    $('.input').addClass('input-fail')
  }
  else {
    checkGuess()
  }
}
function clearFields() {
  $('#guess-input').val('');
  $('#guess-output').text('');
  $('#hint').text('');
  $('#last-guess').text('');
}

function playAgain() {
  clearFields()
  adjustRange()
  setRandomNumber()
  fillRange()
  $('#play-again-container').slideUp('fast')
}

function fillRange() {
  $('#lower-limit').val(min);
  $('#upper-limit').val(max);
}

function invalidGuess() {
  $('#guess-input').addClass('input-fail')
}

$(document).ready(() => {
  fillRange()

  $('#start-game').on('click', () => {
    min = parseInt($('#lower-limit').val(), 10) || min;
    max = parseInt($('#upper-limit').val(), 10) || max;
    setRandomNumber()
    $('#start-container').slideUp('fast')
    $('#game-container').slideDown('fast')
    $('#offset-notification').text(`Range: ${min} to ${max}`);
    $('#guess-input').attr('min', min)
    $('#guess-input').attr('max', max)
  });

  $('#submit-guess').on('click', () => {
    guess = parseInt($('#guess-input').val(), 10);

    $('#guess-input').val('');
    checkValidGuess()
  });

  $("#guess-input").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#submit-guess").click();
    }
  });

  $('#play-again').on('click', () => {
    playAgain()
  });

  $('#reset').on('click', () => {
    location.reload()
  });

});
