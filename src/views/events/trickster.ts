import Sprites from '../../enums/sprites';
import Stats from '../../enums/stats';
import Hero from '../../entities/hero';
import Random from '../../logic/random';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import View from '../../ui/view';
import Game from '../../game';

export default class TricksterEvent extends View {
  private heroSelector: Selector<Hero>;

  constructor() {
    super();
    const animal = Random.element([
      {
        sprite: Sprites.COYOTL,
        name: 'coyotl'
      },
      {
        sprite: Sprites.RAVEN,
        name: 'raven'
      }
    ]);
    this.setDetails(
      animal.sprite,
      `your party comes across a tricky ${animal.name}! which party member will go up and talk to it?`,
      [
        new Action('continue', () =>
          this.setSelector(this.heroSelector, [
            new Action('select', () => {
              const hero: Hero = this.heroSelector.item();
              const effect: number = Random.max(4);
              if (effect === 0) {
                hero.fatigue();
                this.setDetails(animal.sprite, `${hero.name} was fatigued by the ${animal.name}.`, [
                  new Action('continue', () => Game.game.progress())
                ]);
              } else if (effect === 1) {
                Stats.changeUnitStat(hero, Stats.STRENGTH, 1);
                Stats.changeUnitStat(hero, Stats.WISDOM, 1);
                Stats.changeUnitStat(hero, Stats.DEXTERITY, 1);
                this.setDetails(
                  animal.sprite,
                  `${hero.name} was empowered by the ${animal.name}!`,
                  [ new Action('continue', () => Game.game.progress()) ]
                );
              } else if (effect === 2) {
                hero.boostLuck(-15);
                this.setDetails(animal.sprite, `${hero.name} was cursed by the ${animal.name}.`, [
                  new Action('continue', () => Game.game.progress())
                ]);
              } else {
                hero.boostLuck(15);
                this.setDetails(animal.sprite, `${hero.name} was blessed by the ${animal.name}!`, [
                  new Action('continue', () => Game.game.progress())
                ]);
              }
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
