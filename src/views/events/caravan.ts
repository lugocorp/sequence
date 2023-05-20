import Hero from '../../entities/hero';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import EventView from '../event';
import Game from '../../game';

/*
 * In this event you choose a new party member.
 */
export default class CaravanEvent extends EventView {
  private recruitSelector: Selector<Hero>;
  private memberSelector: Selector<Hero>;
  private recruits: Hero[];

  constructor(game: Game) {
    super(game);
    const that = this;
    this.recruits = [
      this.game.data.getRandomHero(),
      this.game.data.getRandomHero(),
      this.game.data.getRandomHero()
    ];
    this.recruitSelector = Selector.heroSelector(this.game.party, this.recruits);
    this.setDetails(this.recruits[0].sprite, 'your party comes across a small caravan.', [
      new Action('continue', () =>
        that.setDetails(
          this.recruits[0].sprite,
          'one of the travelers would like to join your party.',
          [ new Action('continue', () => that.viewRecruits()) ]
        )
      )
    ]);
  }

  init(): void {
    this.memberSelector = Selector.heroSelector(this.game.party, this.game.party.members);
  }

  viewRecruits(): void {
    const that = this;
    this.setSelector(this.recruitSelector, [
      new Action('choose', () => {
        if (this.game.party.isFull()) {
          that.pleaseRemove();
        } else {
          that.finished();
        }
      }),
      new Action('view party', () => that.viewParty())
    ]);
  }

  viewParty(): void {
    const that = this;
    this.setSelector(this.memberSelector, [ new Action('back', () => that.viewRecruits()) ]);
  }

  pleaseRemove(): void {
    const that = this;
    this.setDetails(
      this.recruitSelector.item().sprite,
      'one of your party members would like to join the caravan.',
      [ new Action('continue', () => that.removeMember()) ]
    );
  }

  removeMember(): void {
    const that = this;
    this.setSelector(this.memberSelector, [ new Action('choose', () => that.finished()) ]);
  }

  finished(): void {
    const recruit: Hero = this.recruitSelector.item();
    let text = `${recruit.name} left the caravan for your party!`;
    if (this.game.party.isFull()) {
      const member: Hero = this.memberSelector.item();
      text += ` ${member.name} left your party for the caravan.`;
      this.game.party.remove(member);
    }
    this.game.party.add(recruit);
    this.setDetails(recruit.sprite, text, [ new Action('continue', () => this.game.progress()) ]);
  }
}
