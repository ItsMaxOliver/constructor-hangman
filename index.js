const Word = require("./word.js");
const fs = require("fs-extra");
const inquirer = require("inquirer");
const chalk = require("chalk");
let guessesLeft = 7;
let guessedLetters = [];
let availableChars = [];
let newWord;

function generateRandomWord() {
    fs.readFile("words.txt", "utf8")
        .then( data => {
            let availableWords = data.split(", ");
            // reads the words.txt file and splits the words at the ", " to separate each word/phrase into an array called availableWords
            let randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
            // choses a random word/phrase from the availableWords array and sets it equal to randomWord
            newWord = new Word(randomWord);
            newWord.getChars();
            // calls the function to getChars from the Word constructor

            console.log(chalk.magenta(`\n${newWord.wordRender()}\n`));
            return newWord;
        })
            .then( () => {           
                promptUser();
            })
            .catch( err => {
                console.log(err.message);
            })
        .catch( err => {
            console.log(err.message);
        })
}

function promptUser() {
    if (guessesLeft > 0) {
        inquirer.prompt([
            {
                name: "whichLetter",
                type: "input",
                message: "What letter do you want to guess?"
            }
        ])
            .then( answer => {
                //********split the answer after the first letter to make sure they are only guessing one letter at a time
                //********check to see if the user has already guessed that letter by checking against guessedLetter array
                //********if not proceed, other wise print message that says they already guessed that letter
                if (newWord.hasChar(answer.whichLetter)) {
                    console.log(chalk.green(`\nCORRECT!\n`));
                    //******* also show a line of already guessed letters
                    console.log(chalk.magenta(newWord.wordRender()));
                    console.log("");
                    newWord.wordGuessed();
                }
                else {
                    guessesLeft--;
                    console.log(chalk.red(`\nSorry that is wrong.\n`));
                    //*******also show a line of already guessed letters
                    console.log(chalk.magenta(newWord.wordRender()));
                    if (guessesLeft != 0) {
                        console.log(chalk.yellow(`\nYou have ${guessesLeft} guesses left! Don't waste them.\n`));
                    }
                    else {
                        console.log(chalk.cyan(`GAMEOVER!`));
                        //*******show what the correct word was
                        return;
                        // exits the enitre game
                        //*******add another prompt to see if user wants to play again
                    }
                    
                    newWord.wordGuessed();
                }
                
                if (guessesLeft > 0 && newWord.wordFound === false) {
                    promptUser();
                    // continues to prompt user to keep guessing if they have more than 0 guessesLeft
                }
                else {
                    guessesLeft = 7;
                    // resets the guessesLeft 
                    console.log(chalk.green(`You guessed the word/phrase correctly!\n`));
                    console.log(chalk.blue(`Here is a new word/phrase! See if you can get this one right!`));

                    generateRandomWord();
                    //picks a new word for the user to guess
                }
            })
            .catch( err => {
                console.log(err.message);
            })
    }
} 

generateRandomWord();