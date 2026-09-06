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

    const resetBoard = () => {
        boardArray = Array(9).fill("");
    };

    return { searchForWinner, resetBoard, placeMarker };
})();



const gameControl = (() => {
    let moves = 0;

    const playRound = () => {
        moves++;
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

    const startGame = () => {
        let isRunning = true;
        let roundResult = "";

        while (isRunning) {
            roundResult = playRound()
            isRunning = !roundResult;
        }
    };

    const resetGame = () => {
        board.resetBoard();
        moves = 0;
    };

    return { startGame, resetGame };
})();





// Main():
const player1 = createPlayer("Amin", "X");
const player2 = createPlayer("Someone", "O");
gameControl.startGame();