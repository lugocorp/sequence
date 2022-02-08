import {EnemyData} from '../serial/types';
import Damage from '../enums/damage';
import Sprites from '../enums/sprites';

const data: EnemyData[] = [
  {
    sprite: Sprites.DIRE_CRAB,
    name: 'dire crab',
    health: 10,
    armor: 2,
    damage: 5,
    speed: 1,
    damages: [Damage.PIERCING],
    weaknesses: [Damage.DEATH],
    resistances: [Damage.BLUNT],
  },
  {
    sprite: Sprites.TOXIC_SLUDGE,
    name: 'toxic sludge',
    health: 15,
    armor: 0,
    damage: 5,
    speed: 1,
    damages: [Damage.DEATH],
    weaknesses: [Damage.LIGHT],
    resistances: [Damage.PIERCING],
    ability: 'test blessing'
  },
  {
    sprite: Sprites.TOOTH_BEAST,
    name: 'tooth beast',
    health: 15,
    armor: 0,
    damage: 2,
    speed: 3,
    damages: [Damage.PIERCING],
    weaknesses: [Damage.DEATH],
    resistances: [Damage.BLUNT],
    ability: 'test blessing'
  }
];

export default data;