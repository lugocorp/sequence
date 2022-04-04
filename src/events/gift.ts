import GraphicsRenderer from '../graphics/renderer';
import GameView from '../views/game';
import Ability from '../entities/ability';
import Item from '../entities/item';
import Hero from '../entities/hero';
import Event from './event';
import Game from '../game';

export default class GiftEvent implements Event {
  static PRELUDE         = 0;
  static VIEW_GIFT       = 1;
  static VIEW_PARTY      = 2;
  static VIEW_ABILITY    = 3;
  static VIEW_ITEM       = 4;
  static FINISHED        = 5;
  heroIndex: number;
  ability: Ability;
  state: number;
  item: Item;
  gift: Item;

  constructor() {
    this.gift = Game.game.data.getRandomItem();
    this.state = GiftEvent.PRELUDE;
    this.heroIndex = 0;
  }

  click(): void {
    if (this.state === GiftEvent.PRELUDE) {
      if (Game.game.within('continue', 30, 190)) {
        this.state = GiftEvent.VIEW_GIFT;
      }
    } else if (this.state === GiftEvent.VIEW_GIFT) {
      if (Game.game.within('view party', 25, 190)) {
        this.state = GiftEvent.VIEW_PARTY;
      }
    } else if (this.state === GiftEvent.VIEW_PARTY) {
      const hero: Hero = Game.game.party.get(this.heroIndex);
      if (hero.ability1 && Game.game.within(hero.ability1.name, 2, 110)) {
        this.state = GiftEvent.VIEW_ABILITY;
        this.ability = hero.ability1;
      }
      if (hero.ability2 && Game.game.within(hero.ability2.name, 2, 120)) {
        this.state = GiftEvent.VIEW_ABILITY;
        this.ability = hero.ability2;
      }
      if (hero.item1 && Game.game.within(hero.item1.name, 2, 140)) {
        this.state = GiftEvent.VIEW_ITEM;
        this.item = hero.item1;
      }
      if (hero.item2 && Game.game.within(hero.item2.name, 2, 150)) {
        this.state = GiftEvent.VIEW_ITEM;
        this.item = hero.item2;
      }
      if (Game.game.within('view gift', 25, 190)) {
        this.state = GiftEvent.VIEW_GIFT;
      }
      if (Game.game.within('last', 2, 180)) {
        this.heroIndex = (this.heroIndex || Game.game.party.length()) - 1;
      }
      if (Game.game.within('choose', 35, 180)) {
        this.state = GiftEvent.FINISHED;
        // Do something here
      }
      if (Game.game.within('next', 78, 180)) {
        this.heroIndex = (this.heroIndex === Game.game.party.length() - 1) ? 0 : this.heroIndex + 1;
      }
    } else if (this.state === GiftEvent.VIEW_ABILITY || this.state === GiftEvent.VIEW_ITEM) {
      if (Game.game.within('back', 40, 190)) {
        this.state = GiftEvent.VIEW_PARTY;
      }
    } else if (this.state === GiftEvent.FINISHED) {
      if (Game.game.within('continue', 30, 101)) {
        Game.game.progress();
      }
    }
  }

  render(view: GameView, r: GraphicsRenderer): void {
    if (this.state === GiftEvent.PRELUDE) {
      r.drawParagraph('a spirit offers a gift to your party', 2, 0);
      r.drawText('continue', 30, 190);
    }
    if (this.state === GiftEvent.VIEW_GIFT) {
      view.itemInspection(r, this.gift);
      r.drawText('view party', 25, 190, true);
    }
    if (this.state === GiftEvent.VIEW_PARTY) {
      view.heroCard(r, Game.game.party.get(this.heroIndex));
      r.drawText('view gift', 25, 190, true);
      r.drawText('last', 2, 180, true);
      r.drawText('next', 78, 180, true);
      r.drawText('choose', 35, 180, true);
    }
    if (this.state === GiftEvent.VIEW_ABILITY) {
      view.abilityInspection(r, this.ability);
      r.drawText('back', 40, 190, true);
    }
    if (this.state === GiftEvent.VIEW_ITEM) {
      view.itemInspection(r, this.item);
      r.drawText('back', 40, 190, true);
    }
    if (this.state === GiftEvent.FINISHED) {
      r.drawParagraph(`${Game.game.party.get(this.heroIndex).name} received the gift`, 0, 0);
      r.drawText('continue', 30, 101, true);
    }
  }
}