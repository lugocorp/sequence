import GraphicsRenderer from '../graphics/renderer';
import GameView from '../views/game';
import Ability from '../entities/ability';
import Item from '../entities/item';
import Hero from '../entities/hero';
import Event from './event';
import Game from '../game';

export default class ChoiceEvent implements Event {
  static PRELUDE         = 0;
  static VIEW_OPTIONS    = 1;
  static VIEW_HERO       = 2;
  static VIEW_ABILITY    = 3;
  static VIEW_ITEM       = 4;
  static FINISHED        = 5;
  choiceIndex: number;
  heroIndex: number;
  ability: Ability;
  options: Item[];
  state: number;
  item: Item;

  constructor() {
    this.heroIndex = Math.floor(Math.random() * Game.game.party.length());
    this.state = ChoiceEvent.PRELUDE;
    this.choiceIndex = 0;
    this.options = [
      Game.game.data.getRandomItem(),
      Game.game.data.getRandomItem(),
      Game.game.data.getRandomItem()
    ];
  }

  click(): void {
    if (this.state === ChoiceEvent.PRELUDE) {
      if (Game.game.within('continue', 30, 190)) {
        this.state = ChoiceEvent.VIEW_OPTIONS;
      }
    } else if (this.state === ChoiceEvent.VIEW_OPTIONS) {
      if (Game.game.within('view hero', 25, 190)) {
        this.state = ChoiceEvent.VIEW_HERO;
      }
      if (Game.game.within('last', 2, 180)) {
        this.choiceIndex = (this.choiceIndex || this.options.length) - 1;
      }
      if (Game.game.within('choose', 35, 180)) {
        this.state = ChoiceEvent.FINISHED;
        // Do something here
      }
      if (Game.game.within('next', 78, 180)) {
        this.choiceIndex = (this.choiceIndex === this.options.length - 1) ? 0 : this.choiceIndex + 1;
      }
    } else if (this.state === ChoiceEvent.VIEW_HERO) {
      const hero: Hero = Game.game.party.get(this.heroIndex);
      if (hero.ability1 && Game.game.within(hero.ability1.name, 2, 110)) {
        this.state = ChoiceEvent.VIEW_ABILITY;
        this.ability = hero.ability1;
      }
      if (hero.ability2 && Game.game.within(hero.ability2.name, 2, 120)) {
        this.state = ChoiceEvent.VIEW_ABILITY;
        this.ability = hero.ability2;
      }
      if (hero.item1 && Game.game.within(hero.item1.name, 2, 140)) {
        this.state = ChoiceEvent.VIEW_ITEM;
        this.item = hero.item1;
      }
      if (hero.item2 && Game.game.within(hero.item2.name, 2, 150)) {
        this.state = ChoiceEvent.VIEW_ITEM;
        this.item = hero.item2;
      }
      if (Game.game.within('view options', 25, 190)) {
        this.state = ChoiceEvent.VIEW_OPTIONS;
      }
    } else if (this.state === ChoiceEvent.VIEW_ABILITY || this.state === ChoiceEvent.VIEW_ITEM) {
      if (Game.game.within('back', 40, 190)) {
        this.state = ChoiceEvent.VIEW_HERO;
      }
    } else if (this.state === ChoiceEvent.FINISHED) {
      if (Game.game.within('continue', 30, 101)) {
        Game.game.progress();
      }
    }
  }

  render(view: GameView, r: GraphicsRenderer): void {
    if (this.state === ChoiceEvent.PRELUDE) {
      r.drawParagraph(`a spirit offers a gift to ${Game.game.party.get(this.heroIndex).name}`, 2, 0);
      r.drawText('continue', 30, 190);
    }
    if (this.state === ChoiceEvent.VIEW_OPTIONS) {
      view.itemInspection(r, this.options[this.choiceIndex]);
      r.drawText('view hero', 25, 190, true);
      r.drawText('last', 2, 180, true);
      r.drawText('next', 78, 180, true);
      r.drawText('choose', 35, 180, true);
    }
    if (this.state === ChoiceEvent.VIEW_HERO) {
      view.heroCard(r, Game.game.party.get(this.heroIndex));
      r.drawText('view options', 25, 190, true);
    }
    if (this.state === ChoiceEvent.VIEW_ABILITY) {
      view.abilityInspection(r, this.ability);
      r.drawText('back', 40, 190, true);
    }
    if (this.state === ChoiceEvent.VIEW_ITEM) {
      view.itemInspection(r, this.item);
      r.drawText('back', 40, 190, true);
    }
    if (this.state === ChoiceEvent.FINISHED) {
      r.drawParagraph(`${Game.game.party.get(this.heroIndex).name} received the gift`, 0, 0);
      r.drawText('continue', 30, 101, true);
    }
  }
}