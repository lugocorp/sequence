import GraphicsRenderer from '../../graphics/renderer';
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
    this.set(Sprites.DIRE_CRAB, 'you must choose a party member to let go.', [
      new Action('continue', (): void => that.heroViewer())
    ]);
  }

  heroViewer(): void {
    const that = this;
    this.set(
      Sprites.DIRE_CRAB,
      '',
      [ new Action('choose', () => that.finished()) ],
      this.heroSelector
    );
  }

  finished(): void {
    const hero: Hero = this.heroSelector.item();
    this.set(hero.sprite, `${hero.name} was let go from your party.`, [
      new Action('continue', () => {
        Game.game.party.remove(hero);
        Game.game.progress();
      })
    ]);
  }
}