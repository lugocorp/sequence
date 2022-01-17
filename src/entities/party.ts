import Hero from './hero';

export default class Party {
    static MAX = 6;
    members: Hero[] = [];

    // Returns the number of heroes in your party
    length(): number {
        return this.members.length;
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
        if (index <0) {
            throw new Error(`${hero.name} is not in your party and therefore cannot be removed`);
        }
        this.members.splice(index, 1);
    }
}