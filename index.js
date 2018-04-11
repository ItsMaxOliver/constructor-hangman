var Word = require("./word.js");
var fs = require("fs-extra");
var inquirer = require("inquirer");
var guessesLeft = 7;
var newWord;

//not 100% how to access the value (word chosen) returned from the promise in other places 
function generateRandomWord() {
    
    fs.readFile("words.txt", "utf8")
        .then(function (data) {
            var availableWords = data.split(",");
            var randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
            newWord = new Word(randomWord);
            newWord.getChars();
            // uncomment console.log to see the chosen word
            //console.log(newWord.word);
            console.log(newWord.wordRender());
            promptUser();
            return newWord;
        })
}

function promptUser () {
    inquirer.prompt([
        {
            name: "whichLetter",
            type: "input",
            message: "\nWhat letter do you want to guess?"
        }
    ]).then(answer => {
        // take their answer and check if it is in the word
        
        if (newWord.hasChar(answer.whichLetter)) {
            console.log("\nCORRECT!");
            console.log(newWord.wordRender());
            console.log("\nYou have " + guessesLeft + " guesses left.");
        }
        else {
            console.log("\nSorry that is wrong.");
            console.log(newWord.wordRender());
            guessesLeft--;
            console.log("\nYou have " + guessesLeft + " guesses left.");
        }
    })
    // add a catch here?
}
function game() {
    if (guessesLeft > 0) {
        generateRandomWord();
    }
    else {
        console.log("GAME OVER!");
    }
}

game();