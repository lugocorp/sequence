import GraphicsRenderer from '../graphics/renderer';
import Ability from '../entities/ability';
import Item from '../entities/item';
import Hero from '../entities/hero';
import GameView from '../views/game';
import Game from '../game';
import Widget from './widget';
import Text from './text';

export default class HeroWidget extends Widget {
  private ability: Ability;
  private item: Item;
  private hero: Hero;
  private back: Text;

  constructor () {
    super();
    const that = this;
    this.setHero(Game.game.party.get(0));
    this.back = new Text('back', 40, 190, false, () => {
      that.ability = undefined;
      that.item = undefined;
    });
  }

  // Sets the hero to be viewed
  setHero(hero: Hero): void {
    this.ability = undefined;
    this.item = undefined;
    this.hero = hero;
  }

  // Returns true if the player is viewing the hero, not an ability or item
  viewingHero(): boolean {
    return this.item === undefined && this.ability === undefined;
  }

  click(): void {
    if (this.viewingHero()) {
      if (this.hero.ability1 && Game.game.within(this.hero.ability1.name, 2, 110)) {
        this.ability = this.hero.ability1;
      }
      if (this.hero.ability2 && Game.game.within(this.hero.ability2.name, 2, 120)) {
        this.ability = this.hero.ability2;
      }
      if (this.hero.item1 && Game.game.within(this.hero.item1.name, 2, 140)) {
        this.item = this.hero.item1;
      }
      if (this.hero.item2 && Game.game.within(this.hero.item2.name, 2, 150)) {
        this.item = this.hero.item2;
      }
    } else {
      this.back.click();
    }
  }

  render(view: GameView, r: GraphicsRenderer): void {
    if (this.ability) {
      view.abilityInspection(r, this.ability);
      this.back.render(view, r);
    } else if (this.item) {
      view.itemInspection(r, this.item);
      this.back.render(view, r);
    } else {
      view.heroCard(r, this.hero);
    }
  }
}