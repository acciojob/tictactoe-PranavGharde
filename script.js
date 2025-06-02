const startScreen = document.getElementById("start-screen");
const gameBoard = document.getElementById("game-board");
const messageDiv = document.querySelector(".message");
const submitBtn = document.getElementById("submit");

const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const cells = document.querySelectorAll(".cell");

let currentPlayer = "x";
let board = ["", "", "", "", "", "", "", "", ""];
let playerNames = { x: "", o: "" };
let gameActive = true;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkWinner() {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return pattern;
    }
  }
  return null;
}

function handleClick(e) {
  const id = parseInt(e.target.id) - 1;

  if (board[id] !== "" || !gameActive) return;

  board[id] = currentPlayer;
  e.target.textContent = currentPlayer;

  const winCombo = checkWinner();
  if (winCombo) {
    gameActive = false;
    winCombo.forEach(index => {
      document.getElementById(index + 1).classList.add("win");
    });
    messageDiv.textContent = `${playerNames[currentPlayer]}, congratulations you won!`;
    return;
  }

  currentPlayer = currentPlayer === "x" ? "o" : "x";
  messageDiv.textContent = `${playerNames[currentPlayer]}, you're up`;
}

submitBtn.addEventListener("click", () => {
  const name1 = player1Input.value.trim();
  const name2 = player2Input.value.trim();

  if (!name1 || !name2) {
    alert("Please enter names for both players.");
    return;
  }

  playerNames = { x: name1, o: name2 };
  currentPlayer = "x";
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;

  messageDiv.textContent = `${playerNames[currentPlayer]}, you're up`;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("win");
  });

  startScreen.style.display = "none";
  gameBoard.style.display = "block";
});

cells.forEach(cell => cell.addEventListener("click", handleClick));

// Show the start screen initially
startScreen.style.display = "block";
