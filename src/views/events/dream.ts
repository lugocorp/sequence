import { Skill } from '../../types';
import EnumsHelper from '../../logic/enums';
import Random from '../../logic/random';
import Hero from '../../entities/hero';
import Action from '../../ui/action';
import EventView from '../event';
import Game from '../../game';

export default class DreamEvent extends EventView {
  constructor(game: Game) {
    super(game);
  }

  init(): void {
    const hero: Hero = Random.element(this.game.party.members);
    this.setDetails(
      hero.sprite,
      `${hero.name} has a strange introspective dream. what is more important to them?`,
      [
        new Action('skills', () => {
          this.setDetails(
            hero.sprite,
            `${hero.name} gains some skills in exchange for their base stats.`,
            [ new Action('continue', () => this.game.progress()) ]
          );
          if (hero.skills[0] === undefined) {
            hero.skills[0] = Random.element(EnumsHelper.skills());
          }
          if (hero.skills[1] === undefined) {
            hero.skills[1] = Random.element(
              EnumsHelper.skills().filter((x: Skill) => x !== hero.skills[0])
            );
          }
          hero.str--;
          hero.wis--;
          hero.dex--;
        }),
        new Action('stats', () => {
          this.setDetails(
            hero.sprite,
            `${hero.name} gains base stats in exchange for their skills.`,
            [ new Action('continue', () => this.game.progress()) ]
          );
          hero.skills = [ undefined, undefined ];
          hero.str++;
          hero.wis++;
          hero.dex++;
        })
      ]
    );
  }
}
