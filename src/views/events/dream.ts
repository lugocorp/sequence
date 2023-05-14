import Rarity from '../../enums/rarity';
import Hero from '../../entities/hero';
import Item from '../../entities/item';
import Action from '../../ui/action';
import { EventView } from '../event';
import Game from '../../game';

export default class DreamEvent extends EventView {
  static label = 'dream';

  constructor(game: Game) {
    super(game, DreamEvent);
  }

  init(): void {
    const hero: Hero = this.game.party.randomHero();
    const item: Item = this.game.data.getRandomItem(Rarity.RARE);
    this.setDetails(
      hero.sprite,
      `${hero.name} has a dream about a powerful item. could it be prophetic?`,
      [ new Action('continue', () => this.game.progress()) ]
    );

    // Set up future event
    const future: EventView = new EventView(this.game, { label: 'dreamfuture' });
    future.init = function (): void {
      if (hero.basket.hasSpace) {
        future.setDetails(
          hero.sprite,
          `${hero.name} receives a powerful item they had recently dreamt of.`,
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
          `${hero.name} comes upon a powerful item they had recently dreamt of, but their inventory is full.`,
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
    this.game.futureEvent(future, 10, () => this.game.party.members.indexOf(hero) > -1);
  }
}
