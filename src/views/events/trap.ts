import Sprites from '../../enums/sprites';
import Hero from '../../entities/hero';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import { EventView } from '../event';
import Game from '../../game';

/*
 * In this event you choose a party member to leave behind.
 */
export default class TrapEvent extends EventView {
  static label = 'trap';
  private heroSelector: Selector<Hero>;

  constructor(game: Game) {
    super(TrapEvent);
    const that = this;
    this.setDetails(Sprites.TRAP, 'your party comes across a very inviting village.', [
      new Action('continue', () =>
        that.setDetails(Sprites.TRAP, 'choose one of your party members to stay here.', [
          new Action('continue', () => that.heroViewer(game))
        ])
      )
    ]);
  }

  init(game: Game): void {
    this.heroSelector = Selector.heroSelector(game.party, game.party.members);
  }

  heroViewer(game: Game): void {
    const that = this;
    this.setSelector(this.heroSelector, [ new Action('choose', () => that.finished(game)) ]);
  }

  finished(game: Game): void {
    const hero: Hero = this.heroSelector.item();
    game.party.remove(hero);
    this.setDetails(hero.sprite, `${hero.name} was let go from your party.`, [
      new Action('continue', () => game.progress())
    ]);
  }
}
