
// Triggers are used to activate effects at certain times during gameplay
export enum Trigger {
  EQUIP,          // This trigger fires when the item is equipped
  UNEQUIP         // This trigger fires when the item is unequipped
}

// This class handles item and treasure rarity.
export class Rarity {
  static COMMON    = 0;
  static UNCOMMON  = 1;
  static RARE      = 2;
  static LEGENDARY = 3;
  static MYTHIC    = 4;

  static values(): number[] {
    return [
      Rarity.COMMON,
      Rarity.UNCOMMON,
      Rarity.RARE,
      Rarity.LEGENDARY,
      Rarity.MYTHIC
    ];
  }
}