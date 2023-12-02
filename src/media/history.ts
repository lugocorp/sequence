import { HTEXT } from '../types';

export default abstract class HistoryManager {
    runs: [string, number][];
    peopleHelped: number;
    itemsCollected: number;
    nightsSurvived: number;
    challengesWon: number;
    partyMembers: number;
    day: number;

    abstract initialize(): Promise<void>;
    abstract save(): Promise<void>;
    protected abstract load(): Promise<void>;

    /**
     * Resets state for a new game
     */
    clear(): void {
        this.peopleHelped = 0;
        this.itemsCollected = 0;
        this.nightsSurvived = 0;
        this.challengesWon = 0;
        this.partyMembers = 0;
        this.day = 1;
    }

    /**
     * Calculates a score from internal state
     */
    calculateScore(): number {
        return (
            this.peopleHelped * 100 +
            this.itemsCollected * 25 +
            this.nightsSurvived * 300 +
            this.challengesWon * 100 +
            this.partyMembers * 50
        );
    }

    /**
     * Adds a new game score to the ledger.
     * Returns the score's position on the board, or -1 if you didn't make it.
     */
    log(): number {
        const MAX: number = HTEXT - 3;
        let index = 0;
        const score: number = this.calculateScore();
        while (index < this.runs.length && score < this.runs[index][1]) {
            index++;
        }
        const date = new Date();
        this.runs.splice(index, 0, [
            `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
            score
        ]);
        while (this.runs.length > MAX) {
            this.runs.pop();
        }
        return index < MAX ? index : -1;
    }
}
