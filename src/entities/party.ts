import {Trigger} from '../enums/types';
import Stats from '../enums/stats';
import Random from '../logic/random';
import Hero from './hero';

export default class Party {
  static MAX = 4;
  members: Hero[] = [];

  // Removes all heroes from your party
  clear(): void {
    this.members = [];
  }

  // Returns the number of heroes in your party
  length(): number {
    return this.members.length;
  }

  // Returns true if the party is full
  isFull(): boolean {
    return this.length() === Party.MAX;
  }

  // Returns true if the given Hero is part of this party
  contains(hero: Hero): boolean {
    return this.members.indexOf(hero) > -1;
  }

  // Returns true if anyone in your party has at least 1 item slot
  canPickupItems(): boolean {
    return this.members.reduce((acc: number, x: Hero) => Math.max(acc, x.itemSlots), 0) > 0;
  }

  // Returns true if anyone in your party has at least 1 item
  hasItems(): boolean {
    return this.members.reduce((acc: number, x: Hero) => acc + x.itemCount(), 0) > 0;
  }

  // Returns the hero at the given index
  get(index: number): Hero {
    return this.members[index];
  }

  // Adds a hero to your party
  add(hero: Hero): void {
    if (this.members.length > Party.MAX) {
      throw new Error(`Cannot have more than ${Party.MAX} members in your party`);
    }
    this.members.push(hero);
  }

  // Removes a hero from your party
  remove(hero: Hero): void {
    const index: number = this.members.indexOf(hero);
    if (index < 0) {
      throw new Error(`${hero.name} is not in your party and therefore cannot be removed`);
    }
    this.members.splice(index, 1);
    hero.activate(Trigger.LEAVES_PARTY);
  }

  // Returns a random hero in the party
  randomHero(): Hero {
    return Random.element(this.members);
  }

  // Filters the party by a stat expectation
  filter(stat: number, cutoff: number, higher: boolean): void {
    const remove: Hero[] = this.members.filter((member: Hero) => higher ? (Stats.getUnitStat(member, stat) < cutoff) : (Stats.getUnitStat(member, stat) > cutoff));
    for (const hero of remove) {
      this.remove(hero);
    }
  }
}