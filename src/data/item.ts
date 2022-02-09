import ItemType from '../enums/item-type';
import {ItemData} from '../serial/types';
import Rarity from '../rarity';

const data: ItemData[] = [
  {
    name: 'test equip item',
    type: ItemType.EQUIP,
    rarity: Rarity.COMMON,
    description: 'this is a test item'
  },
  {
    name: 'test consume item',
    type: ItemType.CONSUME,
    rarity: Rarity.COMMON,
    description: 'this is a test item'
  },
  {
    name: 'test uncommon item',
    type: ItemType.EQUIP,
    rarity: Rarity.UNCOMMON,
    description: 'this is a test item'
  },
  {
    name: 'test rare item',
    type: ItemType.EQUIP,
    rarity: Rarity.RARE,
    description: 'this is a test item'
  },
  {
    name: 'test legendary item',
    type: ItemType.EQUIP,
    rarity: Rarity.LEGENDARY,
    description: 'this is a test item'
  },
  {
    name: 'test mythic item',
    type: ItemType.EQUIP,
    rarity: Rarity.MYTHIC,
    description: 'this is a test item'
  },
];

export default data;