//Global initilizations
var wins = 0;
var losses = 0;
var word;
var turns = 5;
var TURN_LIMIT = 1;
var guesses = [];
var blanks = null;
var wordChoices = ["deathstar", "x wing", "leia", "lightsaber", "yoda", "luke", "jabba the hutt", "tie fighter", "lando"];

var AudioSeletor = {
    firstTrack: null,
    secondTrack: null,
    thirdTrack: null,
    tracks: [],
    setTrack: function () {
        this.tracks = [this.firstTrack,this.secondTrack,this.thirdTrack];
    },
};

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
    if (word.includes(playerInput)){
      return true;
    }
}

function displayBlanks() {
    for (var i = 0; i < word.length; i++) {
        //add first letter
        if(blanks == null){
            blanks = "_";
        }
        else if (word.charAt(i) == " ") {
            blanks += " ";
        }else {
            blanks += "_";   
        }   
    }
    console.log(blanks);
    Page.updateBlanks(blanks);
}


function replaceBlank(playerInput) {
    //loop through to find duplicate letters;
    for (var i = 0; i < word.length; i++) {
        if (playerInput == word.charAt(i)) {
            //blanks[i] = word.charAt(i);
            blanks = blanks.substr(0, i) + playerInput + blanks.substr(i + playerInput.length);
        }
    }
    Page.updateBlanks(blanks);
}

function insertGuess(playerInput) {
    guesses.push(playerInput);
    Page.updateGuesses(guesses);
}

function init() {
    AudioSeletor.firstTrack = new Audio("assets/audio/vaderFailme.wav");
    AudioSeletor.secondTrack = new Audio("assets/audio/vaderFaith.wav");
    AudioSeletor.thirdTrack = new Audio("assets/audio/yodaTry.wav");
    AudioSeletor.setTrack();
    playGame();
}

function reset() {
    guesses = [];
    Page.updateGuesses(guesses);
    blanks = null;
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
            if (!blanks.includes("_")) {
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
            var track = Math.floor(Math.random() * 3);
            if(AudioSeletor.tracks[track] !== null) {
                AudioSeletor.tracks[track].play();
            }
            setTimeout(reset, 500);
        }
        
        Page.updateWins(wins);
        Page.updateLosses(losses);
        Page.updateTurns(turns);
    }
}