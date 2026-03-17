// The real simon game logic is that the keyboard is only used once to start the game and after that the game runs through the onscreen buttons 
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;
var score = 0;
var clickCount;
var isUserTurn = false;
var highScore = Number(localStorage.getItem('High-Score')) || 0;

$('#high-score').text("High Score: " + highScore);


$(document).keydown(function(){
  if(!started){
    $('#level-title').text("Score 0")
    nextSequence();
    // levelIncrement();
    started = true;
  }
});

$(".btn").click(function(){
  if(!started || !isUserTurn){
    return;   // do nothing if game hasn't started
  }
  var userChosenColor = this.id; // this here is the exact actual element that was clicked 
  if(userChosenColor !== gamePattern[clickCount]){ // main condition check , to see if the pattern matches or not 
      startOver();
      return;
  }
  animatePress(userChosenColor); // animate the user chosen color 
  playSound(userChosenColor) // play sound according to the user chosen color
   clickCount++; // clickcount increasing 

 if(clickCount === gamePattern.length){ 
  
  setTimeout(() => {
    levelIncrement(); 
    nextSequence();
  }, 500);// checking if the user has clicked as many times as the colors in the gamepattern array
  
 }

})

// nextSequence is for the computer to choose the pattern 
function nextSequence(){
  clickCount = 0; // this is to keep a check on how many times the user clicked a button and to not start the nextSequence function before that 
   
  var randomNumber = Math.floor(Math.random() * 4); // Random Number generator 
  var randomChosenColor = buttonColors[randomNumber]; // choosing colors based on random numbers
  
  
  gamePattern.push(randomChosenColor); // pushing the random chosen color in the game pattern array
  showSequence();

 // $(".result-1").text(gamePattern) // displays the result gamePattern 
  
}



function startOver(){
  $('#level-title').text("Game-over")
  highScoreCheck(); 
      playSound("Game-over")
      $("body").addClass("flash")
      setTimeout(() => {
        $("body").removeClass("flash")
      }, 200);
      started = false;
      score = 0;
      gamePattern = [];
      setTimeout(function(){
      $('#level-title').text("Press a key to start")}, 1000);
}

function showSequence(){
  isUserTurn = false;
  for(let i = 0; i < gamePattern.length; i++){
    setTimeout(function(){
      var color = gamePattern[i];
      $("." + color).fadeOut(100).fadeIn(100);
      playSound(color);

      if(i === gamePattern.length-1){
      setTimeout(() => {
        isUserTurn = true;
      }, 300);
    }
    }, i * 600);

    
  }
}

function animatePress(currentColor){
  var button = $("."+ currentColor);
  button.addClass("pressed");
  setTimeout(function(){
    button.removeClass("pressed")
  }, 50);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function highScoreCheck(){
  if(score > highScore){
    highScore = score;
    localStorage.setItem('High-Score', highScore)

  }
}

function levelIncrement(){
      score++;
      $('#level-title').text("Score" + " " + score)
          
}

