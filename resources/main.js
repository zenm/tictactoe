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

function determineNumberOfPlayers(nodeInfo) {
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
  for (var i = 0; i < positionsOnBoard.length; i++) {
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
  if (isVsComputer && playerTwoPiece == currentPlayer ){
    //AI puts place 0 - 8 at random and player two piece on board.
    positionsOnBoard[place].children[0].textContent = playerTwoPiece;
    lastMove = currentPlayer;
    changeCurrentPlayerTurn(lastMove);
  };
  checkIfBoardWins(getStateOfBoard());
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

// used to check if board wins.
function checkIfBoardWins(arrayOfMoves){
  var resultMessage = "";
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
      resultMessage = xOrO + " wins with 3 across";
      resetBoard();
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
      resultMessage = xOrO + " wins three down";
      resetBoard();
    }
    else if
    ((arrayOfMoves[0] == xOrO  &&
      arrayOfMoves[4] == xOrO  &&
      arrayOfMoves[8] == xOrO) ||
    ( arrayOfMoves[2] == xOrO  &&
      arrayOfMoves[4] == xOrO  &&
      arrayOfMoves[6] == xOrO) ) {
      resultMessage = xOrO + " wins diagonally";
      resetBoard();
    }
  }
  if (getStateOfBoard().indexOf("") == -1) {
    resultMessage = "It's a draw";
    resetBoard();
  }
  showResults(resultMessage);
}

// show results of who won
var resultsSection = document.getElementById('who-won');
function showResults(stringOfResult) {
  resultsSection.insertAdjacentHTML('afterend', stringOfResult)
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

function sayHello(){
  console.log("Halllooo");
}
