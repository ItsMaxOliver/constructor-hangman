const Letter = require("./letter.js");

class Word {
    constructor(word) {
        this.word = word;
        this.characters = [];
        this.wordFound = false;
        
        this.getChars = () => {
            for (let i = 0; i < this.word.length; i++) {
                let newLetter = new Letter(this.word[i]);
                this.characters.push(newLetter);
            }
        };
        // creates new Letter objects for each character in the word
        
        this.hasChar = input => {
            let letterAppears = false;
            
            this.characters.forEach(item => {
                if(item.char === input) {
                    item.appear = true;
                    letterAppears = true;
                }
            })
            
            return letterAppears;
        };
        // if the user input equals a letter in the word, the letter will be shown
        
        this.wordRender = () => {
            let display = "";
            this.characters.forEach(item => {
                let currentChar = item.charRender();
                // sets the currentChar to the charRendered from the Letter constructor function
                display += currentChar + " ";
            });
            return display;
        };
        // returns the string with each character rendered
        
        this.wordGuessed = () => {
            if (this.characters.every( item => item.appear === true )) {
                return this.wordFound = true;
            }
        };
        // checks to see if every item in the character array appears and if does, returns true so that we can generate another random word
    }
}

module.exports = Word;