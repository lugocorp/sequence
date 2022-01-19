import {EnemyData} from '../serial/types';
import Damage from '../enums/damage';
import Sprites from '../enums/sprites';

const data: EnemyData[] = [
  {
    sprite: Sprites.ENEMY,
    name: 'test enemy',
    health: 10,
    damage: 2,
    armor: 2,
    speed: 2,
    damages: [Damage.PIERCING],
    weaknesses: [Damage.DEATH],
    resistances: [Damage.BLUNT],
    ability: 'test blessing'
  }
];

export default data;