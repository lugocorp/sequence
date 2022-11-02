import Hero from '../../entities/hero';
import Item from '../../entities/item';
import Action from '../../ui/action';
import { Event } from '../event';
import Game from '../../game';

export default class DreamEvent extends Event {
  static label = 'dream';

  constructor() {
    super(DreamEvent);
  }

  init(): void {
    const hero: Hero = Game.game.party.randomHero();
    const item: Item = Game.game.data.getRandomItem();
    this.setDetails(
      hero.sprite,
      `${hero.name} has a dream about a powerful item. could it be prophetic?`,
      [ new Action('continue', () => Game.game.progress()) ]
    );

    // Set up future event
    const future: Event = new Event({ label: 'dreamfuture' });
    future.init = function (): void {
      if (hero.canEquipItems()) {
        future.setDetails(
          hero.sprite,
          `${hero.name} receives a powerful item they had recently dreamt of`,
          [
            new Action('view item', () =>
              future.setDetails(item.sprite, item.descriptionText(), [
                new Action('continue', () => {
                  hero.equip(item);
                  Game.game.progress();
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
                new Action('continue', () => Game.game.progress())
              ])
            )
          ]
        );
      }
    };
    Game.futureEvent(future, 10, () => Game.game.party.members.indexOf(hero) > -1);
  }
}
