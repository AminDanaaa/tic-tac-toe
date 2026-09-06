function createPlayer(name) {
    let score = 0;
    const getScore = () => score;
    const giveScore = () => { score++; };
    const resetScore = () => { score = 0; };

    return { name, getScore, giveScore, resetScore };
}