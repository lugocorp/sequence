import {HeroData} from '../serial/types';
import Damage from '../enums/damage';
import Sprites from '../enums/sprites';
import Slots from '../enums/slots';

const data: HeroData[] = [
  {
    sprite: Sprites.ENEMY,
    name: 'test hero',
    health: 10,
    damage: 2,
    armor: 2,
    speed: 2,
    damages: [Damage.PIERCING],
    weaknesses: [Damage.DEATH],
    resistances: [Damage.BLUNT],
    abilitySlots: Slots.TWO,
    itemSlots: Slots.TWO,
    ability1: 'test blessing'
  }
];

export default data;