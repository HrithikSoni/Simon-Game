var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];

var started = false;
var level = 0;



$(document).on("keypress", function(event)
{
if(!started){
    $("#level-title").html("Level " + level);
    nextSequence();
    started = true;
}    
})

$(".btn").click(function() 
{
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer((userClickedPattern.length)-1);
})

function nextSequence()
{
    userClickedPattern = [];
    level++;
    $("#level-title").html("Level " + level);

    var randomNumber =  Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    var randomButton = $("#" + randomChosenColor);
    randomButton.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    
}

function playSound(name)
{
    var audio = new Audio('./sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColor){
$("#"+currentColor).addClass("pressed");

setTimeout(function(){
    $('#'+currentColor).removeClass("pressed");
}, 100);
}

function checkAnswer(currentLevel)
{
if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
    console.log("succesful");

    if(gamePattern.length == userClickedPattern.length){
        setTimeout(function(){
            nextSequence();
        }, 100)
    }
} else{
    $("body").addClass("game-over");
    var audio = new Audio('./sounds/wrong.mp3');
    audio.play();

    $("#level-title").html("Game Over,Press any Key to Restart");

    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 100);

    startOver();
}
}

function startOver(){
level = 0;
gamePattern = [];
started = false;
}