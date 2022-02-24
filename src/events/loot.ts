import GraphicsRenderer from '../graphics/renderer';
import ItemType from '../enums/item-type';
import Trigger from '../enums/trigger';
import GameView from '../views/game';
import Ability from '../entities/ability';
import Hero from '../entities/hero';
import Item from '../entities/item';
import Event from './event';
import Game from '../game';

export default class LootEvent implements Event {
  static PRELUDE      = -1;
  static VIEW_LOOT    = 0;
  static VIEW_PARTY   = 1;
  static VIEW_ABILITY = 2;
  static VIEW_ITEM    = 3;
  static GRABBED      = 4;
  static CONSUMED     = 5;
  static LEFT         = 6;
  heroIndex: number;
  ability: Ability;
  state: number;
  item: Item;
  loot: Item;

  constructor(loot: Item) {
    this.state = LootEvent.PRELUDE;
    this.heroIndex = 0;
    this.loot = loot;
  }

  /**
   * Handle click logic for this event
   */
  click(): void {
    if (this.state === LootEvent.PRELUDE) {
      if (Game.game.within('continue', 30, 190)) {
        this.state = LootEvent.VIEW_LOOT;
      }
    } else if (this.state === LootEvent.VIEW_LOOT) {
      if (Game.game.within('view party', 25, 190)) {
        this.state = LootEvent.VIEW_PARTY;
      }
    } else if (this.state === LootEvent.VIEW_PARTY) {
      const hero: Hero = Game.game.party.get(this.heroIndex);
      if (hero.ability1 && Game.game.within(hero.ability1.name, 2, 110)) {
        this.state = LootEvent.VIEW_ABILITY;
        this.ability = hero.ability1;
      }
      if (hero.ability2 && Game.game.within(hero.ability2.name, 2, 120)) {
        this.state = LootEvent.VIEW_ABILITY;
        this.ability = hero.ability2;
      }
      if (hero.item1 && Game.game.within(hero.item1.name, 2, 140)) {
        this.state = LootEvent.VIEW_ITEM;
        this.item = hero.item1;
      }
      if (hero.item2 && Game.game.within(hero.item2.name, 2, 150)) {
        this.state = LootEvent.VIEW_ITEM;
        this.item = hero.item2;
      }
      if (Game.game.within('last', 2, 180) && Game.game.party.length() > 1) {
        this.heroIndex = (this.heroIndex || Game.game.party.length()) - 1;
      }
      if (Game.game.within('give item', 27.5, 170) && hero.canUseItem(this.loot)) {
        if (this.loot.type === ItemType.EQUIP) {
          hero.equip(this.loot);
          this.state = LootEvent.GRABBED;
        } else {
          this.state = LootEvent.CONSUMED;
        }
        this.loot.effect(Trigger.USED, hero, null);
      }
      if (Game.game.within('drop item', 27.5, 180)) {
        this.state = LootEvent.LEFT;
      }
      if (Game.game.within('view item', 27.5, 190)) {
        this.state = LootEvent.VIEW_LOOT;
      }
      if (Game.game.within('next', 78, 180) && Game.game.party.length() > 1) {
        this.heroIndex = (this.heroIndex === Game.game.party.length() - 1) ? 0 : this.heroIndex + 1;
      }
    } else if (this.state === LootEvent.VIEW_ABILITY || this.state === LootEvent.VIEW_ITEM) {
      if (Game.game.within('back', 40, 190)) {
        this.state = LootEvent.VIEW_PARTY;
      }
    } else if (this.state === LootEvent.GRABBED || this.state === LootEvent.CONSUMED || this.state === LootEvent.LEFT) {
      if (Game.game.within('continue', 30, 190)) {
        Game.game.progress();
      }
    }
  }

  /**
   * Render the loot event-specific view
   */
  render(view: GameView, r: GraphicsRenderer): void {
    if (this.state === LootEvent.PRELUDE) {
      r.drawParagraph('your party came upon a useful item', 2, 0);
      r.drawText('continue', 30, 190, true);
    }
    if (this.state === LootEvent.VIEW_LOOT) {
      view.itemInspection(r, this.loot);
      r.drawText('view party', 25, 190, true);
    }
    if (this.state === LootEvent.VIEW_PARTY) {
      view.heroCard(r, Game.game.party.get(this.heroIndex));
      if (Game.game.party.length() > 1) {
        r.drawText('last', 2, 180, true);
        r.drawText('next', 78, 180, true);
      }
      if (Game.game.party.get(this.heroIndex).canUseItem(this.loot)) {
        r.drawText('give item', 27.5, 170, true);
      }
      r.drawText('drop item', 27.5, 180, true);
      r.drawText('view item', 27.5, 190, true);
    }
    if (this.state === LootEvent.VIEW_ABILITY) {
      view.abilityInspection(r, this.ability);
      r.drawText('back', 40, 190, true);
    }
    if (this.state === LootEvent.VIEW_ITEM) {
      view.itemInspection(r, this.item);
      r.drawText('back', 40, 190, true);
    }
    if (this.state === LootEvent.GRABBED) {
      r.drawParagraph('your party equipped the useful item', 2, 0);
      r.drawText('continue', 30, 190, true);
    }
    if (this.state === LootEvent.CONSUMED) {
      r.drawParagraph('your party took the item and used it', 2, 0);
      r.drawText('continue', 30, 190, true);
    }
    if (this.state === LootEvent.LEFT) {
      r.drawParagraph('your party left the item where it was', 2, 0);
      r.drawText('continue', 30, 190, true);
    }
  }
}