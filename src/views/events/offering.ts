import Sprites from '../../media/sprites';
import Item from '../../entities/item';
import Hero from '../../entities/hero';
import Selectors from '../selectors';
import EventView from '../event';
import Game from '../../game';

/**
 * In this event you choose a party member to receive some pre-selected item.
 */
export default class OfferingEvent extends EventView {
  private heroSelector: Selector<Hero>;
  private gift: Item;

  constructor(game: Game, gift?: Item) {
    super(game);
    this.gift = gift || this.game.data.getRandomItem();
    this.setDetails(
      Sprites.BUTTERFLY,
      `a generous spirit offers a gift of ${this.gift.name} to your party. choose someone to accept it.`,
      [ new Action('continue', () => this.viewGift()) ]
    );
  }

  init(): void {
    this.heroSelector = Selector.heroSelector(this.game.party, this.game.party.emptyItemSlots());
    if (!this.heroSelector.size()) {
      this.setDetails(
        Sprites.BUTTERFLY,
        `a generous spirit offers a gift of ${this.gift.name} to your party, but no one has space for more items. the spirit conceals itself once more.`,
        [ new Action('continue', () => this.game.progress()) ]
      );
    }
  }

  viewGift(): void {
    const that = this;
    this.setDetails(this.gift.sprite, this.gift.descriptionText(), [
      new Action('view party', () => that.viewParty())
    ]);
  }

  viewParty(): void {
    const that = this;
    if (this.game.party.canPickupItems) {
      this.setSelector(this.heroSelector, [
        new Action('choose', () => that.finish()),
        new Action('view gift', () => that.viewGift())
      ]);
    } else {
      this.setDetails(
        this.heroSelector.item().sprite,
        `no one in your party has space for new items.`,
        [ new Action('continue', () => this.game.progress()) ]
      );
    }
  }

  finish(): void {
    const hero: Hero = this.heroSelector.item();
    hero.basket.equip(this.gift);
    this.setDetails(
      Sprites.BUTTERFLY,
      `${hero.name} was given ${this.gift.name}. the spirit conceals itself once more.`,
      [ new Action('continue', () => this.game.progress()) ]
    );
  }
}
