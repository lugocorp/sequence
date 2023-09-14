import Sprites from '../../media/sprites';
import EnumsHelper from '../../logic/enums';
import Hero from '../../entities/hero';
import Random from '../../logic/random';
import EventView from '../event';
import View from '../view';

/**
 * In this event your party is filtered by a certain stat limit.
 */
export default class CliffsEvent extends EventView {
    private original: number;
    private cutoff: number;
    private stat: number;

    getViews(): View[] {
        this.original = this.game.party.size;
        this.stat = EnumsHelper.getRandomStat();
        this.cutoff = Random.max(4) + 1;
        const that = this;
        return [
            {
                image: Sprites.CLIFF,
                text: `your party comes across some cliffs. only travelers with ${
                    this.cutoff
                } ${EnumsHelper.getStatName(this.stat)} or ${
                    this.higher ? 'higher' : 'lower'
                } may pass.`,
                actions: { continue: () => that.finish() }
            }
        ];
    }

    // True if this event only allows members above a certain threshold
    get higher(): boolean {
        return this.cutoff <= 2;
    }

    // True if the given hero should pass the cliffs
    private passes(hero: Hero): boolean {
        return this.higher
            ? hero.getStat(this.stat) >= this.cutoff
            : hero.getStat(this.stat) <= this.cutoff;
    }

    finish(): void {
        const removals: Hero[] = [];
        for (const hero of this.game.party.members) {
            if (!this.passes(hero)) {
                removals.push(hero);
            }
        }
        this.game.party.filter((hero: Hero) => removals.indexOf(hero) < 0);
        const size: number = this.game.party.size;
        this.game.views.setViews([
            {
                image: Sprites.CLIFF,
                text: size
                    ? size === this.original
                        ? `all party members passed the cliffs!`
                        : `only ${size} party member${size > 1 ? 's' : ''} made it past the cliffs.`
                    : `no one in your party could pass the cliffs.`,
                actions: { continue: () => this.game.progress() }
            }
        ]);
    }
}
