"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MyBot {
    constructor() {
        this.roundCounter = 0;
        this.dynamiteRemaining = 100;
    }
    makeMove(gamestate) {
        this.roundCounter++;
        if (this.dynamiteRemaining > 0 && this.roundCounter % 2 === 0) {
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
}
module.exports = new MyBot();
//# sourceMappingURL=index.js.map