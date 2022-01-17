import Sprites from '../enums/sprites';
import Slots from '../enums/slots';
import Ability from './ability';
import Item from './item';
import Unit from './unit';

export default class Hero extends Unit {
  abilitySlots: Slots;
  ability1: Ability;
  ability2: Ability;
  itemSlots: Slots;
  item1: Item;
  item2: Item;

  constructor(sprite: Sprites, name: string, health: number, damage: number, armor: number, speed: number, itemSlots: Slots, abilitySlots: Slots) {
    super(sprite, name, health, damage, armor, speed);
    this.abilitySlots = abilitySlots;
    this.itemSlots = itemSlots;
  }
}