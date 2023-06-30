import Sprites from '../../media/sprites';
import Hero from '../../entities/hero';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import EventView from '../event';
import Game from '../../game';

export default class SnakeBiteEvent extends EventView {
  private heroSelector: Selector<Hero>;

  constructor(game: Game) {
    super(game);
    this.setDetails(
      Sprites.SNAKE_BITE,
      `your party comes across a snake. choose someone to get bit.`,
      [
        new Action('continue', () =>
          this.setSelector(this.heroSelector, [
            new Action('select', () => {
              const hero: Hero = this.heroSelector.item();
              this.setDetails(hero.sprite, `${hero.name} got bit and lost their base stats.`, [
                new Action('continue', () => this.game.progress())
              ]);
              hero.str = 0;
              hero.wis = 0;
              hero.dex = 0;
            })
          ])
        )
      ]
    );
  }

  init(): void {
    this.heroSelector = Selector.heroSelector(this.game.party, this.game.party.members);
  }
}
