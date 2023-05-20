import Sprites from '../../media/sprites';
import Item from '../../entities/item';
import Hero from '../../entities/hero';
import Random from '../../logic/random';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import EventView from '../event';
import Game from '../../game';

/*
 * In this event you choose 1 of 3 items to bestow upon a pre-selected party member.
 */
export default class GiftEvent extends EventView {
  private itemSelector: Selector<Item>;
  private spirit: Sprites;
  private options: Item[];
  private hero: Hero;

  constructor(game: Game) {
    super(game);
    this.options = [
      this.game.data.getRandomItem(),
      this.game.data.getRandomItem(),
      this.game.data.getRandomItem()
    ];
    this.itemSelector = Selector.itemSelector(this.options);
    this.spirit = this.game.data.getRandomSpirit();
  }

  init(): void {
    const that = this;
    if (this.game.party.canPickupItems()) {
      this.hero = Random.element(this.game.party.emptyItemSlots());
      this.setDetails(
        this.spirit,
        `a generous spirit reveals itself to ${this.hero.name}. it comes bearing a gift of your choosing.`,
        [ new Action('continue', () => that.chooseGift()) ]
      );
    } else {
      this.setDetails(
        this.spirit,
        `a generous spirit reveals itself to your party. it comes bearing a gift, but no one can hold any more belongings. the spirit conceals itself once more.`,
        [ new Action('continue', () => this.game.progress()) ]
      );
    }
  }

  chooseGift(): void {
    const that = this;
    this.setSelector(this.itemSelector, [
      new Action('choose', () => that.finish()),
      new Action('view member', () => that.viewHero())
    ]);
  }

  viewHero(): void {
    const that = this;
    this.setSelector(Selector.heroSelector(this.game.party, [ this.hero ]), [
      new Action('view gifts', () => that.chooseGift())
    ]);
  }

  finish(): void {
    const gift: Item = this.itemSelector.item();
    this.hero.basket.equip(gift);
    this.setDetails(
      this.spirit,
      `${this.hero.name} received the spirit's gift of ${gift.name}. the spirit conceals itself once more.`,
      [ new Action('continue', () => this.game.progress()) ]
    );
  }
}
