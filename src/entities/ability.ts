import {AbilityEffect} from '../enums/effects';

export default class Ability {
  effect: AbilityEffect;
  description: string;
  name: string;

  constructor(name: string, description: string, effect: AbilityEffect) {
    this.description = description;
    this.effect = effect;
    this.name = name;
  }
}