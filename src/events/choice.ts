import GraphicsRenderer from '../graphics/renderer';
import GameView from '../views/game';
import Item from '../entities/item';
import Hero from '../entities/hero';
import Selector from '../widgets/selector';
import HeroWidget from '../widgets/hero';
import Text from '../widgets/text';
import Event from './event';
import Game from '../game';

export default class ChoiceEvent implements Event {
  static PRELUDE         = 0;
  static VIEW_OPTIONS    = 1;
  static VIEW_HERO       = 2;
  static FINISHED        = 3;
  private heroViewer: HeroWidget;
  private selector: Selector;
  private viewOptions: Text;
  private viewHero: Text;
  private continue: Text;
  private options: Item[];
  private state: number;
  private hero: Hero;

  constructor() {
    const that = this;
    this.hero = Game.game.party.randomHero();
    this.state = ChoiceEvent.PRELUDE;
    this.options = [
      Game.game.data.getRandomItem(),
      Game.game.data.getRandomItem(),
      Game.game.data.getRandomItem()
    ];
    this.heroViewer = new HeroWidget();
    this.selector = new Selector(
      that.options.length,
      (i: number) => that.options[i],
      (value: any) => undefined,
      (result: any) => {
        that.state = ChoiceEvent.FINISHED;
        // Do something here
      }
    );
    this.continue = new Text('continue', 30, 190, false, () => {
      if (this.state === ChoiceEvent.PRELUDE) {
        this.state = ChoiceEvent.VIEW_OPTIONS;
      }
      if (this.state === ChoiceEvent.FINISHED) {
        Game.game.progress();
      }
    });
    this.viewHero = new Text('view hero', 25, 190, false, () => {
      this.state = ChoiceEvent.VIEW_HERO;
    });
    this.viewOptions = new Text('view options', 25, 190, false, () => {
      this.state = ChoiceEvent.VIEW_OPTIONS;
    });
  }

  click(): void {
    if (this.state === ChoiceEvent.VIEW_OPTIONS) {
      this.selector.click();
      this.viewHero.click();
    } else if (this.state === ChoiceEvent.VIEW_HERO) {
      this.heroViewer.click();
      this.viewOptions.click();
    }
    this.continue.click();
  }

  render(view: GameView, r: GraphicsRenderer): void {
    if (this.state === ChoiceEvent.PRELUDE) {
      r.drawParagraph(`a spirit offers a gift to ${this.hero.name}`, 2, 0);
      this.continue.render(view, r);
    }
    if (this.state === ChoiceEvent.VIEW_OPTIONS) {
      view.itemInspection(r, this.selector.getSelected() as Item);
      this.viewHero.render(view, r);
      this.selector.render(view, r);
    }
    if (this.state === ChoiceEvent.VIEW_HERO) {
      view.heroCard(r, this.hero);
      this.viewOptions.render(view, r);
    }
    if (this.state === ChoiceEvent.FINISHED) {
      r.drawParagraph(`${this.hero.name} received the gift`, 0, 0);
      this.continue.render(view, r);
    }
  }
}