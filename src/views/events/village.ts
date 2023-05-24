import Sprites from '../../media/sprites';
import Action from '../../ui/action';
import EventView from '../event';
import Game from '../../game';

export default class VillageEvent extends EventView {
  constructor(game: Game) {
    super(game);
    this.setDetails(
      Sprites.VILLAGE,
      'your party comes upon a village where they may spend the night. you can either heal half your party and leave the others or replace everyone.',
      [
        new Action('heal and lose half', () => this.heal()),
        new Action('replace entire party', () => this.replace())
      ]
    );
  }

  heal(): void {
    const leave = Math.min(this.game.party.size);
    for (const hero of this.game.party.members) {
      hero.refreshEnergy();
    }
    for (let a = 0; a < leave; a++) {
      this.game.party.remove(this.game.party.randomMember());
    }
    this.setDetails(
      Sprites.VILLAGE,
      'your party spends the night at this village recovering from their journey. half of them decide to stay here.',
      [ new Action('continue', () => this.game.progress()) ]
    );
  }

  replace(): void {
    const n = this.game.party.size;
    this.game.party.clear();
    for (let a = 0; a < n; a++) {
      this.game.party.add(this.game.data.getRandomHero());
    }
    this.setDetails(
      Sprites.VILLAGE,
      'your party spends the night at this village. some of the villagers decide to take off on a journey of their own.',
      [ new Action('continue', () => this.game.progress()) ]
    );
  }
}
