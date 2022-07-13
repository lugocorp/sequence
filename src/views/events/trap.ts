import Sprites from '../../enums/sprites';
import Hero from '../../entities/hero';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import View from '../../ui/view';
import Game from '../../game';

/*
 * In this event you choose a party member to leave behind.
 */
export default class TrapEvent extends View {
  private heroSelector: Selector<Hero>;

  constructor() {
    super();
    const that = this;
    this.heroSelector = Selector.heroSelector(Game.game.party.members);
    this.setDetails(Sprites.TRAP, 'you must choose a party member to let go.', [
      new Action('continue', (): void => that.heroViewer())
    ]);
  }

  heroViewer(): void {
    const that = this;
    this.setSelector(this.heroSelector, [
      new Action('choose', () => that.finished())
    ]);
  }

  finished(): void {
    const hero: Hero = this.heroSelector.item();
    Game.game.party.remove(hero);
    this.setDetails(hero.sprite, `${hero.name} was let go from your party.`, [
      new Action('continue', () => Game.game.progress())
    ]);
  }
}