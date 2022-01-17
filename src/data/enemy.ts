import {EnemyData} from '../serial/types';
import Element from '../enums/element';
import Sprites from '../enums/sprites';

const data: EnemyData[] = [
  {
    sprite: Sprites.ENEMY,
    name: 'test enemy',
    health: 10,
    damage: 2,
    armor: 2,
    speed: 2,
    damages: [Element.FIRE],
    weaknesses: [Element.WATER],
    resistances: [Element.DEATH],
    ability: 'test blessing'
  }
];

export default data;