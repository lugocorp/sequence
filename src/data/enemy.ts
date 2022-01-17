import Element from '../enums/element';
import {EnemyData} from '../serial/types';

const data: EnemyData[] = [
  {
    name: 'Test Enemy',
    health: 10,
    damage: 2,
    armor: 2,
    speed: 2,
    damages: [Element.FIRE],
    weaknesses: [Element.WATER],
    resistances: [Element.DEATH]
  }
];

export default data;