import GraphicsRenderer from '../graphics/renderer';
import TurnData from '../events/turn-data';
import EventChain from '../events/chain';
import Sprites from '../enums/sprites';
import Ability from '../entities/ability';
import Enemy from '../entities/enemy';
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
   * This method renders an enemy card
   */
  enemyCard(r: GraphicsRenderer, enemy: Enemy): void {
    r.drawSprite(enemy.sprite, 2, 2);
    r.drawSprite(Sprites.SPEED, 64, 3);
    r.drawSprite(Sprites.SHIELD, 64, 15);
    r.drawSprite(Sprites.DAMAGE, 64, 27);
    r.drawNumber(enemy.speed, 82, 4);
    r.drawNumber(enemy.armor, 82, 16);
    r.drawNumber(enemy.damage, 82, 28);
    let index = 0;
    enemy.damages.forEach((e: number) => {
      const x = ((index % 3) * 12) + 64;
      const y = index < 3 ? 39 : 51;
      r.drawSprite(r.getDamageSprite(e), x, y);
      index++;
    });
    index = 0;
    r.drawText(enemy.name, 2, 65);
    r.drawSprite(Sprites.HEALTH, 76, 64);
    r.drawNumber(enemy.health, 88, 65);
    r.drawText('weak', 7, 77);
    enemy.weaknesses.forEach((e: number) => {
      r.drawSprite(r.getDamageSprite(e), (index * 11) + 33, 76);
      index++;
    });
    index = 0;
    r.drawText('resist', 2, 89);
    enemy.resistances.forEach((e: number) => {
      r.drawSprite(r.getDamageSprite(e), (index * 11) + 33, 88);
      index++;
    });
    if (enemy.ability) {
      r.drawText(enemy.ability.name, 2, 100);
      r.drawParagraph(enemy.ability.description, 2, 110);
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
    r.drawNumber(hero.speed, 82, 4);
    r.drawNumber(hero.armor, 82, 16);
    r.drawNumber(hero.damage, 82, 28);
    let index = 0;
    hero.damages.forEach((e: number) => {
      const x = ((index % 3) * 12) + 64;
      const y = index < 3 ? 39 : 51;
      r.drawSprite(r.getDamageSprite(e), x, y);
      index++;
    });
    index = 0;
    r.drawText(hero.name, 2, 65);
    r.drawSprite(Sprites.HEALTH, 76, 64);
    r.drawNumber(hero.health, 88, 65);
    r.drawText('weak', 7, 77);
    hero.weaknesses.forEach((e: number) => {
      r.drawSprite(r.getDamageSprite(e), (index * 11) + 33, 76);
      index++;
    });
    index = 0;
    r.drawText('resist', 2, 89);
    hero.resistances.forEach((e: number) => {
      r.drawSprite(r.getDamageSprite(e), (index * 11) + 33, 88);
      index++;
    });
    r.drawText('abilities', 2, 100);
    if (hero.ability1) {
      r.drawText(hero.ability1.name, 2, 110, true);
    } else if (hero.abilitySlots > 0) {
      r.drawText('-', 2, 110);
    }
    if (hero.ability2) {
      r.drawText(hero.ability2.name, 2, 120, true);
    } else if (hero.abilitySlots > 1) {
      r.drawText('-', 2, 120);
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

  /*
   * This method renders a battle animation
   */
  battleAnimation(r: GraphicsRenderer, hero: Hero, enemy: Enemy, turn: TurnData): void {
    // Draw the enemy
    if (!turn.enemyDamaged && enemy.health) {
      r.drawSprite(enemy.sprite, 2, 2);
    }
    r.drawSprite(Sprites.HEALTH, 71, 52);
    r.drawNumber(enemy.health, 83, 53);
    r.drawText(enemy.name, 2, 64);
    // Draw the hero
    if (!turn.heroDamaged && hero.health) {
      r.drawSprite(hero.sprite, 38, 138);
    }
    r.drawSprite(Sprites.HEALTH, 7, 138);
    r.drawNumber(hero.health, 19, 139);
    r.drawText(hero.name, 98 - (hero.name.length * 5), 126);
  }
}