import Sprites from '../../media/sprites';
import Hero from '../../entities/hero';
import Selectors from '../selectors';
import EventView from '../event';
import View from '../view';

export default class DeerEvent extends EventView {
  private initiated = false;

  getViews(): View[] {
    if (!this.initiated) {
      this.initiated = true;
      return [{image: Sprites.DEER, text: 'your party hears a rustling in the bushes. a deer jumps out!', actions: {
        'continue': () => this.playerChoice()
      }}];
    }
    this.playerChoice();
  }

  playerChoice(): void {
    this.game.views.setViews([{
      image: Sprites.DEER,
      text: 'your party comes close to the deer. will a party member try to catch it?',
      actions: {
        'yes': () => this.hunt(),
        'no': () =>
          this.game.views.setViews([{image: Sprites.DEER, text: 'your party turns away and leaves the deer alone.', actions: {
            'continue': () => this.game.progress()
          }
        }])
      }
    }]);
  }

  hunt(): void {
    this.game.views.setViews(Selectors.heroes(this.game.party.members, (hero: Hero) => ({
      'hunt deer': () => {
        hero.energy--;
        if (hero.lucky()) {
          for (const hero of this.game.party.members) {
            hero.luck += 20;
          }
          this.game.views.setViews([{
            image: hero.sprite,
            text: `${hero.name} successfully hunted the deer! they are tired but still left a small offering for the beast's spirit. your party was blessed for their efforts.`,
            actions: { 'continue': () => this.game.progress() }
          }]);
        } else {
          this.game.chain.futureEvent(this, 3);
          this.game.views.setViews([{
            image: hero.sprite,
            text: `${hero.name} exhausted themself but did not catch the deer. it escapes into the thicket and your party gives chase.`,
            actions: { 'continue': () => this.game.progress() }
          }]);
        }
      }
    })));
  }
}
