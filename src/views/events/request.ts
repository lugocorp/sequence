import { Skill } from '../../types';
import Hero from '../../entities/hero';
import Sprites from '../../media/sprites';
import EnumsHelper from '../../logic/enums';
import Random from '../../logic/random';
import Selectors from '../selectors';
import EventView from '../event';
import Game from '../../game';

type Request = {
  name: string;
  sprite: Sprites;
  skill: Skill;
};

export default class RequestEvent extends EventView {
  private heroSelector: Selector<Hero>;
  private challenger: Request;

  constructor(game: Game) {
    super(game);
    this.challenger = {
      ...this.game.data.getRandomSpirit(),
      skill: Random.element(EnumsHelper.skills())
    };
    this.setDetails(
      this.challenger.sprite,
      `an ethereal spirit makes a request of your party. choose someone to help.`,
      [ new Action('continue', () => this.viewRequest()) ]
    );
  }

  init(): void {
    this.heroSelector = Selector.heroSelector(
      this.game.party,
      this.game.party.members,
      undefined,
      (hero: Hero) =>
        `${this.coloredRate(
          EnumsHelper.hasSkill(hero.skills, this.challenger.skill) ? 100 : hero.stats.luck
        )} chance of success`
    );
  }

  private viewRequest(): void {
    const text = `${this.challenger.name}\nrequests help from someone with ${this.challenger.skill}.`;
    this.setDetails(this.challenger.sprite, text, [
      new Action('view party', () => this.viewParty())
    ]);
  }

  private viewParty(): void {
    this.setSelector(this.heroSelector, [
      new Action('choose', () => this.finish()),
      new Action('view spirit', () => this.viewRequest())
    ]);
  }

  private finish(): void {
    const hero: Hero = this.heroSelector.item();
    const result: boolean = this.playerSatisfiesRequest(hero);
    if (result) {
      this.game.history.challengesWon++;
      hero.energy--;
    } else {
      hero.energy = -100;
    }
    this.setDetails(
      hero.sprite,
      result
        ? `${hero.name} completed the spirit's request!`
        : `${hero.name} did not complete the spirit's request.`,
      [
        new Action('continue', () =>
          this.setDetails(
            hero.sprite,
            result
              ? `${hero.name} is successful but tired. they have lost some of their energy.`
              : `${hero.name} used up all their energy in the request.`,
            [ new Action('continue', () => this.game.progress()) ]
          )
        )
      ]
    );
  }

  private playerSatisfiesRequest(hero: Hero): boolean {
    return EnumsHelper.hasSkill(hero.skills, this.challenger.skill) || hero.lucky();
  }
}
