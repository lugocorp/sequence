import GraphicsRenderer from '../graphics/renderer';
import GameView from '../views/game';
import Ability from '../entities/ability';
import Enemy from '../entities/enemy';
import Hero from '../entities/hero';
import Item from '../entities/item';
import Event from './event';
import Game from '../game';

export default class EncounterEvent implements Event {
  static VIEW_ENEMY   = 0;
  static VIEW_PARTY   = 1;
  static VIEW_ABILITY = 2;
  static VIEW_ITEM    = 3;
  static BATTLE       = 4;
  enemyArmorForTurn: number;
  heroArmorForTurn: number;
  enemyDamaged: boolean;
  heroDamaged: boolean;
  battleStep: number;
  stalemate: boolean;
  heroIndex: number;
  ability: Ability;
  state: number;
  done: boolean;
  enemy: Enemy;
  item: Item;

  constructor(enemy: Enemy) {
    this.state = EncounterEvent.VIEW_ENEMY;
    this.enemyDamaged = false;
    this.heroDamaged = false;
    this.stalemate = false;
    this.battleStep = 0;
    this.heroIndex = 0;
    this.enemy = enemy;
    this.done = false;
  }

  /**
   * Perform a step of the battle logic
   */
  stepBattleLogic(): void {
    const enemy: Enemy = this.enemy;
    const hero: Hero = Game.game.party.get(this.heroIndex);
    if ((hero.damage * hero.speed <= enemy.armor) && (enemy.damage * enemy.speed <= hero.armor)) {
      this.stalemate = true;
      Game.game.invalidate();
    }
    this.battleStep = (this.battleStep === 6) ? 1 : this.battleStep + 1;
    if (this.battleStep === 1) {
      this.enemyArmorForTurn = enemy.armor;
      this.heroArmorForTurn = hero.armor;
    }
    if (this.battleStep % (6 / hero.speed) === 0) {
      const damage = (hero.damage > this.enemyArmorForTurn) ? hero.damage - this.enemyArmorForTurn : 0;
      this.enemyArmorForTurn = this.enemyArmorForTurn > hero.damage ? this.enemyArmorForTurn - hero.damage : 0;
      if (damage) {
        enemy.health -= (enemy.health < damage) ? enemy.health : damage;
        this.enemyDamaged = true;
      }
    }
    if (this.battleStep % (6 / enemy.speed) === 0) {
      const damage = (enemy.damage > this.heroArmorForTurn) ? enemy.damage - this.heroArmorForTurn : 0;
      this.heroArmorForTurn = this.heroArmorForTurn > enemy.damage ? this.heroArmorForTurn - enemy.damage : 0;
      if (damage) {
        hero.health -= (hero.health < damage) ? hero.health : damage;
        this.heroDamaged = true;
      }
    }
    if (this.heroDamaged || this.enemyDamaged) {
      Game.game.invalidate();
      this.enemyDamaged = false;
      this.heroDamaged = false;
      setTimeout(() => Game.game.invalidate(), 66);
    }
    if (hero.health && enemy.health && !this.stalemate) {
      setTimeout(() => this.stepBattleLogic(), 166);
    } else {
      this.done = true;
    }
  }

  /**
   * Handle click logic for this event
   */
  click(x: number, y: number, down: boolean): void {
    if (down) {
      return;
    }
    if (this.state === EncounterEvent.VIEW_ENEMY) {
      if (x >= 25 && x <= 75 && y >= 190 && y <= 198) {
        this.state = EncounterEvent.VIEW_PARTY;
      }
    } else if (this.state === EncounterEvent.VIEW_PARTY) {
      const hero: Hero = Game.game.party.get(this.heroIndex);
      if (hero.ability1 && x >= 2 && x <= 2 + (hero.ability1.name.length * 5) && y >= 110 && y <= 118) {
        this.state = EncounterEvent.VIEW_ABILITY;
        this.ability = hero.ability1;
      }
      if (hero.ability2 && x >= 2 && x <= 2 + (hero.ability2.name.length * 5) && y >= 120 && y <= 128) {
        this.state = EncounterEvent.VIEW_ABILITY;
        this.ability = hero.ability2;
      }
      if (hero.item1 && x >= 2 && x <= 2 + (hero.item1.name.length * 5) && y >= 140 && y <= 148) {
        this.state = EncounterEvent.VIEW_ITEM;
        this.item = hero.item1;
      }
      if (hero.item2 && x >= 2 && x <= 2 + (hero.item2.name.length * 5) && y >= 150 && y <= 158) {
        this.state = EncounterEvent.VIEW_ITEM;
        this.item = hero.item2;
      }
      if (x >= 2 && x <= 22 && y >= 180 && y <= 188) {
        this.heroIndex = (this.heroIndex || Game.game.party.length()) - 1;
      }
      if (x >= 35 && x <= 65 && y >= 180 && y <= 188) {
        this.state = EncounterEvent.BATTLE;
        this.stepBattleLogic();
      }
      if (x >= 78 && x <= 98 && y >= 180 && y <= 188) {
        this.heroIndex = (this.heroIndex === Game.game.party.length() - 1) ? 0 : this.heroIndex + 1;
      }
      if (x >= 25 && x <= 75 && y >= 190 && y <= 198) {
        this.state = EncounterEvent.VIEW_ENEMY;
      }
    } else if (this.state === EncounterEvent.VIEW_ABILITY || this.state === EncounterEvent.VIEW_ITEM) {
      if (x >= 40 && x <= 60 && y >= 190 && y <= 198) {
        this.state = EncounterEvent.VIEW_PARTY;
      }
    } else if (this.state === EncounterEvent.BATTLE) {
      if (this.done && x >= 30 && x <= 70 && y >= 101 && y <= 109) {
        console.log('Move on from battle');
        // Implement something else here, call something
      }
    }
  }

  /**
   * Render the encounter event-specific view
   */
  render(view: GameView, r: GraphicsRenderer): void {
    if (this.state === EncounterEvent.VIEW_ENEMY) {
      view.enemyCard(r, this.enemy);
      r.drawText('view party', 25, 190, true);
    }
    if (this.state === EncounterEvent.VIEW_PARTY) {
      view.heroCard(r, Game.game.party.get(this.heroIndex));
      if (Game.game.party.length() > 1) {
        r.drawText('last', 2, 180, true);
        r.drawText('next', 78, 180, true);
      }
      r.drawText('choose', 35, 180, true);
      r.drawText('view enemy', 25, 190, true);
    }
    if (this.state === EncounterEvent.VIEW_ABILITY) {
      view.abilityInspection(r, this.ability);
      r.drawText('back', 40, 190, true);
    }
    if (this.state === EncounterEvent.VIEW_ITEM) {
      view.itemInspection(r, this.item);
      r.drawText('back', 40, 190, true);
    }
    if (this.state === EncounterEvent.BATTLE) {
      view.battleAnimation(r, Game.game.party.get(this.heroIndex), this.enemy, !this.heroDamaged, !this.enemyDamaged, this.stalemate);
    }
  }
}