import Sprites from '../../enums/sprites';
import Stats from '../../enums/stats';
import Selector from '../../ui/selector';
import Hero from '../../entities/hero';
import Action from '../../ui/action';
import { EventView } from '../event';
import Game from '../../game';

export default class RapidEvent extends EventView {
  static label = 'rapid';
  private heroSelector: Selector<Hero>;

  constructor() {
    super(RapidEvent);
    const that = this;
    this.setDetails(
      Sprites.RAPID,
      'your party approaches a dangerous, fast moving river. a party member will go down to become stronger, wiser and faster. they may get swept down the river.',
      [
        new Action('continue', () =>
          that.setSelector(that.heroSelector, [ new Action('choose', () => that.river()) ])
        )
      ]
    );
  }

  init(): void {
    this.heroSelector = Selector.heroSelector(
      Game.game.party.members,
      undefined,
      (hero: Hero) => `${this.coloredRate(hero.luck)} chance to be safe.`
    );
  }

  river(): void {
    const that = this;
    const hero: Hero = this.heroSelector.item();
    Stats.changeUnitStat(hero, Stats.STRENGTH, 1);
    Stats.changeUnitStat(hero, Stats.WISDOM, 1);
    Stats.changeUnitStat(hero, Stats.DEXTERITY, 1);
    this.setDetails(hero.sprite, `${hero.name} became stronger, wiser, and faster by the river!`, [
      new Action('continue', () => {
        if (hero.lucky()) {
          Game.game.progress();
        } else {
          that.consequence();
        }
      })
    ]);
  }

  consequence(): void {
    const hero: Hero = this.heroSelector.item();
    Game.game.party.remove(hero);
    const retrieve: EventView = new EventView({ label: 'riverretrieve' });
    retrieve.setDetails(
      hero.sprite,
      `your party reunites with ${hero.name} after they were swept away by a river.`,
      [
        new Action('continue', () => {
          Game.game.party.add(hero);
          Game.game.progress();
        })
      ]
    );
    Game.futureEvent(retrieve, 5, () => !Game.game.party.isFull());
    this.setDetails(
      Sprites.RAPID,
      `${hero.name} was swept away by the river! you can meet them downstream if your party isn't full.`,
      [ new Action('continue', () => Game.game.progress()) ]
    );
  }
}
