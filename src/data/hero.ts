import {HeroData} from '../serial/types';
import Sprites from '../enums/sprites';

const data: HeroData[] = [
  {
    sprite: Sprites.MATRIARCH,
    name: 'matriarch',
    strength: 2,
    wisdom: 4,
    agility: 2,
    itemSlots: 0,
    ability: 'test blessing'
  },
  {
    sprite: Sprites.SWORD_HOLDER,
    name: 'sword holder',
    strength: 1,
    wisdom: 4,
    agility: 2,
    itemSlots: 1
  }
];

export default data;