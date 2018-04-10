var Letter = require("./letter.js");

var f = new Letter("f");
var u = new Letter("u");
var n = new Letter("n");

class Word {
    constructor() {
        this.characters = [];
        
        this.isGuessed = function(input) {
            this.characters.forEach(item => {
                return item.charCheck(input);
            })
        }
        
        this.returnWord = function() {
            var word = [];
            this.characters.forEach(item => {
                word.push(item.returnChar());
            })
            console.log(word.join(""));
        }
    }
}
//-----------TESTING---------
var testWord = new Word();
testWord.characters.push(f, u, n);

testWord.isGuessed("u");
testWord.isGuessed("n");
//testWord.returnWord();

module.exports = Word;