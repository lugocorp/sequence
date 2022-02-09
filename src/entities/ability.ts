import AbilityType from '../enums/ability-type';
import {AbilityEffect} from '../effects';

export default class Ability {
  effect: AbilityEffect;
  description: string;
  type: AbilityType;
  name: string;

  constructor(name: string, type: AbilityType, description: string, effect: AbilityEffect) {
    this.description = description;
    this.effect = effect;
    this.name = name;
    this.type = type;
  }
}