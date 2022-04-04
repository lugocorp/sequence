import GraphicsRenderer from '../graphics/renderer';
import EventChain from '../events/chain';
import Sprites from '../enums/sprites';
import Challenger from '../entities/challenger';
import Ability from '../entities/ability';
import Hero from '../entities/hero';
import Item from '../entities/item';
import View from './view';

export default class GameView extends View {
  chain: EventChain;

  constructor(chain: EventChain) {
    super();
    this.chain = chain;
  }

  /*
   * This method is responsible for handling click events
   */
  click(): void {
    this.chain.latest().click();
  }

  /*
   * This method renders a single frame of the game view
   */
  frame(r: GraphicsRenderer): void {
    this.chain.latest().render(this, r);
  }

  /*
   * This method renders a challenger card
   */
  challengerCard(r: GraphicsRenderer, challenger: Challenger): void {
    r.drawSprite(challenger.sprite, 2, 2);
    r.drawSprite(Sprites.SPEED, 64, 3);
    r.drawSprite(Sprites.SHIELD, 64, 15);
    r.drawSprite(Sprites.DAMAGE, 64, 27);
    r.drawNumber(challenger.strength, 82, 4);
    r.drawNumber(challenger.wisdom, 82, 16);
    r.drawNumber(challenger.agility, 82, 28);
    r.drawText(challenger.name, 2, 65);
    r.drawSprite(Sprites.HEALTH, 76, 64);
    if (challenger.ability) {
      r.drawText(challenger.ability.name, 2, 100);
      r.drawParagraph(challenger.ability.description, 2, 110);
    }
  }
  
  /*
   * This method renders a hero card
   */
  heroCard(r: GraphicsRenderer, hero: Hero): void {
    r.drawSprite(hero.sprite, 2, 2);
    r.drawSprite(Sprites.SPEED, 64, 3);
    r.drawSprite(Sprites.SHIELD, 64, 15);
    r.drawSprite(Sprites.DAMAGE, 64, 27);
    r.drawNumber(hero.strength, 82, 4);
    r.drawNumber(hero.wisdom, 82, 16);
    r.drawNumber(hero.agility, 82, 28);
    r.drawText(hero.name, 2, 65);
    r.drawSprite(Sprites.HEALTH, 76, 64);
    r.drawText('weak', 7, 77);
    r.drawText('resist', 2, 89);
    r.drawText('abilities', 2, 100);
    if (hero.ability1) {
      r.drawText(hero.ability1.name, 2, 110, true);
    } else {
      r.drawText('-', 2, 110);
    }
    if (hero.ability2) {
      r.drawText(hero.ability2.name, 2, 120, true);
    }
    r.drawText('items', 2, 130);
    if (hero.item1) {
      r.drawText(hero.item1.name, 2, 140, true);
    } else if (hero.itemSlots > 0) {
      r.drawText('-', 2, 140);
    }
    if (hero.item2) {
      r.drawText(hero.item2.name, 2, 150, true);
    } else if (hero.itemSlots > 1) {
      r.drawText('-', 2, 150);
    }
  }

  /*
   * This method renders an ability inspection
   */
  abilityInspection(r: GraphicsRenderer, ability: Ability): void {
    r.drawText(ability.name, 2, 2);
    r.drawParagraph(ability.description, 2, 20);
  }

  /*
   * This method renders an item inspection
   */
  itemInspection(r: GraphicsRenderer, item: Item): void {
    r.drawText(item.name, 2, 2);
    r.drawParagraph(item.description, 2, 20);
  }
}