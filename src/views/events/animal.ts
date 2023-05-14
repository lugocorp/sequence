import { Trigger, TriggerType } from '../../enums/triggers';
import Sprites from '../../enums/sprites';
import Rarity from '../../enums/rarity';
import Random from '../../logic/random';
import Hero from '../../entities/hero';
import Item from '../../entities/item';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import { EventView } from '../event';
import Game from '../../game';

export default class AnimalEvent extends EventView {
  static label = 'animal';
  private heroSelector: Selector<Hero>;

  constructor(game: Game) {
    super(game);
    const that = this;
    const baby = Random.element([
      {
        name: 'cardinal',
        sprite: Sprites.CARDINAL
      },
      {
        name: 'peccary',
        sprite: Sprites.PECCARY
      },
      {
        name: 'tadpole',
        sprite: Sprites.TADPOLE
      }
    ]);
    this.setDetails(
      baby.sprite,
      `your party finds a lonely baby ${baby.name}. someone may carry it until its family comes around.`,
      [
        new Action('continue', () => {
          if (this.game.party.canPickupItems()) {
            that.setSelector(that.heroSelector, [
              new Action('choose', () => {
                const hero: Hero = that.heroSelector.item();
                const item: Item = new Item(
                  baby.name,
                  baby.sprite,
                  Rarity.RARE,
                  `+25% luck. a baby ${baby.name} looking for its family.`,
                  function (game: Game, data: Trigger) {
                    if (data.type === TriggerType.GET_LUCK) {
                      data.luck += 25;
                    }
                  }
                );
                hero.basket.equip(item);
                const view: EventView = new EventView(this.game);
                view.setDetails(
                  baby.sprite,
                  `${hero.name} returns the baby ${baby.name} to its family. they receive a blessing of empowerment.`,
                  [
                    new Action('continue', () => {
                      hero.empowerRandom();
                      this.game.history.peopleHelped++;
                      hero.basket.unequip(item);
                      this.game.progress();
                    })
                  ]
                );
                this.game.chain.futureEvent(
                  view,
                  8,
                  () => hero.isInParty(this.game.party) && hero.basket.contains(item)
                );
                that.setDetails(baby.sprite, `${hero.name} picks up the baby ${baby.name}.`, [
                  new Action('continue', () => this.game.progress())
                ]);
              })
            ]);
          } else {
            that.setDetails(
              baby.sprite,
              `your party's inventory is completely full. your party leaves the small animal.`,
              [ new Action('continue', () => this.game.progress()) ]
            );
          }
        })
      ]
    );
  }

  init(): void {
    this.heroSelector = Selector.heroSelector(this.game.party, this.game.party.emptyItemSlots());
  }
}
