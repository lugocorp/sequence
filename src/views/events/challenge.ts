import { Stats } from '../../types';
import Hero from '../../entities/hero';
import Sprites from '../../media/sprites';
import { orange } from '../../media/colors';
import EnumsHelper from '../../logic/enums';
import Random from '../../logic/random';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import EventView from '../event';
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
  private expectation: Stats;

  constructor(game: Game) {
    super(game);
    const that = this;
    this.challenger = {
      ...this.game.data.getRandomSpirit(),
      strength: Random.max(7),
      wisdom: Random.max(7),
      dexterity: Random.max(7)
    };
    this.expectation = EnumsHelper.getRandomStat();
    this.setDetails(
      this.challenger.sprite,
      `a powerful spirit offers your party a challenge. choose someone to participate.`,
      [ new Action('continue', () => that.viewChallenger()) ]
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
        )} chance of success`
    );
  }

  viewChallenger(): void {
    const that = this;
    const stat = (n: number): string => (n > 9 ? `\t${n}\t` : `\t${n}\t\t`);
    const desc = `${this.challenger.name}\nstr:${stat(this.challenger.strength)}wis:${stat(
      this.challenger.wisdom
    )}dex:${stat(this.challenger.dexterity)}`;
    const text = `${desc}\nchallenges you to a test of ${orange(
      EnumsHelper.getStatName(this.expectation)
    )}.`;
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
      hero.energy--;
    } else {
      hero.energy = -100;
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
              ? `${hero.name} is triumphant but tired. they have lost some of their energy.`
              : `${hero.name} used up all their energy in the challenge.`,
            [ new Action('continue', () => this.game.progress()) ]
          )
        )
      ]
    );
  }

  private playerStatsHigher(hero: Hero): boolean {
    const sum1: number = hero.getStat(this.expectation);
    const sum2: number = {
      [Stats.STRENGTH]: this.challenger.strength,
      [Stats.WISDOM]: this.challenger.wisdom,
      [Stats.DEXTERITY]: this.challenger.dexterity
    }[this.expectation];
    return sum1 >= sum2;
  }

  playerOvercomesChallenge(hero: Hero): boolean {
    return this.playerStatsHigher(hero) || hero.lucky();
  }
}
