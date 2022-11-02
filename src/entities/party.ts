import { TriggerType } from '../enums/triggers';
import Random from '../logic/random';
import Game from '../game';
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
    return this.emptyItemSlots().length > 0;
  }

  // Returns true if anyone in your party has at least 1 item
  hasItems(): boolean {
    return this.members.reduce((acc: number, x: Hero) => acc + x.basket.itemCount, 0) > 0;
  }

  // Fully populates the party with an optional guaranteed character
  populate(guaranteed?: string): void {
    if (guaranteed) {
      this.add(Game.game.data.getNamedHero(guaranteed));
    }
    while (this.length() < Party.MAX) {
      this.add(Game.game.data.getRandomHero());
    }
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
    Game.game.history.partyMembers++;
    this.members.push(hero);
  }

  emptyItemSlots(): Hero[] {
    return this.members.filter((x: Hero) => x.basket.hasSpace);
  }

  // Removes a hero from your party
  remove(hero: Hero): void {
    const index: number = this.members.indexOf(hero);
    if (index < 0) {
      throw new Error(`${hero.name} is not in your party and therefore cannot be removed`);
    }
    this.members.splice(index, 1);
    for (const hero of this.members) {
      hero.basket.activate({
        type: TriggerType.AFTER_LEAVE,
        hero: hero
      });
    }
  }

  // Returns a random hero in the party
  randomHero(): Hero {
    return Random.element(this.members);
  }

  // Filters the party by a stat expectation
  filter(passes: (hero: Hero) => boolean): void {
    const remove: Hero[] = this.members.filter(passes);
    for (const hero of remove) {
      this.remove(hero);
    }
  }
}
