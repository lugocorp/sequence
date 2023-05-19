import { Rarity, Trigger, TriggerType } from '../../types';
import Sprites from '../../media/sprites';
import Hero from '../../entities/hero';
import Item from '../../entities/item';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import { EventView } from '../event';
import Game from '../../game';

export default class BabyPeccaryEvent extends EventView {
  private heroSelector: Selector<Hero>;

  constructor(game: Game) {
    super(game);
    const that = this;
    this.setDetails(
      Sprites.PECCARY,
      `your party finds a lonely baby peccary. choose someone to carry it until the party finds its family.`,
      [
        new Action('continue', () => {
          if (this.game.party.canPickupItems()) {
            that.setSelector(that.heroSelector, [
              new Action('choose', () => {
                const hero: Hero = that.heroSelector.item();
                const item: Item = new Item(
                  'baby peccary',
                  Sprites.PECCARY,
                  Rarity.RARE,
                  `+25% luck\na baby peccary looking for its family.`,
                  function (game: Game, data: Trigger) {
                    if (data.type === TriggerType.GET_STATS) {
                      data.luck += 25;
                    }
                  }
                );
                hero.basket.equip(item);
                const view: EventView = new EventView(this.game);
                view.setDetails(
                  Sprites.PECCARY,
                  `${hero.name} returns the baby peccary to its family and receives a blessing in return. they are now stronger, wiser and faster.`,
                  [
                    new Action('continue', () => {
                      hero.str++;
                      hero.wis++;
                      hero.dex++;
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
                that.setDetails(Sprites.PECCARY, `${hero.name} picks up the baby peccary.`, [
                  new Action('continue', () => this.game.progress())
                ]);
              })
            ]);
          } else {
            that.setDetails(
              Sprites.PECCARY,
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