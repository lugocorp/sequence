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

  click(x: number, y: number, down: boolean): void {
    // Implement me later
  }

  render(view: GameView, r: GraphicsRenderer): void {
    switch (this.state) {
      case EncounterEvent.VIEW_ENEMY: return view.enemyCard(r, this.enemy);
      case EncounterEvent.VIEW_PARTY: return view.heroCard(r, null);
      case EncounterEvent.VIEW_ABILITY: return view.abilityInspection(r, null);
      case EncounterEvent.VIEW_ITEM: return view.itemInspection(r, null);
      case EncounterEvent.BATTLE: return;
    }
  }
}