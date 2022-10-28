import { ChallengerData } from '../serial/types';
import Sprites from '../enums/sprites';

const data: ChallengerData[] = [
  {
    sprite: Sprites.OWL,
    name: 'owl',
    strength: 2,
    wisdom: 2,
    dexterity: 2
  },
  {
    sprite: Sprites.BUTTERFLY,
    name: 'butterfly',
    strength: 0,
    wisdom: 3,
    dexterity: 3
  },
  {
    sprite: Sprites.BEAR,
    name: 'bear',
    strength: 4,
    wisdom: 1,
    dexterity: 1
  },
  {
    sprite: Sprites.AXOLOTL,
    name: 'axolotl',
    strength: 3,
    wisdom: 3,
    dexterity: 0
  }
];

export default data;