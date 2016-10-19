//Global initilizations
var wins = 0;
var losses = 0;
var word;
var turns = 5;
var TURN_LIMIT = 1;
var guesses = [];
var blanks = [];
var wordChoices = ["deathstar", "tattooine", "leia", "lightsaber", "yoda", "luke", "jabba", "naboo", "lando"];

//Class to act as handler for modifying HTML page
var Page = {
    //set selector id's to class variables
    winID: "#wins",
    lossID: "#losses",
    turnID: "#turns",
    guessID: "#guesses",
    blankSpaceID: "#blankSpaces",
    wordID: "#word",
    messageID: "#message",
    
    //class functions
    insertHtml: function (gameVar, id) {
        return document.querySelector(id).innerHTML = gameVar;
    },
    updateWins: function (gameVar) {
        this.insertHtml(gameVar, this.winID);
    },
    updateLosses: function (gameVar) {
        this.insertHtml(gameVar, this.lossID);
    },
    updateTurns: function(gameVar){
        this.insertHtml(gameVar, this.turnID);
    },
    updateGuesses: function(gameVar) {
        this.insertHtml(gameVar, this.guessID);
    },
    updateBlanks: function(gameVar) {
        this.insertHtml(gameVar, this.blankSpaceID);
    },
    updateWord: function(gameVar) {
        this.insertHtml(gameVar, this.wordID);
    },
    updateMessage: function(gameVar) {
        this.insertHtml(gameVar, this.messageID);
    }
};

function getWord() {
    word = wordChoices[Math.floor(Math.random() * wordChoices.length)];
}

function isAletter(playerInput) {
    if (word.indexOf(playerInput) !== -1){
      return true;
    }
}

function displayBlanks() {
    for (var i = 0; i < word.length; i++) {
        blanks[i] = "_";
    }
    Page.updateBlanks(blanks);
}


function replaceBlank(playerInput) {
    //var letter = word.indexOf(playerInput);
    //blanks = blanks.substr(0, letter) + playerInput + blanks.substr(letter + playerInput.length);
    
    //loop through to find duplicate letters;
    for (var i = 0; i < word.length; i++) {
        if (playerInput == word.charAt(i)) {
            blanks[i] = word.charAt(i);
        }
    }
    Page.updateBlanks(blanks);
}

function insertGuess(playerInput) {
    guesses.push(playerInput);
    Page.updateGuesses(guesses);
}

function reset() {
    guesses = [];
    Page.updateGuesses(guesses);
    blanks = [];
    turns = 5;
    Page.updateTurns(turns);
    playGame();
}

function playGame() {
    
    getWord();
    displayBlanks();
    
    document.onkeyup = function (event) {
      var playerInput = String.fromCharCode(event.keyCode).toLowerCase();
        
        if (turns > TURN_LIMIT) {
            if (isAletter(playerInput)) {
                
                replaceBlank(playerInput);
                
            }else {
                insertGuess(playerInput);
                turns--;
            }
            
            //checks if any blanks are left if not player wins, reset game
            if (blanks.indexOf("_") == -1) {
                wins++;
                Page.updateWord(word);
                //update win message
                if(wins <= 5){ 
                    Page.updateMessage("Impressive!");
                } else {
                    //update player ego
                    Page.updateMessage("Most Impressive!");
                }
                //pause before reset for half a second
                setTimeout(reset, 500);
            }  
        } else {
            losses++;
            Page.updateWord(word);
            Page.updateMessage("NOOOoooo!!");
            reset();
        }
        
        Page.updateWins(wins);
        Page.updateLosses(losses);
        Page.updateTurns(turns);
    }
}