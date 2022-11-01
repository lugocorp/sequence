import { ItemData } from '../serial/types';
import { Rarity } from '../enums/types';
import Sprites from '../enums/sprites';

const data: ItemData[] = [
  {
    name: 'corn',
    sprite: Sprites.CORN,
    rarity: Rarity.COMMON,
    description: '+1 strength'
  },
  {
    name: 'squash',
    sprite: Sprites.SQUASH,
    rarity: Rarity.COMMON,
    description: '+1 wisdom'
  },
  {
    name: 'beans',
    sprite: Sprites.BEANS,
    rarity: Rarity.COMMON,
    description: '+1 dexterity'
  },
  {
    name: 'turquoise bead',
    sprite: Sprites.TURQUOISE,
    rarity: Rarity.COMMON,
    description: '+5% luck'
  },
  {
    name: 'macuahuitl',
    sprite: Sprites.MACUAHUITL,
    rarity: Rarity.UNCOMMON,
    description: '+2 strength, -1 wisdom'
  },
  {
    name: 'quipu',
    sprite: Sprites.QUIPU,
    rarity: Rarity.UNCOMMON,
    description: '+2 wisdom, -1 dexterity'
  },
  {
    name: 'moccasin',
    sprite: Sprites.MOCCASIN,
    rarity: Rarity.UNCOMMON,
    description: '+2 dexterity, -1 strength'
  },
  {
    name: 'medicine bag',
    sprite: Sprites.MEDICINE_BAG,
    rarity: Rarity.UNCOMMON,
    description: '+5% luck to all party members when this character leaves your party'
  },
  {
    name: 'tobacco',
    sprite: Sprites.TOBACCO,
    rarity: Rarity.UNCOMMON,
    description: '+5% luck after a successful challenge'
  },
  {
    name: 'echinacea',
    sprite: Sprites.ECHINACEA,
    rarity: Rarity.RARE,
    description: 'reverts a random stat to its original value after a successful challenge'
  },
  {
    name: 'paw paw',
    sprite: Sprites.PAW_PAW,
    rarity: Rarity.RARE,
    description: "it rains when this item's holder is in a challenge"
  },
  {
    name: 'cassava',
    sprite: Sprites.CASSAVA,
    rarity: Rarity.RARE,
    description: "the wind blows when this item's holder is in a challenge"
  },
  {
    name: 'sunflower',
    sprite: Sprites.SUNFLOWER,
    rarity: Rarity.RARE,
    description: "the clouds dissipate when this item's holder is in a challenge"
  },
  {
    name: 'manoomin rice',
    sprite: Sprites.MANOOMIN_RICE,
    rarity: Rarity.RARE,
    description: "it snows when this item's holder is in a challenge"
  },
  {
    name: 'succotash',
    sprite: Sprites.SUCCOTASH,
    rarity: Rarity.RARE,
    description: '+1 strength\n+1 wisdom\n+1 dexterity'
  },
  {
    name: 'chicha',
    sprite: Sprites.CHICHA,
    rarity: Rarity.LEGENDARY,
    description: '+2 strength\n+2 wisdom\n+2 dexterity'
  },
  {
    name: 'eagle feather',
    sprite: Sprites.EAGLE_FEATHER,
    rarity: Rarity.LEGENDARY,
    description: '+100% luck'
  },
  {
    name: 'turquoise ring',
    sprite: Sprites.TURQUOISE_RING,
    rarity: Rarity.MYTHIC,
    description: '+3 strength\n+3 wisdom\n+3 dexterity'
  }
];

export default data;
