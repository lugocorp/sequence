import Effect from '../enums/effects';

export default class Ability {
  effect: Effect;
  description: string;
  name: string;

  constructor(name: string, description: string, effect: Effect) {
    this.description = description;
    this.effect = effect;
    this.name = name;
  }

  descriptionText(): string {
    return `${this.name}\n${this.description}`;
  }
}