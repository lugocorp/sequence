import GraphicsRenderer from '../graphics/renderer';
import GameView from '../views/game';
import Item from '../entities/item';
import Hero from '../entities/hero';
import Selector from '../widgets/selector';
import HeroWidget from '../widgets/hero';
import Text from '../widgets/text';
import Event from './event';
import Game from '../game';

export default class GiftEvent implements Event {
  static PRELUDE    = 0;
  static VIEW_GIFT  = 1;
  static VIEW_PARTY = 2;
  static FINISHED   = 3;
  private heroViewer: HeroWidget;
  private selector: Selector;
  private viewParty: Text;
  private viewGift: Text;
  private continue: Text;
  private state: number;
  private gift: Item;

  constructor() {
    const that = this;
    this.gift = Game.game.data.getRandomItem();
    this.state = GiftEvent.PRELUDE;
    this.heroViewer = new HeroWidget();
    this.selector = new Selector(
      Game.game.party.length(),
      (i: number) => Game.game.party.get(i),
      (value: any) => {
        that.heroViewer.setHero(value as Hero);
      },
      (result: any) => {
        that.state = GiftEvent.FINISHED;
        // Do something here
      }
    );
    this.continue = new Text('continue', 30, 190, false, () => {
      if (this.state === GiftEvent.PRELUDE) {
        this.state = GiftEvent.VIEW_GIFT;
      }
      if (this.state === GiftEvent.FINISHED) {
        Game.game.progress();
      }
    });
    this.viewParty = new Text('view party', 25, 190, false, () => {
      this.state = GiftEvent.VIEW_PARTY;
    });
    this.viewGift = new Text('view gift', 25, 190, false, () => {
      this.state = GiftEvent.VIEW_GIFT;
    });
  }

  click(): void {
    if (this.state === GiftEvent.VIEW_GIFT) {
      this.viewParty.click();
    } else if (this.state === GiftEvent.VIEW_PARTY) {
      if (this.heroViewer.viewingHero()) {
        this.viewGift.click();
        this.selector.click();
      }
      this.heroViewer.click();
    }
    this.continue.click();
  }

  render(view: GameView, r: GraphicsRenderer): void {
    if (this.state === GiftEvent.PRELUDE) {
      r.drawParagraph('a spirit offers a gift to your party', 2, 0);
      this.continue.render(view, r);
    }
    if (this.state === GiftEvent.VIEW_GIFT) {
      view.itemInspection(r, this.gift);
      this.viewParty.render(view, r);
    }
    if (this.state === GiftEvent.VIEW_PARTY) {
      this.heroViewer.render(view, r);
      if (this.heroViewer.viewingHero()) {
        this.viewGift.render(view, r);
        this.selector.render(view, r);
      }
    }
    if (this.state === GiftEvent.FINISHED) {
      r.drawParagraph(`${(this.selector.getSelected() as Hero).name} received the gift`, 0, 0);
      this.continue.render(view, r);
    }
  }
}