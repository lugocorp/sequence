import GraphicsRenderer from '../../graphics/renderer';
import Sprites from '../../enums/sprites';
import Hero from '../../entities/hero';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import View from '../../ui/view';
import Game from '../../game';

/*
 * In this event you choose a party member to leave behind.
 */
export default class TrapEvent extends View {
  private heroSelector: Selector<Hero>;

  constructor() {
    super(Sprites.DIRE_CRAB, 'you must choose a party member to let go.');
    const that = this;
    this.setAction('continue', (): void => that.heroViewer());
    this.heroSelector = Selector.heroSelector(Game.game.party.members);
  }

  heroViewer(): void {
    const that = this;
    this.selector = this.heroSelector;
    this.setAction('choose', () => that.finished());
    this.selector.invalidate();
  }

  finished(): void {
    const hero: Hero = this.heroSelector.item();
    this.setText(`${hero.name} was let go from your party.`);
    this.setAction('continue', () => {
      Game.game.party.remove(hero);
      Game.game.progress();
    });
    this.selector = undefined;
  }

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