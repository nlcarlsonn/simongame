
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// --- Starting Game ---

$(document).on("keydown", function (event) {

    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
    // if (gamePattern.length === 0) {
    //     $("#level-title").text("Level " + level);
    //     nextSequence();
    // }
})

// --- Random Chosen Color ---

function nextSequence() {

    userClickedPattern.length = 0;
    // userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

// --- User Chosen Color ---

$(".btn").on("click", function () {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(this);
    // animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

// --- Check Answer ---

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        
        console.log(userClickedPattern);
        console.log(gamePattern);

        if (gamePattern.length === userClickedPattern.length) {
            
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }

        // why is this code not working
        // if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        //     setTimeout(() => {
        //         nextSequence();
        //     }, 1000);
        // }

    } else {

        console.log("Wrong");
        playSound("wrong");
        startOver();

        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        setInterval(() => {
            $("body").removeClass("game-over");
        }, 200);
    }    
}

// --- Play Color Sounds ---

function playSound(name) {

    // this also plays sound
    // var buttonSound = new Audio("sounds/" + name + ".mp3");
    // buttonSound.play();

    switch (name) {
        case "red":
            var buttonSound = new Audio("sounds/red.mp3");
            buttonSound.play();
            break;

        case "blue":
            var buttonSound = new Audio("sounds/blue.mp3");
            buttonSound.play();
            break;

        case "green":
            var buttonSound = new Audio("sounds/green.mp3");
            buttonSound.play();
            break;

        case "yellow":
            var buttonSound = new Audio("sounds/yellow.mp3");
            buttonSound.play();
            break;

        case "wrong":
        var buttonSound = new Audio("sounds/wrong.mp3");
        buttonSound.play();
            break;
    
        default: console.log("buttonInnerHTML");
            break;
    }
}

// --- Animate User Clicks ---

function animatePress(currentColor) {
    
    $(currentColor).addClass("pressed");
    // $("#" + currentColor).addClass("pressed");   

    setTimeout(function() {
        $(currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {

    started = false;
    level = 0;
    gamePattern = [];
}