import { Rarity } from '../../types';
import Random from '../../logic/random';
import Hero from '../../entities/hero';
import Item from '../../entities/item';
import Action from '../../ui/action';
import { EventView } from '../event';
import Game from '../../game';

export default class ProphecyEvent extends EventView {
  constructor(game: Game) {
    super(game);
  }

  init(): void {
    const hero: Hero = Random.element(this.game.party.members);
    const item: Item = this.game.data.getRandomItem(Rarity.RARE);
    this.setDetails(
      hero.sprite,
      `${hero.name} has a vision about a powerful artifact. could it be prophetic?`,
      [ new Action('continue', () => this.game.progress()) ]
    );

    // Set up future event
    const future: EventView = new EventView(this.game);
    future.init = function (): void {
      if (hero.basket.hasSpace) {
        future.setDetails(
          hero.sprite,
          `${hero.name} receives a powerful item they had recently seen in a vision.`,
          [
            new Action('view item', () =>
              future.setDetails(item.sprite, item.descriptionText(), [
                new Action('continue', () => {
                  hero.basket.equip(item);
                  this.game.progress();
                })
              ])
            )
          ]
        );
      } else {
        future.setDetails(
          hero.sprite,
          `${hero.name} comes upon a powerful artifact they had recently seen in a vision, but their inventory is full. they leave the item alone.`,
          [
            new Action('view item', () =>
              future.setDetails(item.sprite, item.descriptionText(), [
                new Action('continue', () => this.game.progress())
              ])
            )
          ]
        );
      }
    };
    this.game.chain.futureEvent(future, 10, () => this.game.party.members.indexOf(hero) > -1);
  }
}
