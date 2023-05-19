import Sprites from '../../media/sprites';
import Hero from '../../entities/hero';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import { EventView } from '../event';
import Game from '../../game';

export default class ThreeSistersEvent extends EventView {
  private heroSelector: Selector<Hero>;

  constructor(game: Game) {
    super(game);
    const that = this;
    this.setDetails(
      Sprites.THREE_SISTERS,
      'your party comes across a three sisters garden. you may choose someone to eat these crops and become stronger.',
      [
        new Action('continue', () =>
          that.setSelector(that.heroSelector, [
            new Action('select', () => {
              const hero: Hero = that.heroSelector.item();
              that.setDetails(hero.sprite, `${hero.name} ate the plants and got stronger, smarter and faster.`, [
                new Action('continue', () => this.game.progress())
              ]);
              hero.luck += 5;
              hero.str++;
              hero.wis++;
              hero.dex++;
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
