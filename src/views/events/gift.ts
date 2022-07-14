import Sprites from '../../enums/sprites';
import Item from '../../entities/item';
import Hero from '../../entities/hero';
import Ability from '../../entities/ability';
import Random from '../../logic/random';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import View from '../../ui/view';
import Game from '../../game';

/*
 * In this event you choose 1 of 3 options to bestow upon a pre-selected party member.
 * The options will be either an item, a beneficial ability, or a detrimental ability.
 */
export default class GiftEvent extends View {
  private giftSelector: Selector<Item | Ability>;
  private options: Item[] | Ability[];
  private hero: Hero;

  constructor() {
    super();
    this.hero = Game.game.party.randomHero();
    this.options = Random.passes(0.5) ?
      [
        Game.game.data.getRandomAbility(),
        Game.game.data.getRandomAbility(),
        Game.game.data.getRandomAbility()
      ] :
      [
        Game.game.data.getRandomItem(),
        Game.game.data.getRandomItem(),
        Game.game.data.getRandomItem()
      ];
    const that = this;
    this.giftSelector = Selector.giftSelector(this.options);
    this.setDetails(
      Sprites.SPIRIT,
      `a spirit reveals itself to ${this.hero.name}. it comes bearing a gift of your choosing.`,
      [ new Action('continue', () => that.chooseGift()) ]
    );
  }

  chooseGift(): void {
    const that = this;
    this.setSelector(this.giftSelector, [
      new Action('view member', () => that.viewHero()),
      new Action('choose', () => that.finish())
    ]);
  }

  viewHero(): void {
    const that = this;
    this.setDetails(this.hero.sprite, this.hero.descriptionText(),[
      new Action('view gifts', () => that.chooseGift())
    ]);
  }

  finish(): void {
    const gift: Item | Ability = this.giftSelector.item();
    this.hero.receive(gift);
    this.setDetails(
      this.hero.sprite,
      `${this.hero.name} received the spirit's gift of ${gift.name}. the spirit conceals itself once more.`,
      [ new Action('continue', () => Game.game.progress()) ]
    );
  }
}