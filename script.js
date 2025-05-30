const submitBtn = document.getElementById('submit');
const player1Input = document.getElementById('player-1');
const player2Input = document.getElementById('player-2');
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const board = document.getElementById('board');
const messageDiv = document.querySelector('.message');

let players = [];
let currentPlayer = 0;
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

submitBtn.addEventListener('click', () => {
  const p1 = player1Input.value.trim();
  const p2 = player2Input.value.trim();
  if (!p1 || !p2) return alert('Please enter both names.');
  players = [p1, p2];
  currentPlayer = 0;
  gameState.fill("");
  board.innerHTML = '';
  gameActive = true;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('id', i + 1);
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  }

  startScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  updateMessage();
});

function handleCellClick(e) {
  const cell = e.target;
  const index = parseInt(cell.id) - 1;
  if (!gameActive || gameState[index]) return;

  gameState[index] = currentPlayer === 0 ? 'X' : 'O';
  cell.textContent = gameState[index];

  const winningCombo = checkWin();
  if (winningCombo) {
    messageDiv.textContent = `${players[currentPlayer]}, congratulations you won!`;
    gameActive = false;
    highlightWinningCells(winningCombo);
    return;
  }

  if (!gameState.includes("")) {
    messageDiv.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = 1 - currentPlayer;
  updateMessage();
}

function updateMessage() {
  messageDiv.textContent = `${players[currentPlayer]}, you're up`;
}

function checkWin() {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
      return condition;
    }
  }
  return null;
}

function highlightWinningCells(combo) {
  combo.forEach(i => {
    const cell = document.getElementById(i + 1);
    if (cell) cell.classList.add('winning-cell');
  });
}
