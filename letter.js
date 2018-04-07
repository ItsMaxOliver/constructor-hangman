class Letter {
    constructor(char, guessed) {
        this.char = char;
        this.guessed = false;
        
        this.charCheck = function(input) {
            if(input === char) {
                this.guessed = true;
                return true;
            }
            else {
                return false;
            }
        }
        this.returnChar = function() {
            if (this.guessed) {
                return char;
            }
            else {
                return "_";
            }
        }
    }
}
//--------TESTING----------
//var test = new Letter("a", false)
//
//console.log(test.charCheck("b"));
//console.log(test.returnChar());

module.exports = Letter;