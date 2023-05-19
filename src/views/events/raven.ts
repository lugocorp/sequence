import Sprites from '../../media/sprites';
import Hero from '../../entities/hero';
import Random from '../../logic/random';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import { EventView } from '../event';
import Game from '../../game';

export default class RavenEvent extends EventView {
  private heroSelector: Selector<Hero>;

  constructor(game: Game) {
    super(game);
    this.setDetails(
      Sprites.RAVEN,
      `your party comes across a mischievous raven. which party member will go up and talk to it?`,
      [
        new Action('continue', () =>
          this.setSelector(this.heroSelector, [
            new Action('select', () => {
              const hero: Hero = this.heroSelector.item();
              const initial = `${hero.name} approaches the raven.`;
              const effect: number = Random.max(4);
              if (effect === 0) {
                hero.str--;
                hero.wis--;
                hero.dex--;
                this.setDetails(Sprites.RAVEN, `${initial} it laughs and places a curse upon them.`, [
                  new Action('continue', () => this.game.progress())
                ]);
              } else if (effect === 1) {
                hero.str++;
                hero.wis++;
                hero.dex++;
                this.setDetails(
                  Sprites.RAVEN,
                  `${initial} it places a blessing upon them!`,
                  [ new Action('continue', () => this.game.progress()) ]
                );
              } else if (effect === 2) {
                hero.luck -= 10;
                this.setDetails(Sprites.RAVEN, `${initial} it laughs and places a curse upon them.`, [
                  new Action('continue', () => this.game.progress())
                ]);
              } else {
                hero.luck += 10;
                this.setDetails(Sprites.RAVEN, `${initial} it places a blessing upon them!`, [
                  new Action('continue', () => this.game.progress())
                ]);
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
