import { Rarity, Trigger, TriggerType } from '../../types';
import { turtle } from '../../content/heroes';
import Sprites from '../../media/sprites';
import Hero from '../../entities/hero';
import Item from '../../entities/item';
import Selectors from '../selectors';
import EventView from '../event';
import Game from '../../game';
import View from '../view';

export default class EggEvent extends EventView {
  getViews(): View[] {
    const that = this;
    return [{
      image: Sprites.EGG,
      text: `your party finds an egg laying on the ground. choose someone to pick it up.`,
      actions: {
        'continue': () => {
          if (this.game.party.canPickupItems) {
            that.game.views.setViews(Selectors.heroes(this.game.party.emptyItemSlots(), (hero: Hero) => ({
              'choose': () => {
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
                this.game.chain.futureEvent(
                  new HatchEvent(this.game, hero, item),
                  6,
                  () => hero.isInParty(this.game.party) && hero.basket.contains(item)
                );
                that.game.views.setViews([{image: Sprites.EGG, text: `${hero.name} picks up the egg.`, actions: {
                  'continue': () => this.game.progress()
                }}]);
              }
            })));
          } else {
            this.game.views.setViews([{
              image: Sprites.EGG,
              text: `your party's inventory is completely full. your party leaves the egg behind.`,
              actions: { 'continue': () => this.game.progress() }
            }]);
          }
        }
      }
    }];
  }
}

class HatchEvent extends EventView {
  constructor(game: Game, private hero: Hero, private item: Item) {
    super(game);
  }

  getViews(): View[] {
    return [{
      image: Sprites.EGG,
      text: `${this.hero.name} feels a slight stir as the egg in their bag hatches into a turtle!`,
      actions: {
        'continue': () => {
          this.hero.basket.unequip(this.item);
          if (this.game.party.isFull) {
            this.game.views.setViews([{image: Sprites.TURTLE, text: 'the egg hatches into a turtle!', actions: {
              'continue': () => this.game.progress()
            }}]);
          } else {
            this.game.party.add(turtle(this.game));
            this.game.views.setViews([{
              image: Sprites.TURTLE,
              text: 'the egg hatches into a turtle! the turtle joins your party.',
              actions: { 'continue': () => this.game.progress() }
            }]);
          }
        }
      }
    }];
  }
}
