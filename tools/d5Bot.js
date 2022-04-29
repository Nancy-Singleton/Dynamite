"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MyBot {
    constructor() {
        this.roundCounter = 0;
        this.dynamiteRemaining = 100;
    }
    makeMove(gamestate) {
        this.roundCounter++;
        if (this.dynamiteRemaining > 0 && this.shouldUseDynamite()) {
            this.dynamiteRemaining--;
            return 'D';
        }
        return this.chooseRandomlyFromRPS();
    }
    chooseRandomlyFromRPS() {
        const choice = Math.floor((Math.random() * 3) + 1);
        if (choice === 1) {
            return 'R';
        }
        if (choice === 2) {
            return 'P';
        }
        return 'S';
    }
    shouldUseDynamite() {
        const probability = 5;
        const choice = Math.floor((Math.random() * probability) + 1);
        return choice === 1;
    }
}
module.exports = new MyBot();
//# sourceMappingURL=index.js.map