import { Rarity } from '../types';

export default class EnumsHelper {
  static rarities(): Rarity[] {
    return [ Rarity.COMMON, Rarity.UNCOMMON, Rarity.RARE, Rarity.LEGENDARY, Rarity.MYTHIC ];
  }

  static displayRarity(rarity: Rarity): string {
    return [ 'common', 'uncommon', 'rare', 'legendary', 'mythic' ][rarity];
  }
}
