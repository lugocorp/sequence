import {Trigger} from '../enums/types';
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
  },
  {
    name: 'fox\'s blessing',
    description: 'this blessing is granted by a fox',
    effect: (trigger: Trigger, caster: Unit, data: any) => {
      // Do something here
    }
  },
  {
    name: 'eagle\'s blessing',
    description: 'this blessing is granted by an eagle',
    effect: (trigger: Trigger, caster: Unit, data: any) => {
      // Do something here
    }
  },
  {
    name: 'buffalo\'s blessing',
    description: 'this blessing is granted by a buffalo',
    effect: (trigger: Trigger, caster: Unit, data: any) => {
      // Do something here
    }
  }
];

export default data;