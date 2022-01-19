import GraphicsRenderer from '../graphics/renderer';
import GameView from '../views/game';
import Enemy from '../entities/enemy';
import Event from './event';

export default class EncounterEvent implements Event {
  static VIEW_ENEMY   = 0;
  static VIEW_PARTY   = 1;
  static VIEW_ABILITY = 2;
  static VIEW_ITEM    = 3;
  static BATTLE       = 4;
  state: number;
  enemy: Enemy;

  constructor(enemy: Enemy) {
    this.state = EncounterEvent.VIEW_ENEMY;
    this.enemy = enemy;
  }

  click(x: number, y: number): void {
    // Implement me later
  }

  render(view: GameView, r: GraphicsRenderer): void {
    view.enemyCard(r, this.enemy);
  }
}