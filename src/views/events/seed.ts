import ForageEvent from './forage';
import { Rarity, Trigger, TriggerType } from '../../types';
import Sprites from '../../media/sprites';
import Hero from '../../entities/hero';
import Item from '../../entities/item';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import EventView from '../event';
import Game from '../../game';

export default class SeedEvent extends EventView {
  private heroSelector: Selector<Hero>;

  constructor(game: Game) {
    super(game);
    const that = this;
    this.setDetails(
      Sprites.SEED,
      `your party finds a mysterious seed in the grass. choose someone to pick it up.`,
      [
        new Action('continue', () => {
          if (this.game.party.canPickupItems) {
            that.setSelector(that.heroSelector, [
              new Action('choose', () => {
                const hero: Hero = that.heroSelector.item();
                const item: Item = new Item(
                  'magic seed',
                  Sprites.SEED,
                  Rarity.RARE,
                  `+10% luck`,
                  function (game: Game, data: Trigger) {
                    if (data.type === TriggerType.GET_STATS) {
                      data.luck += 10;
                    }
                  }
                );
                hero.basket.equip(item);
                const view: EventView = new EventView(this.game);
                view.setDetails(
                  Sprites.SEED,
                  `${hero.name} takes the seed from their bag and plants it. it sprouts into a large plant.`,
                  [
                    new Action('continue', () => {
                      this.game.chain.futureEvent(new ForageEvent(this.game), 1);
                      hero.basket.unequip(item);
                      this.game.progress();
                    })
                  ]
                );
                this.game.chain.futureEvent(
                  view,
                  6,
                  () => hero.isInParty(this.game.party) && hero.basket.contains(item)
                );
                that.setDetails(Sprites.SEED, `${hero.name} picks up the mysterious seed.`, [
                  new Action('continue', () => this.game.progress())
                ]);
              })
            ]);
          } else {
            that.setDetails(
              Sprites.SEED,
              `your party's inventory is completely full. your party leaves the mysterious seed.`,
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
