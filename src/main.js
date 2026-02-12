let currentPlayer = null,
  setayeshPlayer = null,
  computerPlayer = null,
  twoPlayersMode = false; 

document.getElementById("chooseX").addEventListener("click", () => {
  setayeshPlayer = "X";
  computerPlayer = "O";
  currentPlayer = setayeshPlayer;
});

document.getElementById("chooseO").addEventListener("click", () => {
  setayeshPlayer = "O";
  computerPlayer = "X";
  currentPlayer = setayeshPlayer;
});

const cells = document.querySelectorAll("[data-cell]");

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (!currentPlayer) {
      alert("choose your roel man!");
      return;
    }

    // if (currentPlayer !== setayeshPlayer) return;

    if (cell.textContent !== "") return;

    // cell.textContent = setayeshPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner() === setayeshPlayer) {
      alert(` congratulation ! Player ${currentPlayer} wins!`);
      return;
    }

    if (checkDraw()) {
      alert("equal and opposite reaction !");
      return;
    }

if(twoPlayersMode){
  currentPlayer = currentPlayer === "X" ? "O" : "X";
   return;
}

if (currentPlayer === setayeshPlayer) { 
  currentPlayer = computerPlayer;
   setTimeout(computerMove, 400);
   }
    
  });
});



function computerMove() {
  if (twoPlayersMode) return;
  const emptyCells = [...cells].filter((c) => c.textContent === "");
  if (emptyCells.length === 0) return;

  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  randomCell.textContent = computerPlayer;
  if (checkWinner() === computerPlayer) {
    alert("you are the loser qumarse ! there is not any hopefull with you.");
    return;
  }

  currentPlayer = setayeshPlayer;
}


function checkDraw() {
  /* const allFilled = [...cells].every((c) => c.textContent !== "");
  return allFilled; */
  return [...cells].every((c) => c.textContent !== "");
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const cellValues = [...cells].map((c) => c.textContent);

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
   if (
      cellValues[a] !== "" &&
      cellValues[a] === cellValues[b] &&
      cellValues[a] === cellValues[c]
    ) {
      return cellValues[a]; 
    }
  }

  return null; 
}

document.getElementById("reset-btn").addEventListener("click", resetGame);

function resetGame() {
  cells.forEach((cell) => (cell.textContent = ""));
  /*currentPlayer = null;
  setayeshPlayer = null;
  computerPlayer = null; */
  if (twoPlayersMode) { 
    currentPlayer = "X"; 
     setayeshPlayer = "X"; 
     computerPlayer = null; 
    } else { 
      currentPlayer = null; 
      setayeshPlayer = null; 
      computerPlayer = null;
     }  
}

document.getElementById("twoPlayer-btn").addEventListener("click", () => {
   twoPlayersMode = !twoPlayersMode; 
   if (twoPlayersMode) { alert("Let's go man ! two players mode activated!"); 
    document.getElementById("twoPlayer-btn").textContent = "Single Player Mode";
   } else { 
    alert("Fine! single player mode activated!");
    document.getElementById("twoPlayer-btn").textContent = "see! two players mode"; 
  }
   resetGame(); 
  });

