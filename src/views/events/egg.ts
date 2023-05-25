import { Rarity, Trigger, TriggerType } from '../../types';
import Sprites from '../../media/sprites';
import Hero from '../../entities/hero';
import Item from '../../entities/item';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import EventView from '../event';
import Game from '../../game';

export default class EggEvent extends EventView {
  private heroSelector: Selector<Hero>;

  constructor(game: Game) {
    super(game);
    const that = this;
    this.setDetails(
      Sprites.EGG,
      `your party finds an egg laying on the ground. choose someone to pick it up.`,
      [
        new Action('continue', () => {
          if (this.game.party.canPickupItems) {
            that.setSelector(that.heroSelector, [
              new Action('choose', () => {
                const hero: Hero = that.heroSelector.item();
                const item: Item = new Item(
                  'round egg',
                  Sprites.EGG,
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
                  Sprites.EGG,
                  `${hero.name} feels a slight stir as the egg in their bag hatches into a turtle!`,
                  [
                    new Action('continue', () => {
                      hero.basket.unequip(item);
                      this.hatches.call(view);
                    })
                  ]
                );
                this.game.chain.futureEvent(
                  view,
                  6,
                  () => hero.isInParty(this.game.party) && hero.basket.contains(item)
                );
                that.setDetails(Sprites.EGG, `${hero.name} picks up the egg.`, [
                  new Action('continue', () => this.game.progress())
                ]);
              })
            ]);
          } else {
            that.setDetails(
              Sprites.EGG,
              `your party's inventory is completely full. your party leaves the egg behind.`,
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

  hatches(): void {
    if (this.game.party.isFull) {
      this.setDetails(
        Sprites.EGG, // TODO update sprite to turtle
        'the egg hatches into a turtle!',
        [ new Action('continue', () => this.game.progress()) ]
      );
    } else {
      this.game.party.add(
        new Hero(
          this.game,
          Sprites.EGG, // TODO update sprite to turtle
          'turtle',
          'turtle',
          1,
          1,
          1,
          2,
          0
        )
      );
      this.setDetails(
        Sprites.EGG, // TODO update sprite to turtle
        'the egg hatches into a turtle! the turtle joins your party.',
        [ new Action('continue', () => this.game.progress()) ]
      );
    }
  }
}
