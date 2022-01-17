import AbilityType from '../enums/ability-type';
import {AbilityData} from '../serial/types';

const data: AbilityData[] = [
  {
    name: 'Test Blessing',
    type: AbilityType.BLESSING
  },
  {
    name: 'Test Curse',
    type: AbilityType.CURSE
  }
];

export default data;