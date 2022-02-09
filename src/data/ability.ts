import AbilityType from '../enums/ability-type';
import {AbilityData} from '../serial/types';

const data: AbilityData[] = [
  {
    name: 'test blessing',
    type: AbilityType.BLESSING,
    description: 'this ability is for testing good omens'
  },
  {
    name: 'test curse',
    type: AbilityType.CURSE,
    description: 'this ability is for testing bad omens'
  }
];

export default data;