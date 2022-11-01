import Sprites from '../../enums/sprites';
import Hero from '../../entities/hero';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import View from '../../ui/view';
import Game from '../../game';

export default class ThreeSistersEvent extends View {
  private heroSelector: Selector<Hero>;

  constructor() {
    super();
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
              hero.strength++;
              hero.wisdom++;
              hero.dexterity++;
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
