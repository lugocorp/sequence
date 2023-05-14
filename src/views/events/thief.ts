import ChallengeEvent from './challenge';
import Sprites from '../../enums/sprites';
import Random from '../../logic/random';
import Item from '../../entities/item';
import Hero from '../../entities/hero';
import Action from '../../ui/action';
import { EventView } from '../event';
import Game from '../../game';
type Stolen = [Hero, Item];

export default class ThiefEvent extends EventView {
  static label = 'thief';
  private stolen: Stolen[] = [];
  private readonly animal = Random.element([
    {
      name: 'rabbit',
      sprite: Sprites.RABBIT
    },
    {
      name: 'otter',
      sprite: Sprites.OTTER
    }
  ]);

  constructor(game: Game) {
    super(game);
    this.setDetails(
      this.animal.sprite,
      `your party comes across a trickster! a ${this.animal.name} has come to steal precious items.`,
      [ new Action('continue', () => this.checkForItems()) ]
    );
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
        this.animal.sprite,
        `your party has no items for the ${this.animal.name} to steal. the trickster scurries away in frustration.`,
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
      this.animal.sprite,
      `the ${this.animal.name} has stolen ${this.stolen.length} ${this.items}. will you chase it down?`,
      [ new Action('yes', () => this.chase()), new Action('no', () => this.getsAway()) ]
    );
  }

  catchUp(): void {
    this.setDetails(
      this.animal.sprite,
      `your party has caught up with the ${this.animal.name}. will you continue to chase it down?`,
      [ new Action('yes', () => this.chase()), new Action('no', () => this.getsAway()) ]
    );
  }

  chase(): void {
    if (Random.passes(0.25)) {
      this.setDetails(
        this.animal.sprite,
        `your party caught the ${this.animal.name}! it gave all your items back and giggled as it scurried away.`,
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
      this.game.futureEvent(challenge, 1);
      this.game.futureEvent(this, 2);
      this.setDetails(this.animal.sprite, `your party did not catch the ${this.animal.name}.`, [
        new Action('continue', () => this.game.progress())
      ]);
    }
  }

  getsAway(): void {
    this.setDetails(
      this.animal.sprite,
      `the ${this.animal.name} got away with ${this.stolen.length} of your party's items.`,
      [ new Action('continue', () => this.game.progress()) ]
    );
  }
}
