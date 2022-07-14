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
  private options: Item[];
  private hero: Hero;

  constructor() {
    super();
    this.hero = Game.game.party.randomHero();
    this.options = [
      Game.game.data.getRandomItem(),
      Game.game.data.getRandomItem(),
      Game.game.data.getRandomItem()
    ];
    const that = this;
    this.itemSelector = Selector.itemSelector(this.options);
    this.setDetails(
      Sprites.SPIRIT,
      `a spirit reveals itself to ${this.hero.name}. it comes bearing a gift of your choosing.`,
      [ new Action('continue', () => that.chooseGift()) ]
    );
  }

  chooseGift(): void {
    const that = this;
    this.setSelector(this.itemSelector, [
      new Action('view member', () => that.viewHero()),
      new Action('choose', () => that.finish())
    ]);
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
      this.hero.sprite,
      `${this.hero.name} received the spirit's gift of ${gift.name}. the spirit conceals itself once more.`,
      [ new Action('continue', () => Game.game.progress()) ]
    );
  }
}