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
    super(Sprites.DIRE_CRAB);
    const that = this;
    this.gift = Random.passes(0.5) ?
      Game.game.data.getRandomItem() :
      Game.game.data.getRandomAbility();
    this.setText(`a spirit offers a gift of ${this.gift.name} to your party. only one member may accept it.`);
    this.setAction('continue', () => that.viewGift());
    this.heroSelector = Selector.heroSelector(Game.game.party.members);
  }

  viewGift(): void {
    const that = this;
    this.setText(this.gift.name);
    this.setAction('view party', () => that.viewParty());
  }

  viewParty(): void {
    const that = this;
    this.selector = this.heroSelector;
    this.actions = [
      new Action('view gift', () => that.viewGift()),
      new Action('choose', () => that.finish())
    ];
    this.selector.invalidate();
  }

  finish(): void {
    const hero: Hero = this.heroSelector.item();
    this.setText(`${hero.name} was given ${this.gift.name}`);
    this.setAction('continue', () => Game.game.progress());
    this.selector = undefined;
  }
  /* private static PRELUDE    = 0;
  private static VIEW_GIFT  = 1;
  private static VIEW_PARTY = 2;
  private static FINISHED   = 3;
  private gift: Item | Ability;
  private heroViewer: HeroWidget;
  private selector: Selector;
  private viewParty: Text;
  private viewGift: Text;
  private continue: Text;
  private state: number;

  constructor() {
    super();
    const that = this;
    this.gift = Random.passes(0.5) ?
      Game.game.data.getRandomItem() :
      Game.game.data.getRandomAbility();
    this.state = OfferingEvent.PRELUDE;
    this.heroViewer = new HeroWidget();
    this.selector = new Selector(
      Game.game.party.length(),
      (i: number) => Game.game.party.get(i),
      (value: any) => {
        that.heroViewer.setHero(value as Hero);
      },
      (result: any) => {
        that.state = OfferingEvent.FINISHED;
        (result as Hero).receive(that.gift);
      }
    );
    this.continue = new Text('continue', 30, 190, false, () => {
      if (that.state === OfferingEvent.PRELUDE) {
        that.state = OfferingEvent.VIEW_GIFT;
      }
      if (that.state === OfferingEvent.FINISHED) {
        Game.game.progress();
      }
    });
    this.viewParty = new Text('view party', 25, 190, false, () => {
      this.state = OfferingEvent.VIEW_PARTY;
    });
    this.viewGift = new Text('view gift', 25, 190, false, () => {
      this.state = OfferingEvent.VIEW_GIFT;
    });
  }

  click(): void {
    if (this.state === OfferingEvent.VIEW_GIFT) {
      this.viewParty.click();
    } else if (this.state === OfferingEvent.VIEW_PARTY) {
      if (this.heroViewer.viewingHero()) {
        this.viewGift.click();
        this.selector.click();
      }
      this.heroViewer.click();
    }
    this.continue.click();
  }

  render(view: GameView, r: GraphicsRenderer): void {
    if (this.state === OfferingEvent.PRELUDE) {
      r.drawParagraph(`a spirit offers a gift of ${this.gift.name} to your party. only one member may accept it.`, 2, 0);
      this.continue.render(view, r);
    }
    if (this.state === OfferingEvent.VIEW_GIFT) {
      if (this.gift instanceof Item) {
        view.itemInspection(r, this.gift);
      } else {
        view.abilityInspection(r, this.gift);
      }
      this.viewParty.render(view, r);
    }
    if (this.state === OfferingEvent.VIEW_PARTY) {
      this.heroViewer.render(view, r);
      if (this.heroViewer.viewingHero()) {
        this.viewGift.render(view, r);
        this.selector.render(view, r);
      }
    }
    if (this.state === OfferingEvent.FINISHED) {
      r.drawParagraph(`${(this.selector.getSelected() as Hero).name} received the gift of ${this.gift.name}.`, 0, 0);
      this.continue.render(view, r);
    }
  } */
}