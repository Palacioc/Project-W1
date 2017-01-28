console.log("logic linked");
function Round () {
  this.numbersChoice = [1,2,3,4,5,6,7,8,9,10,25,50,75,100];
  this.numbersToPlayWith = [0,0,0,0,0,0];
  this.target = 0;
  this.player1 = new Player();
  this.player2 = new Player();
}

function Player(){
  this.name = "nombre";
  this.highScore = 999;
  this.numberOfTries = 0;
}

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

//Para la funcion validate hay tres condiciones:
//  -cond1: que todos los caracteres sean de los numeros a elegir y que no se utilice uno mismo mas de una vez
//  -cond2: que las operaciones den como resultado un numero (y no un fallo)

Round.prototype.cond1 = function(numbersUsed, numbersChoice){
  var clone = numbersChoice.slice(0);
  var isok = true;
  numbersUsed.forEach(function(elem){if(clone.indexOf(elem)<0){isok = false; return false;}else{clone[clone.indexOf(elem)]=-1;}});
  return isok;
};

Round.prototype.cond2 = function(string){
  try{eval(string);}catch(e){return false;}
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

Round.prototype.updateHighScore = function(player, score){
  if (score < player.highScore) { player.highScore=score; return true;}
  return false;
};

Round.prototype.send = function(){
  that = this;
  var latestEq = equation.value;
  console.log("The value of the text field is: " + eval(latestEq));
  var valid = that.validate(latestEq, round.numbersToPlayWith);
  console.log("Is this equation valid?: " + valid);
  if (valid) {
    var latestScore = that.calculateScore(latestEq);
    console.log("Score obtained: " + latestScore);
    if (that.updateHighScore(that.player1, latestScore)) {
      console.log("New high score!");
    }
  }
};
