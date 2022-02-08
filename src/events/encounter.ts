import GraphicsRenderer from '../graphics/renderer';
import GameView from '../views/game';
import Ability from '../entities/ability';
import Enemy from '../entities/enemy';
import Hero from '../entities/hero';
import Item from '../entities/item';
import TurnData from './turn-data';
import Event from './event';
import Game from '../game';

export default class EncounterEvent implements Event {
  static WIN = 'victory';
  static LOSS = 'defeat';
  static MUTUAL = 'destruction';
  static DRAW = 'stalemate';
  static VIEW_ENEMY   = 0;
  static VIEW_PARTY   = 1;
  static VIEW_ABILITY = 2;
  static VIEW_ITEM    = 3;
  static BATTLE       = 4;
  static FINISHED     = 5;
  heroIndex: number;
  ability: Ability;
  result: string;
  turn: TurnData;
  state: number;
  enemy: Enemy;
  item: Item;

  constructor(enemy: Enemy) {
    this.state = EncounterEvent.VIEW_ENEMY;
    this.heroIndex = 0;
    this.enemy = enemy;
    this.turn = {
      enemyDamaged: false,
      heroDamaged: false,
      enemyArmor: 0,
      heroArmor: 0,
      step: 0
    };
  }

  /**
   * Perform a step of the battle logic
   */
  stepBattleLogic(): void {
    const enemy: Enemy = this.enemy;
    const hero: Hero = Game.game.party.get(this.heroIndex);
    // Check for stalemate condition
    if ((hero.damage * hero.speed <= enemy.armor) && (enemy.damage * enemy.speed <= hero.armor)) {
      this.state = EncounterEvent.FINISHED;
      this.result = EncounterEvent.DRAW;
      Game.game.invalidate();
      return;
    }
    // Iterate turn step and reset armors for the turn
    this.turn.step = (this.turn.step === 6) ? 1 : this.turn.step + 1;
    if (this.turn.step === 1) {
      this.turn.enemyArmor = enemy.armor;
      this.turn.heroArmor = hero.armor;
    }
    // Perform hero attack
    if (this.turn.step % (6 / hero.speed) === 0) {
      const damage = (hero.damage > this.turn.enemyArmor) ? hero.damage - this.turn.enemyArmor : 0;
      this.turn.enemyArmor = this.turn.enemyArmor > hero.damage ? this.turn.enemyArmor - hero.damage : 0;
      enemy.health -= (enemy.health < damage) ? enemy.health : damage;
      this.turn.enemyDamaged = true;
    }
    // Perform enemy attack
    if (this.turn.step % (6 / enemy.speed) === 0) {
      const damage = (enemy.damage > this.turn.heroArmor) ? enemy.damage - this.turn.heroArmor : 0;
      this.turn.heroArmor = this.turn.heroArmor > enemy.damage ? this.turn.heroArmor - enemy.damage : 0;
      hero.health -= (hero.health < damage) ? hero.health : damage;
      this.turn.heroDamaged = true;
    }
    // Animate either character taking damage
    if (this.turn.heroDamaged || this.turn.enemyDamaged) {
      Game.game.invalidate();
      this.turn.enemyDamaged = false;
      this.turn.heroDamaged = false;
      setTimeout(() => Game.game.invalidate(), 66);
    }
    if (!hero.health || !enemy.health) {
      this.state = EncounterEvent.FINISHED;
      this.result = !enemy.health ? EncounterEvent.WIN : EncounterEvent.LOSS;
      if (!hero.health && !enemy.health) {
        this.result = EncounterEvent.MUTUAL;
      }
      return;
    }
    setTimeout(() => this.stepBattleLogic(), 166);
  }

  /**
   * Determine what should happen when the player clicks continue
   * after a battle has concluded.
   */
  postBattleHandler(): void {
    const hero: Hero = Game.game.party.get(this.heroIndex);
    if (!hero.health) {
      Game.game.party.remove(hero);
    }
    Game.game.progress();
  }

  /**
   * Handle click logic for this event
   */
  click(): void {
    if (this.state === EncounterEvent.VIEW_ENEMY) {
      if (Game.game.within('view party', 25, 190)) {
        this.state = EncounterEvent.VIEW_PARTY;
      }
    } else if (this.state === EncounterEvent.VIEW_PARTY) {
      const hero: Hero = Game.game.party.get(this.heroIndex);
      if (hero.ability1 && Game.game.within(hero.ability1.name, 2, 110)) {
        this.state = EncounterEvent.VIEW_ABILITY;
        this.ability = hero.ability1;
      }
      if (hero.ability2 && Game.game.within(hero.ability2.name, 2, 120)) {
        this.state = EncounterEvent.VIEW_ABILITY;
        this.ability = hero.ability2;
      }
      if (hero.item1 && Game.game.within(hero.item1.name, 2, 140)) {
        this.state = EncounterEvent.VIEW_ITEM;
        this.item = hero.item1;
      }
      if (hero.item2 && Game.game.within(hero.item2.name, 2, 150)) {
        this.state = EncounterEvent.VIEW_ITEM;
        this.item = hero.item2;
      }
      if (Game.game.within('last', 2, 180) && Game.game.party.length() > 1) {
        this.heroIndex = (this.heroIndex || Game.game.party.length()) - 1;
      }
      if (Game.game.within('choose', 35, 180)) {
        this.state = EncounterEvent.BATTLE;
        this.stepBattleLogic();
      }
      if (Game.game.within('next', 78, 180) && Game.game.party.length() > 1) {
        this.heroIndex = (this.heroIndex === Game.game.party.length() - 1) ? 0 : this.heroIndex + 1;
      }
      if (Game.game.within('view enemy', 25, 190)) {
        this.state = EncounterEvent.VIEW_ENEMY;
      }
    } else if (this.state === EncounterEvent.VIEW_ABILITY || this.state === EncounterEvent.VIEW_ITEM) {
      if (Game.game.within('back', 40, 190)) {
        this.state = EncounterEvent.VIEW_PARTY;
      }
    } else if (this.state === EncounterEvent.FINISHED) {
      if (Game.game.within('continue', 30, 101)) {
        this.postBattleHandler();
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
    if (this.state === EncounterEvent.BATTLE || this.state === EncounterEvent.FINISHED) {
      view.battleAnimation(r, Game.game.party.get(this.heroIndex), this.enemy, this.turn);
      if (this.state === EncounterEvent.FINISHED) {
        r.drawText(this.result, 50 - (this.result.length * 2.5), 91);
        r.drawText('continue', 30, 101, true);
      }
    }
  }
}