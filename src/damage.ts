import Unit from './entities/unit';

/**
 * This class handles damage logic
 */
export default class Damage {
  static PIERCING = 0;
  static BLUNT    = 1;
  static FIRE     = 2;
  static FROST    = 3;
  static LIGHT    = 4;
  static DEATH    = 5;

  /**
   * Returns how much we should increase or decrease an attack by
   * given the damage types involved.
   */
  static getTypedDamageModifier(attacker: Unit, defender: Unit): number {
    let modifier = 0;
    attacker.damages.forEach((dmg) => {
      modifier -= Array.from(defender.resistances).reduce((total, x) => (x === dmg ? 1 : 0) + total, 0);
      modifier += Array.from(defender.weaknesses).reduce((total, x) => (x === dmg ? 1 : 0) + total, 0);
    });
    return modifier;
  }
}