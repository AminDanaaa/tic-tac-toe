import Renderer from "./Renderer.js";
import Board from "./Board.js";

let moves = 0;
export let turnMarker = "X";

const switchTurn = () => {
    turnMarker = turnMarker === "X" ? "O" : "X";
    Renderer.getTurnIndicator().textContent = `It's player ${turnMarker} turn.`;
};

const resetGame = () => {
    Board.resetBoard();
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

export const playRound = () => {
    moves++;
    let searchResult = Board.searchForWinner();
    switchTurn();
    if (searchResult || (moves === 9 && !searchResult)) {
        resetGame();
        Renderer.renderResultModal(searchResult);
        return;
    }
};

export const startGame = () => {
    addEventListenerNewGameBtn();
    Renderer.render();
    Board.initialize();
    resetGame();        
};