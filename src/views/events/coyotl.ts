import Sprites from '../../media/sprites';
import Hero from '../../entities/hero';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import EventView from '../event';
import Game from '../../game';

/**
 * In this event you choose a party member to leave behind.
 */
export default class CoyotlEvent extends EventView {
  private heroSelector: Selector<Hero>;

  constructor(game: Game) {
    super(game);
    const that = this;
    this.setDetails(Sprites.COYOTL, 'a tricky coyotl chases off one of your party members.', [
      new Action('continue', () =>
        that.setSelector(that.heroSelector, [ new Action('choose', () => that.finished()) ])
      )
    ]);
  }

  init(): void {
    this.heroSelector = Selector.heroSelector(this.game.party, this.game.party.members);
  }

  finished(): void {
    const hero: Hero = this.heroSelector.item();
    this.game.party.remove(hero);
    this.setDetails(hero.sprite, `${hero.name} was chased away by the coyotl.`, [
      new Action('continue', () => this.game.progress())
    ]);
  }
}
