import Hero from './entities/hero';
import Unit from './entities/unit';

export default class Challenge {
  private static STRENGTH = 0;
  private static WISDOM   = 1;
  private static AGILITY  = 2;
  private single: boolean;
  private stat1: number;
  private stat2: number;

  constructor() {
    this.single = Math.random() < 0.5;
    this.stat1 = Math.floor(Math.random() * 3);
    if (!this.single) {
      this.stat2 = ((Math.random() < 0.5 ? 1 : -1) + this.stat1 + 3) % 3;
    }
  }

  private getStatName(stat: number): string {
    return ['strength', 'wisdom', 'agility'][stat];
  }

  message(): string {
    if (this.single) {
      return `this will be a challenge of ${this.getStatName(this.stat1)}.`;
    }
    return `this will be a challenge of ${this.getStatName(this.stat1)} and ${this.getStatName(this.stat2)}.`;
  }

  private getUnitStat(unit: Unit, stat: number): number {
    return [unit.strength, unit.wisdom, unit.agility][stat];
  }

  playerOvercomesChallenge(hero: Hero, challenger: Unit): boolean {
    let sum1: number = this.getUnitStat(hero, this.stat1);
    let sum2: number = this.getUnitStat(challenger, this.stat1);
    if (!this.single) {
      sum1 += this.getUnitStat(hero, this.stat2);
      sum2 += this.getUnitStat(challenger, this.stat2);
    }
    return (sum1 > sum2) || (sum1 === sum2 && Math.random() < hero.luck / 100);
  }
}