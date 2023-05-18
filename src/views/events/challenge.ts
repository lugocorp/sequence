import { Stats } from '../../types';
import Hero from '../../entities/hero';
import Sprites from '../../media/sprites';
import { orange } from '../../media/colors';
import EnumsHelper from '../../logic/enums';
import Random from '../../logic/random';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import { EventView } from '../event';
import Game from '../../game';

type Challenger = {
  name: string;
  sprite: Sprites;
  strength: number;
  wisdom: number;
  dexterity: number;
};

export default class ChallengeEvent extends EventView {
  private heroSelector: Selector<Hero>;
  private challenger: Challenger;
  private expectation: number[];

  constructor(game: Game) {
    super(game);
    const that = this;
    this.challenger = {
      name: 'bear',
      sprite: Sprites.BEAR,
      strength: 4,
      wisdom: 2,
      dexterity: 0
    };
    this.expectation = [ EnumsHelper.getRandomStat() ];
    if (Random.passes(0.5)) {
      const n = Stats.DEXTERITY + 1;
      this.expectation.push(((Random.passes(0.5) ? 1 : -1) + this.expectation[0] + n) % n);
    }
    this.setDetails(
      this.challenger.sprite,
      `your party comes across a spirit who offers a challenge. you may choose one party member to participate.`,
      [
        new Action('continue', () =>
          that.setDetails(
            that.challenger.sprite,
            `your party member will win if they meet the contested stats or have enough luck. they will tire afterwards, but less so if they win.`,
            [ new Action('continue', () => that.viewChallenger()) ]
          )
        )
      ]
    );
  }

  init(): void {
    this.heroSelector = Selector.heroSelector(
      this.game.party,
      this.game.party.members,
      undefined,
      (hero: Hero) =>
        `${this.coloredRate(
          this.playerStatsHigher(hero) ? 100 : hero.stats.luck
        )} chance of success.`
    );
  }

  getTestText(): string {
    return (
      `a test of ${orange(EnumsHelper.getStatName(this.expectation[0]))}` +
      (this.expectation.length > 1
        ? ` and ${orange(EnumsHelper.getStatName(this.expectation[1]))}`
        : '')
    );
  }

  viewChallenger(): void {
    const that = this;
    const stat = (n: number): string => (n > 9 ? `\t${n}\t` : `\t${n}\t\t`);
    const desc = `${this.challenger.name}\nstr:${stat(this.challenger.strength)}wis:${stat(
      this.challenger.wisdom
    )}dex:${stat(this.challenger.dexterity)}`;
    const text = `${desc}\nchallenges you to ${this.getTestText()}.`;
    this.setDetails(this.challenger.sprite, text, [
      new Action('view party', () => that.viewParty())
    ]);
  }

  viewParty(): void {
    const that = this;
    this.setSelector(this.heroSelector, [
      new Action('choose', () => that.finish()),
      new Action('view spirit', () => that.viewChallenger())
    ]);
  }

  finish(): void {
    const that = this;
    const hero: Hero = this.heroSelector.item();
    const result: boolean = this.playerOvercomesChallenge(hero);
    if (result) {
      this.game.history.challengesWon++;
      hero.fatigue();
    } else {
      hero.fullyFatigue();
    }
    this.setDetails(
      hero.sprite,
      result
        ? `${hero.name} overcame the spirit's challenge!`
        : `${hero.name} did not succeed in the spirit's challenge.`,
      [
        new Action('continue', () =>
          that.setDetails(
            hero.sprite,
            result
              ? `${hero.name} is tired but triumphant. they received -1 to all their stats.`
              : `${hero.name} lost all their stats during the challenge.`,
            [ new Action('continue', () => this.game.progress()) ]
          )
        )
      ]
    );
  }

  private getChallengerStat(index: number): number {
    return {
      [Stats.STRENGTH]: this.challenger.strength,
      [Stats.WISDOM]: this.challenger.wisdom,
      [Stats.DEXTERITY]: this.challenger.dexterity
    }[this.expectation[index]];
  }

  private playerStatsHigher(hero: Hero): boolean {
    let sum1: number = hero.getStat(this.expectation[0]);
    let sum2: number = this.getChallengerStat(0);
    if (this.expectation.length > 1) {
      sum1 += hero.getStat(this.expectation[1]);
      sum2 += this.getChallengerStat(1);
    }
    return sum1 >= sum2;
  }

  playerOvercomesChallenge(hero: Hero): boolean {
    return this.playerStatsHigher(hero) || hero.lucky();
  }
}
