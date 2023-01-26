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

const form = document.querySelector("#playerForm");
form.addEventListener("submit", (e) => {
  //prevent page reload
  e.preventDefault();
  //initializing user data from form

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  initializeGame(data);
});

const gameboardEvents = (data) => {
  const gameBoard = document.getElementById("gameBoard");
  const cells = document.getElementsByClassName("cell");
  let boxes = Array.prototype.slice.call(cells);

  boxes.forEach((box) => {
    box.addEventListener("click", (event) => {
      let boxId = box.id;
      //   cells[box.id].textContent='X';
      playMove(event.target, data);
    });
  });

  //  const playMove = (e,data) => {
  //     console.log(s)

  //  }
};

const setVariables = (data) => {
  data.player1Mark = "X";
  data.player2Mark = "O";
  data.currentPlayer = "X";
  data.round = "0";
  data.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
};

const initializeGame = (data) => {
  setVariables(data);
  gameboardEvents(data);
};

// check current player, check if clicked box has mark,
// draw the mark of current player if not, then check winCondition,
// if game continues, switch current player
const playMove = (box, data) => {
  //if box has mark, do nopthing
  if (data.board[box.id] === "X" || data.board[box.id] === "O") {
    return;
  }

  const cells = document.getElementsByClassName("cell");
  // adds playermark as textcontent to the board
  cells[box.id].textContent = data.currentPlayer;
  // sets player mark to board, for checking winning combinations
  data.board[box.id] = data.currentPlayer;
  //check winCon
  checkWinner(data, data.currentPlayer);
  // change player after turn
  changePlayer(data);
};

const changePlayer = (data) => {
  data.currentPlayer = data.currentPlayer === "X" ? "O" : "X";
};

const checkWinner = (data, player) => {
  let result = false;
  winningConditions.forEach((variation) => {
    if (
      data.board[variation[0]] === player &&
      data.board[variation[1]] === player &&
      data.board[variation[2]] === player
    ) {
      console.log(`${player} wins`);
      result = true;
    }
  });
  return result;
};
