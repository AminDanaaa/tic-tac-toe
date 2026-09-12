import { boardButtons } from "./Renderer.js";
import { turnMarker, playRound } from "./Control.js";

// Board constants
let boardArray = Array(9).fill("");
const WIN_PATTERNS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],    // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],    // Columns
    [0, 4, 8], [2, 4, 6]                // Diagonals
];

const Board = {
    // Always returns "X" or "O" (True values) or "" (Falsy value)
    searchForWinner() {
        for (let pattern of WIN_PATTERNS) {
            const [a, b, c] = pattern;
            if (boardArray[a] && boardArray[a] === boardArray[b] && boardArray[a] === boardArray[c]) {
                return boardArray[a];
            }
        }
        return "";
    },

    // Board Game Buttons functionality:
    initialize() {
        for (let i = 0; i < 9; i++) {
            // let boardButtons = Renderer.getBoardButtons();
            boardButtons[i].addEventListener(('click'), (e) => {
                e.preventDefault();
                if (boardButtons[i].textContent === "") {
                    boardButtons[i].disabled = true;
                    boardButtons[i].textContent = turnMarker;
                    boardArray[i] = turnMarker;
                    playRound();
                }
            });
        }
    },

    resetBoard() {
        boardArray = Array(9).fill("");
        // let boardButtons = Renderer.getBoardButtons();
        for (let i = 0; i < 9; i++) {
            boardButtons[i].disabled = false;
        }
    }
};

export default Board;