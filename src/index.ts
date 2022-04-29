import {Bot} from "./types/bot";
import {GameState} from "./types/gameState";
import {Move} from "./types/move";

class MyBot implements Bot {
    private roundCounter: number = 0;
    private dynamiteRemaining: number = 100;
    private opponentsRockCount: number = 0;
    private opponentsPaperCount: number = 0;
    private opponentsScissorsCount: number = 0;
    private opponentsDynamiteCount: number = 0;
    private tieStreak: number = 0;

    makeMove(gamestate: GameState): Move {
        this.roundCounter++;
        this.storeOpponentsLastMove(gamestate);
        this.updateTieStreak(gamestate);

        const opponentPlayingConsistently = this.opponentPlayingConsistently(85);
        if (!!opponentPlayingConsistently) {
            return this.beat(opponentPlayingConsistently);
        }

        if (this.tieStreak > 1) {
            return this.handleDraw();
        }

        return this.chooseRandomlyFrom(['R', 'P', 'S']);
    }

    private storeOpponentsLastMove(gameState: GameState) {
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
            if (lastMove === 'D') {
                this.opponentsDynamiteCount++;
            }
        }
    }

    private updateTieStreak(gameState: GameState) {
        if (this.roundCounter > 1) {
            const lastRound = gameState.rounds[this.roundCounter - 2];
            if (lastRound.p1 === lastRound.p2) {
                this.tieStreak++;
            } else {
                this.tieStreak = 0;
            }
        }
    }

    private opponentPlayingConsistently(percentage: number): Move | undefined {
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

    private beat(move: Move) {
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

    private handleDraw(): Move {

        if (this.opponentsDynamiteCount < 100 && this.tieStreak >= 2) {
            return 'W';
        }

        if (this.dynamiteRemaining > 0 && this.useWithProbability(2)) {
            this.dynamiteRemaining--;
            return 'D';
        }

        return this.chooseRandomlyFrom(['R', 'P', 'S']);
    }

    private chooseRandomlyFrom(moves: Move[]): Move {
        const choice = Math.floor((Math.random() * moves.length));
        return moves[choice];
    }

    private useWithProbability(probability: number): boolean {
        const choice = Math.floor((Math.random() * probability));
        return choice === 0;
    }
}

module.exports = new MyBot();