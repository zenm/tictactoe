// I can choose x or o

// the game will reset after the game is over

// I can play a tic tac toe game with the computer.
function didWin(array){

}
var pickPiece  = document.getElementsByClassName('pick-piece');

// used to add eventlisteners to picking either x or o.
(function (){
  for (var i = 0; i < pickPiece.length; i++) {
    pickPiece[i].addEventListener('click', function(){
      getPlayerPiece(this);
    });
  };
})();

var pickNumberPlayers = document.getElementsByClassName('pick-player');

// used to add eventlisteners to picking either one player or two
(function (){
  for (var i = 0; i < pickNumberPlayers.length; i++) {
    pickNumberPlayers[i].addEventListener('click', function() {
      determineNumberOfPlayers(this);
    });
  };
})();

function determineNumberOfPlayers(nodeInfo){
  if (nodeInfo.children[0].textContent == "1 player") {
    isVsComputer = true;
  } else {
    isVsComputer = false;
  }
  // chooseWhoGoesFirst();
  putComputersMove(getStateOfBoard());
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
// var wasLastMoveHuman;
var lastMove;
var isVsComputer;

var positionsOnBoard = document.getElementsByClassName('one-position');

// used to add eventlisteners to board pieces
(function() {
  for (var i = 0; i < positionsOnBoard.length; i++){
    positionsOnBoard[i].addEventListener('click', function() {
      putPlayerPieceOnBoard(this);
    });
  };
})();

// used to put the player's piece on the board.
function putPlayerPieceOnBoard(nodeInfo) {
  var selectedPiece = nodeInfo.children[0].textContent;
  if (selectedPiece == ""){
    nodeInfo.children[0].textContent = currentPlayer;
    moveCount++;
    // wasLastMoveHuman = true;
    lastMove = currentPlayer;
    changeCurrentPlayerTurn(lastMove);
  }
  needToResetBoard();
  // chooseWhoGoesFirst();
  putComputersMove(getStateOfBoard());

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
    return currentPlayer;
  }
}

// used to switch which player is up to turn
function changeCurrentPlayerTurn (stringLastMove) {
  if (isVsComputer == false ) {
    currentPlayer = currentPlayer == "X"? "O" : "X";
    console.log(currentPlayer + " is up.");
  }
}

// used to check to see if we need to reset the board.
function needToResetBoard() {
  // if there are no blanks
  if (getStateOfBoard().indexOf("") == -1){
    resetBoard();
    moveCount = 0;
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

function putComputersMove(){
  // decides if it's computers turn
  if (isVsComputer && playerTwoPiece == currentPlayer ) {
    // get the current state of board.
    getStateOfBoard();
    sayHello();
  }
}

function putComputerMoveOnBoard(place, playerTwoPiece) {
  //AI happens to then put place 0 - 8 and player two piece on board.
  return positionsOnBoard[place].textContent = playerTwoPiece;
}


// used to decide MiniMax algorithm
function miniMaxCalculation () {

}



function checkIfBoardWins(arrayOfMoves){
  // convert Xs and Os to compare against winning state.
  var movePieces = ["X", "O"];
  for (var i = 0; i < movePieces.length; i++) {
    var xOrO = movePieces[i];

    if
      ((arrayOfMoves[0] == xOrO  &&
      arrayOfMoves[1] == xOrO  &&
      arrayOfMoves[2] == xOrO) ||
      (arrayOfMoves[3] == xOrO  &&
      arrayOfMoves[4] == xOrO  &&
      arrayOfMoves[5] == xOrO) ||
      (arrayOfMoves[6] == xOrO  &&
      arrayOfMoves[7] == xOrO  &&
      arrayOfMoves[8] == xOrO) ) {
      return xOrO + " wins with 3 across";
    }
    //check cols for 3
    else if
    ((arrayOfMoves[0] == xOrO  &&
    arrayOfMoves[3] == xOrO  &&
    arrayOfMoves[6] == xOrO) ||
    (arrayOfMoves[1] == xOrO  &&
    arrayOfMoves[4] == xOrO  &&
    arrayOfMoves[7] == xOrO) ||
    (arrayOfMoves[2] == xOrO  &&
    arrayOfMoves[5] == xOrO  &&
    arrayOfMoves[8] == xOrO) ) {
      return xOrO + " wins three down";
    }
    //check diagnoals
    else if
    ((arrayOfMoves[0] == xOrO  &&
    arrayOfMoves[4] == xOrO  &&
    arrayOfMoves[8] == xOrO) ||
    (arrayOfMoves[2] == xOrO  &&
    arrayOfMoves[4] == xOrO  &&
    arrayOfMoves[6] == xOrO) ) {
      return xOrO + " wins diagonally");
    }
  }
  if (getStateOfBoard().indexOf("") == -1){
    console.log("It's a draw");
    return "It's a draw."
  }
}


checkIfBoardWins(["X", "X", "X", "", "O", "O", "", "", ""]); //"Xwins with 3 across"
checkIfBoardWins(["X", "O", "O", "", "", "O", "X", "X", "X"]); //"Xwins with 3 across"
checkIfBoardWins(["O", "O", "O", "", "", "O", "X", "X", "X"]); //"Xwins with 3 across"

checkIfBoardWins(["O", "", "O", "X", "X", "O", "X", "", "O"]); // "O Yea Buddy - three down"
checkIfBoardWins(["O", "X", "", "O", "X", "", "O", "", ""]); // "O Yea Buddy - three down"


checkIfBoardWins(["O", "X", "", "", "O", "X", "", "", "O"]); //"Yea Buddy - diagonals"

checkIfBoardWins(["X", "O", "X", "O", "O", "X", "O", "X", "O"]); //undefined

//
// resets the boardState
function resetBoard() {
  for (var i = 0; i < positionsOnBoard.length; i++) {
    positionsOnBoard[i].children[0].textContent = "";
  }
}


function sayHello(){
  console.log("Halllooo");
}
