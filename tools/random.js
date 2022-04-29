"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MyBot {
    constructor() {
        this.roundCounter = 0;
        this.dynamiteRemaining = 100;
    }
    makeMove(gamestate) {
        this.roundCounter++;
        if (this.dynamiteRemaining > 0) {
            const move = this.chooseRandomlyFrom(['R', 'P', 'S', 'W', 'D']);
            if (move === 'D') {
                this.dynamiteRemaining--;
            }
            return move;
        }
        return this.chooseRandomlyFrom(['R', 'P', 'S', 'W']);
    }
    chooseRandomlyFrom(moves) {
        const choice = Math.floor((Math.random() * moves.length));
        return moves[choice];
    }
    useDynamiteWithProbability(probability) {
        const choice = Math.floor((Math.random() * probability));
        return choice === 0;
    }
}
module.exports = new MyBot();
//# sourceMappingURL=index.js.map