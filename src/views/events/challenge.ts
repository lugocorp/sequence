import Challenger from '../../entities/challenger';
import Hero from '../../entities/hero';
import { Trigger } from '../../enums/types';
import Stats from '../../enums/stats';
import Random from '../../logic/random';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import View from '../../ui/view';
import Game from '../../game';

export default class ChallengeEvent extends View {
  private heroSelector: Selector<Hero>;
  private challenger: Challenger;
  private expectation: number[];

  constructor() {
    super();
    const that = this;
    this.challenger = Game.game.data.getRandomChallenger();
    this.expectation = [Random.max(Stats.N)];
    if (Random.passes(0.5)) {
      this.expectation.push(
        ((Random.passes(0.5) ? 1 : -1) + this.expectation[0] + Stats.N) % Stats.N
      );
    }
    this.setDetails(
      this.challenger.sprite,
      `your party comes across a spirit who offers a challenge. this will be ${this.getTestText()} for any party member you choose.`,
      [
        new Action('continue', () =>
          that.setDetails(
            that.challenger.sprite,
            `the entity with the higher contested stats or enough luck will win. the party member you choose will get tired, and they will leave your party if they lose.`,
            [new Action('continue', () => that.viewChallenger())]
          )
        )
      ]
    );
  }

  init(): void {
    this.heroSelector = Selector.heroSelector(Game.game.party.members, undefined, (hero: Hero) => `${hero.challengeSuccess(this.playerStatsHigher(hero, this.challenger))} chance to win the challenge`);
  }

  getTestText(): string {
    return (
      `a test of ${Stats.getStatName(this.expectation[0])}` +
      (this.expectation.length > 1 ? ` and ${Stats.getStatName(this.expectation[1])}` : '')
    );
  }

  viewChallenger(): void {
    const that = this;
    const text = `${this.challenger.descriptionText()}\nchallenges you to ${this.getTestText()}`;
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
    hero.activate(Trigger.START_CHALLENGE);
    const result: boolean = this.playerOvercomesChallenge(hero, this.challenger);
    if (result) {
      hero.fatigue();
    } else {
      Stats.setUnitStat(hero, Stats.STRENGTH, 0);
      Stats.setUnitStat(hero, Stats.WISDOM, 0);
      Stats.setUnitStat(hero, Stats.DEXTERITY, 0);
    }
    hero.activate(result ? Trigger.CHALLENGE_SUCCESS : Trigger.CHALLENGE_FAILURE);
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
            [new Action('continue', () => Game.game.progress())]
          )
        )
      ]
    );
  }

  private playerStatsHigher(hero: Hero, challenger: Challenger): boolean {
    let sum1: number = Stats.getUnitStat(hero, this.expectation[0]);
    let sum2: number = Stats.getUnitStat(challenger, this.expectation[0]);
    if (this.expectation.length > 1) {
      sum1 += Stats.getUnitStat(hero, this.expectation[1]);
      sum2 += Stats.getUnitStat(challenger, this.expectation[1]);
    }
    return sum1 >= sum2;
  }

  playerOvercomesChallenge(hero: Hero, challenger: Challenger): boolean {
    return this.playerStatsHigher(hero, challenger) || hero.lucky();
  }
}
