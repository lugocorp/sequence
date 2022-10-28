import Hero from '../../entities/hero';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import View from '../../ui/view';
import Game from '../../game';

/*
 * In this event you choose a new party member.
 */
export default class RecruitEvent extends View {
  private recruitSelector: Selector<Hero>;
  private memberSelector: Selector<Hero>;
  private recruits: Hero[];

  constructor() {
    super();
    const that = this;
    this.recruits = [
      Game.game.data.getRandomHero(),
      Game.game.data.getRandomHero(),
      Game.game.data.getRandomHero()
    ];
    this.recruitSelector = Selector.heroSelector(this.recruits);
    this.setDetails(this.recruits[0].sprite, 'your party comes across another group of travelers.', [
      new Action('continue', () => that.setDetails(
        this.recruits[0].sprite,
        'you can choose one traveler to recruit into your party.',
        [ new Action('continue', () => that.viewRecruits()) ]
      ))
    ]);
  }

  init(): void {
    this.memberSelector = Selector.heroSelector(Game.game.party.members);
  }

  viewRecruits(): void {
    const that = this;
    this.setSelector(this.recruitSelector, [
      new Action('choose', () => {
        if (Game.game.party.isFull()) {
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
    this.setSelector(this.memberSelector, [
      new Action('back', () => that.viewRecruits())
    ]);
  }

  pleaseRemove(): void {
    const that = this;
    this.setDetails(this.recruitSelector.item().sprite, 'your party is full. please remove an existing member.', [
      new Action('continue', () => that.removeMember())
    ]);
  }

  removeMember(): void {
    const that = this;
    this.setSelector(this.memberSelector, [
      new Action('choose', () => that.finished())
    ]);
  }

  finished(): void {
    const recruit: Hero = this.recruitSelector.item();
    let text = `welcome ${recruit.name} to your party!`;
    if (Game.game.party.isFull()) {
      const member: Hero = this.memberSelector.item();
      text += ` ${member.name} left your party.`
      Game.game.party.remove(member);
    }
    Game.game.party.add(recruit);
    this.setDetails(recruit.sprite, text, [
      new Action('continue', () => Game.game.progress())
    ]);
  }
}