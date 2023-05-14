import Sprites from '../../enums/sprites';
import Item from '../../entities/item';
import Hero from '../../entities/hero';
import Random from '../../logic/random';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import { EventView } from '../event';
import Game from '../../game';

/*
 * In this event you choose 1 of 3 items to bestow upon a pre-selected party member.
 */
export default class GiftEvent extends EventView {
  static label = 'gift';
  private itemSelector: Selector<Item>;
  private spirit: Sprites;
  private options: Item[];
  private hero: Hero;

  constructor(game: Game) {
    super(GiftEvent);
    this.options = [
      game.data.getRandomItem(),
      game.data.getRandomItem(),
      game.data.getRandomItem()
    ];
    this.itemSelector = Selector.itemSelector(this.options);
    this.spirit = game.data.getRandomSpirit();
  }

  init(game: Game): void {
    const that = this;
    if (game.party.canPickupItems()) {
      this.hero = Random.element(game.party.emptyItemSlots());
      this.setDetails(
        this.spirit,
        `a spirit reveals itself to ${this.hero.name}. it comes bearing a gift of your choosing.`,
        [ new Action('continue', () => that.chooseGift(game)) ]
      );
    } else {
      this.setDetails(
        this.spirit,
        `a spirit reveals itself to your party. it comes bearing a gift, but everyone's inventory is full.`,
        [ new Action('continue', () => game.progress()) ]
      );
    }
  }

  chooseGift(game: Game): void {
    const that = this;
    this.setSelector(this.itemSelector, [
      new Action('choose', () => that.finish(game)),
      new Action('view member', () => that.viewHero(game))
    ]);
  }

  viewHero(game: Game): void {
    const that = this;
    this.setDetails(this.hero.sprite, this.hero.descriptionText(), [
      new Action('view gifts', () => that.chooseGift(game))
    ]);
  }

  finish(game: Game): void {
    const gift: Item = this.itemSelector.item();
    this.hero.basket.equip(game.history, gift);
    this.setDetails(
      this.spirit,
      `${this.hero.name} received the spirit's gift of ${gift.name}. the spirit conceals itself once more.`,
      [ new Action('continue', () => game.progress()) ]
    );
  }
}
