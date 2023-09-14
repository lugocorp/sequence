import Sprites from '../../media/sprites';
import EnumsHelper from '../../logic/enums';
import Hero from '../../entities/hero';
import Random from '../../logic/random';
import EventView from '../event';
import Game from '../../game';

/**
 * In this event your party is filtered by a certain stat limit.
 */
export default class CliffsEvent extends EventView {
  private original: number;
  private cutoff: number;
  private stat: number;

  constructor(game: Game) {
    super(game);
    this.original = this.game.party.size;
    this.stat = EnumsHelper.getRandomStat();
    this.cutoff = Random.max(4) + 1;
    const that = this;
    this.game.views.setViews([{(
      Sprites.CLIFF,
      `your party comes across some cliffs. only travelers with ${
        this.cutoff
      } ${EnumsHelper.getStatName(this.stat)} or ${this.higher ? 'higher' : 'lower'} may pass.`,
      [ 'continue': () => that.finish()) ]
    );
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
    this.game.views.setViews([{(
      Sprites.CLIFF,
      size
        ? size === this.original
          ? `all party members passed the cliffs!`
          : `only ${size} party member${size > 1 ? 's' : ''} made it past the cliffs.`
        : `no one in your party could pass the cliffs.`,
      [ 'continue': () => this.game.progress()) ]
    );
  }
}
