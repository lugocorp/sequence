/**
 * This class handles item and treasure rarity.
 */
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

  static roll(max = Rarity.MYTHIC): number {
    const ranges: number[] = [];
    const step = 10;
    let pool = 0;
    for (let r = 0; r < max + 1; r++) {
      const range: number = Math.pow(step, max - r);
      ranges.push(range);
      pool += range;
    }
    let roll = Math.floor(Math.random() * pool);
    for (let r = 0; r < max + 1; r++) {
      if (roll < ranges[r]) {
        return r;
      }
      roll -= ranges[r];
    }
  }
}