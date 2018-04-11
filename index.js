var Word = require("./word.js");
var fs = require("fs-extra");

//not 100% how to access the value (word chosen) returned from the promise in other places 
var randomWord = function () {

    var idk = fs.readFile("words.txt", "utf8")
        .then(function (data) {
            var availableWords = data.split(",");
            var myWord = availableWords[Math.floor(Math.random() * availableWords.length)];
            var showWord = new Word(myWord);
            showWord.getChars();
            // uncomment console.log to see the chosen word
            // console.log(showWord);
            return showWord;
        })
}

randomWord();

