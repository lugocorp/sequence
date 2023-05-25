import Sprites from '../../media/sprites';
import Item from '../../entities/item';
import Hero from '../../entities/hero';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import EventView from '../event';
import Game from '../../game';

export default class SuspiciousItemEvent extends EventView {
  private heroSelector: Selector<Hero>;
  private item: Item;

  constructor(game: Game) {
    super(game);
    this.item = this.game.data.getRandomItem();
    this.setDetails(
      this.item.sprite,
      `your party comes across a suspicious ${this.item.name}. choose someone to pick it up.`,
      [ new Action('continue', () => this.viewParty()) ]
    );
  }

  private get hero(): Hero {
    return this.heroSelector.item();
  }

  init(): void {
    this.heroSelector = Selector.heroSelector(
      this.game.party,
      this.game.party.members.filter((h: Hero) => h.basket.hasSpace)
    );
  }

  private viewParty(): void {
    if (this.game.party.canPickupItems()) {
      this.setSelector(this.heroSelector, [
        new Action('select', () => {
          this.game.chain.futureEvent(
            this.getFutureEvent(),
            5,
            () => this.game.party.contains(this.hero) && this.hero.basket.contains(this.item)
          );
          this.setDetails(this.hero.sprite, `${this.hero.name} picks up the ${this.item.name}.`, [
            new Action('continue', () => this.game.progress())
          ]);
        })
      ]);
    } else {
      this.setDetails(
        this.item.sprite,
        `no one in your party has inventory space. they leave the ${this.item.name} behind.`,
        [ new Action('continue', () => this.game.progress()) ]
      );
    }
  }

  private getFutureEvent(): EventView {
    const view: EventView = new EventView(this.game);
    view.setDetails(
      Sprites.SUSPICIOUS_ITEM,
      `a spirit comes to ${this.hero.name} and asks to have their ${this.item.name} back.`,
      [
        new Action('return it', () => {
          this.hero.basket.unequip(this.item);
          this.setDetails(
            Sprites.SUSPICIOUS_ITEM,
            `${this.hero.name} returns the ${this.item.name} to the spirit.`,
            [ new Action('continue', () => this.game.progress()) ]
          );
        }),
        new Action('no way', () => {
          this.hero.str--;
          this.hero.wis--;
          this.hero.dex--;
          this.hero.luck -= 10;
          this.hero.energy--;
          this.setDetails(
            Sprites.SUSPICIOUS_ITEM,
            `the spirit places a curse upon ${this.hero.name}.`,
            [ new Action('continue', () => this.game.progress()) ]
          );
        })
      ]
    );
    return view;
  }
}
