import Hero from '../../entities/hero';
import Challenger from '../../entities/challenger';
import { TriggerType } from '../../enums/triggers';
import { orange } from '../../enums/colors';
import Stats from '../../enums/stats';
import Random from '../../logic/random';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import { EventView } from '../event';
import Game from '../../game';

export default class ChallengeEvent extends EventView {
  static label = 'challenge';
  private heroSelector: Selector<Hero>;
  private challenger: Challenger;
  private expectation: number[];

  constructor() {
    super(ChallengeEvent);
    const that = this;
    this.challenger = Game.game.data.getRandomChallenger();
    this.expectation = [ Stats.getRandomStat() ];
    if (Random.passes(0.5)) {
      this.expectation.push(
        ((Random.passes(0.5) ? 1 : -1) + this.expectation[0] + Stats.N) % Stats.N
      );
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
      Game.game.party.members,
      undefined,
      (hero: Hero) =>
        `${this.coloredRate(
          this.playerStatsHigher(hero, this.challenger) ? 100 : hero.luck
        )} chance of success.`
    );
  }

  getTestText(): string {
    return (
      `a test of ${orange(Stats.getStatName(this.expectation[0]))}` +
      (this.expectation.length > 1 ? ` and ${orange(Stats.getStatName(this.expectation[1]))}` : '')
    );
  }

  viewChallenger(): void {
    const that = this;
    const text = `${this.challenger.descriptionText()}\nchallenges you to ${this.getTestText()}.`;
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
    for (const hero1 of Game.game.party.members) {
      hero1.basket.activate({
        type: TriggerType.AFTER_SELECTED,
        tested: this.expectation,
        hero: hero
      });
    }
    const result: boolean = this.playerOvercomesChallenge(hero, this.challenger);
    if (result) {
      Game.game.history.challengesWon++;
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
            [ new Action('continue', () => Game.game.progress()) ]
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
