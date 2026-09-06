function createPlayer(playerName, playerMarker) {
    let name = playerName;
    let marker = playerMarker;

    const getName = () => name;
    const getMarker = () => marker;

    return { getName, getMarker };
}

const board = (() => {
    let boardArray = Array(9).fill(null);

    const WIN_PATTERNS = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],    // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],    // Columns
        [0, 4, 8], [2, 4, 6]                // Diagonals
    ];

})();