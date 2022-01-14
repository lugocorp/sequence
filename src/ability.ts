import AbilityType from './ability-type';

export default class Ability {
    type: AbilityType;
    name: string;

    constructor(name: string, type: AbilityType) {
        this.name = name;
        this.type = type;
    }
}