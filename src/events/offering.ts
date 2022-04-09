import GraphicsRenderer from '../graphics/renderer';
import GameView from '../views/game';
import Item from '../entities/item';
import Hero from '../entities/hero';
import Ability from '../entities/ability';
import Selector from '../widgets/selector';
import HeroWidget from '../widgets/hero';
import Text from '../widgets/text';
import Random from '../random';
import Event from './event';
import Game from '../game';

/*
 * In this event you choose a party member to receive some pre-selected gift.
 * This gift can be either an item, a beneficial ability, or a detrimental ability.
 */
export default class OfferingEvent implements Event {
  private static PRELUDE    = 0;
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
  }
}