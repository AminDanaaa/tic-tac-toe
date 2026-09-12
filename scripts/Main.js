import Renderer from "./Renderer.js";

// Game Logic:
let turnMarker = "X";

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
            let boardButtons = Renderer.getBoardButtons();
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
        let boardButtons = Renderer.getBoardButtons();
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
            Renderer.renderResultModal(searchResult);
            return;
        }
    };

    const switchTurn = () => {
        turnMarker = turnMarker === "X" ? "O" : "X";
        Renderer.getTurnIndicator().textContent = `It's player ${turnMarker} turn.`;
    };

    const startGame = () => {
        addEventListenerNewGameBtn();
        Renderer.render();
        board.initialize();
        resetGame();        
    };

    const resetGame = () => {
        board.resetBoard();
        moves = 0;
        turnMarker = "X";
        Renderer.getTurnIndicator().textContent = `It's player ${turnMarker} turn.`;
        Renderer.clearButtons();
    };

    const addEventListenerNewGameBtn = () => {
        Renderer.getNewGameBtn().addEventListener('click', (e) => {
            e.preventDefault();
            resetGame();
        });
    };

    return { createPlayer, startGame, resetGame, playRound };
})();






// Main():
const player1 = gameControl.createPlayer("Amin", "X");
const player2 = gameControl.createPlayer("Someone", "O");
gameControl.startGame();

console.log(Renderer.makeButtons);