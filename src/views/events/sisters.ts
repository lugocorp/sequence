import Sprites from '../../enums/sprites';
import Stats from '../../enums/stats';
import Hero from '../../entities/hero';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import { EventView } from '../event';
import Game from '../../game';

export default class ThreeSistersEvent extends EventView {
  static label = 'sisters';
  private heroSelector: Selector<Hero>;

  constructor() {
    super(ThreeSistersEvent);
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
                new Action('continue', () => Game.game.progress())
              ]);
              hero.boostLuck(10);
              Stats.changeUnitStat(hero, Stats.STRENGTH, 1);
              Stats.changeUnitStat(hero, Stats.WISDOM, 1);
              Stats.changeUnitStat(hero, Stats.DEXTERITY, 1);
            })
          ])
        )
      ]
    );
  }

  init(): void {
    this.heroSelector = Selector.heroSelector(Game.game.party.members);
  }
}