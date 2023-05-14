import Sprites from '../../enums/sprites';
import Hero from '../../entities/hero';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import { EventView } from '../event';
import Game from '../../game';

export default class DeerEvent extends EventView {
  static label = 'deer';
  private heroSelector: Selector<Hero>;
  private initiated = false;

  constructor(game: Game) {
    super(game, DeerEvent);
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
      undefined,
      (hero) => `${this.coloredRate(hero.luck)} chance of success.`
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
        hero.fatigue(this.game.party);
        if (hero.lucky()) {
          for (const hero of this.game.party.members) {
            hero.boostLuck(5);
          }
          this.setDetails(
            hero.sprite,
            `${hero.name} successfully hunted the deer! they are tired but left a small offering for the beast's spirit. your party was blessed for their efforts.`,
            [ new Action('continue', () => this.game.progress()) ]
          );
        } else {
          this.game.futureEvent(this, 3);
          this.setDetails(
            hero.sprite,
            `${hero.name} exhausted themself and did not catch the deer, and it escaped into the thicket. your party gives chase.`,
            [ new Action('continue', () => this.game.progress()) ]
          );
        }
      })
    ]);
  }
}
