import {Bot} from "./types/bot";
import {GameState} from "./types/gameState";
import {Move} from "./types/move";

class MyBot implements Bot {
    roundCounter: number = 0;
    dynamiteRemaining: number = 100;
    opponentsRockCount: number = 0;
    opponentsPaperCount: number = 0;
    opponentsScissorsCount: number = 0;

    makeMove(gamestate: GameState): Move {
        this.roundCounter++;
        this.storeOpponentsLastMove(gamestate);

        let opponentPlayingConsistently = this.opponentPlayingConsistently(gamestate, 85);
        if (!!opponentPlayingConsistently) {
            return this.beat(opponentPlayingConsistently);
        }

        if (this.dynamiteRemaining > 0 && this.useDynamiteWithProbability(2)) {
            this.dynamiteRemaining--;
            return 'D';
        }
        return this.chooseRandomlyFrom(['R', 'P', 'S']);
    }

    storeOpponentsLastMove(gameState: GameState) {
        if (this.roundCounter > 1) {
            const lastMove = gameState.rounds[this.roundCounter - 2].p2;
            if (lastMove === 'R') {
                this.opponentsRockCount++;
            }
            if (lastMove === 'P') {
                this.opponentsPaperCount++;
            }
            if (lastMove === 'S') {
                this.opponentsScissorsCount++;
            }
        }
    }

    opponentPlayingConsistently(gameState: GameState, percentage: number): Move | undefined {
        if (this.opponentsRockCount * 100 / (this.roundCounter - 1) > percentage) {
            return 'R';
        }
        if (this.opponentsPaperCount * 100 / (this.roundCounter - 1) > percentage) {
            return 'P';
        }
        if (this.opponentsScissorsCount * 100 / (this.roundCounter - 1) > percentage) {
            return 'S';
        }
        return undefined;
    }

    beat(move: Move) {
        if (move === 'R') {
            return 'P'
        }
        if (move === 'P') {
            return 'S';
        }
        if (move === 'S') {
            return 'R';
        }
        if (move === 'D') {
            return 'W';
        }
        return this.chooseRandomlyFrom(['R', 'P', 'S']);
    }

    chooseRandomlyFrom(moves: Move[]): Move {
        const choice = Math.floor((Math.random() * moves.length));
        return moves[choice];
    }

    useDynamiteWithProbability(probability: number): boolean {
        const choice = Math.floor((Math.random() * probability));
        return choice === 0;
    }
}

module.exports = new MyBot();