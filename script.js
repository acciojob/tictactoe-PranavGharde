const submitBtn = document.getElementById('submit');
const player1Input = document.getElementById('player-1');
const player2Input = document.getElementById('player-2');
const messageDiv = document.querySelector('.message');
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');

let currentPlayer = 'X';
let players = {};
let boardState = Array(9).fill('');
let gameActive = true;

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

submitBtn.addEventListener('click', () => {
  const p1 = player1Input.value.trim();
  const p2 = player2Input.value.trim();
  if (!p1 || !p2) {
    alert('Please enter names for both players.');
    return;
  }
  players = { X: p1, O: p2 };
  messageDiv.textContent = `${players[currentPlayer]}, you're up`;
  document.getElementById('player-form').style.display = 'none';
  board.style.display = 'grid';
});

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (!gameActive || boardState[index] !== '') return;

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
      messageDiv.textContent = `${players[currentPlayer]}, congratulations you won!`;
      highlightWin();
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    messageDiv.textContent = `${players[currentPlayer]}, you're up`;
  });
});

function checkWin() {
  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return boardState[a] === currentPlayer &&
           boardState[b] === currentPlayer &&
           boardState[c] === currentPlayer;
  });
}

function highlightWin() {
  winningCombos.forEach(combo => {
    const [a, b, c] = combo;
    if (boardState[a] === currentPlayer &&
        boardState[b] === currentPlayer &&
        boardState[c] === currentPlayer) {
      [a, b, c].forEach(i => cells[i].classList.add('win'));
    }
  });
}
