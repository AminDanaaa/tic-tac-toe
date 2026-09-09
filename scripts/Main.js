// Game Logic:
let turnMarker = "X";

const renderer = (() => {
    // Creating the DOM elements using renderer
    const mainContainer = document.querySelector(".main-container");
    const mainHeader = document.createElement("h1");
    const turnIndicator = document.createElement("h2");
    const displayBoard = document.createElement("div");
    const modalOverlay = document.createElement("div");

    // Renderer constants
    const boardButtons = Array(9).fill(null);

    const render = () => {
        // assign css classes to DOM elements
        mainHeader.classList.add("main-header", "no-select");
        turnIndicator.classList.add("turn-indicator", "no-select");
        displayBoard.classList.add("display-board");
        modalOverlay.classList.add("modal-overlay");
        
        // Appending elements to their parent element
        mainContainer.appendChild(mainHeader);
        mainContainer.appendChild(turnIndicator);
        mainContainer.appendChild(displayBoard);
        mainContainer.appendChild(modalOverlay);
        
        // Initialize text contents
        mainHeader.textContent = "Tic Tac Toe";

        // Others:
        makeButtons();
    }

    // render board buttons
    const makeButtons = () => {
        for (let i = 0; i < 9; i++) {
            boardButtons[i] = document.createElement("button");
            boardButtons[i].classList.add("board-buttons", "no-select");
            displayBoard.appendChild(boardButtons[i]);
        }
    };

    const clearButtons = () => {
        for (button of boardButtons) {
            button.textContent = "";
        }
    };

    const getTurnIndicator = () => turnIndicator;

    const getBoardButtons = () => boardButtons;

    return { render, getTurnIndicator, getBoardButtons, clearButtons };
})();



const board = (() => {
    // Board constants
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

    const placeMarker = (index, marker) => {
        if (boardArray[index] === "") {
            boardArray[index] = marker;
            return true;
        } else {
            return false;
        }
    };

    // Board Game Buttons functionality:
    const initialize = () => {
        for (let i = 0; i < 9; i++) {
            let boardButtons = renderer.getBoardButtons();
            boardButtons[i].addEventListener(('click'), (e) => {
                e.preventDefault();
                if (boardButtons[i].textContent === "") {
                    boardButtons[i].textContent = turnMarker;
                    boardArray[i] = turnMarker;
                    gameControl.playRound();
                }
            });
        }
    };

    const resetBoard = () => {
        boardArray = Array(9).fill("");
    };

    return { initialize, searchForWinner, resetBoard, placeMarker };
})();



const gameControl = (() => {
    let moves = 0;

    const createPlayer = (playerName, playerMarker) => {
        let name = playerName;
        let marker = playerMarker;

        const getName = () => name;
        const getMarker = () => marker;

        return { getName, getMarker };
    };

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
        renderer.getTurnIndicator().textContent = `It's player ${turnMarker} turn.`;
    };

    const startGame = () => {
        renderer.render();
        board.initialize();
        resetGame();        
    };

    const resetGame = () => {
        board.resetBoard();
        moves = 0;
        turnMarker = "X";
        renderer.getTurnIndicator().textContent = `It's player ${turnMarker} turn.`;
        renderer.clearButtons();
        console.log("[Control]: New game has been successfully started.");
    };

    return { createPlayer, startGame, resetGame, switchTurn, playRound };
})();






// Main():
const player1 = gameControl.createPlayer("Amin", "X");
const player2 = gameControl.createPlayer("Someone", "O");
gameControl.startGame();