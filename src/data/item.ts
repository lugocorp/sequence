import ItemType from '../enums/item-type';
import Rarity from '../enums/rarity';
import {ItemData} from './types';

const data: ItemData[] = [
    {
        name: 'Test Equip Item',
        type: ItemType.EQUIP,
        rarity: Rarity.COMMON
    },
    {
        name: 'Test Consume Item',
        type: ItemType.CONSUME,
        rarity: Rarity.COMMON
    },
    {
        name: 'Test Uncommon Item',
        type: ItemType.EQUIP,
        rarity: Rarity.UNCOMMON
    },
    {
        name: 'Test Rare Item',
        type: ItemType.EQUIP,
        rarity: Rarity.RARE
    },
    {
        name: 'Test Legendary Item',
        type: ItemType.EQUIP,
        rarity: Rarity.LEGENDARY
    },
    {
        name: 'Test Mythic Item',
        type: ItemType.EQUIP,
        rarity: Rarity.MYTHIC
    },
];

export default data;