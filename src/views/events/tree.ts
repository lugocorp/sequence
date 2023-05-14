import Sprites from '../../enums/sprites';
import Stats from '../../enums/stats';
import Random from '../../logic/random';
import Hero from '../../entities/hero';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import { EventView } from '../event';
import Game from '../../game';

export default class TreeEvent extends EventView {
  static label = 'tree';
  private heroSelector: Selector<Hero>;

  constructor(game: Game) {
    super(TreeEvent);
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
                [ new Action('continue', () => game.progress()) ]
              );
              hero.refresh(Stats.STRENGTH);
              hero.refresh(Stats.WISDOM);
              hero.refresh(Stats.DEXTERITY);
            })
          ])
        )
      ]
    );
  }

  init(game: Game): void {
    this.heroSelector = Selector.heroSelector(game.party, game.party.members);
  }
}
