import { Rarity } from '../../types';
import Random from '../../logic/random';
import Hero from '../../entities/hero';
import Item from '../../entities/item';
import EventView from '../event';
import Game from '../../game';
import View from '../view';

export default class ProphecyEvent extends EventView {
  getViews(): View[] {
    const hero: Hero = Random.element(this.game.party.members);
    const item: Item = this.game.data.getRandomItem(Rarity.RARE);
    this.game.chain.futureEvent(new PropheticItemEvent(this.game, hero, item), 10, () => this.game.party.members.indexOf(hero) > -1);
    return [{
      image: hero.sprite,
      text: `${hero.name} has a vision about a powerful artifact. could it be prophetic?`,
      actions: {
        'continue': () => this.game.progress()
      }
    }];
  }
}

class PropheticItemEvent extends EventView {
    constructor(game: Game, private hero: Hero, private item: Item) {
      super(game);
    }

  getViews(): View[] {
    if (this.hero.basket.hasSpace) {
      return [{
        image: this.hero.sprite,
        text: `${this.hero.name} receives a powerful item they had recently seen in a vision.`,
        actions: {
          'view item': () =>
            this.game.views.setViews([{
              image: this.item.sprite,
              text: this.item.descriptionText(),
              actions: {
              'continue': () => {
                this.hero.basket.equip(this.item);
                this.game.progress();
              }
            }
            }])
        }
      }];
    }
    return [{
      image: this.hero.sprite,
      text: `${this.hero.name} comes upon a powerful artifact they had recently seen in a vision, but their inventory is full. they leave the item alone.`,
      actions: {
        'view item': () =>
          this.game.views.setViews([{
            image: this.item.sprite,
            text: this.item.descriptionText(),
            actions: {
              'continue': () => this.game.progress()
            }
        }])
      }
    }];
  }
}