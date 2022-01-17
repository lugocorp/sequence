import GraphicsRenderer from '../graphics/renderer';
import Sprites from '../enums/sprites';
import Element from '../enums/element';
import Enemy from '../entities/enemy';
import Game from '../game';
import View from './view';

export default class GameView implements View {

  /*
   * This method is responsible for handling click events
   */
  click(x: number, y: number): void {
    // Implement me later
  }

  /*
   * This method renders a single frame of the game view
   */
  frame(r: GraphicsRenderer): void {
    this.enemyCard(r, Game.game.data.getRandomEnemy());
  }

  /*
   * This method renders an enemy card
   */
  enemyCard(r: GraphicsRenderer, enemy: Enemy): void {
    r.drawSprite(0x020100, 2, 2); // Image
    r.drawSprite(Sprites.SPEED, 64, 3);
    r.drawSprite(Sprites.SHIELD, 64, 15);
    r.drawSprite(Sprites.DAMAGE, 64, 27);
    r.drawNumber(enemy.speed, 82, 4);
    r.drawNumber(enemy.armor, 82, 16);
    r.drawNumber(enemy.damage, 82, 28);
    let index = 0;
    enemy.damages.forEach((e: Element) => {
      const x = ((index % 3) * 12) + 64;
      const y = index < 3 ? 39 : 51;
      r.drawSprite(r.getElementSprite(e), x, y);
      index++;
    });
    index = 0;
    r.drawText(enemy.name, 2, 65);
    r.drawSprite(Sprites.HEALTH, 76, 64);
    r.drawNumber(enemy.health, 88, 65);
    r.drawText('weak', 7, 77);
    enemy.weaknesses.forEach((e: Element) => {
      r.drawSprite(r.getElementSprite(e), (index * 11) + 33, 76);
      index++;
    });
    index = 0;
    r.drawText('resist', 2, 89);
    enemy.resistances.forEach((e: Element) => {
      r.drawSprite(r.getElementSprite(e), (index * 11) + 33, 88);
      index++;
    });
    if (enemy.ability) {
      r.drawText(enemy.ability.name, 2, 100);
      r.drawParagraph('this is an ability that is really just used for testing. yep, nothing much to see here in this ability!', 2, 110);
    }
  }
}