import Sprites from '../../media/sprites';
import Selector from '../../ui/selector';
import Hero from '../../entities/hero';
import Action from '../../ui/action';
import EventView from '../event';
import Game from '../../game';

export default class RiverEvent extends EventView {
  private heroSelector: Selector<Hero>;

  constructor(game: Game) {
    super(game);
    const that = this;
    this.setDetails(
      Sprites.RIVER,
      'your party approaches a dangerous, fast moving river. choose a party member to get closer for a blessing, but they may get swept down the river.',
      [
        new Action('continue', () =>
          that.setSelector(that.heroSelector, [ new Action('choose', () => that.river()) ])
        )
      ]
    );
  }

  init(): void {
    this.heroSelector = Selector.heroSelector(
      this.game.party,
      this.game.party.members,
      undefined,
      (hero: Hero) => {
        const luck = hero.stats.luck;
        return `${this.coloredRate(luck).replace(
          luck.toString(),
          (100 - luck).toString()
        )} chance to fall in`;
      }
    );
  }

  river(): void {
    const that = this;
    const hero: Hero = this.heroSelector.item();
    hero.str++;
    hero.wis++;
    hero.dex++;
    this.setDetails(hero.sprite, `${hero.name} became stronger, wiser, and faster by the river!`, [
      new Action('continue', () => {
        if (hero.lucky()) {
          this.game.progress();
        } else {
          that.consequence();
        }
      })
    ]);
  }

  consequence(): void {
    const hero: Hero = this.heroSelector.item();
    this.game.party.remove(hero);
    const retrieve: EventView = new EventView(this.game);
    retrieve.setDetails(
      hero.sprite,
      `your party reunites with ${hero.name} after they were swept away by a river.`,
      [
        new Action('continue', () => {
          this.game.party.add(hero);
          this.game.progress();
        })
      ]
    );
    this.game.chain.futureEvent(retrieve, 5, () => !this.game.party.isFull());
    this.setDetails(
      Sprites.RIVER,
      `${hero.name} was swept away by the river! you may meet them downstream if your party can use more members.`,
      [ new Action('continue', () => this.game.progress()) ]
    );
  }
}
