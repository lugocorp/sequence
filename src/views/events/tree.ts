import Sprites from '../../enums/sprites';
import Random from '../../logic/random';
import Hero from '../../entities/hero';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import View from '../../ui/view';
import Game from '../../game';

export default class TreeEvent extends View {
  private heroSelector: Selector<Hero>;

  constructor() {
    super();
    const tree = Random.element([
      {
        sprite: Sprites.CHESTNUT,
        name: 'chestnut'
      },
      {
        sprite: Sprites.CATALPA,
        name: 'catalpa'
      },
      {
        sprite: Sprites.REDBUD,
        name: 'redbud'
      }
    ]);
    const that = this;
    this.setDetails(
      tree.sprite,
      `your party comes across an elder ${tree.name} tree. a party member may sit beneath it refresh their original abilities.`,
      [
        new Action('continue', () =>
          that.setSelector(that.heroSelector, [
            new Action('select', () => {
              const hero: Hero = that.heroSelector.item();
              that.setDetails(
                hero.sprite,
                `${hero.name} sat beneath the ${tree.name} tree and became refreshed.`,
                [ new Action('continue', () => Game.game.progress()) ]
              );
              hero.strength = hero.originalStrength;
              hero.wisdom = hero.originalWisdom;
              hero.dexterity = hero.originalDexterity;
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
