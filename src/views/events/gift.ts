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
    super(Sprites.DIRE_CRAB);
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
    this.setText(`a spirit reveals itself to ${this.hero.name}. it comes bearing a gift of your choosing.`);
    this.setAction('continue', () => that.chooseGift());
    this.giftSelector = Selector.giftSelector(this.options);
    this.heroSelector = Selector.heroSelector([this.hero]);
  }

  chooseGift(): void {
    const that = this;
    this.selector = this.giftSelector;
    this.selector.invalidate();
    this.actions = [
      new Action('view member', () => that.viewHero()),
      new Action('choose', () => that.finish())
    ];
  }

  viewHero(): void {
    const that = this;
    this.selector = this.heroSelector;
    this.selector.invalidate();
    this.setAction('view gifts', () => that.chooseGift());
  }

  finish(): void {
    const gift: Item | Ability = this.giftSelector.item();
    this.hero.receive(gift);
    this.setText(`${this.hero.name} received the spirit's gift of ${gift.name}. the spirit conceals itself once more.`);
    this.setAction('continue', () => Game.game.progress());
  }

  /* private static PRELUDE         = 0;
  private static VIEW_OPTIONS    = 1;
  private static VIEW_HERO       = 2;
  private static FINISHED        = 3;
  private options: Item[] | Ability[];
  private heroViewer: HeroWidget;
  private selector: Selector;
  private viewOptions: Text;
  private viewHero: Text;
  private continue: Text;
  private state: number;
  private hero: Hero;

  constructor() {
    super();
    const that = this;
    this.hero = Game.game.party.randomHero();
    this.state = GiftEvent.PRELUDE;
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
    this.heroViewer = new HeroWidget();
    this.selector = new Selector(
      that.options.length,
      (i: number) => that.options[i],
      undefined,
      (result: any) => {
        that.state = GiftEvent.FINISHED;
        that.hero.receive(result as (Item | Ability));
      }
    );
    this.continue = new Text('continue', 30, 190, false, () => {
      if (that.state === GiftEvent.PRELUDE) {
        that.state = GiftEvent.VIEW_OPTIONS;
      }
      if (that.state === GiftEvent.FINISHED) {
        Game.game.progress();
      }
    });
    this.viewHero = new Text('view hero', 25, 190, false, () => {
      this.state = GiftEvent.VIEW_HERO;
    });
    this.viewOptions = new Text('view options', 20, 190, false, () => {
      this.state = GiftEvent.VIEW_OPTIONS;
    });
  }

  click(): void {
    if (this.state === GiftEvent.VIEW_OPTIONS) {
      this.selector.click();
      this.viewHero.click();
    } else if (this.state === GiftEvent.VIEW_HERO) {
      this.heroViewer.click();
      this.viewOptions.click();
    }
    this.continue.click();
  }

  render(view: GameView, r: GraphicsRenderer): void {
    if (this.state === GiftEvent.PRELUDE) {
      r.drawParagraph(`a spirit reveals itself to ${this.hero.name}. it comes bearing a gift of your choosing.`, 2, 0);
      this.continue.render(view, r);
    }
    if (this.state === GiftEvent.VIEW_OPTIONS) {
      const selected: Item | Ability = this.selector.getSelected() as (Item | Ability);
      if (selected instanceof Item) {
        view.itemInspection(r, selected);
      } else {
        view.abilityInspection(r, selected);
      }
      this.viewHero.render(view, r);
      this.selector.render(view, r);
    }
    if (this.state === GiftEvent.VIEW_HERO) {
      view.heroCard(r, this.hero);
      this.viewOptions.render(view, r);
    }
    if (this.state === GiftEvent.FINISHED) {
      r.drawParagraph(`${this.hero.name} received the spirit's gift of ${(this.selector.getSelected() as Item).name}. the spirit conceals itself once more.`, 0, 0);
      this.continue.render(view, r);
    }
  } */
}