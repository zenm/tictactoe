var pickPiece  = document.getElementsByClassName('pick-piece');

// used to add eventlisteners to picking either x or o.
(function() {
  for (var i = 0; i < pickPiece.length; i++) {
    pickPiece[i].addEventListener('click', function(){
      getPlayerPiece(this);
    });
  };
})();

var pickNumberPlayers = document.getElementsByClassName('pick-player');

// used to add eventlisteners to picking either one player or two
(function() {
  for (var i = 0; i < pickNumberPlayers.length; i++) {
    pickNumberPlayers[i].addEventListener('click', function() {
      determineNumberOfPlayers(this.id);
    });
  };
})();

function determineNumberOfPlayers(nodeInfo) {
  if (nodeInfo == "one-player") {
    isVsComputer = true;
  } else if (nodeInfo == "two-players") {
    isVsComputer = false;
  }
}

// used to add listeners to next button;
var nextButton = document.getElementById('next-button');
(function() {
  nextButton.addEventListener('click', function() {
    if ((currentPlayer == "X" || currentPlayer == "O") &&
        (isVsComputer == true || isVsComputer == false)){
      console.log("show board");
      hideSettings();
      showBoard();
      chooseWhoGoesFirst();
      putComputerMoveOnBoard(randomPlacementOnBoard(getStateOfBoard()), playerTwoPiece);
    } else {
      console.log("would need to disable next button and hide board");
    }
  });
})();

// show or hide the play board
var playBoard = document.getElementById('board');
function showBoard(){
  playBoard.className += " show-area";
}

function hideBoard(){
  playBoard.classList.remove("show-area");
}

// show or hide settings
var settingsArea = document.getElementById('settings');
function hideSettings() {
  settingsArea.className += " hide-area";
}

function showSettings() {
  settingsArea.classList.remove("hide-area");
}



// used to determine player piece and assign the other opponent the opposite piece
function getPlayerPiece(nodeInfo) {
  currentPlayer = nodeInfo.children[0].textContent;
  playerOnePiece = currentPlayer;
  playerTwoPiece = playerOnePiece == "X" ? "O" : "X";
}

var currentPlayer;
var playerOnePiece;
var playerTwoPiece;
var moveCount = 0;
var lastMove;
var isVsComputer;

var positionsOnBoard = document.getElementsByClassName('one-position');

// used to add eventlisteners to board pieces
(function() {
  for (var i = 0; i < positionsOnBoard.length; i++) {
    positionsOnBoard[i].addEventListener('click', function() {
      putPlayerPieceOnBoard(this);
    });
  };
})();

// used to put the player's piece on the board.
function putPlayerPieceOnBoard(nodeInfo) {
  var selectedPiece = nodeInfo.children[0].textContent;
  var isGameOver;
  if (selectedPiece == ""){
    nodeInfo.children[0].textContent = currentPlayer;
    moveCount++;
    lastMove = currentPlayer;
    checkIfBoardWins(getStateOfBoard());
    isGameOver = checkIfBoardWins(getStateOfBoard())[2];
  }
  if (isGameOver == false){
    changeCurrentPlayerTurn(lastMove);
    putComputerMoveOnBoard(randomPlacementOnBoard(getStateOfBoard()), playerTwoPiece);
  }
}

// used to randomly choose who goes first
function chooseWhoGoesFirst () {
  if (moveCount == 0){
    var whoseFirst = Math.round(Math.random());
    if (whoseFirst == 0){
      currentPlayer = playerOnePiece;
    } else {
      currentPlayer = playerTwoPiece;
    }
    console.log(currentPlayer + " is up first");
    showWhoIsUp();
    return currentPlayer;
  }
}

// used to switch which player is up to turn
function changeCurrentPlayerTurn (stringLastMove) {
  if (true) {
    currentPlayer = stringLastMove == "X"? "O" : "X";
    console.log(currentPlayer + " is up.");
    showWhoIsUp();
  }
}

// show who's up
var whosUp = document.getElementsByClassName('show-turn');

function showWhoIsUp() {
    if(currentPlayer == playerOnePiece ) {
      whosUp[0].innerHTML = "<span>Player 1's turn</span>";
      whosUp[1].innerHTML = "";
  } else {
    whosUp[0].innerHTML = "";
    whosUp[1].innerHTML = "<span>Player 2's turn</span>";
  }
}

// AI section ----------------------------------------
function getStateOfBoard() {
  var boardState = [];
  for (var i = 0; i < positionsOnBoard.length; i++) {
    boardState.push(positionsOnBoard[i].children[0].textContent);
  }
  return boardState;
}

// used to put a random piece on the board
function putComputerMoveOnBoard(place, playerTwoPiece) {
  var isGameOver;
  if (isVsComputer && playerTwoPiece == currentPlayer ){
    //AI puts place 0 - 8 at random and player two piece on board.
    positionsOnBoard[place].children[0].textContent = playerTwoPiece;
    lastMove = currentPlayer;
    checkIfBoardWins(getStateOfBoard());
    isGameOver = checkIfBoardWins(getStateOfBoard())[2];
    if (isGameOver == false){
      changeCurrentPlayerTurn(lastMove);
    }
  };
}

// used to collect the position of the blank pieces on the board, then to choose a random one.

function randomPlacementOnBoard (arrayOfBoardState){
  var positionOfBlankSpaces = [];
  for (var i = 0; i < arrayOfBoardState.length; i++) {
    if (arrayOfBoardState[i] == "") {
      positionOfBlankSpaces.push(i);
    }
  }
  var minIndexBlankSpaces = 0;
  var maxIndexBlankSpaces = positionOfBlankSpaces.length - 1;
  var randomOpenSpace = positionOfBlankSpaces[Math.floor(Math.random() * (maxIndexBlankSpaces - minIndexBlankSpaces + 1) + minIndexBlankSpaces)];
  return randomOpenSpace;
}

function testIfOpenPosition (place) {
  return  positionsOnBoard[place].children[0].textContent == "";
}
// end AI section ------------------

// used to check if board wins. Returns array of results
function checkIfBoardWins(arrayOfMoves){
  var doWeHaveResult = false;
  var resultMessage = "";
  var results = [];
  var aPlayerWon = false;
  if (getStateOfBoard().indexOf("") == -1) {
    resultMessage = "It's a draw";
    doWeHaveResult = true;
  }
  if
  ((arrayOfMoves[0] == lastMove  &&
    arrayOfMoves[1] == lastMove  &&
    arrayOfMoves[2] == lastMove) ||
  ( arrayOfMoves[3] == lastMove  &&
    arrayOfMoves[4] == lastMove  &&
    arrayOfMoves[5] == lastMove) ||
  ( arrayOfMoves[6] == lastMove  &&
    arrayOfMoves[7] == lastMove  &&
    arrayOfMoves[8] == lastMove) ) {
    resultMessage = lastMove + " wins with 3 across";
    doWeHaveResult = true;
    aPlayerWon = true;
  }
  else if
  ((arrayOfMoves[0] == lastMove  &&
    arrayOfMoves[3] == lastMove  &&
    arrayOfMoves[6] == lastMove) ||
  ( arrayOfMoves[1] == lastMove  &&
    arrayOfMoves[4] == lastMove  &&
    arrayOfMoves[7] == lastMove) ||
  ( arrayOfMoves[2] == lastMove  &&
    arrayOfMoves[5] == lastMove  &&
    arrayOfMoves[8] == lastMove) ) {
    resultMessage = lastMove + " wins three down";
    doWeHaveResult = true;
    aPlayerWon = true;
  }
  else if
  ((arrayOfMoves[0] == lastMove  &&
    arrayOfMoves[4] == lastMove  &&
    arrayOfMoves[8] == lastMove) ||
  ( arrayOfMoves[2] == lastMove  &&
    arrayOfMoves[4] == lastMove  &&
    arrayOfMoves[6] == lastMove) ) {
    resultMessage = lastMove + " wins diagonally";
    doWeHaveResult = true;
    aPlayerWon = true;
  }

  results.push(doWeHaveResult);
  results.push(resultMessage);
  results.push(aPlayerWon);
  showEndGame(results);
  // console.log(results);
  return results;
}

// end state function
function showEndGame(resultArray){
  if (resultArray[0]){
    // increment score for winner
    // showScore(resultArray[2]);

    // show who won message
    showResults(resultArray[1]);
    // have who won message go away after 1.5 seconds
    removeAfterOneHalfSec();
    // add a class of styles to show winning move

    // reset board after 2 seconds
    resetAfterTwoSec();
  }
}

// show results of who won
var resultsSection = document.getElementById('who-won');
function showResults(stringOfResult) {
  resultsSection.innerHTML = stringOfResult;
}

// remove results of who won
function removeResult(){
  resultsSection.innerHTML = "";
}

function removeAfterOneHalfSec(){
  window.setTimeout(removeResult, 1500);
}

// resets the boardState
function resetBoard() {
  for (var i = 0; i < positionsOnBoard.length; i++) {
    positionsOnBoard[i].children[0].textContent = "";
  }
  moveCount = 0;
  chooseWhoGoesFirst();
  putComputerMoveOnBoard(randomPlacementOnBoard(getStateOfBoard()), playerTwoPiece);
}

function resetAfterTwoSec(){
  window.setTimeout(resetBoard, 2000);
}

var backButton = document.getElementById('back');
(function() {
  backButton.addEventListener('click', function() {
    showSettings();
    hideBoard();
    resetBoard();
  });
})();

// say hello
function sayHello(){
  console.log("Halllooo");
}
