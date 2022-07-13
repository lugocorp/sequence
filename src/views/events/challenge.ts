import Sprites from '../../enums/sprites';
import GraphicsRenderer from '../../graphics/renderer';
import Challenger from '../../entities/challenger';
import Hero from '../../entities/hero';
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
    this.heroSelector = Selector.heroSelector(Game.game.party.members);
    this.challenger = Game.game.data.getRandomChallenger();
    this.expectation = [Random.max(Stats.N)];
    if (Random.passes(0.5)) {
      this.expectation.push(((Random.passes(0.5) ? 1 : -1) + this.expectation[0] + Stats.N) % Stats.N);
    }
    this.setDetails(
      this.challenger.sprite,
      'your party comes across a spirit who offers a challenge.' +
      ((this.expectation.length === 1) ?
        `this will be a test of ${Stats.getStatName(this.expectation[0])}.` :
        `this will be a test of ${Stats.getStatName(this.expectation[0])} and ${Stats.getStatName(this.expectation[1])}.`),
      [ new Action('continue', () => that.viewChallenger()) ]
    );
  }

  viewChallenger(): void {
    const that = this;
    this.setDetails(this.challenger.sprite, this.challenger.name, [
      new Action('view party', () => that.viewParty())
    ]);
  }

  viewParty(): void {
    const that = this;
    this.setSelector(this.heroSelector, [
      new Action('view spirit', () => that.viewChallenger()),
      new Action('choose', () => that.finish())
    ]);
  }

  finish(): void {
    const hero: Hero = this.heroSelector.item();
    const result: boolean = this.playerOvercomesChallenge(hero, this.challenger);
    this.setDetails(
      hero.sprite,
      result ?
        `${hero.name} overcame the spirit's challenge!` :
        `${hero.name} did not succeed in the spirit's challenge.`,
      [ new Action('continue', () => Game.game.progress()) ]
    );
  }

  playerOvercomesChallenge(hero: Hero, challenger: Challenger): boolean {
    let sum1: number = Stats.getUnitStat(hero, this.expectation[0]);
    let sum2: number = Stats.getUnitStat(challenger, this.expectation[0]);
    if (this.expectation.length > 1) {
      sum1 += Stats.getUnitStat(hero, this.expectation[1]);
      sum2 += Stats.getUnitStat(challenger, this.expectation[1]);
    }
    return (sum1 > sum2) || (sum1 === sum2 && Random.passes(hero.luck / 100));
  }
}