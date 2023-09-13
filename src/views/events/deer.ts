import Sprites from '../../media/sprites';
import Hero from '../../entities/hero';
import Selectors from '../selectors';
import EventView from '../event';
import Game from '../../game';

export default class DeerEvent extends EventView {
  private heroSelector: Selector<Hero>;
  private initiated = false;

  constructor(game: Game) {
    super(game);
    this.setDetails(Sprites.DEER, 'your party hears a rustling in the bushes. a deer jumps out!', [
      new Action('continue', () => this.playerChoice())
    ]);
  }

  init(): void {
    if (this.initiated) {
      this.playerChoice();
    }
    this.initiated = true;
    this.heroSelector = Selector.heroSelector(
      this.game.party,
      this.game.party.members,
      undefined,
      (hero) => `${this.coloredRate(hero.stats.luck)} chance to catch it`
    );
  }

  playerChoice(): void {
    this.setDetails(
      Sprites.DEER,
      'your party comes close to the deer. will a party member try to catch it?',
      [
        new Action('yes', () => this.hunt()),
        new Action('no', () =>
          this.setDetails(Sprites.DEER, 'your party turns away and leaves the deer alone.', [
            new Action('continue', () => this.game.progress())
          ])
        )
      ]
    );
  }

  hunt(): void {
    this.setSelector(this.heroSelector, [
      new Action('hunt deer', () => {
        const hero: Hero = this.heroSelector.item();
        hero.energy--;
        if (hero.lucky()) {
          for (const hero of this.game.party.members) {
            hero.luck += 20;
          }
          this.setDetails(
            hero.sprite,
            `${hero.name} successfully hunted the deer! they are tired but still left a small offering for the beast's spirit. your party was blessed for their efforts.`,
            [ new Action('continue', () => this.game.progress()) ]
          );
        } else {
          this.game.chain.futureEvent(this, 3);
          this.setDetails(
            hero.sprite,
            `${hero.name} exhausted themself but did not catch the deer. it escapes into the thicket and your party gives chase.`,
            [ new Action('continue', () => this.game.progress()) ]
          );
        }
      })
    ]);
  }
}
