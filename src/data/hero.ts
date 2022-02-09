import {HeroData} from '../serial/types';
import Damage from '../damage';
import Sprites from '../enums/sprites';

const data: HeroData[] = [
  {
    sprite: Sprites.MATRIARCH,
    name: 'matriarch',
    health: 20,
    armor: 2,
    damage: 4,
    speed: 2,
    damages: [Damage.PIERCING],
    weaknesses: [Damage.DEATH],
    resistances: [Damage.BLUNT],
    itemSlots: 0,
    abilitySlots: 1,
    ability1: 'test blessing'
  },
  {
    sprite: Sprites.SWORD_HOLDER,
    name: 'sword holder',
    health: 20,
    armor: 1,
    damage: 4,
    speed: 2,
    damages: [Damage.PIERCING],
    weaknesses: [Damage.DEATH],
    resistances: [Damage.BLUNT],
    itemSlots: 1,
    abilitySlots: 1
  }
];

export default data;