import Random from '../../logic/random';
import Action from '../../ui/action';
import EventView from '../event';
import Game from '../../game';

export default class IllnessEvent extends EventView {
  constructor(game: Game) {
    super(game);
    const hero = Random.element(this.game.party.members);
    this.setDetails(hero.sprite, `a group of ${hero.name}'s siblings joins your party.`, [
      new Action('continue', () => {
        while (!this.game.party.isFull) {
          this.game.party.add(this.game.data.getNamedHero(hero.name));
        }
        this.game.progress();
      })
    ]);
  }
}
