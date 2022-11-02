import Hero from '../../entities/hero';
import Action from '../../ui/action';
import { Event } from '../event';
import Game from '../../game';

export default class FatigueEvent extends Event {
  static label = 'fatigue';

  constructor(hero: Hero) {
    super(FatigueEvent);
    this.setDetails(
      hero.sprite,
      `${hero.name} is too fatigued to move on, and has left your party`,
      [
        new Action('continue', () => {
          Game.game.party.remove(hero);
          Game.game.progress();
        })
      ]
    );
  }
}
