// Game Logic:
let turnMarker = "X";

const renderer = (() => {
    // Creating the DOM elements using renderer
    const mainContainer = document.querySelector(".main-container");
    const mainTextContainer = document.createElement("div");
    const mainHeader = document.createElement("h1");
    const turnIndicator = document.createElement("h2");
    const displayBoard = document.createElement("div");
    const newGameBtn = document.createElement("button");
    const modalOverlay = document.createElement("div");
    const modalBoxResult = document.createElement("div");
    const modalResultText = document.createElement("h2");
    const modalResultButton = document.createElement("button");

    // Renderer constants
    const boardButtons = Array(9).fill(null);

    const render = () => {
        // assign css classes to DOM elements
        mainTextContainer.classList.add("main-text-container");
        mainHeader.classList.add("main-header", "no-select");
        turnIndicator.classList.add("turn-indicator", "no-select");
        displayBoard.classList.add("display-board");
        newGameBtn.classList.add("new-game-btn");
        modalOverlay.classList.add("modal-overlay");
        modalBoxResult.classList.add("modal-box");
        modalResultText.classList.add("no-select");
        modalResultButton.classList.add("no-select");
        
        // Appending elements to their parent element
        mainContainer.appendChild(mainTextContainer);
        mainContainer.appendChild(displayBoard);
        mainContainer.appendChild(newGameBtn);
        mainContainer.appendChild(modalOverlay);
        mainTextContainer.appendChild(mainHeader);
        mainTextContainer.appendChild(turnIndicator);
        modalOverlay.appendChild(modalBoxResult);
        
        // Initialize text contents
        mainHeader.textContent = "Tic Tac Toe";
        modalResultButton.textContent = `Play Again`;
        newGameBtn.textContent = "New Game"

        // Others:
        makeButtons();
        newGameBtn.addEventListener('click', (e) => {
            e.preventDefault();
            gameControl.resetGame();
        });
    };

    // render board buttons
    const makeButtons = () => {
        for (let i = 0; i < 9; i++) {
            boardButtons[i] = document.createElement("button");
            boardButtons[i].classList.add("board-buttons", "no-select");
            displayBoard.appendChild(boardButtons[i]);
        }
    };

    const renderResultModal = (winnerMarker) => {
        modalOverlay.classList.add("modal-overlay-active");
        modalBoxResult.appendChild(modalResultText);
        modalBoxResult.appendChild(modalResultButton);
        if (winnerMarker === "") {
            modalResultText.textContent = `The game is a tie!`;
        } else {
            modalResultText.textContent = `Player ${winnerMarker} has won!`;
        }
        modalResultButton.addEventListener(('click'), (e) => {
            e.preventDefault();
            modalOverlay.classList.remove("modal-overlay-active");
        });
    };

    const clearButtons = () => {
        for (button of boardButtons) {
            button.textContent = "";
        }
    };

    const getTurnIndicator = () => turnIndicator;

    const getBoardButtons = () => boardButtons;

    return { render, getTurnIndicator, getBoardButtons, clearButtons, renderResultModal };
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

    // Board Game Buttons functionality:
    const initialize = () => {
        for (let i = 0; i < 9; i++) {
            let boardButtons = renderer.getBoardButtons();
            boardButtons[i].addEventListener(('click'), (e) => {
                e.preventDefault();
                if (boardButtons[i].textContent === "") {
                    boardButtons[i].disabled = true;
                    boardButtons[i].textContent = turnMarker;
                    boardArray[i] = turnMarker;
                    gameControl.playRound();
                }
            });
        }
    };

    const resetBoard = () => {
        boardArray = Array(9).fill("");
        let boardButtons = renderer.getBoardButtons();
        for (let i = 0; i < 9; i++) {
            boardButtons[i].disabled = false;
        }
    };

    return { initialize, searchForWinner, resetBoard };
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
        let searchResult = board.searchForWinner();
        switchTurn();
        if (searchResult || (moves === 9 && !searchResult)) {
            resetGame();
            renderer.renderResultModal(searchResult);
            return;
        }
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
    };

    return { createPlayer, startGame, resetGame, playRound };
})();






// Main():
const player1 = gameControl.createPlayer("Amin", "X");
const player2 = gameControl.createPlayer("Someone", "O");
gameControl.startGame();