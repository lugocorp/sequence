import Random from '../../logic/random';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import { EventView } from '../event';
import Stats from '../../enums/stats';
import Sprites from '../../enums/sprites';
import { Trigger } from '../../enums/triggers';
import Rarity from '../../enums/rarity';
import Hero from '../../entities/hero';
import Item from '../../entities/item';
import Game from '../../game';

export default class AnimalEvent extends EventView {
  static label = 'animal';
  private heroSelector: Selector<Hero>;

  constructor() {
    super(AnimalEvent);
    const that = this;
    const baby = Random.element([
      {
        name: 'cardinal',
        sprite: Sprites.CARDINAL
      },
      {
        name: 'raccoon',
        sprite: Sprites.RACCOON
      },
      {
        name: 'tadpole',
        sprite: Sprites.COYOTL
      }
    ]);
    this.setDetails(
      baby.sprite,
      `your party finds a lonely baby ${baby.name}. someone may carry it until its family comes around.`,
      [
        new Action('continue', () => {
          if (Game.game.party.canPickupItems()) {
            that.setSelector(that.heroSelector, [
              new Action('choose', () => {
                const hero: Hero = that.heroSelector.item();
                const item: Item = new Item(
                  baby.name,
                  baby.sprite,
                  Rarity.RARE,
                  `+25% luck\na baby ${baby.name} looking for its family`,
                  (trigger: Trigger) => {
                    // TODO: Implement +25% luck effect here
                  }
                );
                hero.basket.equip(item);
                const view: EventView = new EventView({ label: 'animalreturn' });
                view.setDetails(
                  baby.sprite,
                  `${hero.name} returns the baby ${baby.name} to its family. they receive a blessing of empowerment.`,
                  [
                    new Action('continue', () => {
                      Stats.changeUnitStat(hero, Stats.STRENGTH, 1);
                      Stats.changeUnitStat(hero, Stats.WISDOM, 1);
                      Stats.changeUnitStat(hero, Stats.DEXTERITY, 1);
                      Game.game.history.peopleHelped++;
                      hero.basket.unequip(item);
                      Game.game.progress();
                    })
                  ]
                );
                Game.futureEvent(view, 8, () => hero.isInParty() && hero.basket.contains(item));
                that.setDetails(baby.sprite, `${hero.name} picks up the baby ${baby.name}`, [
                  new Action('continue', () => Game.game.progress())
                ]);
              })
            ]);
          } else {
            that.setDetails(
              baby.sprite,
              `your party's inventory is completely full. your party leaves the small animal.`,
              [ new Action('continue', () => Game.game.progress()) ]
            );
          }
        })
      ]
    );
  }

  init(): void {
    this.heroSelector = Selector.heroSelector(Game.game.party.emptyItemSlots());
  }
}
