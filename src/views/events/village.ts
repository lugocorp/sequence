import Sprites from '../../media/sprites';
import EventView from '../event';
import View from '../view';

export default class VillageEvent extends EventView {
  getViews(): View[] {
    return [{
      image: Sprites.VILLAGE,
      text: 'your party comes upon a village where they may spend the night. you can either heal half your party and leave the others or replace everyone.',
      actions: {
        'heal and lose half': () => {
          const leave = Math.min(this.game.party.size / 2);
          for (const hero of this.game.party.members) {
            hero.refreshEnergy();
          }
          for (let a = 0; a < leave; a++) {
            this.game.party.remove(this.game.party.randomMember());
          }
          this.game.views.setViews([{
            image: Sprites.VILLAGE,
            text: 'your party spends the night at this village recovering from their journey. half of them decide to stay here.',
            actions: {
              'continue': () => this.game.progress()
            }
          }]);
        },
        'replace entire party': () => {
          const n = this.game.party.size;
          this.game.party.clear();
          for (let a = 0; a < n; a++) {
            this.game.party.add(this.game.data.getRandomHero());
          }
          this.game.views.setViews([{
            image: Sprites.VILLAGE,
            text: 'your party spends the night at this village. some of the villagers decide to take off on a journey of their own.',
            actions: {
              'continue': () => this.game.progress()
            }
          }]);
        }
      }
    }];
  }
}
