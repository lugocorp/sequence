import GraphicsRenderer from '../graphics/renderer';
import Hero from '../entities/hero';
import View from '../graphics/view';
import Game from '../game';

/*
 * In this event you choose a party member to leave behind.
 */
export default class TrapEvent extends View {
  /* static PRELUDE    = 0;
  static VIEW_PARTY = 1;
  static FINISHED   = 2;
  private heroViewer: HeroWidget;
  private selector: Selector;
  private selected: Hero;
  private continue: Text;
  private state: number;

  constructor() {
    super();
    const that = this;
    this.state = TrapEvent.PRELUDE;
    this.heroViewer = new HeroWidget();
    this.selector = new Selector(
      Game.game.party.length(),
      (i: number) => Game.game.party.get(i),
      (value: any) => {
        that.heroViewer.setHero(value as Hero);
      },
      (result: any) => {
        that.state = TrapEvent.FINISHED;
        that.selected = result as Hero;
      }
    );
    this.continue = new Text('continue', 30, 190, false, () => {
      if (that.state === TrapEvent.PRELUDE) {
        that.state = TrapEvent.VIEW_PARTY;
      }
      if (that.state === TrapEvent.FINISHED) {
        Game.game.party.remove(that.selected);
        Game.game.progress();
      }
    });
  }

  click(): void {
    if (this.state === TrapEvent.VIEW_PARTY) {
      if (this.heroViewer.viewingHero()) {
        this.selector.click();
      }
      this.heroViewer.click();
    }
    this.continue.click();
  }

  render(view: GameView, r: GraphicsRenderer): void {
    if (this.state === TrapEvent.PRELUDE) {
      r.drawParagraph(`you must choose a perty member to let go.`, 2, 0);
      this.continue.render(view, r);
    }
    if (this.state === TrapEvent.VIEW_PARTY) {
      this.heroViewer.render(view, r);
      if (this.heroViewer.viewingHero()) {
        this.selector.render(view, r);
      }
    }
    if (this.state === TrapEvent.FINISHED) {
      r.drawParagraph(`${this.selected.name} was let go from your party.`, 0, 0);
      this.continue.render(view, r);
    }
  } */
}