import Trigger from '../enums/trigger';
import {AbilityData} from '../serial/types';
import Unit from '../entities/unit';

const data: AbilityData[] = [
  {
    name: 'test blessing',
    description: 'this ability is for testing a beneficial effect',
    effect: (trigger: Trigger, caster: Unit, data: any) => {
      // Do something here
    }
  },
  {
    name: 'test curse',
    description: 'this ability is for testing a detrimental effect',
    effect: (trigger: Trigger, caster: Unit, data: any) => {
      // Do something here
    }
  }
];

export default data;