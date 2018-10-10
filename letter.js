class Letter {
    constructor(char) {
        this.char = char;
        this.appear = false;
        
        this.charRender = function() {
            if (this.char === " ") {
                this.appear = true;
                return " ";
            }
             //returns a space when it is a space
            if (this.appear === false) {
                return "_"; 
            }
            //returns an underscore when it is a letter that hasn't been guessed
            else {
                return this.char;
            }
        };
    };
};

module.exports = Letter;