const Word = require("./word.js");
const fs = require("fs-extra");
const inquirer = require("inquirer");
const chalk = require("chalk");
let guessesLeft = 7;
let guessedChars = [];
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
            .catch( err => console.log(err.message) )
        .catch( err => console.log(err.message) )
}

function promptUser() {
    if ( guessesLeft > 0 ) {
        inquirer.prompt([
            {
                name: "whichLetter",
                type: "input",
                message: "What letter do you want to guess?"
            }
        ])
            .then( answer => {
                let guess = answer.whichLetter[0];
                // sets guess to the first character typed as their letter

                if( guessedChars.includes(guess) ){
                    // checks to see if the user has already guessed that letter by checking against guessedChar array
                    console.log(chalk.red(`\nYou already guessed that letter. Try a different one.`));
                    guessesLeft++;
                    // makes it so that typing in the same letter over and over wont count against them
                }
                else {
                    guessedChars.push(guess);
                    // saves the character guessed into an array
                }
                /**** User guesses correctly ****/
                if ( newWord.hasChar(guess) ) {
                    console.log(chalk.green(`\nCorrect!\n`));
                    console.log(chalk.cyan(`Guessed Letters: ${guessedChars} \n`));
                    // shows a line of guessed chars
                    console.log(chalk.magenta(newWord.wordRender()));
                    // shows the underscores of word/phrase the user is trying to guess
                    console.log("");
                    newWord.wordGuessed();
                    // runs function to see if user completed the word/phrase
                }
                /**** User guesses incorrectly ****/
                else {
                    guessesLeft--;
                    console.log(chalk.red.bold(`\nSorry that is wrong.\n`));
                    console.log(chalk.cyan(`Guessed Letters: ${guessedChars}\n`));
                    // shows a line of guessed chars
                    console.log(chalk.magenta(newWord.wordRender()));
                    // shows the underscores of word/phrase the user is trying to guess

                        /**** User guesses incorrectly but still has more attempts left ****/
                        if ( guessesLeft != 0 ) {
                            console.log(chalk.yellow(`\nYou have ${guessesLeft} guesses left! Don't waste them.\n`));
                            // tells user how many guesses they have left
                        }
                        /**** User guesses incorrectly and has no more attempts left ****/
                        else {
                            console.log("");
                            console.log(chalk.blue.bold(`GAMEOVER!`));
                            // displays that the player lost
                            return;
                            // exits the enitre game
                        }
                    newWord.wordGuessed();
                    // runs function to see if user completed the word/phrase
                }

                if (guessesLeft > 0 && newWord.wordFound === false) {
                    promptUser();
                    // continues to prompt user to keep guessing if they have more than 0 guessesLeft
                } 
                else {
                    guessesLeft = 7;
                    // resets the guessesLeft 
                    guessedChars = [];
                    // resets the guessedChars
                    console.log(chalk.green(`You guessed the word/phrase correctly!\n`));
                    console.log(chalk.blue(`Here is a new word/phrase! See if you can get this one right!`));

                    generateRandomWord();
                    //picks a new word for the user to guess
                }
            })
                .catch( err => console.log(err.message))
    }
}

generateRandomWord();
// invokes the function to start the game