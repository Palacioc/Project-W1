// $(document).ready(function() {
  console.log("app linked");
  var round = new Round();
  console.log(round);
  round.setTarget();
  console.log("we set the target: " + round.target);
  round.setNumbersToPlayWith();
  console.log("we set the numbers to play with: " + round.numbersToPlayWith);

  var equation = document.getElementById('equation');
  var btn = document.getElementById("check");
  btn.onclick = function(){round.send();};
  //initialize Round
  //print board
    //print numbers to play with
    //print target number
    //print textbox

    //textbox has an event when enter
    //validate function
    //if yes calcscorefuncion
    //updatescorefunction
    //cleartextinput

  //start timer
  //if timer is out or if score is 0 break


// });
