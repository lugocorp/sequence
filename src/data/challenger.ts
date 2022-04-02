import {ChallengerData} from '../serial/types';
import Sprites from '../enums/sprites';

const data: ChallengerData[] = [
  {
    sprite: Sprites.DIRE_CRAB,
    name: 'dire crab',
    strength: 6,
    wisdom: 0,
    agility: 0
  },
  {
    sprite: Sprites.TOXIC_SLUDGE,
    name: 'toxic sludge',
    strength: 2,
    wisdom: 2,
    agility: 2,
    ability: 'test blessing'
  },
  {
    sprite: Sprites.TOOTH_BEAST,
    name: 'tooth beast',
    strength: 3,
    wisdom: 3,
    agility: 0,
    ability: 'test blessing'
  }
];

export default data;