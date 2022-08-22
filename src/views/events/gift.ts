import Sprites from '../../enums/sprites';
import Item from '../../entities/item';
import Hero from '../../entities/hero';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import View from '../../ui/view';
import Game from '../../game';

/*
 * In this event you choose 1 of 3 items to bestow upon a pre-selected party member.
 */
export default class GiftEvent extends View {
  private itemSelector: Selector<Item>;
  private spirit: Sprites;
  private options: Item[];
  private hero: Hero;

  constructor() {
    super();
    this.options = [
      Game.game.data.getRandomItem(),
      Game.game.data.getRandomItem(),
      Game.game.data.getRandomItem()
    ];
    this.itemSelector = Selector.itemSelector(this.options);
    this.spirit = Game.game.data.getRandomSpirit();
  }

  init(): void {
    const that = this;
    this.hero = Game.game.party.randomHero();
    this.setDetails(
      this.spirit,
      `a spirit reveals itself to ${this.hero.name}. it comes bearing a gift of your choosing.`,
      [ new Action('continue', () => that.chooseGift()) ]
    );
  }

  chooseGift(): void {
    const that = this;
    if (this.hero.itemSlots) {
      this.setSelector(this.itemSelector, [
        new Action('choose', () => that.finish()),
        new Action('view member', () => that.viewHero())
      ]);
    } else {
      this.setDetails(this.hero.sprite, `${this.hero.name} cannot pickup any items`, [
        new Action('continue', () => Game.game.progress())
      ]);
    }
  }

  viewHero(): void {
    const that = this;
    this.setDetails(this.hero.sprite, this.hero.descriptionText(), [
      new Action('view gifts', () => that.chooseGift())
    ]);
  }

  finish(): void {
    const gift: Item = this.itemSelector.item();
    this.hero.equip(gift);
    this.setDetails(
      this.spirit,
      `${this.hero.name} received the spirit's gift of ${gift.name}. the spirit conceals itself once more.`,
      [ new Action('continue', () => Game.game.progress()) ]
    );
  }
}