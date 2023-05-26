import { summon } from '../../content/heroes';
import Sprites from '../../media/sprites';
import Hero from '../../entities/hero';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import EventView from '../event';
import Game from '../../game';

export default class PrairieEvent extends EventView {
  private heroSelector: Selector<Hero>;

  constructor(game: Game) {
    super(game);
    this.setDetails(
      Sprites.PRAIRIE,
      'your party traverses a wide prairie. choose someone to wander off and come back after a few turns.',
      [
        new Action('continue', () =>
          this.setSelector(this.heroSelector, [ new Action('choose', () => this.finished()) ])
        )
      ]
    );
  }

  init(): void {
    this.heroSelector = Selector.heroSelector(this.game.party, this.game.party.members);
  }

  private finished(): void {
    const hero: Hero = this.heroSelector.item();
    this.game.party.remove(hero);
    summon(this.game, hero);
    this.setDetails(hero.sprite, `${hero.name} wandered off on their own for a while.`, [
      new Action('continue', () => this.game.progress())
    ]);
  }
}
