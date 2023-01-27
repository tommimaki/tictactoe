const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetBtn = document.querySelector("#resetBtn");
const playAgainBtn = document.querySelector("#playAgainBtn");
const formModal = document.querySelector(".modal");
const winModal = document.querySelector(".winModal");
const winnerText = document.createElement("h2");
winnerText.classList.add('winnerText')

const form = document.querySelector("#playerForm");
form.addEventListener("submit", (e) => {
  //prevent page reload
  e.preventDefault();
  //initializing user data from form
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  initializeGame(data);
  formModal.style.display = "none";
  form.reset();
});

const gameboardEvents = (data) => {
  const cells = document.getElementsByClassName("cell");
  let boxes = Array.prototype.slice.call(cells);

  boxes.forEach((box) => {
    box.addEventListener("click", (event) => {
      playMove(event.target, data);
    });
  });

  playAgainBtn.addEventListener("click", () => {
    boxes.forEach((box) => {
      box.textContent = "";
    });
    winModal.style.display = "none";
    setVariables(data);
  });

  resetBtn.addEventListener("click", () => {
    boxes.forEach((box) => {
      box.textContent = "";
    });
    winModal.style.display = "none";
    formModal.style.display = "grid";
  });
};

const setVariables = (data) => {
  data.player1Mark = "X";
  data.player2Mark = "O";
  data.player1Score = 0;
  data.player2Score = 0;
  data.currentPlayer = "X";
  data.round = 0;
  data.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  data.gameOver = false;
};

const initializeGame = (data) => {
  setVariables(data);
  gameboardEvents(data);
};


const playMove = (box, data) => {
  if (data.gameOver) {
    return;
  }
  data.round++;
  //if box already has mark, do nothing
  if (data.board[box.id] === "X" || data.board[box.id] === "O") {
    return;
  }
  const cells = document.getElementsByClassName("cell");
  // adds playermark as textcontent to the board for player to see
  cells[box.id].textContent = data.currentPlayer;
  // sets player mark to data.board, for checking winning combinations
  data.board[box.id] = data.currentPlayer;

    // checks if game is a tie;
    if (data.round === 9 && checkWinner(data, data.currentPlayer) == false) {
      winnerText.innerHTML = 'tie, try again!';
      winModal.appendChild(winnerText);
      winModal.style.display = "grid";
      data.gameOver = true;
    }
    //if game not tie checks for winner
  if (checkWinner(data, data.currentPlayer) == true) {
    if (data.currentPlayer == "X") {
      winnerText.innerHTML = `${data.player1Name}  won `;
      winModal.appendChild(winnerText);
      winModal.style.display = "grid";
      data.gameOver = true;
    } else {
      winnerText.innerHTML = `${data.player2Name}  won `;
      winModal.appendChild(winnerText);
      winModal.style.display = "grid";
      data.gameOver = true;
    }
  }
  // change player after turn if no draw, or winner
  changePlayer(data);
};

const changePlayer = (data) => {
  data.currentPlayer = data.currentPlayer === "X" ? "O" : "X";
};

// function takes data and currentplayer as parameters, checks winner, returns true if move resulted in win.
const checkWinner = (data, player) => {
  let result = false;
  winningConditions.forEach((variation) => {
    if (
      // comparing wincondition arrays to player marks on board
      data.board[variation[0]] === player &&
      data.board[variation[1]] === player &&
      data.board[variation[2]] === player
    ) {
      result = true;
    }
  });
  return result;
};
