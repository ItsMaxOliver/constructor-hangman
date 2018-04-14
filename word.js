var Letter = require("./letter.js");

class Word {
    constructor(word) {
        this.word = word;
        this.characters = [];
        this.wordFound = false;
        
        this.getChars = function() {
            for (var i = 0; i < this.word.length; i++) {
                var newLetter = new Letter(this.word[i]);
                this.characters.push(newLetter);
            }
        };
        // creates new Letter objects for each character in the word
        
        this.hasChar = function(input) {
            let letterAppears = false;
            
            this.characters.forEach(item => {
                if(item.char === input) {
                    item.appear = true;
                    letterAppears = true;
                }
            })
            
            return letterAppears;
            
        };
        // if the user input equals a letter in the word, the letter should be shown
        
        this.wordRender = function() {
            var display = "";
            this.characters.forEach(item => {
                var currentChar = item.charRender();
                display += currentChar + " ";
            });
            return display;
        };
        // should return the string with each character rendered
        
        this.wordGuessed = function() {
            if (this.characters.every(item => {
                return item.appear === true;
            }))
            {
                this.wordFound = true;
                return true;
            }
        };
        // checks to see if every item in the character array appears and if does, returns true so that we can generate another random word
    }
}

module.exports = Word;