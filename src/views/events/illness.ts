import Sprites from '../../media/sprites';
import Hero from '../../entities/hero';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import EventView from '../event';
import Game from '../../game';

export default class IllnessEvent extends EventView {
  private heroSelector: Selector<Hero>;

  constructor(game: Game) {
    super(game);
    this.setDetails(
      Sprites.ILLNESS,
      `one of your party members isn't feeling well. choose someone to get sick.`,
      [
        new Action('continue', () =>
          this.setSelector(this.heroSelector, [
            new Action('select', () => {
              const hero: Hero = this.heroSelector.item();
              this.setDetails(hero.sprite, `${hero.name} fell ill and lost their base stats.`, [
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
