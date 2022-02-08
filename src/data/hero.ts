import {HeroData} from '../serial/types';
import Damage from '../enums/damage';
import Sprites from '../enums/sprites';
import Slots from '../enums/slots';

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
    itemSlots: Slots.ZERO,
    abilitySlots: Slots.ONE,
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
    itemSlots: Slots.ONE,
    abilitySlots: Slots.ONE
  }
];

export default data;