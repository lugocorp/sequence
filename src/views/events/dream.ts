import Rarity from '../../enums/rarity';
import Hero from '../../entities/hero';
import Item from '../../entities/item';
import Action from '../../ui/action';
import { EventView } from '../event';
import Game from '../../game';

export default class DreamEvent extends EventView {
  static label = 'dream';

  constructor() {
    super(DreamEvent);
  }

  init(game: Game): void {
    const hero: Hero = game.party.randomHero();
    const item: Item = game.data.getRandomItem(Rarity.RARE);
    this.setDetails(
      hero.sprite,
      `${hero.name} has a dream about a powerful item. could it be prophetic?`,
      [ new Action('continue', () => game.progress()) ]
    );

    // Set up future event
    const future: EventView = new EventView({ label: 'dreamfuture' });
    future.init = function (): void {
      if (hero.basket.hasSpace) {
        future.setDetails(
          hero.sprite,
          `${hero.name} receives a powerful item they had recently dreamt of.`,
          [
            new Action('view item', () =>
              future.setDetails(item.sprite, item.descriptionText(), [
                new Action('continue', () => {
                  hero.basket.equip(game.history, item);
                  game.progress();
                })
              ])
            )
          ]
        );
      } else {
        future.setDetails(
          hero.sprite,
          `${hero.name} comes upon a powerful item they had recently dreamt of, but their inventory is full.`,
          [
            new Action('view item', () =>
              future.setDetails(item.sprite, item.descriptionText(), [
                new Action('continue', () => game.progress())
              ])
            )
          ]
        );
      }
    };
    game.futureEvent(future, 10, () => game.party.members.indexOf(hero) > -1);
  }
}
