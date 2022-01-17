import AbilityType from '../enums/ability-type';
import {AbilityData} from '../serial/types';

const data: AbilityData[] = [
  {
    name: 'test blessing',
    type: AbilityType.BLESSING
  },
  {
    name: 'test curse',
    type: AbilityType.CURSE
  }
];

export default data;