import ChallengeEvent from './challenge';
import Sprites from '../../media/sprites';
import Random from '../../logic/random';
import Item from '../../entities/item';
import Hero from '../../entities/hero';
import EventView from '../event';
import Game from '../../game';
type Stolen = [Hero, Item];

export default class RabbitEvent extends EventView {
  private stolen: Stolen[] = [];

  constructor(game: Game) {
    super(game);
    this.setDetails(Sprites.RABBIT, `your party comes across a tricky little rabbit.`, [
      new Action('continue', () => this.checkForItems())
    ]);
  }

  private get items(): string {
    return this.stolen.length === 1 ? 'item' : 'items';
  }

  checkForItems(): void {
    const unflattened: Stolen[][] = this.game.party.members.map((x: Hero) =>
      x.basket.toList().map((y: Item) => [ x, y ])
    );
    const items: Stolen[] = unflattened.reduce((acc: Stolen[], x: Stolen[]) => acc.concat(x), []);
    if (!items.length) {
      this.setDetails(
        Sprites.RABBIT,
        `your party has nothing for the trickster to steal. it scurries away in frustration.`,
        [ new Action('continue', () => this.game.progress()) ]
      );
      return;
    }
    const steal: number = Random.max(items.length - 1) + 1;
    for (let a = 0; a < steal; a++) {
      const item: Stolen = Random.element(items);
      items.splice(items.indexOf(item), 1);
      item[0].basket.unequip(item[1]);
      this.stolen.push(item);
    }
    this.setDetails(
      Sprites.RABBIT,
      `the rabbit stole ${this.stolen.length} items from your party! will you chase it down?`,
      [ new Action('yes', () => this.chase()), new Action('no', () => this.getsAway()) ]
    );
  }

  catchUp(): void {
    this.setDetails(
      Sprites.RABBIT,
      `your party has caught up with the thieving rabbit. will you continue to chase it down?`,
      [ new Action('yes', () => this.chase()), new Action('no', () => this.getsAway()) ]
    );
  }

  chase(): void {
    if (Random.passes(0.25)) {
      this.setDetails(
        Sprites.RABBIT,
        `your party caught the thief! it gives all your items back and giggles as it scurries away.`,
        [
          new Action('continue', () => {
            for (const item of this.stolen) {
              item[0].basket.equip(item[1]);
            }
            this.game.progress();
          })
        ]
      );
    } else {
      const challenge: ChallengeEvent = new ChallengeEvent(this.game);
      const oldInit = challenge.init;
      challenge.init = () => {
        oldInit.call(challenge);
        this.catchUp();
      };
      this.game.chain.futureEvent(challenge, 1);
      this.game.chain.futureEvent(this, 2);
      this.setDetails(Sprites.RABBIT, `your party did not catch the rabbit.`, [
        new Action('continue', () => this.game.progress())
      ]);
    }
  }

  getsAway(): void {
    this.setDetails(
      Sprites.RABBIT,
      `the rabbit got away with ${this.stolen.length} of your party's items.`,
      [ new Action('continue', () => this.game.progress()) ]
    );
  }
}
