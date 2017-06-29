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
      determineNumberOfPlayers(this.id);
    });
  };
})();

function determineNumberOfPlayers(nodeInfo){
  if (nodeInfo == "one-player") {
    isVsComputer = true;
  } else if (nodeInfo == "two-player") {
    isVsComputer = false;
  }
  chooseWhoGoesFirst();
  putComputerMoveOnBoard(randomPlacementOnBoard(getStateOfBoard()), playerTwoPiece);
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
    putComputerMoveOnBoard(randomPlacementOnBoard(getStateOfBoard()), playerTwoPiece);
  }
  checkIfBoardWins(getStateOfBoard());
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
  if (true) {
    currentPlayer = stringLastMove == "X"? "O" : "X";
    console.log(currentPlayer + " is up.");
  }
}

// show who's up
var whosUp = document.getElementsByClassName('show-turn');

function showWhoIsUp(){
  // for (var i = 0; i < whosUp.length; i++) {
    if(currentPlayer == playerOnePiece ){
      console.log("player1");
      // example below.
      document.getElementsByClassName("player1-goes")[0].innerHTML = "<span>Yoooo</span>";
    // }
  } else {
    console.log("player2");
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

function putComputerMoveOnBoard(place, playerTwoPiece) {
  if (isVsComputer && playerTwoPiece == currentPlayer ){
    //AI puts place 0 - 8 at random and player two piece on board.
    positionsOnBoard[place].children[0].textContent = playerTwoPiece;
    lastMove = currentPlayer;
    changeCurrentPlayerTurn(lastMove);
  };
  checkIfBoardWins(getStateOfBoard());
}

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

function checkIfBoardWins(arrayOfMoves){
  // convert Xs and Os to compare against winning state.
  var movePieces = ["X", "O"];
  for (var i = 0; i < movePieces.length; i++) {
    var xOrO = movePieces[i];
    if
    ((arrayOfMoves[0] == xOrO  &&
      arrayOfMoves[1] == xOrO  &&
      arrayOfMoves[2] == xOrO) ||
    ( arrayOfMoves[3] == xOrO  &&
      arrayOfMoves[4] == xOrO  &&
      arrayOfMoves[5] == xOrO) ||
    ( arrayOfMoves[6] == xOrO  &&
      arrayOfMoves[7] == xOrO  &&
      arrayOfMoves[8] == xOrO) ) {
      alert(xOrO + " wins with 3 across");
      resetBoard();
      return xOrO + " wins with 3 across";
          }
    else if
    ((arrayOfMoves[0] == xOrO  &&
      arrayOfMoves[3] == xOrO  &&
      arrayOfMoves[6] == xOrO) ||
    ( arrayOfMoves[1] == xOrO  &&
      arrayOfMoves[4] == xOrO  &&
      arrayOfMoves[7] == xOrO) ||
    ( arrayOfMoves[2] == xOrO  &&
      arrayOfMoves[5] == xOrO  &&
      arrayOfMoves[8] == xOrO) ) {
      alert(xOrO + " wins three down");
      resetBoard();
      return xOrO + " wins three down";
    }
    else if
    ((arrayOfMoves[0] == xOrO  &&
      arrayOfMoves[4] == xOrO  &&
      arrayOfMoves[8] == xOrO) ||
    ( arrayOfMoves[2] == xOrO  &&
      arrayOfMoves[4] == xOrO  &&
      arrayOfMoves[6] == xOrO) ) {
      alert(xOrO + " wins diagonally");
      resetBoard();
      return xOrO + " wins diagonally";
    }
  }
  if (getStateOfBoard().indexOf("") == -1) {
    alert("It's a draw");
    resetBoard();
    return "It's a draw."
  }
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

// used to check to see if we need to reset the board.
function needToResetBoard() {
  // if there are no blanks
  if (getStateOfBoard().indexOf("") == -1) {
    resetBoard();
    moveCount = 0;
    chooseWhoGoesFirst();
  }
}


function sayHello(){
  console.log("Halllooo");
}
