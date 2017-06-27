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
  chooseWhoGoesFirst();
}

// used to determine player piece and assign the other opponent the opposite piece
function getPlayerPiece(nodeInfo) {
  playerPiece = nodeInfo.children[0].textContent;
  playerOnePiece = playerPiece;
  playerTwoPiece = playerOnePiece == "X" ? "O" : "X";
}

var playerPiece;
var playerOnePiece;
var playerTwoPiece;
var moveCount = 0;
var wasLastMoveHuman = true;
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
    nodeInfo.children[0].textContent = playerPiece;
    moveCount++;
    wasLastMoveHuman = true;
    lastMove = playerPiece;
    changeCurrentPlayerTurn(lastMove);
  }
  needToResetBoard();
  chooseWhoGoesFirst();
}

// used to randomly choose who goes first
function chooseWhoGoesFirst () {
  if (moveCount == 0){
    var whoseFirst = Math.round(Math.random());
    if (whoseFirst == 0){
      playerPiece = playerOnePiece;
    } else{
      playerPiece = playerTwoPiece;
    }
    console.log(playerPiece + " is up first");
  }
}

// used to switch which player is up to turn
function changeCurrentPlayerTurn (stringLastMove) {
  playerPiece = playerPiece == "X"? "O" : "X";
  console.log(playerPiece + " is up.");
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

function computersMove(arrayOfMoves){
  if (isVsComputer) {
    console.log(arrayOfMoves);
    sayHello();
  }
}

// resets the boardState
function resetBoard() {
  for (var i = 0; i < positionsOnBoard.length; i++) {
    positionsOnBoard[i].children[0].textContent = "";
  }
}




function sayHello(){
  console.log("Halllooo");
}
