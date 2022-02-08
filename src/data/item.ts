import ItemType from '../enums/item-type';
import {ItemData} from '../serial/types';
import Rarity from '../rarity';

const data: ItemData[] = [
  {
    name: 'test equip item',
    type: ItemType.EQUIP,
    rarity: Rarity.COMMON
  },
  {
    name: 'test consume item',
    type: ItemType.CONSUME,
    rarity: Rarity.COMMON
  },
  {
    name: 'test uncommon item',
    type: ItemType.EQUIP,
    rarity: Rarity.UNCOMMON
  },
  {
    name: 'test rare item',
    type: ItemType.EQUIP,
    rarity: Rarity.RARE
  },
  {
    name: 'test legendary item',
    type: ItemType.EQUIP,
    rarity: Rarity.LEGENDARY
  },
  {
    name: 'test mythic item',
    type: ItemType.EQUIP,
    rarity: Rarity.MYTHIC
  },
];

export default data;