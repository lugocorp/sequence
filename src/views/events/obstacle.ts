import { Trigger, TriggerType } from '../../enums/triggers';
import Sprites from '../../enums/sprites';
import Stats from '../../enums/stats';
import Hero from '../../entities/hero';
import Random from '../../logic/random';
import Action from '../../ui/action';
import { EventView } from '../event';
import Game from '../../game';

/*
 * In this event your party is filtered by a certain stat limit.
 */
export default class ObstacleEvent extends EventView {
  static label = 'obstacle';
  private original: number;
  private cutoff: number;
  private stat: number;
  private obstacle: { sprite: Sprites; name: string };

  constructor(game: Game) {
    super(ObstacleEvent);
    this.obstacle = Random.element([
      { sprite: Sprites.SWAMP, name: 'swamp' },
      { sprite: Sprites.CLIFF, name: 'cliff' },
      { sprite: Sprites.MOUNTAIN, name: 'mountain' }
    ]);
    this.original = game.party.length();
    this.stat = Stats.getRandomStat();
    this.cutoff = Random.max(4) + 1;
    const that = this;
    this.setDetails(
      this.obstacle.sprite,
      `your party comes across a ${this.obstacle.name}. only travelers with ${
        this.cutoff
      } ${Stats.getStatName(this.stat)} or ${this.higher ? 'higher' : 'lower'} may pass.`,
      [ new Action('continue', () => that.finish(game)) ]
    );
  }

  // True if this event only allows members above a certain threshold
  get higher(): boolean {
    return this.cutoff <= 2;
  }

  // True if the given hero should pass the obstacle
  private passes(hero: Hero): boolean {
    return this.higher
      ? Stats.getUnitStat(hero, this.stat) >= this.cutoff
      : Stats.getUnitStat(hero, this.stat) <= this.cutoff;
  }

  finish(game: Game): void {
    const removals: Hero[] = [];
    for (const hero of game.party.members) {
      const data: Trigger = {
        type: TriggerType.GET_OBSTACLE,
        pass: this.passes(hero)
      };
      hero.basket.activate(data);
      if (!data.pass) {
        removals.push(hero);
      }
    }
    game.party.filter((hero: Hero) => removals.indexOf(hero) < 0);
    const size: number = game.party.length();
    this.setDetails(
      this.obstacle.sprite,
      size
        ? size === this.original
          ? `all party members passed the ${this.obstacle.name}.`
          : `only ${size} party member${size > 1 ? 's' : ''} made it past the ${
              this.obstacle.name
            }.`
        : `no one in your party could pass the ${this.obstacle.name}.`,
      [ new Action('continue', () => game.progress()) ]
    );
  }
}
