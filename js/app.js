// $(document).ready(function() {

//Cosas por hacer manana
// poner musiquita
// refactorizar
// poder hacer click en las cartas
// hacer responsive

  function appendNewEntry(){
    var entry = document.createElement("div");
    entry.className = "card entry";
    var marker = document.getElementsByClassName("marker")[0].cloneNode(true);
    marker.childNodes.forEach(function(elem){elem.id = null;});
    entry.appendChild(marker);
    var player = document.getElementsByClassName("player-container")[0];
    player.insertAdjacentHTML('afterEnd', entry.outerHTML);
  }

  function successfulSendAnimate(){
    var eq = document.getElementById("equation");
    var send = document.getElementById("check");
    var feedback = document.getElementById("feedback");
    feedback.style.transform = "scale(1)";
    eq.style.transform = "translate(-70px, 0px)";
    send.style.transform = "translate(75px, 0px)";
    setTimeout(function(){
      feedback.style.transform = "scale(.7)";
      eq.style.transform = "translate(0px, 0px)";
      send.style.transform = "translate(0px, 0px)";
    }, 600);
  }

  function updateFeedback(message){
    var feedback = document.getElementById("feedback");
    switch (message) {
      case "NVWN":
        feedback.innerHTML = "Wrong numbers!";
        feedback.className = "bad-feedback";
        break;
      case "NVWE":
        feedback.innerHTML = "Invalid equation!";
        feedback.className = "bad-feedback";
        break;
      case "NVWD":
        feedback.innerHTML = "Invalid division!";
        feedback.className = "bad-feedback";
        break;
      case "NVLE":
        feedback.innerHTML = "Letters?";
        feedback.className = "bad-feedback";
        break;
      case "VNHS":
        feedback.innerHTML = "New highscore!";
        feedback.className = "good-feedback";
        break;
      case "VMEH":
        feedback.innerHTML = "Meh...";
        feedback.className = "meh-feedback";
        break;
      default:
    }
  }

  function updateMarker(){
    var marker = document.getElementsByClassName("marker")[0];
    marker.style.display = "";
    var playerName = document.getElementById("player-name");
    playerName.innerHTML = round.players[round.activePlayer].name;
    var playerScore = document.getElementById("score");
    playerScore.innerHTML = "(Score: " + ((1000-round.players[round.activePlayer].highScore)/100) + "/10)";
    var bestApprox = document.getElementById("best-approx");
    bestApprox.innerHTML = "Best approximation: " + round.players[round.activePlayer].highScoreResult;
  }

  function newEntry(){
    var player = document.getElementsByClassName("player-container")[0];
    player.insertAdjacentHTML('afterend','<div class="card player-container"><div class="marker"><span  class="stats player-name">Player name</span><span  class="stats score">Score: </span><span  class="stats">Best approximation: </span></div></div>)');
  }

  function  clearEquationField (){
    document.getElementById("equation").value = "Type here";
  }

  function  clearTimer (){
    document.getElementById("timer-bar").style.width = "0px";
  }

  function clearPlayer (){
    clearEquationField();
    clearTimer();
  }

  function updateWelcome(){
    var name = document.getElementsByClassName("welcome")[0];
    name.innerHTML = ("Hi, " + round.players[round.activePlayer].name + "! When you are ready:");
  }

  function displayNumbersToPlayWith(){
    round.numbersToPlayWith.forEach(function(elem, index){
      var card = document.getElementById("number-" + (index+1));
      card.innerHTML = elem;
    });
  }

  function hideNumbersToPlayWith(){
      for (var i = 1; i < 7; i++) {
      var card = document.getElementById("number-" + i);
      card.innerHTML = "";
      }
  }

  function displayTarget(){
    var card = document.getElementById("target");
    card.innerHTML = round.target;
  }

  function hideTarget(){
    var card = document.getElementById("target");
    card.innerHTML = "";
  }

  var container = document.getElementById("container");
  var startButton = document.getElementById("start");
  var fadeBackground = document.getElementsByClassName("fade-background")[0];
  var addButton = document.getElementById("add");
  var removeButton = document.getElementById("remove");
  var numberOfPlayers = 1;

  function hideWelcome(){
    var container = document.getElementsByClassName("cover")[0];
    container.style.display = "none";
  }
  function showWelcome(){
    var container = document.getElementsByClassName("cover")[0];
    container.style.display = "";
  }

  function showResults(){
    var container = document.getElementsByClassName("cover")[1];
    container.className = "cover results";
  }

  function hideResults(){
    var container = document.getElementsByClassName("cover")[1];
    console.dir(container);
    container.className = "cover results hidden";
  }

  function updateResults(){
    var container = document.getElementsByClassName("cover")[1];
    var string1 = "";
    var string2 = "";
    if (round.winner.length === 1) {
      string1 = "<br>The winner is ";
    }else {
      string1 = "<br>The winners are ";
    }
    round.winner.forEach(function(elem, index, array){
      if (index === 0) {
        string2 += elem.name;
      }else if (index < array.length - 1) {
        string2 += ", " + elem.name;
      }else{
        string2 += " and " + elem.name;
      }
    });

    container.innerHTML = string1 + string2;
  }

  function updateIntermediateResult(whyEnd){
    var container = document.getElementsByClassName("cover")[1];
    var string = "";
    switch (whyEnd) {
      case "win":
        string = "<br>You reached the exact number!<br>Congratulations!";
        break;
      case "timeOut":
        string = "<br>You ran out of time!<br>Your best approximation is: " + round.players[round.activePlayer].highScoreResult;
        break;
      default:
      }
    container.innerHTML = string;
  }

  function addPlayerBox () {
    if (numberOfPlayers<6) {
      var lastPlayer = document.getElementsByClassName("namesInput")[numberOfPlayers-1];
      lastPlayer.insertAdjacentHTML("afterend",'<input type="text" name="" value="Player ' + (numberOfPlayers+1) + ' name" class="namesInput">');
      numberOfPlayers++;
    }
  }

  removeButton.onclick = function(){
    if (numberOfPlayers>1) {
      var namesCard = document.getElementById("names-card");
      var lastPlayer = document.getElementsByClassName("namesInput")[numberOfPlayers-1];
      namesCard.removeChild(lastPlayer);
      numberOfPlayers--;
    }
  };


  var round;
  startButton.onclick = triggerGame;

  function triggerGame () {
    //Create new round and initialize values:
    round = new Round();
    round.setTarget();
    round.setNumbersToPlayWith();
    //Store players in round:
    var finalNames = document.getElementsByClassName("namesInput");
    round.storePlayers(finalNames);
    //Show game board
    fadeBackground.style.display = "none";
    round.activePlayer = 0;
    updateWelcome();
    showWelcome();
  }

  var equation = document.getElementById('equation');
  var btn = document.getElementById("check");

  equation.onkeydown = function(e){if(e.keyCode == 13){round.send();}};
  btn.onclick = function(){round.send();};
  var sintonia = new Audio('audio/sintonia.mp3');

  var startTurn = document.getElementById("start-turn");
  startTurn.onclick = function(){
    hideWelcome();
    displayNumbersToPlayWith();
    displayTarget();
    updateMarker();
    sintonia.currentTime = 0;
    sintonia.play();
    var timeBar = document.getElementById("timer-bar");
    var width = 1;
    var red = false;
    round.time = setInterval(frame, 10);
    function frame(){
      if (red === false && width>=3500) {
        red = true;
        timeBar.style.backgroundColor = "red";
      }
      if (width>=4500) {
        clearInterval(round.time);
        round.endTurn("timeOut");
      } else {
        width++;
        timeBar.style.width = width/45 + '%';
      }
    }
  };


  addButton.onclick = addPlayerBox;
  var namesInput = document.getElementsByClassName("namesInput")[0];
  namesInput.onkeydown = function(e){if(e.keyCode === 13){
    triggerGame();
  }};
