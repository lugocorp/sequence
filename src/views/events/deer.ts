import Sprites from '../../enums/sprites';
import Hero from '../../entities/hero';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import View from '../../ui/view';
import Game from '../../game';

export default class DeerEvent extends View {
  private heroSelector: Selector<Hero>;
  private initiated = false;

  constructor() {
    super();
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
      Game.game.party.members,
      undefined,
      (hero) => `${hero.deerSuccess()} chance of success`
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
            new Action('continue', () => Game.game.progress())
          ])
        )
      ]
    );
  }

  hunt(): void {
    this.setSelector(this.heroSelector, [
      new Action('hunt deer', () => {
        const hero: Hero = this.heroSelector.item();
        hero.fatigue();
        if (hero.lucky()) {
          for (const hero of Game.game.party.members) {
            hero.boostLuck(20);
          }
          this.setDetails(
            hero.sprite,
            `${hero.name} successfully hunted the deer! they are tired but left a small offering for the beast's spirit. your party was blessed for their efforts.`,
            [ new Action('continue', () => Game.game.progress()) ]
          );
        } else {
          Game.futureEvent(this, 3);
          this.setDetails(
            hero.sprite,
            `${hero.name} exhausted themself and did not catch the deer, and it escaped into the thicket. your party gives chase.`,
            [ new Action('continue', () => Game.game.progress()) ]
          );
        }
      })
    ]);
  }
}
