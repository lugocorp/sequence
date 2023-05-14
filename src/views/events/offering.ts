import Sprites from '../../enums/sprites';
import Item from '../../entities/item';
import Hero from '../../entities/hero';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import { EventView } from '../event';
import Game from '../../game';

/*
 * In this event you choose a party member to receive some pre-selected item.
 */
export default class OfferingEvent extends EventView {
  static label = 'offering';
  private heroSelector: Selector<Hero>;
  private spirit: Sprites;
  private gift: Item;

  constructor(game: Game) {
    super(OfferingEvent);
    const that = this;
    this.gift = game.data.getRandomItem();
    this.spirit = game.data.getRandomSpirit();
    this.setDetails(
      this.spirit,
      `a spirit offers a gift of ${this.gift.name} to your party. only one member may accept it.`,
      [ new Action('continue', () => that.viewGift(game)) ]
    );
  }

  init(game: Game): void {
    this.heroSelector = Selector.heroSelector(game.party, game.party.emptyItemSlots());
    if (!this.heroSelector.size()) {
      this.setDetails(
        this.spirit,
        `a spirit offers a gift of ${this.gift.name} to your party, but everyone's inventory is full.`,
        [ new Action('continue', () => game.progress()) ]
      );
    }
  }

  viewGift(game: Game): void {
    const that = this;
    this.setDetails(this.gift.sprite, this.gift.descriptionText(), [
      new Action('view party', () => that.viewParty(game))
    ]);
  }

  viewParty(game: Game): void {
    const that = this;
    if (game.party.canPickupItems()) {
      this.setSelector(this.heroSelector, [
        new Action('choose', () => that.finish(game)),
        new Action('view gift', () => that.viewGift(game))
      ]);
    } else {
      this.setDetails(this.heroSelector.item().sprite, `no one in your party can pickup items.`, [
        new Action('continue', () => game.progress())
      ]);
    }
  }

  finish(game: Game): void {
    const hero: Hero = this.heroSelector.item();
    hero.basket.equip(game.history, this.gift);
    this.setDetails(
      this.spirit,
      `${hero.name} was given ${this.gift.name}. the spirit conceals itself once more.`,
      [ new Action('continue', () => game.progress()) ]
    );
  }
}
