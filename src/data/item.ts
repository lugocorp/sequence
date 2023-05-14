import { ItemData } from '../serial/types';
import Sprites from '../media/sprites';
import Rarity from '../enums/rarity';

const data: ItemData[] = [
  {
    name: 'corn',
    sprite: Sprites.CORN,
    rarity: Rarity.COMMON,
    description: '+1 strength.'
  },
  {
    name: 'squash',
    sprite: Sprites.SQUASH,
    rarity: Rarity.COMMON,
    description: '+1 wisdom.'
  },
  {
    name: 'beans',
    sprite: Sprites.BEANS,
    rarity: Rarity.COMMON,
    description: '+1 dexterity.'
  },
  {
    name: 'turquoise bead',
    sprite: Sprites.TURQUOISE_BEAD,
    rarity: Rarity.COMMON,
    description: '+5% luck.'
  },
  {
    name: 'copper axe',
    sprite: Sprites.COPPER_AXE,
    rarity: Rarity.UNCOMMON,
    description: '+2 strength, -1 wisdom.'
  },
  {
    name: 'quipu',
    sprite: Sprites.QUIPU,
    rarity: Rarity.UNCOMMON,
    description: '+2 wisdom, -1 dexterity.'
  },
  {
    name: 'moccasins',
    sprite: Sprites.MOCCASINS,
    rarity: Rarity.UNCOMMON,
    description: '+2 dexterity, -1 strength.'
  },
  {
    name: 'fry bread',
    sprite: Sprites.FRY_BREAD,
    rarity: Rarity.UNCOMMON,
    description: '+2 to all stats if you have 3 or fewer party members.'
  },
  {
    name: 'sack of gold',
    sprite: Sprites.SACK_OF_GOLD,
    rarity: Rarity.UNCOMMON,
    description: '+1 to all stats during the day.'
  },
  {
    name: 'sack of silver',
    sprite: Sprites.SACK_OF_SILVER,
    rarity: Rarity.UNCOMMON,
    description: '+1 to all stats at night.'
  },
  {
    name: 'paw paw',
    sprite: Sprites.PAW_PAW,
    rarity: Rarity.UNCOMMON,
    description: '+1 to all stats in rainy weather.'
  },
  {
    name: 'cassava',
    sprite: Sprites.CASSAVA,
    rarity: Rarity.UNCOMMON,
    description: '+1 to all stats in windy weather.'
  },
  {
    name: 'sunflower',
    sprite: Sprites.SUNFLOWER,
    rarity: Rarity.UNCOMMON,
    description: '+1 to all stats in sunny weather.'
  },
  {
    name: 'crowberry',
    sprite: Sprites.CROWBERRY,
    rarity: Rarity.UNCOMMON,
    description: '+1 to all stats in snowy weather.'
  },
  {
    name: 'succotash',
    sprite: Sprites.SUCCOTASH,
    rarity: Rarity.RARE,
    description: '+1 strength, +1 wisdom, +1 dexterity.'
  },
  {
    name: 'macuahuitl',
    sprite: Sprites.MACUAHUITL,
    rarity: Rarity.RARE,
    description: '+2 strength, -5% luck.'
  },
  {
    name: 'amoxtli',
    sprite: Sprites.AMOXTLI,
    rarity: Rarity.RARE,
    description: '+2 wisdom, -5% luck.'
  },
  {
    name: 'huarache',
    sprite: Sprites.HUARACHE,
    rarity: Rarity.RARE,
    description: '+2 dexterity, -5% luck.'
  },
  {
    name: 'corn and bean soup',
    sprite: Sprites.CORN_AND_BEAN_SOUP,
    rarity: Rarity.LEGENDARY,
    description: '+2 strength, +2 wisdom, +2 dexterity.'
  },
  {
    name: 'eagle feather',
    sprite: Sprites.EAGLE_FEATHER,
    rarity: Rarity.LEGENDARY,
    description: '+100% luck.'
  },
  {
    name: 'turquoise ring',
    sprite: Sprites.TURQUOISE_RING,
    rarity: Rarity.MYTHIC,
    description: '+3 strength, +3 wisdom, +3 dexterity.'
  }
];

export default data;
