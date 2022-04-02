import {ChallengerData} from '../serial/types';
import Sprites from '../enums/sprites';

const data: ChallengerData[] = [
  {
    sprite: Sprites.DIRE_CRAB,
    name: 'dire crab',
    strength: 5,
    wisdom: 2,
    agility: 1
  },
  {
    sprite: Sprites.TOXIC_SLUDGE,
    name: 'toxic sludge',
    strength: 0,
    wisdom: 5,
    agility: 1,
    ability: 'test blessing'
  },
  {
    sprite: Sprites.TOOTH_BEAST,
    name: 'tooth beast',
    strength: 0,
    wisdom: 2,
    agility: 3,
    ability: 'test blessing'
  }
];

export default data;