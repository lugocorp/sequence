import {HeroData} from '../serial/types';
import Sprites from '../enums/sprites';

const data: HeroData[] = [
  {
    sprite: Sprites.MATRIARCH,
    name: 'matriarch',
    strength: 2,
    wisdom: 2,
    dexterity: 2,
    itemSlots: 0,
    ability: 'test blessing'
  },
  {
    sprite: Sprites.SWORD_HOLDER,
    name: 'sword holder',
    strength: 3,
    wisdom: 3,
    dexterity: 0,
    itemSlots: 1
  },
  {
    sprite: Sprites.MATRIARCH,
    name: 'molten warrior',
    strength: 2,
    wisdom: 2,
    dexterity: 2,
    itemSlots: 2
  },
  {
    sprite: Sprites.POTTER,
    name: 'potter',
    strength: 3,
    wisdom: 3,
    dexterity: 0,
    itemSlots: 2
  },
  {
    sprite: Sprites.GOURD_ELDER,
    name: 'frost woman',
    strength: 0,
    wisdom: 6,
    dexterity: 0,
    itemSlots: 1,
    ability: 'test blessing'
  },
  {
    sprite: Sprites.GOURD_ELDER,
    name: 'web witch',
    strength: 0,
    wisdom: 3,
    dexterity: 3,
    itemSlots: 1,
    ability: 'test blessing'
  },
  {
    sprite: Sprites.GOURD_ELDER,
    name: 'storm sage',
    strength: 0,
    wisdom: 3,
    dexterity: 3,
    itemSlots: 1,
    ability: 'test blessing'
  },
  {
    sprite: Sprites.POTTER,
    name: 'basketweaver',
    strength: 0,
    wisdom: 6,
    dexterity: 0,
    itemSlots: 2
  },
  {
    sprite: Sprites.POTTER,
    name: 'scribe',
    strength: 0,
    wisdom: 6,
    dexterity: 0,
    itemSlots: 2,
    ability: 'test blessing'
  },
  {
    sprite: Sprites.SWORD_HOLDER,
    name: 'flame fighter',
    strength: 6,
    wisdom: 0,
    dexterity: 0,
    itemSlots: 1
  },
  {
    sprite: Sprites.MATRIARCH,
    name: 'sentinel',
    strength: 3,
    wisdom: 3,
    dexterity: 0,
    itemSlots: 2,
    ability: 'test blessing'
  },
  {
    sprite: Sprites.GOURD_ELDER,
    name: 'gourd elder',
    strength: 0,
    wisdom: 4,
    dexterity: 2,
    itemSlots: 3
  },
  {
    sprite: Sprites.BIRD_CATCHER,
    name: 'bird catcher',
    strength: 1,
    wisdom: 2,
    dexterity: 3,
    itemSlots: 1
  },
  {
    sprite: Sprites.GOURD_ELDER,
    name: 'corn woman',
    strength: 4,
    wisdom: 1,
    dexterity: 1,
    itemSlots: 2
  },
  {
    sprite: Sprites.GOURD_ELDER,
    name: 'squash lady',
    strength: 1,
    wisdom: 4,
    dexterity: 1,
    itemSlots: 2
  },
  {
    sprite: Sprites.GOURD_ELDER,
    name: 'bean girl',
    strength: 1,
    wisdom: 1,
    dexterity: 4,
    itemSlots: 2
  }
];

export default data;