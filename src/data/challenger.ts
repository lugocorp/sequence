import {ChallengerData} from '../serial/types';
import Sprites from '../enums/sprites';

const data: ChallengerData[] = [
  {
    sprite: Sprites.DIRE_CRAB,
    name: 'fox',
    strength: 6,
    wisdom: 0,
    agility: 0
  },
  {
    sprite: Sprites.TOXIC_SLUDGE,
    name: 'raccoon',
    strength: 2,
    wisdom: 2,
    agility: 2,
    ability: 'test blessing'
  },
  {
    sprite: Sprites.TOOTH_BEAST,
    name: 'sea turtle',
    strength: 3,
    wisdom: 3,
    agility: 0,
    ability: 'test blessing'
  },
  {
    sprite: Sprites.DIRE_CRAB,
    name: 'crab',
    strength: 6,
    wisdom: 0,
    agility: 0
  },
  {
    sprite: Sprites.TOXIC_SLUDGE,
    name: 'guinea pig',
    strength: 2,
    wisdom: 2,
    agility: 2,
    ability: 'test blessing'
  },
  {
    sprite: Sprites.TOOTH_BEAST,
    name: 'axolotl',
    strength: 3,
    wisdom: 3,
    agility: 0,
    ability: 'test blessing'
  }
];

export default data;