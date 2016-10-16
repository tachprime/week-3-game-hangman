var wins = 0;
var losses = 0;
var word;
var turns = 5;
var guesses = [];
var blanks = ["_"];
var wordChoices = ["deathstar", "tattooine", "leia", "lightsaber", "yoda", "luke", "jabba", 
                   "naboo", "lando"];

function getWord() {
    word = wordChoices[Math.floor(Math.random() * wordChoices.length)];
    //console.log(word);
}

function isAletter(playerInput) {
    var letter = word.indexOf(playerInput);
    if (playerInput === word[letter]) {
        return true;
    }
}

function displayBlanks() {
    for (var i = 0; i < word.length; i++) {
        blanks[i] = "_";
    }
    insertHtml(blanks, '#blankSpaces');
}


function replaceBlank(playerInput) {
    var letter = word.indexOf(playerInput);
    //blanks = blanks.substr(0, letter) + playerInput + blanks.substr(letter + playerInput.length);
    //insertLetter(blanks);
    for (var i = 0; i < word.length; i++) {
        if (playerInput == word.charAt(i)) {
            blanks[i] = word.charAt(letter);
        }
    }
    insertHtml(blanks, '#blankSpaces');
}


function insertHtml(localVar,id) {
    return document.querySelector(id).innerHTML = localVar;
}

function insertGuess(playerInput) {
    guesses.push(playerInput);
    insertHtml(guesses, '#guesses');
}

function reset() {
    guesses = [];
    insertGuess(" ");
    blanks = [];
    turns = 5;
    insertHtml(turns, '#turns');
    playGame();
}

function playGame() {
    getWord();
    displayBlanks();
    
    document.onkeyup = function (event) {
      var playerInput = String.fromCharCode(event.keyCode).toLowerCase();
        
        if (turns > 1) {
            if (isAletter(playerInput)) {
                
                replaceBlank(playerInput);
                
            }else {
                insertGuess(playerInput);
                turns--;
            }
            
            //checks if any blanks left if not player wins
            if (blanks.indexOf("_") == -1) {
                wins++;
                insertHtml(word,'.hangman span');
                if(wins < 5){ 
                    insertHtml("Impressive!", '#message');
                } else {
                    insertHtml("Most Impressive!", '#message');
                }
                setTimeout(reset,500);
            }  
        } else {
            losses++;
            insertHtml("NOOOoooo!!",'#message');
            reset();
        }
        
        insertHtml(wins, '#wins');
        insertHtml(losses, '#losses');
        insertHtml(turns, "#turns");
    }
}

playGame();