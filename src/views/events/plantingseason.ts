import Sprites from '../../media/sprites';
import Action from '../../ui/action';
import { EventView } from '../event';
import Game from '../../game';

export default class PlantingSeasonEvent extends EventView {
  constructor(game: Game) {
    super(game);
    const that = this;
    this.setDetails(
      Sprites.GARDEN,
      `your party comes across a small village at the start of the growing season. will they help plant some crops?`,
      [
        new Action('yes', () => that.yes()),
        new Action('no', () =>
          that.setDetails(Sprites.GARDEN, `your party does not help the village plant any crops.`, [
            new Action('continue', () => this.game.progress())
          ])
        )
      ]
    );
  }

  yes(): void {
    this.setDetails(
      Sprites.GARDEN,
      `your party stays a while and plants various crops. they have lost some of their energy in the process.`,
      [ new Action('continue', () => this.game.progress()) ]
    );

    this.game.history.peopleHelped++;
    for (const hero of this.game.party.members) {
      hero.energy--;
    }

    // Set up future event
    const future: EventView = new EventView(this.game);
    future.setDetails(
      Sprites.GARDEN,
      `a group approaches your party. they came from a village you helped recently and they have brought food to share.`,
      [
        new Action('continue', () =>
          future.setDetails(
            Sprites.GARDEN,
            'your party is blessed and becomes stronger, smarter and faster as they partake in the feast.',
            [
              new Action('continue', () => {
                for (const hero of this.game.party.members) {
                  hero.luck += 5;
                  hero.str++;
                  hero.wis++;
                  hero.dex++;
                }
                this.game.progress();
              })
            ]
          )
        )
      ]
    );
    this.game.chain.futureEvent(future, 8);
  }
}
