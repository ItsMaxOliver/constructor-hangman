class Letter {
    constructor(char) {
        this.char = char;
        
        this.charCheck = function(input) {
            if(input === char) {
                return true;
            }
            else {
                return false;
            }
        }
        this.returnChar = function() {
            if (this.charCheck) {
                return char;
                
            }
            else {
                return "_";
                
            }
        }
    }
}
//--------TESTING----------
//var b = new Letter("b", false);
//
//console.log(b.charCheck("b"));
//console.log(b.returnChar());

module.exports = Letter;