import Sprites from '../../media/sprites';
import Hero from '../../entities/hero';
import Random from '../../logic/random';
import Selectors from '../selectors';
import EventView from '../event';
import View from '../view';

export default class RavenEvent extends EventView {
  getViews(): View[] {
    return [{
      image: Sprites.RAVEN,
      text: `your party comes across a mischievous raven. which party member will go up and talk to it?`,
      actions: {
        'continue': () => this.game.views.setViews(Selectors.heroes(this.game.party.members, (hero: Hero) => ({
          'select': () => {
            const initial = `${hero.name} approaches the raven.`;
              const effect: number = Random.max(4);
              if (effect === 0) {
                hero.str--;
                hero.wis--;
                hero.dex--;
                this.game.views.setViews([{
                  image: Sprites.RAVEN,
                  text: `${initial} it laughs and places a curse upon them.`,
                  actions: {
                    'continue': () => this.game.progress()
                  }
                }]);
              } else if (effect === 1) {
                hero.str++;
                hero.wis++;
                hero.dex++;
                this.game.views.setViews([{
                  image: Sprites.RAVEN,
                  text: `${initial} it places a blessing upon them!`,
                  actions: {
                    'continue': () => this.game.progress()
                  }
                }]);
              } else if (effect === 2) {
                hero.luck -= 10;
                this.game.views.setViews([{
                  image: Sprites.RAVEN,
                  text: `${initial} it laughs and places a curse upon them.`,
                  actions: {
                    'continue': () => this.game.progress()
                  }
                }]);
              } else {
                hero.luck += 10;
                this.game.views.setViews([{
                  image: Sprites.RAVEN,
                  text: `${initial} it places a blessing upon them!`,
                  actions: {
                    'continue': () => this.game.progress()
                  }
                }]);
              }
          }
        })))
      }
    }];
  }
}
