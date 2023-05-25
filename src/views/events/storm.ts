import { Skill } from '../../types';
import Random from '../../logic/random';
import EnumsHelper from '../../logic/enums';
import Sprites from '../../media/sprites';
import Hero from '../../entities/hero';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import EventView from '../event';
import Game from '../../game';

export default class StormEvent extends EventView {
  private heroSelector: Selector<Hero>;

  constructor(game: Game) {
    super(game);
    this.setDetails(
      Sprites.STORM,
      `a storm blows over your party! someone will be mixed up by this ordeal.`,
      [
        new Action('continue', () =>
          this.setSelector(this.heroSelector, [
            new Action('select', () => {
              const hero: Hero = this.heroSelector.item();
              this.setDetails(
                hero.sprite,
                `${hero.name} got their skills randomized by the storm.`,
                [ new Action('continue', () => this.game.progress()) ]
              );
              if (hero.skills[0] !== undefined) {
                hero.skills[0] = Random.element(EnumsHelper.skills());
                if (hero.skills[1] !== undefined) {
                  hero.skills[1] = Random.element(
                    EnumsHelper.skills().filter((x: Skill) => x !== hero.skills[0])
                  );
                }
              }
            })
          ])
        )
      ]
    );
  }

  init(): void {
    this.heroSelector = Selector.heroSelector(this.game.party, this.game.party.members);
  }
}
