import Element from './element';

export default abstract class Unit {
    resistances: Set<Element> = new Set();
    weaknesses: Set<Element> = new Set();
    damages: Set<Element> = new Set();
    maxHealth: number;
    health: number;
    damage: number;
    armor: number;
    speed: number;
    name: string;

    constructor(name: string, health: number, damage: number, armor: number, speed: number) {
        this.maxHealth = health;
        this.health = health;
        this.damage = damage;
        this.armor = armor;
        this.speed = speed;
        this.name = name;
    }
}