import Sprites from '../../media/sprites';
import Item from '../../entities/item';
import Hero from '../../entities/hero';
import Random from '../../logic/random';
import Selectors from '../selectors';
import EventView from '../event';
import View from '../view';

/**
 * In this event you choose 1 of 3 items to bestow upon a pre-selected party member.
 */
export default class GiftEvent extends EventView {
  private options: Item[];
  private hero: Hero;

  getViews(): View[] {
    this.options = [
      this.game.data.getRandomItem(),
      this.game.data.getRandomItem(),
      this.game.data.getRandomItem()
    ];
    if (this.game.party.canPickupItems) {
      this.hero = Random.element(this.game.party.emptyItemSlots());
      return [{
        image: Sprites.RACCOON,
        text: `a generous spirit reveals itself to ${this.hero.name}. it comes bearing a gift of your choosing.`,
        actions: { 'continue': () => this.chooseGift() }
      }];
    }
    return [{
      image: Sprites.RACCOON,
      text: `a generous spirit reveals itself to your party. it comes bearing a gift, but no one can hold any more belongings. the spirit conceals itself once more.`,
      actions: { 'continue': () => this.game.progress() }
    }];
  }

  chooseGift(): void {
    this.game.views.setViews(Selectors.items(this.options, (item: Item) => ({
      'choose': () => this.finish(item),
      'view member': () => this.viewHero()
    })));
  }

  viewHero(): void {
    this.game.views.setViews(Selectors.heroes([ this.hero ], (hero: Hero) => ({
      'view gifts': () => this.chooseGift()
    })));
  }

  finish(gift: Item): void {
    this.hero.basket.equip(gift);
    this.game.views.setViews([{
      image: Sprites.RACCOON,
      text: `${this.hero.name} received the spirit's gift of ${gift.name}. the spirit conceals itself once more.`,
      actions: { 'continue': () => this.game.progress() }
    }]);
  }
}
