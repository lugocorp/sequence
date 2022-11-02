// Triggers are used to activate effects at certain times during gameplay
export enum Trigger {
  EQUIP, // Fires when the item is equipped
  UNEQUIP, // Fires when the item is unequipped
  CHALLENGE_SUCCESS, // Fires when the hero succeeds a challenge
  CHALLENGE_FAILURE, // Fires when the hero fails a challenge
  START_CHALLENGE, // Fires when the hero is chosen for a challenge
  LEAVES_PARTY, // Fires when the hero leaves the party
  LUCK_CHECK, // Fires when the hero checks their luck stat
  FATIGUE, // Fires when the hero is fatigued
  ENTER_CHALLENGE, // Fires when you init a challenge event
  EXIT_CHALLENGE, // Fires when you unload a challenge event
  RIVER // Fires when the hero interacted with a river
}

// This class handles item and treasure rarity.
export class Rarity {
  static COMMON = 0;
  static UNCOMMON = 1;
  static RARE = 2;
  static LEGENDARY = 3;
  static MYTHIC = 4;

  static values(): number[] {
    return [ Rarity.COMMON, Rarity.UNCOMMON, Rarity.RARE, Rarity.LEGENDARY, Rarity.MYTHIC ];
  }
}
