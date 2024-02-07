let turn = true;
let lastPosition;
let isGameOver = false;
let gameData = Array(9).fill(1);
const cells = document.querySelectorAll('td');
const winner = document.querySelector('#win');
const undoButton = document.querySelector('#undo-btn');
const resetButton = document.querySelector('#reset-btn');
const success = new Audio('./static/click.wav');
const winStates = [[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6]];


function playAudio(audio) {
  audio.currentTime = 0;
  audio.play();
}

function togglePlayer() {
  one.classList.toggle('highlight');
  two.classList.toggle('highlight');
}

function undoMove() {
  if (lastPosition) {
    let [cell, index] = lastPosition;
    turn = !turn;
    gameData[index] = 1;
    cell.textContent = "";
    togglePlayer();
  }
}

function getPlayer() {
  let currentPlayer = turn ? "X" : "0";
  turn = !turn;
  togglePlayer();
  return currentPlayer;
}

function resetBoard() {
  togglePlayer();
  isGameOver = false;
  winner.textContent = "";
  gameData = Array(9).fill(1);
  undoButton.classList.remove('hidden');
  resetButton.textContent = "Restart";
  cells.forEach(function(cell) {
    cell.textContent = "";
  });
}

function playGame(event, index) {
  if (gameData[index] === 1 && !isGameOver) {
    playAudio(success);
    let cell, currentPlayer;
    cell = event.currentTarget;
    currentPlayer = getPlayer();
    lastPosition = [cell, index];
    gameData[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkGameState(currentPlayer);
  }
}

function checkGameState(currentPlayer) {
  let isDraw = true;
  winStates.forEach(function([i, j, k]) {
    let A = gameData[i];
    let B = gameData[j];
    let C = gameData[k];
    if (assertGameData(A, B, C, currentPlayer)) {
      isDraw = false;
    }
  });
  if (isDraw) {
    if (!gameData.includes(1)) {
      displayResults(!isDraw); // Draw
    }
  }
  else {
    displayResults(currentPlayer); // Win
  }
}

function displayResults(win) {
  if (win === false) {
    winner.textContent = "⇔";
  }
  else {
    //↻
    winner.textContent = (win === "X") ? "⇐" : "⇒";
  }
  isGameOver = true;
  undoButton.classList.add('hidden');
  resetButton.innerHTML = "New Game";
}

function assertGameData(A, B, C, currentPlayer) {
  if (A === B) {
    if (B === C) {
      return (C === currentPlayer);
    }
  }
  return false;
}

/* DIFFERENT ALGORITHM
function checkWin(currentUser) {
  let result = currentUser;
  if (!checkRows(n, h, currentUser)) {
    if (!checkColumns(n, h, currentUser)) {
      if (!checkDiagonals(n, h, currentUser)) {
        if (checkDraw(n, h, currentUser)) {
          result = false;
        }
        else {
          return;
        }
      }
    }
  }
  displayResults(result);

}

function checkDraw(n, arr, currentUser) {
  for (row = 0; row < n; row++) {
    if (!arr[row].includes('empty')) {
      return true;
    }
  }
}

function checkRows(n, arr, currentUser) {
  let count = 0;
  for (row = 0; row < n; row++) {
    if (count == n) {
      return --row;
    }
    else {
      count = 0;
    }
    for (col = 0; col < n; col++) {
      let element = arr[row][col];
      if (element === currentUser) {
        count++;
      }
    }
  }
  if (count === n) {
    return n - 1;
  }
  else {
    return false;
  }
}

function checkColumns(n, arr, currentUser) {
  let count = 0;
  for (col = 0; col < n; col++) {
    if (count == n) {
      return --col;
    }
    else {
      count = 0;
    }
    for (row = 0; row < n; row++) {
      let element = arr[row][col];
      if (element === currentUser) {
        count++;
      }
    }
  }
  if (count === n) {
    return n - 1;
  }
  else {
    return false;
  }
}

function checkDiagonals(n, arr, currentUser) {
  let count = 0;
  for (row = 0; row < n; row++) {
    for (col = row; col < (row + 1); col++) {
      let element = arr[row][col];
      if (element === currentUser) {
        count++;
      }
    }
  }
  if (count === n) {
    return true;
  }
  else {
    count = 0;
  }
  for (row = 0; row < n; row++) {
    for (col = (n - 1 - row); col < (n - row); col++) {
      let element = arr[row][col];
      if (element === currentUser) {
        count++;
      }
    }
  }
  return count === n;
}
*/