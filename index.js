var Word = require("./word.js");
var fs = require("fs-extra");
var inquirer = require("inquirer");
var guessesLeft = 7;
var guessCount = 0;
var newWord;

//not 100% how to access the value (word chosen) returned from the promise in other places 
function generateRandomWord() {
    
    fs.readFile("words.txt", "utf8")
        .then(function (data) {
            var availableWords = data.split(",");
            var randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
            
            newWord = new Word(randomWord);
            newWord.getChars();
            
            console.log(newWord.wordRender());
            return newWord;
        }).then(function() {           
            promptUser();
            })
}

function promptUser () {
    
    if (guessCount < newWord.characters.length + guessesLeft) {
        
        inquirer.prompt([
            {
                name: "whichLetter",
                type: "input",
                message: "\nWhat letter do you want to guess?"
            }
        ]).then(answer => {
                guessCount++;
            if (newWord.hasChar(answer.whichLetter)) {
                console.log("\nCORRECT!");
                console.log(newWord.wordRender());
                console.log("\nYou have " + guessesLeft + " guesses left.");
                newWord.wordGuessed();
            }
            else {
                console.log("\nSorry that is wrong.");
                console.log(newWord.wordRender());
                guessesLeft--;
                console.log("\nYou have " + guessesLeft + " guesses left.");
                newWord.wordGuessed();
                if (guessesLeft === 0) {
                    console.log("GAMEOVER!");
                }
            }
            if(guessesLeft > 0 && newWord.wordFound === false) {
                promptUser();
            }
            else {
                return;
            }
        })
    }// add a catch here?
}

generateRandomWord();