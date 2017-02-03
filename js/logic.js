console.log("logic linked");
function Round () {
  this.numbersChoice = [1,2,3,4,5,6,7,8,9,10,25,50,75,100];
  this.numbersToPlayWith = [0,0,0,0,0,0];
  this.target = 0;
  this.activePlayer = -1;
  this.players = [];
  this.winner = -1;
  this.time = 0;
}

function Player(){
  this.name = "nombre";
  this.highScore = 999;
  this.highScoreResult = 0;
  this.numberOfTries = 0;
}

Round.prototype.setResults = function(){
  var best = [];
  this.players.reduce(function(top, elem, index){
    console.log("probando");
    if (elem.highScore === top) {
      console.log("probando igual");
      best.push(elem);
      return elem.highScore;
    }else if (elem.highScore < top) {
      best = [];
      best.push(elem);
      return elem.highScore;
    }else{return top;}
  }, 1000);
  console.log(best);
  this.winner = best;
};

Round.prototype.storePlayers = function(names){
  var players = this.players;
  names = Array.from(names);
  names.forEach(function(elem, index, array){
    players[index] = new Player();
    players[index].name = elem.value;
  });
};

Round.prototype.splitInNumbers = function(string){
  var splitted = string.replace(/\(/g, " ").replace(/\)/g, " ").replace(/\+/g, " ").replace(/\-/g, " ").replace(/\*/g, " ").replace(/\//g, " ").split(" ");
  splitted = splitted.filter(function(elem){return elem==="" ? false : true;}).map(Number);
  return splitted;
};

Round.prototype.setNumbersToPlayWith = function(){
  var that = this;
  this.numbersToPlayWith = this.numbersToPlayWith.map(function(){return that.numbersChoice[Math.floor(Math.random()*14)];});
};

Round.prototype.setTarget = function(){
  this.target = Math.floor(Math.random() * (999 - 101 + 1)) + 101;
};

Round.prototype.cond1 = function(numbersUsed, numbersChoice){
  var clone = numbersChoice.slice(0);
  var isok = true;
  numbersUsed.forEach(function(elem){if(clone.indexOf(elem)<0){isok = false; return false;}else{clone[clone.indexOf(elem)]=-1;}});
  if (isok === false) {
    updateFeedback('NVWN');
    successfulSendAnimate();
  }
  return isok;
};

Round.prototype.cond2 = function(string){
  var red = false;
  var conDecimales = 0;
  try{conDecimales = eval(string);}catch(e){
    updateFeedback('NVWE');
    successfulSendAnimate();
    return false;
  }
  if (Math.floor(conDecimales)!==conDecimales){
    updateFeedback('NVWD');
    successfulSendAnimate();
    return false;
  }
  return true;
};

//Funcion VALIDATE devuelve true si es valido el string dados los numeros disponibles:
Round.prototype.validate = function (string, numbersChoice) {
  var numbersUsed = this.splitInNumbers(string);
  return this.cond1(numbersUsed, numbersChoice) && this.cond2(string);
};

Round.prototype.calculateScore = function(string){
  return Math.abs(this.target - eval(string));
};

Round.prototype.updateHighScore = function(player, score, scoreResult){
  if (score < player.highScore) { player.highScore=score; player.highScoreResult = scoreResult;return true;}
  return false;
};

Round.prototype.isWin = function(player){
  return player.highScore === 0;
};

Round.prototype.endTurn = function(whyEnd){
  var that = round;
  if (whyEnd === "win") {
    clearInterval(that.time);
    sintonia.pause();
    sintonia.currentTime = 0;
  }
  appendNewEntry();
  updateIntermediateResult(whyEnd);
  showResults();
  clearPlayer();
  that.activePlayer++;
  setTimeout(hideResults,2000);
  setTimeout(that.reset,2000);
};

Round.prototype.reset = function (){
  var that = round; //No consigo que me funcione de otra forma!! He probado todo..
  if (that.activePlayer < that.players.length) {
    updateWelcome();
    showWelcome();
    hideNumbersToPlayWith();
    hideTarget();
  }else {
    hideNumbersToPlayWith();
    hideTarget();
    that.setResults();
    updateResults();
    showResults();
  }
};

Round.prototype.send = function(){
  var latestEq = equation.value;
  var valid = this.validate(latestEq, round.numbersToPlayWith);
  console.log("Is this equation valid?: " + valid);
  if (valid) {
    var latestScoreResult = eval(latestEq);
    console.log("The value of the text field is: " + latestScoreResult);
    var latestScore = this.calculateScore(latestEq);
    console.log("Score obtained: " + latestScore);
    if (this.updateHighScore(this.players[this.activePlayer], latestScore, latestScoreResult)) {
      updateMarker();
      console.log("New high score!");
      updateFeedback('VNHS');
      successfulSendAnimate();
      if (this.isWin(this.players[this.activePlayer])) {
        clearTimeout(this.time);
        this.endTurn("win");
      }
    }else{
      updateFeedback('VMEH');
      successfulSendAnimate();
    }
  }
};
