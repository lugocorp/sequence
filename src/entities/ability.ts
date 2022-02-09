import AbilityType from '../enums/ability-type';

export default class Ability {
  description: string;
  type: AbilityType;
  name: string;

  constructor(name: string, type: AbilityType, description: string) {
    this.description = description;
    this.name = name;
    this.type = type;
  }
}