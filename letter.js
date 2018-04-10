class Letter {
    constructor(char) {
        this.char = char;
        
        this.charCheck = function(input) {
            if(input === char) {
                return console.log(char);
            }
            else {
                return console.log("_");
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
//var b = new Letter("b");
//var f = new Letter("f");
//var u = new Letter("u");
//var n = new Letter("n");
//
//n.charCheck("b");


module.exports = Letter;