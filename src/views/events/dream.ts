import { Skill } from '../../types';
import EnumsHelper from '../../logic/enums';
import Random from '../../logic/random';
import Hero from '../../entities/hero';
import EventView from '../event';
import View from '../view';

export default class DreamEvent extends EventView {
  getViews(): View[] {
    const hero: Hero = Random.element(this.game.party.members);
    return [{
      image: hero.sprite,
      text: `${hero.name} has a strange introspective dream. what is more important to them?`,
      actions: {
        'skills': () => {
          this.game.views.setViews([{
            image: hero.sprite,
            text: `${hero.name} gains some skills in exchange for their base stats.`,
            actions: { 'continue': () => this.game.progress() }
          }]);
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
        },
        'stats': () => {
          this.game.views.setViews([{
            image: hero.sprite,
            text: `${hero.name} gains base stats in exchange for their skills.`,
            actions: { 'continue': () => this.game.progress() }
          }]);
          hero.skills = [ undefined, undefined ];
          hero.str++;
          hero.wis++;
          hero.dex++;
        }
      }
    }];
  }
}
