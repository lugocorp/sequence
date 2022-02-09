import AbilityType from '../enums/ability-type';
import Trigger from '../enums/trigger';
import {AbilityData} from '../serial/types';
import Unit from '../entities/unit';

const data: AbilityData[] = [
  {
    name: 'test blessing',
    type: AbilityType.BLESSING,
    description: 'this ability is for testing good omens',
    effect: (trigger: Trigger, caster: Unit, data: any) => {
      // Do something here
    }
  },
  {
    name: 'test curse',
    type: AbilityType.CURSE,
    description: 'this ability is for testing bad omens',
    effect: (trigger: Trigger, caster: Unit, data: any) => {
      // Do something here
    }
  }
];

export default data;