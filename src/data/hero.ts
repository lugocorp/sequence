import {HeroData} from '../serial/types';
import Sprites from '../enums/sprites';

const data: HeroData[] = [
  {
    sprite: Sprites.MATRIARCH,
    name: 'matriarch',
    strength: 2,
    wisdom: 2,
    agility: 2,
    itemSlots: 0,
    ability: 'test blessing'
  },
  {
    sprite: Sprites.SWORD_HOLDER,
    name: 'sword holder',
    strength: 3,
    wisdom: 3,
    agility: 0,
    itemSlots: 1
  },
  {
    sprite: Sprites.MATRIARCH,
    name: 'molten warrior',
    strength: 2,
    wisdom: 2,
    agility: 2,
    itemSlots: 2
  },
  {
    sprite: Sprites.SWORD_HOLDER,
    name: 'potter',
    strength: 3,
    wisdom: 3,
    agility: 0,
    itemSlots: 2
  },
  {
    sprite: Sprites.MATRIARCH,
    name: 'frost woman',
    strength: 0,
    wisdom: 6,
    agility: 0,
    itemSlots: 1,
    ability: 'test blessing'
  },
  {
    sprite: Sprites.SWORD_HOLDER,
    name: 'web witch',
    strength: 0,
    wisdom: 3,
    agility: 3,
    itemSlots: 1,
    ability: 'test blessing'
  },
  {
    sprite: Sprites.MATRIARCH,
    name: 'storm sage',
    strength: 0,
    wisdom: 3,
    agility: 3,
    itemSlots: 1,
    ability: 'test blessing'
  },
  {
    sprite: Sprites.SWORD_HOLDER,
    name: 'basketweaver',
    strength: 0,
    wisdom: 6,
    agility: 0,
    itemSlots: 2
  },
  {
    sprite: Sprites.MATRIARCH,
    name: 'scribe',
    strength: 0,
    wisdom: 6,
    agility: 0,
    itemSlots: 2,
    ability: 'test blessing'
  },
  {
    sprite: Sprites.SWORD_HOLDER,
    name: 'flame fighter',
    strength: 6,
    wisdom: 0,
    agility: 0,
    itemSlots: 1
  },
  {
    sprite: Sprites.MATRIARCH,
    name: 'sentinel',
    strength: 3,
    wisdom: 3,
    agility: 0,
    itemSlots: 2,
    ability: 'test blessing'
  }
];

export default data;