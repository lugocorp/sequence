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
 * In this event you choose a party member to receive some pre-selected gift.
 * This gift can be either an item, a beneficial ability, or a detrimental ability.
 */
export default class OfferingEvent extends View {
  private heroSelector: Selector<Hero>;
  private gift: Item | Ability;

  constructor() {
    super();
    const that = this;
    this.heroSelector = Selector.heroSelector(Game.game.party.members);
    this.gift = Random.passes(0.5) ?
      Game.game.data.getRandomItem() :
      Game.game.data.getRandomAbility();
    this.set(
      Sprites.DIRE_CRAB,
      `a spirit offers a gift of ${this.gift.name} to your party. only one member may accept it.`,
      [ new Action('continue', () => that.viewGift()) ]
    );
  }

  viewGift(): void {
    const that = this;
    this.set(Sprites.DIRE_CRAB, this.gift.name, [
      new Action('view party', () => that.viewParty())
    ]);
  }

  viewParty(): void {
    const that = this;
    this.set(
      Sprites.DIRE_CRAB,
      '',
      [
        new Action('view gift', () => that.viewGift()),
        new Action('choose', () => that.finish())
      ],
      this.heroSelector
    );
  }

  finish(): void {
    const hero: Hero = this.heroSelector.item();
    this.set(Sprites.DIRE_CRAB, `${hero.name} was given ${this.gift.name}`, [
      new Action('continue', () => Game.game.progress())
    ]);
  }
}