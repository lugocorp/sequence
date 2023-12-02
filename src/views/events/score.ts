import Sprites from '../../media/sprites';
import EventView from '../event';
import View from '../view';

export default class ScoreEvent extends EventView {
    getViews(): View[] {
        const n = this.game.party.size;
        const text = [
            `day ${++this.game.history.day}`,
            `score: ${this.game.history.calculateScore()}`,
            `${n} party member${n === 1 ? '' : 's'}`
        ].join('\n');
        return [
            {
                image: Sprites.SCORE,
                text,
                actions: {
                    continue: () => this.game.progress()
                }
            }
        ];
    }
}
