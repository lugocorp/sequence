import Sprites from '../../enums/sprites';
import GraphicsRenderer from '../../graphics/renderer';
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
  private heroSelector: Selector<Hero>;
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
    this.heroSelector = Selector.heroSelector([this.hero]);
    this.set(
      Sprites.DIRE_CRAB,
      `a spirit reveals itself to ${this.hero.name}. it comes bearing a gift of your choosing.`,
      [ new Action('continue', () => that.chooseGift()) ]
    );
  }

  chooseGift(): void {
    const that = this;
    this.set(
      Sprites.DIRE_CRAB,
      '',
      [
        new Action('view member', () => that.viewHero()),
        new Action('choose', () => that.finish())
      ],
      this.giftSelector
    );
  }

  viewHero(): void {
    const that = this;
    this.set(
      Sprites.DIRE_CRAB,
      '',
      [ new Action('view gifts', () => that.chooseGift()) ],
      this.heroSelector
    );
  }

  finish(): void {
    const gift: Item | Ability = this.giftSelector.item();
    this.hero.receive(gift);
    this.set(
      this.hero.sprite,
      `${this.hero.name} received the spirit's gift of ${gift.name}. the spirit conceals itself once more.`,
      [ new Action('continue', () => Game.game.progress()) ]
    );
  }
}