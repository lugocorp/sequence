import { Stats } from '../../types';
import Sprites from '../../media/sprites';
import EnumsHelper from '../../logic/enums';
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
      'your party comes across three sister plants growing together. you may choose someone to consume these and become empowered.',
      [
        new Action('continue', () =>
          that.setSelector(that.heroSelector, [
            new Action('select', () => {
              const hero: Hero = that.heroSelector.item();
              that.setDetails(hero.sprite, `${hero.name} was empowered by the three plants.`, [
                new Action('continue', () => this.game.progress())
              ]);
              hero.boostLuck(5);
              EnumsHelper.changeUnitStat(hero, Stats.STRENGTH, 1);
              EnumsHelper.changeUnitStat(hero, Stats.WISDOM, 1);
              EnumsHelper.changeUnitStat(hero, Stats.DEXTERITY, 1);
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
