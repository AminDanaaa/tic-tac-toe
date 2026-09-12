// Creating the DOM elements using renderer and Renderer constants
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
const boardButtons = Array(9).fill(null);



// render board buttons
function createButtons() {
    for (let i = 0; i < 9; i++) {
        boardButtons[i] = document.createElement("button");
        boardButtons[i].classList.add("board-buttons", "no-select");
        displayBoard.appendChild(boardButtons[i]);
    }
}

// assign css classes to DOM elements
function addClasses() {
    mainTextContainer.classList.add("main-text-container");
    mainHeader.classList.add("main-header", "no-select");
    turnIndicator.classList.add("turn-indicator", "no-select");
    displayBoard.classList.add("display-board");
    newGameBtn.classList.add("new-game-btn", "no-select");
    modalOverlay.classList.add("modal-overlay");
    modalBoxResult.classList.add("modal-box");
    modalResultText.classList.add("no-select");
    modalResultButton.classList.add("no-select");
}

// Appending elements to their parent element
function appenChilds() {
    mainContainer.appendChild(mainTextContainer);
    mainContainer.appendChild(displayBoard);
    mainContainer.appendChild(newGameBtn);
    mainContainer.appendChild(modalOverlay);
    mainTextContainer.appendChild(mainHeader);
    mainTextContainer.appendChild(turnIndicator);
    modalOverlay.appendChild(modalBoxResult);
}

// Initialize text contents
function initializeTexts() {
    mainHeader.textContent = "Tic Tac Toe";
    modalResultButton.textContent = `Play Again`;
    newGameBtn.textContent = "New Game";
}

const Renderer = {
    render() {
        addClasses();
        appenChilds();
        initializeTexts();
        createButtons();
    },    

    renderResultModal(winnerMarker) {
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
    },

    clearButtons() {
        for (let button of boardButtons) {
            button.textContent = "";
        }
    },

    getTurnIndicator() {
        return turnIndicator;
    },

    getBoardButtons() {
        return boardButtons;
    },

    getNewGameBtn() {
        return newGameBtn;
    }
};

export default Renderer;