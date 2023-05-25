import { TriggerType } from '../types';
import Random from '../logic/random';
import Game from '../game';
import Hero from './hero';

export default class Party {
  static MAX = 4;
  members: Hero[] = [];

  constructor(private game: Game) {}

  // Removes all heroes from your party
  clear(): void {
    this.members = [];
  }

  // Returns the number of heroes in your party
  get size(): number {
    return this.members.length;
  }

  // Returns true if the party is full
  isFull(): boolean {
    return this.size === Party.MAX;
  }

  // Returns true if the given Hero is part of this party
  contains(hero: Hero): boolean {
    return this.members.indexOf(hero) > -1;
  }

  // Returns true if anyone in your party has at least 1 empty item slot
  canPickupItems(): boolean {
    return this.emptyItemSlots().length > 0;
  }

  // Returns true if anyone in your party has at least 1 item
  hasItems(): boolean {
    return this.members.reduce((acc: number, x: Hero) => acc + x.basket.itemCount, 0) > 0;
  }

  // Returns true if anyone in your party has at least 1 empty skill slot
  canLearnSkills(): boolean {
    return this.emptySkillSlots().length > 0;
  }

  // Fully populates the party with an optional guaranteed character
  populate(guaranteed?: string): void {
    if (guaranteed) {
      this.add(this.game.data.getNamedHero(guaranteed));
    }
    while (this.size < Party.MAX) {
      this.add(this.game.data.getRandomHero());
    }
  }

  // Returns the hero at the given index
  get(index: number): Hero {
    return this.members[index];
  }

  // Adds a hero to your party
  add(hero: Hero): void {
    if (this.members.length >= Party.MAX) {
      throw new Error(`Cannot have more than ${Party.MAX} members in your party`);
    }
    this.game.history.partyMembers++;
    this.members.push(hero);
    hero.activate({ type: TriggerType.JOIN_PARTY });
  }

  emptyItemSlots(): Hero[] {
    return this.members.filter((x: Hero) => x.basket.hasSpace);
  }

  emptySkillSlots(): Hero[] {
    return this.members.filter((x: Hero) => x.skills[1] === undefined);
  }

  // Removes a hero from your party
  remove(hero: Hero): void {
    const index: number = this.members.indexOf(hero);
    if (index < 0) {
      throw new Error(`${hero.name} is not in your party and therefore cannot be removed`);
    }
    hero.activate({ type: TriggerType.LEAVE_PARTY });
    this.members.splice(index, 1);
  }

  // Filters the party by a stat expectation
  filter(passes: (hero: Hero) => boolean): void {
    const remove: Hero[] = this.members.filter((hero: Hero) => !passes(hero));
    for (const hero of remove) {
      this.remove(hero);
    }
  }

  // Returns a random party member
  randomMember(): Hero {
    return Random.element(this.members);
  }
}
