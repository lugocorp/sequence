// This class handles item and treasure rarity.
export default class Rarity {
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

  static display(rarity: number): string {
    return [
      'common',
      'uncommon',
      'rare',
      'legendary',
      'mythic'
    ][rarity];
  }
}