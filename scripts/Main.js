// DOM handling:
// Some constants and DOM elements:
const mainContainer = document.querySelector(".main-container");
const boardButtons = Array(9).fill(null);



// Creating the elements
const mainHeader = document.createElement("h1");
mainHeader.textContent = "Tic Tac Toe";
mainHeader.classList.add("main-header", "no-select");
const turnIndicator = document.createElement("h2");
turnIndicator.classList.add("turn-indicator", "no-select");
const displayBoard = document.createElement("div");
displayBoard.classList.add("display-board");
const modalOverlay = document.createElement("div");
modalOverlay.classList.add("modal-overlay");
// Appending elements to eachother
mainContainer.appendChild(mainHeader);
mainContainer.appendChild(turnIndicator);
mainContainer.appendChild(displayBoard);






// Game Logic:
let turnMarker = "X";

function createPlayer(playerName, playerMarker) {
    let name = playerName;
    let marker = playerMarker;

    const getName = () => name;
    const getMarker = () => marker;

    return { getName, getMarker };
}



const board = (() => {
    let boardArray = Array(9).fill("");

    const WIN_PATTERNS = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],    // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],    // Columns
        [0, 4, 8], [2, 4, 6]                // Diagonals
    ];

    // Always returns "X" or "O" (True values) or "" (Falsy value)
    const searchForWinner = () => {
        for (let pattern of WIN_PATTERNS) {
            const [a, b, c] = pattern;
            if (boardArray[a] && boardArray[a] === boardArray[b] && boardArray[a] === boardArray[c]) {
                return boardArray[a];
            }
        }
        return "";
    };

    const printBoardConsole = () => {
        console.log(`"${boardArray[0]}"   "${boardArray[1]}"   "${boardArray[2]}"`);
        console.log(`"${boardArray[3]}"   "${boardArray[4]}"   "${boardArray[5]}"`);
        console.log(`"${boardArray[6]}"   "${boardArray[7]}"   "${boardArray[8]}"`);
    }

    const placeMarker = (index, marker) => {
        if (boardArray[index] === "") {
            boardArray[index] = marker;
            return true;
        } else {
            return false;
        }
    }

    // Board Game Buttons functionality:
    const initialize = () => {
        for (let i = 0; i < 9; i++) {
            boardButtons[i] = document.createElement("button");
            boardButtons[i].classList.add("board-buttons", "no-select");
            displayBoard.appendChild(boardButtons[i]);
            boardButtons[i].addEventListener(('click'), (e) => {
                e.preventDefault();
                if (boardButtons[i].textContent === "") {
                    boardButtons[i].textContent = turnMarker;
                    boardArray[i] = turnMarker;
                    gameControl.playRound();
                }
            });
        }
    }

    const resetBoard = () => {
        boardArray = Array(9).fill("");
    };

    return { initialize, searchForWinner, resetBoard, placeMarker, printBoardConsole };
})();



const gameControl = (() => {
    let moves = 0;

    const playRound = () => {
        moves++;
        gameControl.switchTurn();
        let searchResult = board.searchForWinner();
        if (searchResult) {
            resetGame();
            return `The ${searchResult} has won!`;
        }
        if (moves === 9 && !searchResult) {
            resetGame();
            return "The game is a tie.";
        }
        return "";
    };

    const switchTurn = () => {
        turnMarker = turnMarker === "X" ? "O" : "X";
        turnIndicator.textContent = `It's player ${turnMarker} turn.`;
    }

    const startGame = () => {
        turnMarker = "X";
        turnIndicator.textContent = `It's player ${turnMarker} turn.`;
        board.initialize();
    };

    const resetGame = () => {
        console.log("New Game.");
        board.resetBoard();
        moves = 0;
        turnMarker = "X";
        turnIndicator.textContent = `It's player ${turnMarker} turn.`;
        let boardButtons = document.querySelectorAll(".board-buttons");
        for (button of boardButtons) {
            button.textContent = "";
        }
    };

    return { startGame, resetGame, switchTurn, playRound };
})();






// Main():
const player1 = createPlayer("Amin", "X");
const player2 = createPlayer("Someone", "O");
gameControl.startGame();