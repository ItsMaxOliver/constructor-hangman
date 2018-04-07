var Letter = require("./letter.js");

var a = new Letter("a", false);
var b = new Letter("b", false);
var c = new Letter("c", false);

class Word {
    constructor() {
        this.characters = [];
        
        this.toString = function() {
            this.characters.forEach(item => {
                console.log(item.returnChar());
                console.log("trying to make a word");
            })
        }
        
        this.isGuessed = function(input) {
            this.characters.forEach(Letter => {
                 Letter.charCheck(input);
            })
        }
    }
}
//-----------TESTING---------
var testWord = new Word();
testWord.characters.push(a, b, c);
//console.log(testWord.characters);
//console.log(testWord.isGuessed("a"));
console.log(testWord.isGuessed("a", "b", "d"));
console.log(testWord.toString());


module.exports = Word;