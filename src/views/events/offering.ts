import Sprites from '../../media/sprites';
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
    super(game);
    const that = this;
    this.gift = this.game.data.getRandomItem();
    this.spirit = this.game.data.getRandomSpirit();
    this.setDetails(
      this.spirit,
      `a spirit offers a gift of ${this.gift.name} to your party. only one member may accept it.`,
      [ new Action('continue', () => that.viewGift()) ]
    );
  }

  init(): void {
    this.heroSelector = Selector.heroSelector(this.game.party, this.game.party.emptyItemSlots());
    if (!this.heroSelector.size()) {
      this.setDetails(
        this.spirit,
        `a spirit offers a gift of ${this.gift.name} to your party, but everyone's inventory is full.`,
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
    if (this.game.party.canPickupItems()) {
      this.setSelector(this.heroSelector, [
        new Action('choose', () => that.finish()),
        new Action('view gift', () => that.viewGift())
      ]);
    } else {
      this.setDetails(this.heroSelector.item().sprite, `no one in your party can pickup items.`, [
        new Action('continue', () => this.game.progress())
      ]);
    }
  }

  finish(): void {
    const hero: Hero = this.heroSelector.item();
    hero.basket.equip(this.gift);
    this.setDetails(
      this.spirit,
      `${hero.name} was given ${this.gift.name}. the spirit conceals itself once more.`,
      [ new Action('continue', () => this.game.progress()) ]
    );
  }
}
