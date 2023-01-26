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


const resetBtn = document.querySelector('#resetBtn')

const formModal = document.querySelector('.modal')
const winModal = document.querySelector('.winModal')

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
  const gameBoard = document.getElementById("gameBoard");
  const cells = document.getElementsByClassName("cell");
  let boxes = Array.prototype.slice.call(cells);

  boxes.forEach((box) => {
    box.addEventListener("click", (event) => {
      playMove(event.target, data);
    });
  });

  // resetgameBtn eventListener
  resetBtn.addEventListener('click', () => {
    boxes.forEach((box) => {
      box.textContent=''
    })
    setVariables(data)
  });

  
};

const setVariables = (data) => {
  data.player1Mark = "X";
  data.player2Mark = "O";
  data.player1Score= 0;
  data.player2Score= 0;
  data.currentPlayer = "X";
  data.round = 0;
  data.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  data.gameOver = false;
  console.log(data)
};

const initializeGame = (data) => {
  setVariables(data);
  gameboardEvents(data);
};

// check current player, check if clicked box has mark,
// draw the mark of current player if not, then check winCondition,
// if game continues, switch current player
const playMove = (box, data) => {
  if(data.gameOver){
    return;
  }
  data.round++;
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

    if(checkWinner(data, data.currentPlayer) == true ){
    if(data.currentPlayer=='X'){
      winModal.style.display = "block";

      winModal.textContent = `${data.player1Name}  won `
      resetBtn.style.display='block';
      console.log(`${data.player1Name}  won `)
      data.player1Score++;
      console.log(data.player1Score++);
      data.gameOver=true;
    } else {
      winModal.style.display = "block";
      resetBtn.style.display='block';
      winModal.textContent = `${data.player2Name}  won `
      console.log(`${data.player2Name} won`)
      data.gameOver=true;
    }
  }
       //TODO: reset board
      //  data.gameOver=true;
       console.log(data.gameOver)

      
  // change player after turn
  changePlayer(data);
  
// checks if game is a tie;
  if(data.round === 9 && checkWinner(data, data.currentPlayer) == false) {
    console.log('tie')
    data.gameOver=true;
    //TODO: reset board
  }
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
