import Sprites from '../../enums/sprites';
import Item from '../../entities/item';
import Hero from '../../entities/hero';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import View from '../../ui/view';
import Game from '../../game';

/*
 * In this event you choose a party member to receive some pre-selected item.
 */
export default class OfferingEvent extends View {
  private heroSelector: Selector<Hero>;
  private gift: Item;

  constructor() {
    super();
    const that = this;
    this.heroSelector = Selector.heroSelector(Game.game.party.members);
    this.gift = Game.game.data.getRandomItem();
    this.setDetails(
      Sprites.SPIRIT,
      `a spirit offers a gift of ${this.gift.name} to your party. only one member may accept it.`,
      [ new Action('continue', () => that.viewGift()) ]
    );
  }

  viewGift(): void {
    const that = this;
    this.setDetails(Sprites.GIFT, this.gift.descriptionText(), [
      new Action('view party', () => that.viewParty())
    ]);
  }

  viewParty(): void {
    const that = this;
    if (Game.game.party.canPickupItems()) {
      this.setSelector(this.heroSelector, [
        new Action('view gift', () => that.viewGift()),
        new Action('choose', () => that.finish())
      ]);
    } else {
      this.setDetails(this.heroSelector.item().sprite, `no one in your party can pickup items`, [
        new Action('continue', () => Game.game.progress())
      ]);
    }
  }

  finish(): void {
    const hero: Hero = this.heroSelector.item();
    hero.equip(this.gift);
    this.setDetails(hero.sprite, `${hero.name} was given ${this.gift.name}`, [
      new Action('continue', () => Game.game.progress())
    ]);
  }
}